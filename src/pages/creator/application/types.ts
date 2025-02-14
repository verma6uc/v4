import { ConceptOption, Question } from '../../../utils/openai';

export type MessageType = 'system' | 'user';

export interface Message {
  type: MessageType;
  content: string;
  options?: ConceptOption[] | Question[];
  optionType?: 'concept' | 'question';
}

export type ApplicationStep = 
  | 'title' 
  | 'description' 
  | 'concept-selection' 
  | 'question-answering'
  | 'backlog-generation';

export interface ApplicationData {
  title: string;
  description: string;
  config: {
    theme: 'corporate' | 'modern' | 'minimal';
    timezone: string;
    securityPolicy: string;
  };
  selectedConcept?: string;
  answers?: Record<string, string>;
}