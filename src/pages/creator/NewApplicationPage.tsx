import React from 'react';
import { ApplicationCreationProvider } from './application/context/ApplicationCreationContext';
import { ChatInterface } from './application/components/ChatInterface';
import { StepHandler } from './application/components/StepHandler';

export function NewApplicationPage() {
  return (
    <ApplicationCreationProvider>
      <div className="h-screen">
        <StepHandler />
        <ChatInterface />
      </div>
    </ApplicationCreationProvider>
  );
}