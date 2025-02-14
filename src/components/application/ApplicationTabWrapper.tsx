import React from 'react';
import { FeedbackChatbox } from './feedback/FeedbackChatbox';

interface ApplicationTabWrapperProps {
  children: React.ReactNode;
  currentTab: 'Plan' | 'Product Backlog' | 'Prototype';
}

export function ApplicationTabWrapper({ children, currentTab }: ApplicationTabWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
      
      {/* Feedback Chatbox */}
      <FeedbackChatbox currentTab={currentTab} />
    </div>
  );
}