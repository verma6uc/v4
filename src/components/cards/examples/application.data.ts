export type ApplicationStatus = 
  | 'MEMORY' 
  | 'BLUEPRINT' 
  | 'VISUAL_PRD' 
  | 'DURING_DEVELOPMENT' 
  | 'UNDER_TESTED' 
  | 'DEVELOPMENT_COMPLETE';

export const exampleApplication = {
  id: '1',
  title: 'Customer Portal',
  description: 'Self-service portal for customer account management',
  status: 'DURING_DEVELOPMENT' as ApplicationStatus,
  currentVersion: '0.8.5',
  deployedSpaces: [
    { 
      id: '1', 
      name: 'Development',
      version: '0.8.5',
      deployedAt: '1 hour ago'
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

// Example applications in different states
export const memoryPhaseApp = {
  ...exampleApplication,
  id: '2',
  title: 'Inventory Manager',
  description: 'Real-time inventory tracking system',
  status: 'MEMORY' as ApplicationStatus,
  currentVersion: undefined,
  deployedSpaces: [],
  memory: {
    summary: 'Automated inventory tracking with real-time updates',
    createdAt: '2 days ago',
    notes: ['Real-time stock updates', 'Barcode scanning support']
  },
  blueprint: undefined,
  visualPRD: undefined,
  development: undefined,
  testing: undefined
};

export const blueprintPhaseApp = {
  ...exampleApplication,
  id: '3',
  title: 'Analytics Dashboard',
  description: 'Business intelligence and reporting platform',
  status: 'BLUEPRINT' as ApplicationStatus,
  currentVersion: undefined,
  deployedSpaces: [],
  blueprint: {
    version: '1.0',
    diagram: 'https://example.com/diagrams/analytics.svg',
    states: ['Overview', 'Reports', 'Settings'],
    actions: ['Generate Report', 'Export Data'],
    lastModified: '1 day ago',
    reviewStatus: 'In Review',
    reviewComments: []
  },
  visualPRD: undefined,
  development: undefined,
  testing: undefined
};

export const visualPRDPhaseApp = {
  ...exampleApplication,
  id: '4',
  title: 'Task Manager',
  description: 'Team collaboration and task tracking platform',
  status: 'VISUAL_PRD' as ApplicationStatus,
  currentVersion: undefined,
  deployedSpaces: [],
  visualPRD: {
    version: '1.0',
    mockups: ['Task Board', 'Calendar View', 'Team Dashboard'],
    userFlows: ['Create Task', 'Assign Task', 'Track Progress'],
    designSystem: {
      colors: ['#6366f1', '#10b981'],
      typography: 'Plus Jakarta Sans'
    },
    lastModified: '12 hours ago',
    reviewStatus: 'In Review'
  },
  development: undefined,
  testing: undefined
};

export const developmentPhaseApp = {
  ...exampleApplication,
  id: '5',
  title: 'Email Campaign Manager',
  description: 'Email marketing automation platform',
  status: 'DURING_DEVELOPMENT' as ApplicationStatus,
  currentVersion: '0.5.0',
  development: {
    startedAt: '2 weeks ago',
    currentPhase: 'Backend Implementation',
    completedModules: 4,
    totalModules: 10,
    technicalDebt: []
  },
  testing: undefined
};

export const testingPhaseApp = {
  ...exampleApplication,
  id: '6',
  title: 'Document Manager',
  description: 'Enterprise document organization system',
  status: 'UNDER_TESTED' as ApplicationStatus,
  currentVersion: '0.9.0',
  development: {
    startedAt: '1 month ago',
    currentPhase: 'Testing',
    completedModules: 15,
    totalModules: 15,
    technicalDebt: []
  },
  testing: {
    startedAt: '3 days ago',
    testCases: 87,
    bugs: 5,
    testCoverage: 92,
    lastTestRun: '1 hour ago'
  }
};

export const completedApp = {
  ...exampleApplication,
  id: '7',
  title: 'HR Management System',
  description: 'Complete HR and employee management solution',
  status: 'DEVELOPMENT_COMPLETE' as ApplicationStatus,
  currentVersion: '1.0.0',
  deployedSpaces: [
    { 
      id: '1', 
      name: 'Production',
      version: '1.0.0',
      deployedAt: '1 hour ago'
    },
    { 
      id: '2', 
      name: 'Staging',
      version: '1.0.0',
      deployedAt: '1 day ago'
    }
  ],
  development: {
    startedAt: '2 months ago',
    currentPhase: 'Completed',
    completedModules: 20,
    totalModules: 20,
    technicalDebt: []
  },
  testing: {
    startedAt: '2 weeks ago',
    testCases: 150,
    bugs: 0,
    testCoverage: 95,
    lastTestRun: '6 hours ago'
  }
};