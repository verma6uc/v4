export interface Feature {
  id: string;
  title: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
  selectedUseCases?: string[]; // IDs of selected use cases
}

export interface FeatureWithUseCases extends Feature {
  selectedUseCases: string[]; // Required in this interface
}

export interface FeatureResponse {
  status: 'success' | 'error';
  features: Feature[];
  message?: string;
}