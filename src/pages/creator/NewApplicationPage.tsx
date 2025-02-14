import React, { useState, useRef, useEffect } from 'react';
import { Message as MessageComponent } from './application/Message';
import { ChatInput } from './application/ChatInput';
import { Message, ApplicationData, ApplicationStep, ConceptOption } from './application/types';
import { generateResponse, generateConcepts } from '../../services/openai';

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
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('title');
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

  const handleConceptSelect = async (optionId: string) => {
    setApplicationData(prev => ({ ...prev, selectedConcept: optionId }));
    
    try {
      const response = await generateResponse([
        {
          role: 'user',
          content: `I've selected the ${optionId} concept. What questions do you have to help refine this concept?`
        }
      ], `User has selected concept: ${optionId}`);

      setMessages(prev => [
        ...prev,
        {
          type: 'system',
          content: response
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'system',
        content: "I encountered an error. Please try again."
      }]);
    }
    
    setCurrentStep('concept-selection');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

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
            
            // Show processing message
            setMessages(prev => [...prev, {
              type: 'system',
              content: "Processing your input..."
            }]);
            
            // Generate concepts
            const concepts = await generateConcepts(applicationData.title, userMessage);
            
            setMessages(prev => [...prev, {
              type: 'system',
              content: "Based on your description, I've generated a few concept options. Please select the one that best matches your vision:",
              options: concepts
            }]);
          }
          break;

        case 'concept-selection':
          const response = await generateResponse([
            {
              role: 'user',
              content: userMessage
            }
          ], `User is refining the ${applicationData.selectedConcept} concept`);
          
          setMessages(prev => [...prev, { type: 'system', content: response }]);
          break;
      }
    } catch (error) {
      console.error('Error:', error);
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