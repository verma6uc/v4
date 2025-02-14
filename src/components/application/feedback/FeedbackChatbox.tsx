import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface FeedbackChatboxProps {
  currentTab: string;
}

export function FeedbackChatbox({ currentTab }: FeedbackChatboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    timestamp: string;
    type: 'sent' | 'received';
  }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toISOString(),
      type: 'sent' as const
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate response
    setTimeout(() => {
      const response = {
        id: Date.now(),
        text: `Thank you for your feedback on the ${currentTab}. We'll review it and get back to you soon.`,
        timestamp: new Date().toISOString(),
        type: 'received' as const
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold">Feedback</h3>
          <p className="text-sm text-gray-500">Share your thoughts on {currentTab}</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 h-96 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.type === 'sent'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.type === 'sent' ? 'text-indigo-200' : 'text-gray-500'
              }`}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your feedback..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}