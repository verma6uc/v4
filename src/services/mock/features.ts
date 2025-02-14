export interface Feature {
  id: string;
  title: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
}

export interface FeatureResponse {
  status: 'success' | 'error';
  features: Feature[];
  message?: string;
}