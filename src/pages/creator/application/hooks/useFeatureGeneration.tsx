import React, { useState } from 'react';
import { Feature } from '../../../../services/mock/features';
import { Question, ConceptOption } from '../../../../utils/openai';
import { Message, ApplicationData, DEFAULT_CONFIG } from '../types/chat';
import { generateFeatures, createApplication } from '../../../../services/api/applicationCreation';
import { 
  CreatingApplicationMessage, 
  GeneratingFeaturesMessage, 
  WritingStoriesMessage 
} from '../components/MessageContent';

interface UseFeatureGenerationProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  setIsProcessing: (isProcessing: boolean) => void;
  setApplicationData: React.Dispatch<React.SetStateAction<ApplicationData>>;
}

interface ExtendedApplicationData extends ApplicationData {
  selectedConcept: ConceptOption;
}

export function useFeatureGeneration({
  setMessages,
  setFeatures,
  setIsProcessing,
  setApplicationData
}: UseFeatureGenerationProps) {
  const [isGeneratingFeatures, setIsGeneratingFeatures] = useState(false);

  const generateApplicationFeatures = async (
    applicationData: ExtendedApplicationData,
    messages: Message[]
  ) => {
    setIsGeneratingFeatures(true);
    setIsProcessing(true);

    try {
      // Create loading message
      setMessages(prev => [
        ...prev,
        {
          type: 'system',
          content: React.createElement(CreatingApplicationMessage)
        }
      ]);

      // Create application in Supabase
      const applicationId = await createApplication({
        title: applicationData.title,
        description: applicationData.description,
        selectedConcept: applicationData.selectedConcept,
        answers: applicationData.answers || {}
      });

      if (!applicationId) {
        throw new Error('Failed to create application');
      }

      // Update loading message for feature generation
      setMessages(prev => [
        ...prev,
        {
          type: 'system',
          content: React.createElement(GeneratingFeaturesMessage)
        }
      ]);

      // Process answered questions
      const answeredQuestions = messages
        .filter(msg => msg.options?.length === 1 && 'question' in msg.options[0])
        .map(msg => msg.options![0] as Question);
      
      const answersWithText = Object.entries(applicationData.answers || {}).reduce((acc, [questionId, selectedIds]) => {
        const question = answeredQuestions.find(q => q.id === questionId);
        if (question) {
          acc[question.question] = question.options
            .filter(opt => selectedIds.includes(opt.id))
            .map(opt => opt.text);
        }
        return acc;
      }, {} as Record<string, string[]>);

      // Generate features
      const generatedFeatures = await generateFeatures({
        title: applicationData.title,
        description: applicationData.description,
        selectedConcept: applicationData.selectedConcept,
        answers: answersWithText
      });

      setFeatures(generatedFeatures);
      setApplicationData(prev => ({ 
        ...prev, 
        id: applicationId,
        config: prev.config || DEFAULT_CONFIG
      }));

      return generatedFeatures;
    } catch (error) {
      console.error('Error in feature generation:', error);
      setMessages(prev => [...prev, {
        type: 'system',
        content: "I encountered an error while setting up your application. Please try again."
      }]);
      return null;
    } finally {
      setIsGeneratingFeatures(false);
      setIsProcessing(false);
    }
  };

  const handleCreateProjectPlan = () => {
    setMessages(prev => [
      ...prev,
      {
        type: 'system',
        content: React.createElement(WritingStoriesMessage)
      }
    ]);
  };

  return {
    generateApplicationFeatures,
    handleCreateProjectPlan,
    isGeneratingFeatures
  };
}