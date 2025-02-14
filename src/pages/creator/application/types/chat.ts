import { ConceptOption, Question } from '../../../../utils/openai';
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

export type ChatStep = 'title' | 'description' | 'concept-selection' | 'question-answering';

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
}

// Default config for new applications
export const DEFAULT_CONFIG: ApplicationConfig = {
  theme: 'modern',
  timezone: 'UTC',
  securityPolicy: 'standard'
};

// Re-export the types to ensure we're using a single source
export type { ConceptOption, Question };