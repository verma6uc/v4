export interface UserStory {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: 'High' | 'Medium' | 'Low';
  complexity: 'Simple' | 'Medium' | 'Complex';
  epic: string;
  sprint?: number;
  status: 'Planned' | 'In Progress' | 'Done';
  dependencies?: string[];
  estimatedHours: number;
}

export interface Epic {
  id: string;
  name: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Planned' | 'In Progress' | 'Done';
}

export const mockEpics: Epic[] = [
  {
    id: 'EP-1',
    name: 'User Authentication & Management',
    description: 'Core user authentication and management features',
    priority: 'High',
    status: 'Planned'
  },
  {
    id: 'EP-2',
    name: 'Task Management',
    description: 'Core task creation and management features',
    priority: 'High',
    status: 'Planned'
  },
  {
    id: 'EP-3',
    name: 'Team Collaboration',
    description: 'Team collaboration and communication features',
    priority: 'High',
    status: 'Planned'
  },
  {
    id: 'EP-4',
    name: 'Project Management',
    description: 'Project organization and tracking features',
    priority: 'Medium',
    status: 'Planned'
  },
  {
    id: 'EP-5',
    name: 'Analytics & Reporting',
    description: 'Data analytics and reporting features',
    priority: 'Medium',
    status: 'Planned'
  }
];

export const mockUserStories: UserStory[] = [
  // User Authentication & Management Epic
  {
    id: 'US-1',
    title: 'User Registration',
    description: 'As a new user, I want to create an account so that I can access the application',
    acceptanceCriteria: [
      'User can register with email and password',
      'Email verification is required',
      'Password must meet security requirements',
      'User receives welcome email after registration'
    ],
    priority: 'High',
    complexity: 'Medium',
    epic: 'EP-1',
    sprint: 1,
    status: 'Planned',
    estimatedHours: 16
  },
  {
    id: 'US-2',
    title: 'User Login',
    description: 'As a registered user, I want to log in to access my account',
    acceptanceCriteria: [
      'User can login with email and password',
      'Forgot password functionality is available',
      'Remember me option is available',
      'User session management is implemented'
    ],
    priority: 'High',
    complexity: 'Medium',
    epic: 'EP-1',
    sprint: 1,
    status: 'Planned',
    dependencies: ['US-1'],
    estimatedHours: 12
  },

  // Task Management Epic
  {
    id: 'US-3',
    title: 'Create Task',
    description: 'As a user, I want to create new tasks with detailed information',
    acceptanceCriteria: [
      'User can create task with title and description',
      'Due date can be set',
      'Priority level can be assigned',
      'Task categories/tags can be added',
      'File attachments are supported'
    ],
    priority: 'High',
    complexity: 'Complex',
    epic: 'EP-2',
    sprint: 2,
    status: 'Planned',
    dependencies: ['US-2'],
    estimatedHours: 24
  },
  {
    id: 'US-4',
    title: 'Task Organization',
    description: 'As a user, I want to organize tasks into lists and categories',
    acceptanceCriteria: [
      'Tasks can be grouped into lists',
      'Lists can be organized into projects',
      'Drag and drop organization is supported',
      'Bulk actions are available for tasks'
    ],
    priority: 'High',
    complexity: 'Complex',
    epic: 'EP-2',
    sprint: 2,
    status: 'Planned',
    dependencies: ['US-3'],
    estimatedHours: 32
  },

  // Team Collaboration Epic
  {
    id: 'US-5',
    title: 'Task Assignment',
    description: 'As a team leader, I want to assign tasks to team members',
    acceptanceCriteria: [
      'Tasks can be assigned to one or multiple users',
      'Users receive notifications for task assignments',
      'Task reassignment is supported',
      'Assignment history is tracked'
    ],
    priority: 'High',
    complexity: 'Medium',
    epic: 'EP-3',
    sprint: 3,
    status: 'Planned',
    dependencies: ['US-3', 'US-4'],
    estimatedHours: 20
  },
  {
    id: 'US-6',
    title: 'Task Comments',
    description: 'As a team member, I want to comment on tasks to discuss details',
    acceptanceCriteria: [
      'Users can add comments to tasks',
      'File attachments in comments are supported',
      '@mentions are supported',
      'Comment notifications are sent',
      'Comments can be edited and deleted'
    ],
    priority: 'Medium',
    complexity: 'Medium',
    epic: 'EP-3',
    sprint: 3,
    status: 'Planned',
    dependencies: ['US-3'],
    estimatedHours: 16
  },

  // Project Management Epic
  {
    id: 'US-7',
    title: 'Project Creation',
    description: 'As a manager, I want to create and configure projects',
    acceptanceCriteria: [
      'Projects can be created with details',
      'Project settings can be configured',
      'Team members can be added',
      'Project templates are supported'
    ],
    priority: 'Medium',
    complexity: 'Complex',
    epic: 'EP-4',
    sprint: 4,
    status: 'Planned',
    estimatedHours: 40
  },
  {
    id: 'US-8',
    title: 'Project Dashboard',
    description: 'As a user, I want to see project overview and progress',
    acceptanceCriteria: [
      'Project progress is visualized',
      'Task statistics are displayed',
      'Team member activity is shown',
      'Project timeline is visible',
      'Resource allocation is displayed'
    ],
    priority: 'Medium',
    complexity: 'Complex',
    epic: 'EP-4',
    sprint: 4,
    status: 'Planned',
    dependencies: ['US-7'],
    estimatedHours: 40
  },

  // Analytics & Reporting Epic
  {
    id: 'US-9',
    title: 'Task Analytics',
    description: 'As a manager, I want to analyze task and project metrics',
    acceptanceCriteria: [
      'Task completion rates are tracked',
      'Time tracking analytics are available',
      'Team performance metrics are shown',
      'Custom reports can be generated',
      'Data can be exported'
    ],
    priority: 'Medium',
    complexity: 'Complex',
    epic: 'EP-5',
    sprint: 5,
    status: 'Planned',
    dependencies: ['US-3', 'US-4', 'US-7'],
    estimatedHours: 48
  },
  {
    id: 'US-10',
    title: 'Team Reports',
    description: 'As a manager, I want to generate team performance reports',
    acceptanceCriteria: [
      'Team productivity metrics are available',
      'Individual performance reports can be generated',
      'Workload distribution is analyzed',
      'Time tracking reports are available',
      'Report scheduling is supported'
    ],
    priority: 'Low',
    complexity: 'Complex',
    epic: 'EP-5',
    sprint: 5,
    status: 'Planned',
    dependencies: ['US-9'],
    estimatedHours: 40
  }
];

export function generateProductBacklog() {
  return {
    epics: mockEpics,
    userStories: mockUserStories,
    summary: {
      totalStories: mockUserStories.length,
      totalEstimatedHours: mockUserStories.reduce((sum, story) => sum + story.estimatedHours, 0),
      storiesByPriority: {
        High: mockUserStories.filter(story => story.priority === 'High').length,
        Medium: mockUserStories.filter(story => story.priority === 'Medium').length,
        Low: mockUserStories.filter(story => story.priority === 'Low').length
      },
      storiesByComplexity: {
        Simple: mockUserStories.filter(story => story.complexity === 'Simple').length,
        Medium: mockUserStories.filter(story => story.complexity === 'Medium').length,
        Complex: mockUserStories.filter(story => story.complexity === 'Complex').length
      }
    }
  };
}