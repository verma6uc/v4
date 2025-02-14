import { v4 as uuidv4 } from 'uuid';

export interface UserStory {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: 'High' | 'Medium' | 'Low';
  complexity: 'Simple' | 'Medium' | 'Complex';
  status: 'Planned' | 'In Progress' | 'Done';
  estimatedHours: number;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  userStories: UserStory[];
  status: 'Planned' | 'In Progress' | 'Done';
}

export interface Feature {
  id: string;
  code: string;  // e.g., "USPM" for User Profile Management
  name: string;
  description: string;
  useCases: UseCase[];
  priority: 'High' | 'Medium' | 'Low';
  status: 'Planned' | 'In Progress' | 'Done';
}

export const mockFeatures: Feature[] = [
  {
    id: uuidv4(),
    code: 'USPM',
    name: 'User Profile Management',
    description: 'Core user profile and authentication features',
    priority: 'High',
    status: 'Planned',
    useCases: [
      {
        id: uuidv4(),
        title: 'User Registration',
        description: 'Allow users to create new accounts',
        status: 'Planned',
        userStories: [
          {
            id: uuidv4(),
            title: 'Email Registration',
            description: 'As a new user, I want to register with my email',
            acceptanceCriteria: [
              'User can enter email and password',
              'Password must meet security requirements',
              'Email verification is required',
              'Welcome email is sent'
            ],
            priority: 'High',
            complexity: 'Medium',
            status: 'Planned',
            estimatedHours: 8
          },
          {
            id: uuidv4(),
            title: 'Social Login',
            description: 'As a user, I want to register using social accounts',
            acceptanceCriteria: [
              'Support Google login',
              'Support GitHub login',
              'Link social account to email'
            ],
            priority: 'Medium',
            complexity: 'Complex',
            status: 'Planned',
            estimatedHours: 16
          }
        ]
      },
      {
        id: uuidv4(),
        title: 'Profile Management',
        description: 'Allow users to manage their profiles',
        status: 'Planned',
        userStories: [
          {
            id: uuidv4(),
            title: 'Edit Profile',
            description: 'As a user, I want to edit my profile information',
            acceptanceCriteria: [
              'Can update name',
              'Can update avatar',
              'Can update contact info',
              'Changes are saved immediately'
            ],
            priority: 'High',
            complexity: 'Simple',
            status: 'Planned',
            estimatedHours: 6
          }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    code: 'COMM',
    name: 'Communication',
    description: 'Team communication and collaboration features',
    priority: 'High',
    status: 'Planned',
    useCases: [
      {
        id: uuidv4(),
        title: 'Team Chat',
        description: 'Enable team members to chat in real-time',
        status: 'Planned',
        userStories: [
          {
            id: uuidv4(),
            title: 'Direct Messages',
            description: 'As a user, I want to send direct messages to team members',
            acceptanceCriteria: [
              'Can send text messages',
              'Can share files',
              'Real-time delivery',
              'Read receipts'
            ],
            priority: 'High',
            complexity: 'Complex',
            status: 'Planned',
            estimatedHours: 20
          }
        ]
      }
    ]
  }
];

export function generateProductBacklog() {
  const totalStories = mockFeatures.reduce(
    (total, feature) => total + feature.useCases.reduce(
      (useCaseTotal, useCase) => useCaseTotal + useCase.userStories.length, 
      0
    ),
    0
  );

  const allStories = mockFeatures.flatMap(
    feature => feature.useCases.flatMap(
      useCase => useCase.userStories
    )
  );

  return {
    features: mockFeatures,
    summary: {
      totalFeatures: mockFeatures.length,
      totalUseCases: mockFeatures.reduce((total, feature) => total + feature.useCases.length, 0),
      totalStories,
      totalEstimatedHours: allStories.reduce((sum, story) => sum + story.estimatedHours, 0),
      storiesByPriority: {
        High: allStories.filter(story => story.priority === 'High').length,
        Medium: allStories.filter(story => story.priority === 'Medium').length,
        Low: allStories.filter(story => story.priority === 'Low').length
      },
      storiesByComplexity: {
        Simple: allStories.filter(story => story.complexity === 'Simple').length,
        Medium: allStories.filter(story => story.complexity === 'Medium').length,
        Complex: allStories.filter(story => story.complexity === 'Complex').length
      }
    }
  };
}