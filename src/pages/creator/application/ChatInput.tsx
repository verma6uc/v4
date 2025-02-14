import React, { useRef, useEffect } from 'react';
import { Mic } from 'lucide-react';

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

  console.error('ChatInput rendered with value:', value);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const handleInput = (e: Event) => {
        console.error('Direct input event:', (e.target as HTMLTextAreaElement).value);
      };

      const handleFocus = () => {
        console.error('Textarea focused');
      };

      textarea.addEventListener('input', handleInput);
      textarea.addEventListener('focus', handleFocus);
      
      return () => {
        textarea.removeEventListener('input', handleInput);
        textarea.removeEventListener('focus', handleFocus);
      };
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.error('ChatInput: handleChange called with value:', e.target.value);
    onChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.error('ChatInput: handleKeyDown called with key:', e.key);
    if (e.key === 'Enter' && !e.shiftKey) {
      console.error('Enter key pressed, submitting form');
      e.preventDefault();
      handleSubmit(e);
    } else {
      onKeyDown(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.error('ChatInput: handleSubmit called');
    e.preventDefault();
    if (value.trim()) {
      console.error('ChatInput: Submitting value:', value);
      onSubmit(e);
    } else {
      console.error('ChatInput: Empty value, not submitting');
    }
  };

  const handleFocus = () => {
    console.error('React onFocus event fired');
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    console.error('React onInput event fired with value:', e.currentTarget.value);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-gradient-to-t from-white via-white to-transparent pt-6">
          <div className="shadow-lg">
            <form onSubmit={handleSubmit} className="relative p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onInput={handleInput}
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
                <button
                  type="submit"
                  disabled={disabled || !value.trim()}
                  className={`rounded-xl px-5 py-2.5 transition-all duration-200 ${
                    disabled || !value.trim()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}