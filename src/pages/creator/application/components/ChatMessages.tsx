import React from 'react';
import { Message } from '../types/chat';
import { MessageComponent } from './MessageComponent';

interface ChatMessagesProps {
  messages: Message[];
  handlers: {
    onConceptSelect: (conceptId: string) => void;
    onQuestionAnswer: (questionId: string, selectedOptionIds: string[]) => void;
  };
  answeredQuestions?: Record<string, string[]>;
  selectedConcept?: string;
  isProcessingConcept: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  handlers,
  answeredQuestions,
  selectedConcept,
  isProcessingConcept,
  messagesEndRef
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto pb-40">
        {messages.map((message, index) => (
          <MessageComponent
            key={index}
            message={message}
            handlers={handlers}
            answeredQuestions={answeredQuestions}
            selectedConcept={selectedConcept}
            isProcessingConcept={isProcessingConcept}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};