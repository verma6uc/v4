import { ApplicationData } from '../../pages/creator/application/types';

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  assignee?: string;
  dueDate?: string;
  estimatedHours?: number;
  dependencies?: string[];
  tags: string[];
}

export interface ProjectPhase {
  id: string;
  title: string;
  description: string;
  tasks: ProjectTask[];
  startDate?: string;
  endDate?: string;
  status: 'planned' | 'in-progress' | 'completed';
}

export interface ProjectPlan {
  phases: ProjectPhase[];
  totalEstimatedHours: number;
  recommendedTeamSize: number;
  estimatedDuration: string;
  keyMilestones: string[];
  risks: Array<{
    description: string;
    severity: 'high' | 'medium' | 'low';
    mitigation: string;
  }>;
}

function generateMockTasks(phase: string): ProjectTask[] {
  switch (phase) {
    case 'setup':
      return [
        {
          id: 'task-1',
          title: 'Project Setup',
          description: 'Initialize project repository and set up development environment',
          priority: 'high',
          status: 'todo',
          estimatedHours: 4,
          tags: ['setup', 'infrastructure']
        },
        {
          id: 'task-2',
          title: 'Configure CI/CD',
          description: 'Set up continuous integration and deployment pipelines',
          priority: 'high',
          status: 'todo',
          estimatedHours: 8,
          dependencies: ['task-1'],
          tags: ['devops', 'infrastructure']
        }
      ];
    case 'development':
      return [
        {
          id: 'task-3',
          title: 'Core Features Implementation',
          description: 'Develop core application features',
          priority: 'high',
          status: 'todo',
          estimatedHours: 40,
          dependencies: ['task-2'],
          tags: ['development', 'core']
        },
        {
          id: 'task-4',
          title: 'User Authentication',
          description: 'Implement user authentication and authorization',
          priority: 'high',
          status: 'todo',
          estimatedHours: 16,
          dependencies: ['task-3'],
          tags: ['security', 'users']
        }
      ];
    case 'testing':
      return [
        {
          id: 'task-5',
          title: 'Unit Testing',
          description: 'Write and execute unit tests for all components',
          priority: 'medium',
          status: 'todo',
          estimatedHours: 20,
          dependencies: ['task-3', 'task-4'],
          tags: ['testing', 'quality']
        },
        {
          id: 'task-6',
          title: 'Integration Testing',
          description: 'Perform integration testing across all modules',
          priority: 'medium',
          status: 'todo',
          estimatedHours: 24,
          dependencies: ['task-5'],
          tags: ['testing', 'quality']
        }
      ];
    default:
      return [];
  }
}

export function generateProjectPlan(applicationData: ApplicationData): ProjectPlan {
  const phases: ProjectPhase[] = [
    {
      id: 'phase-1',
      title: 'Project Setup and Planning',
      description: 'Initial project setup and infrastructure configuration',
      tasks: generateMockTasks('setup'),
      status: 'planned'
    },
    {
      id: 'phase-2',
      title: 'Core Development',
      description: 'Implementation of core features and functionality',
      tasks: generateMockTasks('development'),
      status: 'planned'
    },
    {
      id: 'phase-3',
      title: 'Testing and Quality Assurance',
      description: 'Comprehensive testing and quality assurance',
      tasks: generateMockTasks('testing'),
      status: 'planned'
    }
  ];

  const totalEstimatedHours = phases.reduce(
    (total, phase) =>
      total +
      phase.tasks.reduce((phaseTotal, task) => phaseTotal + (task.estimatedHours || 0), 0),
    0
  );

  return {
    phases,
    totalEstimatedHours,
    recommendedTeamSize: 4,
    estimatedDuration: '3 months',
    keyMilestones: [
      'Project Setup Complete',
      'Core Features Implemented',
      'Testing Complete',
      'Initial Release'
    ],
    risks: [
      {
        description: 'Technical Complexity',
        severity: 'medium',
        mitigation: 'Regular technical reviews and architecture validation'
      },
      {
        description: 'Resource Availability',
        severity: 'low',
        mitigation: 'Early resource planning and backup resource identification'
      },
      {
        description: 'Integration Challenges',
        severity: 'medium',
        mitigation: 'Comprehensive integration testing and documentation'
      }
    ]
  };
}