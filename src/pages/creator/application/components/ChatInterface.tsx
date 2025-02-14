import React, { useRef, useEffect } from 'react';
import { Message as MessageComponent } from '../Message';
import { ChatInput } from '../ChatInput';
import { useApplicationCreation } from '../context/ApplicationCreationContext';
import { ConceptOption, Question } from '../../../../utils/openai';
import { generateResponse } from '../../../../services/mock';
import { generateConcepts } from '../../../../services/api/conceptGeneration';
import { generateQuestions } from '../../../../services/api/questionGeneration';

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
    setAllQuestionsAnswered
  } = useApplicationCreation();

  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleConceptSelect = async (conceptId: string) => {
    const messageWithOptions = messages.find(msg => 
      msg.options?.some(opt => 
        'id' in opt && opt.id === conceptId
      )
    );

    if (!messageWithOptions?.options) return;

    const selectedOption = messageWithOptions.options.find(opt => 
      'id' in opt && opt.id === conceptId
    ) as ConceptOption | undefined;

    if (!selectedOption) return;

    setIsProcessing(true);
    setApplicationData(prev => ({ ...prev, selectedConcept: conceptId }));

    try {
      // Generate questions based on selected concept
      const questions = await generateQuestions({
        title: applicationData.title,
        description: applicationData.description,
        selectedConcept: selectedOption
      });

      // Store all questions
      setRemainingQuestions(questions.slice(1));

      // Show first question
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
      setIsProcessing(false);
    }
  };

  const handleQuestionAnswers = async (questionId: string, selectedOptionIds: string[]) => {
    const currentQuestion = messages
      .flatMap(msg => msg.options || [])
      .find(opt => 'id' in opt && opt.id === questionId) as Question | undefined;

    if (!currentQuestion) return;

    // Save the answers
    setApplicationData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: selectedOptionIds
      }
    }));

    // Show selected answers in chat
    const selectedOptions = currentQuestion.options
      .filter(opt => selectedOptionIds.includes(opt.id))
      .map(opt => opt.text);

    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        content: `Selected options:\n${selectedOptions.map(opt => `• ${opt}`).join('\n')}`
      }
    ]);

    // If there are more questions, show the next one
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
      // All questions answered
      setAllQuestionsAnswered(true);
      setMessages(prev => [
        ...prev,
        {
          type: 'system',
          content: "Great! I have all the information I need. I'll now generate a detailed product backlog based on your responses."
        }
      ]);
      setCurrentStep('backlog-generation');
    }
  };

  const messageHandlers = {
    onConceptSelect: handleConceptSelect,
    onQuestionAnswer: handleQuestionAnswers
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-40">
        <div className="w-full max-w-6xl mx-auto">
          {messages.map((message, index) => (
            <MessageComponent
              key={index}
              message={message}
              handlers={messageHandlers}
              answeredQuestions={applicationData.answers}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        disabled={isProcessing}
      />
    </div>
  );
}