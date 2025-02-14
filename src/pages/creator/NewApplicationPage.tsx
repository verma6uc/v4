import React, { useState, useRef, useEffect } from 'react';
import { Message as MessageComponent } from './application/Message';
import { ChatInput } from './application/ChatInput';
import { Message, ApplicationData, ApplicationStep } from './application/types';
import { ConceptOption, Question } from '../../utils/openai';
import { generateConcepts, generateResponse, generateFollowUpQuestions } from '../../services/mock';

console.error('NewApplicationPage component loaded');

const INITIAL_MESSAGES: Message[] = [
  {
    type: 'system',
    content: `Welcome to the Application Creation Process!

I'll guide you through creating your application step by step. Here's what we'll do:

[1] First, we'll start with the basics
• Give your application a title that reflects its purpose
• Think of something clear and memorable

[2] Then, we'll dive into the description
• Explain what problem your application solves
• This helps me understand your vision better

Let's begin! What would you like to call your application?`
  }
];

export function NewApplicationPage() {
  console.error('NewApplicationPage rendered');
  
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('title');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    title: '',
    description: '',
    config: {
      theme: 'corporate',
      timezone: 'UTC',
      securityPolicy: 'standard'
    }
  });

  useEffect(() => {
    console.error('Current application data:', applicationData);
  }, [applicationData]);

  useEffect(() => {
    console.error('Current step:', currentStep);
  }, [currentStep]);

  useEffect(() => {
    console.error('Messages updated:', messages);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.error('NewApplicationPage: handleInputChange called with value:', e.target.value);
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.error('NewApplicationPage: handleKeyDown called with key:', e.key);
    if (e.key === 'Enter' && !e.shiftKey) {
      console.error('Enter key pressed, submitting form');
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleConceptSelect = async (optionId: string) => {
    console.error('NewApplicationPage: handleConceptSelect called with optionId:', optionId);
    setSelectedConcept(optionId);
    const selectedOption = messages
      .flatMap(msg => (msg.options || []) as (ConceptOption | Question)[])
      .find(opt => 'title' in opt && opt.id === optionId) as ConceptOption | undefined;

    if (!selectedOption) {
      console.error('Selected concept not found:', optionId);
      return;
    }
    
    setApplicationData(prev => ({ ...prev, selectedConcept: optionId }));
    
    try {
      console.error('Generating follow-up questions for concept:', selectedOption);
      const questions = await generateFollowUpQuestions(selectedOption);
      console.error('Generated questions:', questions);
      
      if (questions.length === 0) {
        console.error('All questions answered, moving to backlog generation');
        setAllQuestionsAnswered(true);
        const response = await generateResponse([], 'all_questions_answered');
        setMessages(prev => [
          ...prev,
          {
            type: 'system',
            content: response
          }
        ]);
        setCurrentStep('backlog-generation');
      } else {
        setMessages(prev => [
          ...prev,
          {
            type: 'system',
            content: "Please answer this question to help me understand your requirements better:",
            options: questions,
            optionType: 'question'
          }
        ]);
        setCurrentStep('question-answering');
      }
    } catch (error) {
      console.error('Error in handleConceptSelect:', error);
      setMessages(prev => [...prev, {
        type: 'system',
        content: "I encountered an error. Please try again."
      }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.error('NewApplicationPage: handleSubmit called');
    e.preventDefault();
    console.error('Form submitted');
    console.error('Current step:', currentStep);
    console.error('Input:', input);
    console.error('Is Processing:', isProcessing);

    if (!input.trim() || isProcessing) {
      console.error('Input empty or processing in progress, returning');
      return;
    }

    const userMessage = input.trim();
    console.error('Processing user message:', userMessage);
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsProcessing(true);

    try {
      switch (currentStep) {
        case 'title':
          console.error('Processing title step');
          if (userMessage.length < 3 || userMessage.length > 100) {
            console.error('Title length validation failed');
            setMessages(prev => [...prev, {
              type: 'system',
              content: "The title should be between 3 and 100 characters. Please try again."
            }]);
          } else {
            console.error('Setting application title:', userMessage);
            setApplicationData(prev => ({ ...prev, title: userMessage }));
            console.error('Generating response for title');
            try {
              const response = await generateResponse([
                {
                  role: 'user',
                  content: `I want to create an application called "${userMessage}". Can you help me describe it?`
                }
              ]);
              console.error('Response received:', response);
              setMessages(prev => [...prev, { type: 'system', content: response }]);
              setCurrentStep('description');
            } catch (error) {
              console.error('Error generating response:', error);
              if (error instanceof Error) {
                console.error('Error details:', {
                  name: error.name,
                  message: error.message,
                  stack: error.stack
                });
              }
              throw error;
            }
          }
          break;

        case 'description':
          console.error('Processing description step');
          if (userMessage.length > 2000) {
            console.error('Description length validation failed');
            setMessages(prev => [...prev, {
              type: 'system',
              content: "The description is too long (max 2000 characters). Please try again."
            }]);
          } else {
            console.error('Setting application description:', userMessage);
            setApplicationData(prev => ({ ...prev, description: userMessage }));
            
            // Show processing message
            setMessages(prev => [...prev, {
              type: 'system',
              content: "Processing your input..."
            }]);
            
            // Generate concepts
            console.error('Generating concepts');
            try {
              const concepts = await generateConcepts(applicationData.title, userMessage);
              console.error('Concepts received:', concepts);
              
              setMessages(prev => [
                ...prev.slice(0, -1), // Remove processing message
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
              if (error instanceof Error) {
                console.error('Error details:', {
                  name: error.name,
                  message: error.message,
                  stack: error.stack
                });
              }
              throw error;
            }
          }
          break;

        case 'concept-selection':
        case 'question-answering':
          console.error('Processing concept/question step');
          try {
            const response = await generateResponse([
              {
                role: 'user',
                content: userMessage
              }
            ], allQuestionsAnswered ? 'all_questions_answered' : undefined);
            console.error('Response received:', response);
            
            setMessages(prev => [...prev, { type: 'system', content: response }]);
            
            if (allQuestionsAnswered) {
              console.error('All questions answered, moving to backlog generation');
              setCurrentStep('backlog-generation');
            }
          } catch (error) {
            console.error('Error generating response:', error);
            if (error instanceof Error) {
              console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
              });
            }
            throw error;
          }
          break;

        case 'backlog-generation':
          console.error('Processing backlog generation step');
          // Handle any additional user input during backlog generation
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-40">
        <div className="w-full max-w-6xl mx-auto">
          {messages.map((message, index) => (
            <MessageComponent
              key={index}
              message={message}
              onSelectOption={handleConceptSelect}
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