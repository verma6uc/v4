import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationCreation } from '../context/ApplicationCreationContext';
import { Feature } from '../../../../services/mock/features';
import { generateResponse } from '../../../../services/mock';
import { Message } from '../Message';
import { ChatInput } from '../ChatInput';
import { ConceptOption, Question } from '../../../../utils/openai';
import { generateConcepts } from '../../../../services/api/conceptGeneration';
import { generateQuestions } from '../../../../services/api/questionGeneration';
import { generateFeatures } from '../../../../services/api/applicationCreation';
import { FeatureCard } from '../../../../components/application/feature/FeatureCard';
import { Button } from '../../../../components/Button';

export function ChatInterface() {
  const {
    messages,
    setMessages,
    applicationData,
    setApplicationData,
    currentStep,
    setCurrentStep,
    isProcessing,
    setIsProcessing,
    remainingQuestions,
    setRemainingQuestions,
    setAllQuestionsAnswered,
    selectedConcept,
    setSelectedConcept
  } = useApplicationCreation();

  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isProcessingConcept, setIsProcessingConcept] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoadingUseCases, setIsLoadingUseCases] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCreateProjectPlan = async () => {
    if (features.length === 0) return;
    
    // Store features in application data
    setApplicationData(prev => ({ ...prev, features }));
    
    // Navigate to project plan page
    navigate('/creator/applications/new/plan');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isProcessing) {
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsProcessing(true);

    try {
      switch (currentStep) {
        case 'title':
          if (userMessage.length < 3 || userMessage.length > 100) {
            setMessages(prev => [...prev, {
              type: 'system',
              content: "The title should be between 3 and 100 characters. Please try again."
            }]);
          } else {
            setApplicationData(prev => ({ ...prev, title: userMessage }));
            const response = await generateResponse([
              {
                role: 'user',
                content: `I want to create an application called "${userMessage}". Can you help me describe it?`
              }
            ]);
            setMessages(prev => [...prev, { type: 'system', content: response }]);
            setCurrentStep('description');
          }
          break;

        case 'description':
          if (userMessage.length > 2000) {
            setMessages(prev => [...prev, {
              type: 'system',
              content: "The description is too long (max 2000 characters). Please try again."
            }]);
          } else {
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
          }
          break;

        case 'question-answering':
          const response = await generateResponse([
            {
              role: 'user',
              content: userMessage
            }
          ]);
          setMessages(prev => [...prev, { type: 'system', content: response }]);
          break;
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setMessages(prev => [...prev, {
        type: 'system',
        content: "I encountered an error. Please try again."
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const messageHandlers = {
    onConceptSelect: async (conceptId: string) => {
      const messageWithOptions = messages.find(msg => 
        msg.options?.some(opt => 
          'id' in opt && opt.id === conceptId
        )
      );

      if (!messageWithOptions?.options) return;
      
      const fullConcept = messageWithOptions.options.find(opt => 
        'id' in opt && opt.id === conceptId
      ) as ConceptOption;

      if (!fullConcept) return;
      setIsProcessingConcept(true);
      setSelectedConcept(fullConcept);

      try {
        setMessages(prev => [
          ...prev,
          {
            type: 'system',
            content: `Exploring "${fullConcept.title}" in depth to understand your requirements better...`
          }
        ]);

        const questions = await generateQuestions({
          title: applicationData.title,
          description: applicationData.description,
          selectedConcept: fullConcept
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
    },
    onQuestionAnswer: async (questionId: string, selectedOptionIds: string[]) => {
      setApplicationData(prev => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: selectedOptionIds
        }
      }));

      if (remainingQuestions.length > 0) {
        const [nextQuestion, ...rest] = remainingQuestions;
        setRemainingQuestions(rest);
        
        setMessages(prev => [
          ...prev,
          {
            type: 'system',
            content: "Please select all options that apply:",
            options: [nextQuestion],
            optionType: 'question'
          }
        ]);
      } else {
        setAllQuestionsAnswered(true);
        setIsProcessing(true);
        
        setMessages(prev => [
          ...prev,
          {
            type: 'system',
            content: "Processing your application..."
          }
        ]);

        try {
          // Get all questions and their selected answers
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
            selectedConcept: selectedConcept!,
            answers: answersWithText
          });
          
          setFeatures(generatedFeatures);

          // Show features in chat
          setMessages(prev => [
            ...prev,
            {
              type: 'system',
              content: (
                <div className="space-y-6">
                  {generatedFeatures.map(feature => (
                    <FeatureCard 
                      key={feature.id}
                      {...feature}
                      useCases={[]}
                      isLoading={isLoadingUseCases}
                    />
                  ))}
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleCreateProjectPlan()} 
                      className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                    >
                      <span>Create Project Plan</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Button>
                  </div>
                </div>
              )
            }
          ]);
        } catch (error) {
          console.error('Error generating features:', error);
          setMessages(prev => [...prev, {
            type: 'system',
            content: "I encountered an error while generating features. Please try again."
          }]);
        } finally {
          setIsProcessing(false);
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-6xl mx-auto pb-40">
          {messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              handlers={messageHandlers}
              answeredQuestions={applicationData.answers}
              selectedConcept={selectedConcept?.id}
              isProcessingConcept={isProcessingConcept}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-6xl mx-auto px-6 pb-6">
          <ChatInput
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}