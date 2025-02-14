export interface UseCase {
  id: string;
  title: string;
  description: string;
  featureId: string;
}

export const mockUseCases: Record<string, UseCase[]> = {
  'f1': [
    {
      id: 'uc1',
      title: 'User Registration',
      description: 'Allow users to create new accounts with email verification',
      featureId: 'f1'
    },
    {
      id: 'uc2',
      title: 'Social Login Integration',
      description: 'Enable login with Google and GitHub accounts',
      featureId: 'f1'
    }
  ],
  'f2': [
    {
      id: 'uc3',
      title: 'Activity Overview',
      description: 'Display recent activities and key metrics in a dashboard view',
      featureId: 'f2'
    },
    {
      id: 'uc4',
      title: 'Custom Dashboard Widgets',
      description: 'Allow users to customize their dashboard layout and widgets',
      featureId: 'f2'
    }
  ],
  'f3': [
    {
      id: 'uc5',
      title: 'Data Visualization Configuration',
      description: 'Configure chart types and data sources for visualization',
      featureId: 'f3'
    },
    {
      id: 'uc6',
      title: 'Export Visualizations',
      description: 'Export charts and graphs in various formats',
      featureId: 'f3'
    }
  ],
  'f4': [
    {
      id: 'uc7',
      title: 'API Integration Setup',
      description: 'Configure and manage external API connections',
      featureId: 'f4'
    },
    {
      id: 'uc8',
      title: 'Data Synchronization',
      description: 'Sync data between integrated services automatically',
      featureId: 'f4'
    }
  ],
  'f5': [
    {
      id: 'uc9',
      title: 'Notification Preferences',
      description: 'Configure notification types and delivery methods',
      featureId: 'f5'
    },
    {
      id: 'uc10',
      title: 'Real-time Updates',
      description: 'Receive instant notifications for important events',
      featureId: 'f5'
    }
  ]
};