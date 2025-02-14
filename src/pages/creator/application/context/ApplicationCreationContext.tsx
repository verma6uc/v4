import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, ApplicationData, ApplicationStep } from '../types';
import { Question, ConceptOption } from '../../../../utils/openai';

interface ApplicationCreationContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  applicationData: ApplicationData;
  setApplicationData: React.Dispatch<React.SetStateAction<ApplicationData>>;
  currentStep: ApplicationStep;
  setCurrentStep: React.Dispatch<React.SetStateAction<ApplicationStep>>;
  selectedConcept: ConceptOption | null;
  setSelectedConcept: React.Dispatch<React.SetStateAction<ConceptOption | null>>;
  allQuestionsAnswered: boolean;
  setAllQuestionsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  remainingQuestions: Question[];
  setRemainingQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const ApplicationCreationContext = createContext<ApplicationCreationContextType | undefined>(undefined);

export function ApplicationCreationProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    title: '',
    description: '',
    config: {
      theme: 'corporate',
      timezone: 'UTC',
      securityPolicy: 'standard'
    }
  });
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('title');
  const [selectedConcept, setSelectedConcept] = useState<ConceptOption | null>(null);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);

  return (
    <ApplicationCreationContext.Provider
      value={{
        messages,
        setMessages,
        applicationData,
        setApplicationData,
        currentStep,
        setCurrentStep,
        selectedConcept,
        setSelectedConcept,
        allQuestionsAnswered,
        setAllQuestionsAnswered,
        isProcessing,
        setIsProcessing,
        remainingQuestions,
        setRemainingQuestions
      }}
    >
      {children}
    </ApplicationCreationContext.Provider>
  );
}

export function useApplicationCreation() {
  const context = useContext(ApplicationCreationContext);
  if (context === undefined) {
    throw new Error('useApplicationCreation must be used within an ApplicationCreationProvider');
  }
  return context;
}