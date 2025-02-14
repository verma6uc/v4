import React, { useEffect } from 'react';
import { useApplicationCreation } from '../context/ApplicationCreationContext';
import { Message } from '../types';

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

export function StepHandler() {
  const {
    setMessages,
    currentStep,
    applicationData,
    allQuestionsAnswered
  } = useApplicationCreation();

  // Initialize messages when component mounts
  useEffect(() => {
    setMessages(INITIAL_MESSAGES);
  }, [setMessages]);

  // Log step changes for debugging
  useEffect(() => {
    console.log('Current step:', currentStep);
    console.log('Application data:', applicationData);
  }, [currentStep, applicationData]);

  // Render nothing - this component only handles logic
  return null;
}