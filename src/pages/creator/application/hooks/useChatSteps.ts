import { useState } from 'react';
import { generateResponse } from '../../../../services/mock';
import { generateConcepts } from '../../../../services/api/conceptGeneration';
import { generateQuestions } from '../../../../services/api/questionGeneration';
import { ConceptOption } from '../../../../utils/openai';
import { Message, ApplicationData, ChatStep } from '../types/chat';

interface UseChatStepsProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setApplicationData: React.Dispatch<React.SetStateAction<ApplicationData>>;
  setCurrentStep: (step: ChatStep) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setSelectedConcept: (concept: ConceptOption | null) => void;
  setRemainingQuestions: (questions: any[]) => void;
  applicationData: ApplicationData;
}

export function useChatSteps({
  setMessages,
  setApplicationData,
  setCurrentStep,
  setIsProcessing,
  setSelectedConcept,
  setRemainingQuestions,
  applicationData
}: UseChatStepsProps) {
  const [isProcessingConcept, setIsProcessingConcept] = useState(false);

  const handleTitleStep = async (userMessage: string) => {
    if (userMessage.length < 3 || userMessage.length > 100) {
      setMessages(prev => [...prev, {
        type: 'system',
        content: "The title should be between 3 and 100 characters. Please try again."
      }]);
      return;
    }

    setApplicationData(prev => ({ ...prev, title: userMessage }));
    const response = await generateResponse([
      {
        role: 'user',
        content: `I want to create an application called "${userMessage}". Can you help me describe it?`
      }
    ]);
    setMessages(prev => [...prev, { type: 'system', content: response }]);
    setCurrentStep('description');
  };

  const handleDescriptionStep = async (userMessage: string) => {
    if (userMessage.length > 2000) {
      setMessages(prev => [...prev, {
        type: 'system',
        content: "The description is too long (max 2000 characters). Please try again."
      }]);
      return;
    }

    setApplicationData(prev => ({ ...prev, description: userMessage }));
    
    setMessages(prev => [...prev, {
      type: 'system',
      content: "Processing your input and generating concepts..."
    }]);
    
    try {
      const concepts = await generateConcepts(applicationData.title, userMessage);
      
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          type: 'system',
          content: "Based on your description, I've generated a few concept options. Please select the one that best matches your vision:",
          options: concepts,
          optionType: 'concept'
        }
      ]);
      setCurrentStep('concept-selection');
    } catch (error) {
      console.error('Error generating concepts:', error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          type: 'system',
          content: "I encountered an error while generating concepts. Please try again."
        }
      ]);
    }
  };

  const handleConceptSelect = async (conceptId: string) => {
    setIsProcessingConcept(true);

    try {
      const concepts = await generateConcepts(applicationData.title, applicationData.description);
      const selectedConcept = concepts.find(c => c.id === conceptId);
      
      if (!selectedConcept) {
        throw new Error('Selected concept not found');
      }

      setSelectedConcept(selectedConcept);
      
      setMessages(prev => [
        ...prev,
        {
          type: 'system',
          content: `Exploring "${selectedConcept.title}" in depth to understand your requirements better...`
        }
      ]);

      const questions = await generateQuestions({
        title: applicationData.title,
        description: applicationData.description,
        selectedConcept
      });

      setRemainingQuestions(questions.slice(1));

      if (questions.length > 0) {
        setMessages(prev => [
          ...prev,
          {
            type: 'system',
            content: "Let's gather some specific requirements. Please select all that apply:",
            options: [questions[0]],
            optionType: 'question'
          }
        ]);
      }

      setCurrentStep('question-answering');
    } catch (error) {
      console.error('Error generating questions:', error);
      setMessages(prev => [...prev, {
        type: 'system',
        content: "I encountered an error while generating questions. Please try again."
      }]);
    } finally {
      setIsProcessingConcept(false);
    }
  };

  return {
    handleTitleStep,
    handleDescriptionStep,
    handleConceptSelect,
    isProcessingConcept
  };
}