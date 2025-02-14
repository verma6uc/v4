import React, { useRef, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { Button } from '../../../components/Button';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export function ChatInput(props: ChatInputProps) {
  const { value, onChange, onSubmit, onKeyDown, disabled } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white">
      <div className="w-full">
        <div className="bg-gradient-to-t from-white via-white to-transparent pt-6">
          <div className="shadow-lg">
            <form onSubmit={onSubmit} className="relative p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder="Message Yuvi..."
                    className="w-full resize-none bg-transparent outline-none focus:outline-none border-0 ring-0 focus:ring-0 pr-10 py-3 min-h-[52px] max-h-48 text-base"
                    disabled={disabled}
                    rows={1}
                  />
                  <button
                    type="button"
                    className="absolute right-3 bottom-2.5 p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
                <Button
                  type="submit"
                  disabled={disabled || !value.trim()}
                  className="rounded-xl px-5 py-2.5 transition-all duration-200"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}