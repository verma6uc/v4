import { ConceptOption, Question } from '../../utils/openai';

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateConcepts(title: string, description: string): Promise<ConceptOption[]> {
  console.log('Mock service: generateConcepts called with:', { title, description });
  
  return [
    {
      id: 'task-management-pro',
      title: 'Task Management Pro',
      description: `A comprehensive task management solution designed specifically for modern teams who need to organize, track, and complete their work efficiently. This platform focuses on making task management intuitive and effective, with features that help teams stay organized and productive.

The system adapts to different team sizes and work styles, whether you're a small startup or a large enterprise. It emphasizes clear communication and progress tracking, ensuring everyone knows what they need to do and when they need to do it.

What makes this concept unique is its focus on user experience and team collaboration, making task management feel natural and effortless rather than a chore.`,
      features: [
        'Smart task prioritization with AI-powered suggestions',
        'Real-time team collaboration with instant updates',
        'Comprehensive progress tracking with visual analytics'
      ],
      purpose: 'Help teams of all sizes manage their work more effectively while maintaining clear communication and accountability',
      useCase: 'A marketing team using the platform to coordinate their campaign tasks, track deadlines, and ensure all team members are aligned on priorities and progress'
    },
    {
      id: 'project-hub',
      title: 'Project Hub',
      description: `A centralized project management platform that brings together all aspects of project work in one cohesive space. This solution is built for teams that need more than just task management - they need a complete project ecosystem.

The platform excels at providing clear visibility into project progress, resource allocation, and team collaboration. It's designed to eliminate the chaos of managing multiple tools by providing everything teams need in one place.

What sets this concept apart is its holistic approach to project management, treating each project as a living ecosystem rather than just a collection of tasks.`,
      features: [
        'Interactive project timelines with dependency mapping',
        'Resource management with workload balancing',
        'Document collaboration with version control'
      ],
      purpose: 'Provide teams with a unified platform for managing all aspects of their projects, from planning to execution',
      useCase: 'A software development team using the platform to manage their entire development lifecycle, from sprint planning to release management'
    }
  ];
}

export async function generateResponse(
  messages: ChatMessage[],
  context?: string
): Promise<string> {
  console.log('Mock service: generateResponse called with:', { messages, context });
  
  const userMessage = messages[messages.length - 1]?.content || '';
  
  if (userMessage.includes('TaskMaster')) {
    return "That's a great name! TaskMaster suggests a powerful and efficient task management system. I can see this being very useful for teams who need to stay organized and productive. Could you tell me more about what specific problems you want this application to solve? For example, are you focusing on personal task management, team collaboration, or project management?";
  }
  
  if (userMessage.includes('task') || userMessage.includes('management')) {
    return "I understand you're looking to create a task management solution. To help shape this better, could you tell me more about your target users? Are you thinking about individuals managing personal tasks, small teams coordinating work, or large organizations handling complex projects?";
  }

  if (context?.includes('all_questions_answered')) {
    return `Great! Based on your responses, I'm now generating a comprehensive product backlog that will help guide the development of your application. This will include:

• Core features and functionality
• User roles and permissions
• Key workflows and processes
• Integration requirements

Please wait while I prepare the detailed backlog...`;
  }
  
  return "Thanks for sharing that. To help me understand your vision better, could you tell me about the main problem you're trying to solve? What frustrations or challenges do your target users face that this application will address?";
}

let currentQuestionIndex = 0;
const questions = [
  {
    id: 'user-roles',
    question: 'What type of user roles do you need?',
    options: [
      {
        id: 'basic-roles',
        text: 'Just Admin and Regular Users'
      },
      {
        id: 'team-roles',
        text: 'Team-based roles (Admin, Team Lead, Member)'
      },
      {
        id: 'custom-roles',
        text: 'Custom roles with permissions'
      }
    ]
  },
  {
    id: 'task-organization',
    question: 'How would you like to organize tasks?',
    options: [
      {
        id: 'lists',
        text: 'Simple lists with categories'
      },
      {
        id: 'boards',
        text: 'Kanban boards'
      },
      {
        id: 'projects',
        text: 'Project-based hierarchy'
      }
    ]
  },
  {
    id: 'notifications',
    question: 'What type of notifications would be most helpful?',
    options: [
      {
        id: 'basic-notifications',
        text: 'Email notifications for important updates'
      },
      {
        id: 'real-time',
        text: 'Real-time in-app notifications'
      },
      {
        id: 'custom-alerts',
        text: 'Customizable notification preferences'
      }
    ]
  }
];

export async function generateFollowUpQuestions(
  concept: ConceptOption
): Promise<Question[]> {
  console.log('Mock service: generateFollowUpQuestions called with concept:', concept);
  
  // Return only one question at a time
  const question = questions[currentQuestionIndex];
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
  
  return [question];
}