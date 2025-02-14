import React, { useState, useRef, useEffect } from 'react';
import { Message as MessageComponent } from './application/Message';
import { ChatInput } from './application/ChatInput';
import { Message, ApplicationData, ApplicationStep } from './application/types';
import { ConceptOption, Question } from '../../utils/openai';
import { generateConcepts, generateResponse, generateFollowUpQuestions } from '../../services/openai';

console.log('NewApplicationPage component loaded');

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
  console.log('NewApplicationPage rendered');
  
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('title');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
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
    console.log('Current application data:', applicationData);
  }, [applicationData]);

  useEffect(() => {
    console.log('Current step:', currentStep);
  }, [currentStep]);

  useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Input changed:', e.target.value);
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      console.log('Enter key pressed');
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleConceptSelect = async (optionId: string) => {
    console.log('Selecting concept:', optionId);
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
      console.log('Generating follow-up questions for concept:', selectedOption);
      const questions = await generateFollowUpQuestions(selectedOption);
      console.log('Generated questions:', questions);
      
      setMessages(prev => [
        ...prev,
        {
          type: 'system',
          content: "Great choice! Let's refine this concept further. Please answer these questions:",
          options: questions,
          optionType: 'question'
        }
      ]);
      setCurrentStep('question-answering');
    } catch (error) {
      console.error('Error in handleConceptSelect:', error);
      setMessages(prev => [...prev, {
        type: 'system',
        content: "I encountered an error. Please try again."
      }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Current step:', currentStep);
    console.log('Input:', input);
    console.log('Is Processing:', isProcessing);

    if (!input.trim() || isProcessing) {
      console.log('Input empty or processing in progress, returning');
      return;
    }

    const userMessage = input.trim();
    console.log('Processing user message:', userMessage);
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsProcessing(true);

    try {
      switch (currentStep) {
        case 'title':
          console.log('Processing title step');
          if (userMessage.length < 3 || userMessage.length > 100) {
            console.log('Title length validation failed');
            setMessages(prev => [...prev, {
              type: 'system',
              content: "The title should be between 3 and 100 characters. Please try again."
            }]);
          } else {
            console.log('Setting application title:', userMessage);
            setApplicationData(prev => ({ ...prev, title: userMessage }));
            console.log('Generating response for title');
            try {
              const response = await generateResponse([
                {
                  role: 'user',
                  content: `I want to create an application called "${userMessage}". Can you help me describe it?`
                }
              ]);
              console.log('Response received:', response);
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
          console.log('Processing description step');
          if (userMessage.length > 2000) {
            console.log('Description length validation failed');
            setMessages(prev => [...prev, {
              type: 'system',
              content: "The description is too long (max 2000 characters). Please try again."
            }]);
          } else {
            console.log('Setting application description:', userMessage);
            setApplicationData(prev => ({ ...prev, description: userMessage }));
            
            // Show processing message
            setMessages(prev => [...prev, {
              type: 'system',
              content: "Processing your input..."
            }]);
            
            // Generate concepts
            console.log('Generating concepts');
            try {
              const concepts = await generateConcepts(applicationData.title, userMessage);
              console.log('Concepts received:', concepts);
              
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
          console.log('Processing concept/question step');
          try {
            const response = await generateResponse([
              {
                role: 'user',
                content: userMessage
              }
            ], `User is refining the ${applicationData.selectedConcept} concept`);
            console.log('Response received:', response);
            
            setMessages(prev => [...prev, { type: 'system', content: response }]);
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
        <div className="w-full">
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