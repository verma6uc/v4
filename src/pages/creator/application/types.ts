export type MessageType = 'system' | 'user';

export interface Message {
  type: MessageType;
  content: string;
  options?: ConceptOption[];
}

export interface ConceptOption {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export type ApplicationStep = 'title' | 'description' | 'concept-selection';

export interface ApplicationData {
  title: string;
  description: string;
  config: {
    theme: 'corporate' | 'modern' | 'minimal';
    timezone: string;
    securityPolicy: string;
  };
  selectedConcept?: string;
}