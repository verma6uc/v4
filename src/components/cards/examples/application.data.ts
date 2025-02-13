export const exampleApplication = {
  id: '1',
  title: 'Customer Portal',
  description: 'Self-service portal for customer account management',
  status: 'DURING_DEVELOPMENT' as const,
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
  memory: {
    summary: 'Modern portal with enhanced self-service capabilities',
    createdAt: '2 months ago',
    notes: ['Focus on user experience', 'Real-time updates']
  },
  blueprint: {
    version: '2.1',
    diagram: 'https://example.com/diagrams/portal.svg',
    states: ['Login', 'Dashboard', 'Profile'],
    actions: ['Update Profile', 'View Reports'],
    lastModified: '5 days ago',
    reviewStatus: 'Approved',
    reviewComments: []
  },
  visualPRD: {
    version: '1.0',
    mockups: ['Dashboard', 'Profile', 'Settings'],
    userFlows: ['Login Flow', 'Update Profile Flow'],
    designSystem: {
      colors: ['#1a73e8', '#34a853'],
      typography: 'Inter'
    },
    lastModified: '4 days ago',
    reviewStatus: 'Approved'
  },
  development: {
    startedAt: '1 month ago',
    currentPhase: 'Frontend Implementation',
    completedModules: 8,
    totalModules: 12,
    technicalDebt: []
  },
  testing: {
    startedAt: '1 week ago',
    testCases: 45,
    bugs: 3,
    testCoverage: 78,
    lastTestRun: '2 hours ago'
  },
  createdAt: '3 months ago',
  updatedAt: '2 hours ago'
};

export type ApplicationStatus = 
  | 'MEMORY' 
  | 'BLUEPRINT' 
  | 'VISUAL_PRD' 
  | 'DURING_DEVELOPMENT' 
  | 'UNDER_TESTED' 
  | 'DEVELOPMENT_COMPLETE';