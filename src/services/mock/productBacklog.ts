import { v4 as uuidv4 } from 'uuid';

export interface UserStory {
  id: string;
  identifier: string;  // e.g., "CPOV.CADI.US1"
  uniquenessCheck: number;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: 'High' | 'Medium' | 'Low';
  complexity: 'Simple' | 'Medium' | 'Complex';
  status: 'Planned' | 'In Progress' | 'Done';
  sprint?: number;
  dependencies?: string[];
  estimatedHours: number;
  lastModified: string;
  reviewStatus: 'Pending' | 'In Review' | 'Approved' | 'Changes Requested';
  assignedTo?: string;
  tags?: string[];
  useCaseId: string;  // Reference to parent use case
}

export interface UseCase {
  id: string;
  identifier: string;  // e.g., "CPOV.COCR"
  uniquenessCheck: number;
  title: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Done';
  reviewStatus: 'Pending' | 'In Review' | 'Approved' | 'Changes Requested';
  lastModified: string;
  dependencies?: string[];
  userStories: UserStory[];
  owner?: string;
  version?: string;
  featureId: string;  // Reference to parent feature
}

export interface Feature {
  id: string;
  identifier: string;  // e.g., "CPOV"
  uniquenessCheck: number;
  name: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Planned' | 'In Progress' | 'Done';
  version: string;
  lastModified: string;
  reviewStatus: 'Pending' | 'In Review' | 'Approved' | 'Changes Requested';
  useCases: UseCase[];
  owner?: string;
  tags?: string[];
}

export const mockFeatures: Feature[] = [
  {
    id: uuidv4(),
    identifier: 'CPOV',
    uniquenessCheck: 3,
    name: 'Company Provisioning',
    description: 'This feature enables the YuVi platform (Leucine) to onboard new companies onto the platform. Through this feature, Super Admins can create new company instances and establish their initial administrative access. The process begins with creating a company record with basic identification information. Following this, a Company Admin account is created and invited to access the platform. The feature handles the secure invitation process, allowing the Company Admin to set up their credentials and verify their access. This feature is critical as it establishes the foundation for a company\'s presence on the platform. It ensures secure initial access while maintaining proper isolation between different companies on the platform. The feature focuses solely on getting a company established and their admin activated, after which the Company Admin can begin configuring their organizational structure and other settings.',
    priority: 'High',
    status: 'Planned',
    version: '1.0.0',
    lastModified: new Date().toISOString(),
    reviewStatus: 'Pending',
    useCases: [
      {
        id: uuidv4(),
        identifier: 'CPOV.CADI',
        uniquenessCheck: 1,
        title: 'Company Admin Invitation',
        description: 'This use case handles the Company Admin\'s first interaction with the platform through the invitation link. It manages the secure process of setting up the admin account credentials and validating the admin\'s email address.',
        status: 'Planned',
        reviewStatus: 'Pending',
        lastModified: new Date().toISOString(),
        featureId: 'CPOV',
        userStories: [
          {
            id: uuidv4(),
            identifier: 'CPOV.CADI.US1',
            uniquenessCheck: 1,
            title: 'Super Admin creates Company Admin Account for a company',
            description: 'For a selected company the Superadmin specifies the email address and name for the designated CompanyAdmin. The system verifies the email is not associated with any existing account across companies. Upon validation, the system creates an admin account record and associates it with the company. The system assigns CompanyAdmin permissions to this account, making it the primary administrator for the company.',
            acceptanceCriteria: [
              'Email uniqueness verification',
              'Account creation with proper association',
              'CompanyAdmin permissions assignment'
            ],
            priority: 'High',
            complexity: 'Medium',
            status: 'Planned',
            sprint: 1,
            estimatedHours: 8,
            lastModified: new Date().toISOString(),
            reviewStatus: 'Pending',
            useCaseId: 'CPOV.CADI'
          },
          {
            id: uuidv4(),
            identifier: 'CPOV.CADI.US2',
            uniquenessCheck: 1,
            title: 'System sends Admin Invitation Email',
            description: 'The system generates a secure, time-limited invitation link for the CompanyAdmin account. Using the provided email address, the system sends an invitation email containing this link along with initial access instructions. This invitation allows the CompanyAdmin to set up their credentials and access the system for the first time.',
            acceptanceCriteria: [
              'Secure invitation link generation',
              'Email delivery with instructions',
              'Time-limited access'
            ],
            priority: 'High',
            complexity: 'Medium',
            status: 'Planned',
            sprint: 1,
            estimatedHours: 6,
            lastModified: new Date().toISOString(),
            reviewStatus: 'Pending',
            useCaseId: 'CPOV.CADI'
          },
          {
            id: uuidv4(),
            identifier: 'CPOV.CADI.US4',
            uniquenessCheck: 1,
            title: 'Super Admin resends Admin Invitation',
            description: 'The Superadmin selects the unactivated company admin account and triggers a new invitation. The system invalidates any previously sent invitation links for security. The system then generates a new secure invitation link with a fresh expiration period. Using the Company Admin\'s email address, the system sends a new invitation email containing this link. The system records this resend action in the audit log, tracking both the timestamp and the Superadmin who initiated it.',
            acceptanceCriteria: [
              'Previous invitation invalidation',
              'New secure link generation',
              'Email resend',
              'Audit log entry'
            ],
            priority: 'Medium',
            complexity: 'Simple',
            status: 'Planned',
            sprint: 1,
            estimatedHours: 4,
            lastModified: new Date().toISOString(),
            reviewStatus: 'Pending',
            useCaseId: 'CPOV.CADI'
          },
          {
            id: uuidv4(),
            identifier: 'CPOV.CADI.US5',
            uniquenessCheck: 1,
            title: 'Superadmin cancels Admin Activation',
            description: 'The Superadmin selects the unactivated admin account and initiates cancellation. The system immediately invalidates any existing invitation links sent to this admin. The system reverts the admin account to an inactive state, removing any association with the company while preserving the company record itself. The system adds this cancellation to the audit log. This allows the Superadmin to assign a different admin to the company through a new admin account creation.',
            acceptanceCriteria: [
              'Invitation link invalidation',
              'Account state reversion',
              'Company record preservation',
              'Audit logging'
            ],
            priority: 'Medium',
            complexity: 'Medium',
            status: 'Planned',
            sprint: 1,
            estimatedHours: 6,
            lastModified: new Date().toISOString(),
            reviewStatus: 'Pending',
            useCaseId: 'CPOV.CADI'
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