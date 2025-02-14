import React from 'react';
import { ChatInput } from '../ChatInput';

interface ChatInputWrapperProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}

export const ChatInputWrapper: React.FC<ChatInputWrapperProps> = ({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  disabled
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <ChatInput
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      </div>
    </div>
  );
};