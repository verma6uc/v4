import { v4 as uuidv4 } from 'uuid';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Blocked' | 'Done';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type PhaseType = 
  | 'Requirements Analysis' 
  | 'Design' 
  | 'Development' 
  | 'Testing' 
  | 'Deployment';

export interface TaskAssignee {
  id: string;
  name: string;
  role: string;
}

export interface TaskDependency {
  taskId: string;
  type: 'Blocks' | 'Required By';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  phase: PhaseType;
  status: TaskStatus;
  priority: TaskPriority;
  startDate?: string;
  dueDate?: string;
  estimatedHours: number;
  actualHours?: number;
  assignee?: TaskAssignee;
  dependencies?: TaskDependency[];
  progress: number;
  notes?: string[];
  tags?: string[];
  userStoryId?: string;  // Reference to related user story if applicable
  featureId?: string;    // Reference to related feature
  useCaseId?: string;    // Reference to related use case
}

export interface Phase {
  id: string;
  type: PhaseType;
  name: string;
  description: string;
  order: number;
  startDate?: string;
  endDate?: string;
  tasks: Task[];
  status: 'Not Started' | 'In Progress' | 'Done';
  completionCriteria?: string[];
  deliverables?: string[];
}

export const mockPhases: Phase[] = [
  {
    id: uuidv4(),
    type: 'Requirements Analysis',
    name: 'Requirements Analysis',
    description: 'Analyze and document detailed requirements based on the product backlog',
    order: 1,
    startDate: '2025-02-13',
    endDate: '2025-02-20',
    status: 'In Progress',
    completionCriteria: [
      'All user stories reviewed and clarified',
      'Technical requirements documented',
      'Architecture approach defined'
    ],
    deliverables: [
      'Technical Requirements Document',
      'Architecture Overview',
      'Updated Product Backlog'
    ],
    tasks: [
      {
        id: uuidv4(),
        title: 'Review Product Backlog',
        description: 'Detailed review of all user stories and acceptance criteria',
        phase: 'Requirements Analysis',
        status: 'In Progress',
        priority: 'High',
        startDate: '2025-02-13',
        dueDate: '2025-02-15',
        estimatedHours: 8,
        actualHours: 4,
        progress: 50,
        assignee: {
          id: '1',
          name: 'John Smith',
          role: 'Business Analyst'
        },
        notes: [
          'Initial review completed',
          'Need clarification on authentication requirements'
        ],
        tags: ['documentation', 'analysis']
      },
      {
        id: uuidv4(),
        title: 'Create Technical Requirements Document',
        description: 'Document technical specifications and architecture requirements',
        phase: 'Requirements Analysis',
        status: 'Not Started',
        priority: 'High',
        startDate: '2025-02-15',
        dueDate: '2025-02-20',
        estimatedHours: 16,
        progress: 0,
        dependencies: [
          { taskId: '1', type: 'Required By' }
        ],
        assignee: {
          id: '2',
          name: 'Sarah Johnson',
          role: 'Technical Lead'
        },
        tags: ['documentation', 'technical']
      }
    ]
  },
  {
    id: uuidv4(),
    type: 'Design',
    name: 'Design',
    description: 'Create detailed technical and UI/UX designs',
    order: 2,
    startDate: '2025-02-20',
    endDate: '2025-02-27',
    status: 'Not Started',
    completionCriteria: [
      'Architecture design approved',
      'Database schema finalized',
      'UI/UX designs reviewed'
    ],
    deliverables: [
      'Architecture Design Document',
      'Database Schema',
      'UI/UX Design Mockups'
    ],
    tasks: [
      {
        id: uuidv4(),
        title: 'Create Architecture Design',
        description: 'Design system architecture including components and interactions',
        phase: 'Design',
        status: 'Not Started',
        priority: 'High',
        startDate: '2025-02-20',
        dueDate: '2025-02-23',
        estimatedHours: 24,
        progress: 0,
        assignee: {
          id: '2',
          name: 'Sarah Johnson',
          role: 'Technical Lead'
        },
        tags: ['architecture', 'technical']
      },
      {
        id: uuidv4(),
        title: 'Design Database Schema',
        description: 'Create detailed database schema and relationships',
        phase: 'Design',
        status: 'Not Started',
        priority: 'High',
        startDate: '2025-02-23',
        dueDate: '2025-02-25',
        estimatedHours: 16,
        progress: 0,
        assignee: {
          id: '3',
          name: 'Mike Chen',
          role: 'Database Engineer'
        },
        tags: ['database', 'technical']
      }
    ]
  },
  {
    id: uuidv4(),
    type: 'Development',
    name: 'Development',
    description: 'Implement the application features',
    order: 3,
    startDate: '2025-02-27',
    endDate: '2025-03-20',
    status: 'Not Started',
    completionCriteria: [
      'All features implemented',
      'Unit tests written',
      'Code review completed'
    ],
    deliverables: [
      'Source Code',
      'Unit Tests',
      'Technical Documentation'
    ],
    tasks: [
      {
        id: uuidv4(),
        title: 'Set Up Development Environment',
        description: 'Configure development environment and tools',
        phase: 'Development',
        status: 'Not Started',
        priority: 'High',
        startDate: '2025-02-27',
        dueDate: '2025-02-28',
        estimatedHours: 8,
        progress: 0,
        assignee: {
          id: '4',
          name: 'Alex Kim',
          role: 'DevOps Engineer'
        },
        tags: ['setup', 'infrastructure']
      },
      {
        id: uuidv4(),
        title: 'Implement Core Features',
        description: 'Develop core application features',
        phase: 'Development',
        status: 'Not Started',
        priority: 'High',
        startDate: '2025-02-28',
        dueDate: '2025-03-13',
        estimatedHours: 80,
        progress: 0,
        assignee: {
          id: '5',
          name: 'Emily Brown',
          role: 'Senior Developer'
        },
        tags: ['development', 'core']
      }
    ]
  },
  {
    id: uuidv4(),
    type: 'Testing',
    name: 'Testing',
    description: 'Test and validate the application',
    order: 4,
    startDate: '2025-03-20',
    endDate: '2025-03-27',
    status: 'Not Started',
    completionCriteria: [
      'All test cases executed',
      'Critical bugs fixed',
      'Performance requirements met'
    ],
    deliverables: [
      'Test Plan',
      'Test Results',
      'Bug Reports'
    ],
    tasks: [
      {
        id: uuidv4(),
        title: 'Create Test Plan',
        description: 'Develop comprehensive test plan and test cases',
        phase: 'Testing',
        status: 'Not Started',
        priority: 'High',
        startDate: '2025-03-20',
        dueDate: '2025-03-22',
        estimatedHours: 16,
        progress: 0,
        assignee: {
          id: '6',
          name: 'Lisa Wang',
          role: 'QA Lead'
        },
        tags: ['testing', 'documentation']
      },
      {
        id: uuidv4(),
        title: 'Execute Test Cases',
        description: 'Run test cases and document results',
        phase: 'Testing',
        status: 'Not Started',
        priority: 'High',
        startDate: '2025-03-22',
        dueDate: '2025-03-27',
        estimatedHours: 40,
        progress: 0,
        assignee: {
          id: '7',
          name: 'David Garcia',
          role: 'QA Engineer'
        },
        dependencies: [
          { taskId: '7', type: 'Required By' }
        ],
        tags: ['testing', 'execution']
      }
    ]
  }
];

export function generateProjectPlan() {
  const totalTasks = mockPhases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = mockPhases.reduce(
    (sum, phase) => sum + phase.tasks.filter(task => task.status === 'Done').length,
    0
  );
  const totalHours = mockPhases.reduce(
    (sum, phase) => sum + phase.tasks.reduce((phaseSum, task) => phaseSum + task.estimatedHours, 0),
    0
  );
  const actualHours = mockPhases.reduce(
    (sum, phase) => sum + phase.tasks.reduce((phaseSum, task) => phaseSum + (task.actualHours || 0), 0),
    0
  );

  return {
    phases: mockPhases,
    summary: {
      totalPhases: mockPhases.length,
      totalTasks,
      completedTasks,
      progress: Math.round((completedTasks / totalTasks) * 100),
      totalHours,
      actualHours,
      currentPhase: mockPhases.find(phase => phase.status === 'In Progress')?.name || 'Not Started'
    }
  };
}