import React, { useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';

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

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '52px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(e);
    }
  };

  return (
    <div className="bg-white h-100 overflow-auto rounded-lg shadow-md w-100">
      <div className="rounded-lg">
        <div className="bg-gradient-to-t from-white pt-2 to-transparent via-white">
          <form onSubmit={handleSubmit} className="pb-4 px-6 relative">
            <div className="bg-white border-gray-200 duration-200 relative">
              <div className="flex items-end gap-2 p-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder="Message Yuvi..."
                    className="w-full resize-none bg-transparent outline-none focus:outline-none border-0 ring-0 focus:ring-0 pr-12 py-3 min-h-[52px] max-h-48 text-base placeholder-gray-400"
                    disabled={disabled}
                    rows={1}
                  />
                  <button
                    type="button"
                    className="absolute right-3 bottom-2.5 p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    title="Voice input (coming soon)"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={disabled || !value.trim()}
                  className={`rounded-xl px-5 py-3 transition-all duration-200 flex items-center gap-2 ${
                    disabled || !value.trim()
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}