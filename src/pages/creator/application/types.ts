import { ConceptOption, Question } from '../../../utils/openai';
import { ReactNode } from 'react';

export type MessageType = 'user' | 'system';

export interface MessageOption {
  id: string;
  [key: string]: any;
}

export type MessageOptionType = ConceptOption | Question | MessageOption;

export interface Message {
  type: MessageType;
  content: string | ReactNode;
  options?: (ConceptOption | Question)[];
  optionType?: 'concept' | 'question';
}

export interface MessageHandlers {
  onConceptSelect: (conceptId: string) => void;
  onQuestionAnswer: (questionId: string, selectedOptionIds: string[]) => void;
}

// Steps in the chat flow
export type ApplicationStep = 'title' | 'description' | 'concept-selection' | 'question-answering';

// Application lifecycle stages
export type ApplicationStatus = 
  | 'MEMORY'
  | 'BLUEPRINT'
  | 'VISUAL_PRD'
  | 'DURING_DEVELOPMENT'
  | 'UNDER_TESTED'
  | 'DEVELOPMENT_COMPLETE';

export type ThemeType = 'corporate' | 'modern' | 'minimal';

export interface ApplicationConfig {
  theme: ThemeType;
  timezone: string;
  securityPolicy: string;
}

export interface ApplicationData {
  id?: string;
  title: string;
  description: string;
  answers?: Record<string, string[]>;
  selectedConcept?: ConceptOption;
  config: ApplicationConfig;
  status?: ApplicationStatus;
}

// Default config for new applications
export const DEFAULT_CONFIG: ApplicationConfig = {
  theme: 'corporate',
  timezone: 'UTC',
  securityPolicy: 'standard'
};

// Re-export types to ensure consistency
export type { ConceptOption, Question };