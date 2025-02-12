export const exampleApplication = {
  id: '1',
  title: 'Customer Portal',
  description: 'Self-service portal for customer account management',
  status: 'IN_PROGRESS' as const,
  currentVersion: '0.8.5',
  deployedSpaces: [
    { 
      id: '1', 
      name: 'Development',
      version: '0.8.5',
      deployedAt: '1 hour ago'
    },
    { 
      id: '2', 
      name: 'Staging',
      version: '0.8.4',
      deployedAt: '1 day ago'
    }
  ],
  concept: {
    summary: 'Modern portal with enhanced self-service capabilities',
    selectedAt: '2 months ago'
  },
  backlog: {
    featuresCount: 24,
    useCasesCount: 45,
    userStoriesCount: 128
  },
  blueprint: {
    version: '2.1',
    lastModified: '5 days ago'
  },
  createdAt: '3 months ago',
  updatedAt: '2 hours ago'
};