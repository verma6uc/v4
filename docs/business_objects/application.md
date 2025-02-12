# Application Business Object Specification

## 1. Overview
The Application object represents a business solution created and deployed within the platform. It encompasses the entire lifecycle from initial concept through creation, refinement, and deployment.

## 2. Core Attributes

### Basic Information
- **id**: UUID (Primary Key)
- **companyId**: UUID [Required] (Creating company)
- **title**: String [Required]
  - Validation: 3-100 characters
  - Used in: ACRE.CRT.US2
- **description**: String [Required]
  - Validation: Up to 2000 characters
  - Used in: ACRE.CRT.US2
- **status**: ApplicationStatus (Enum) [Required]
  - Values: DRAFT, IN_PROGRESS, READY_TO_DEPLOY, PUBLISHED
  - Used in: ACRE.CRT.US12

### Creation Phase Information
- **conceptOption**: {
  - id: UUID,
  - summary: String,
  - selectedAt: DateTime,
  - selectedBy: UUID
}
- Used in: ACRE.CRT.US4, ACRE.CRT.US5

### Business Analysis
- **productBacklog**: {
  - features: Array of Feature,
  - useCases: Array of UseCase,
  - userStories: Array of UserStory
}
- Used in: ACRE.CRT.US7

### Technical Design
- **blueprint**: {
  - version: String,
  - diagram: String,
  - states: Array of State,
  - actions: Array of Action,
  - lastModified: DateTime
}
- Used in: ACRE.CRT.US8

### Implementation Details
- **prototype**: {
  - version: String,
  - status: PrototypeStatus,
  - feedbackCount: Integer,
  - lastTested: DateTime
}
- Used in: ACRE.CRT.US10

### Deployment Information
- **currentVersion**: String
- **deployedSpaces**: Array of {
  - spaceId: UUID,
  - version: String,
  - deployedAt: DateTime,
  - status: DeploymentStatus
}
- Used in: SPA.DEP.US2

### System Fields
- **createdAt**: DateTime
- **createdBy**: UUID
- **updatedAt**: DateTime
- **updatedBy**: UUID
- **publishedAt**: DateTime
- **publishedBy**: UUID

## 3. State Machine

### States

1. **DRAFT**
   - Initial state during creation
   - Basic details captured
   - User Story: ACRE.CRT.US1, ACRE.CRT.US2

2. **IN_PROGRESS**
   - Active development state
   - Multiple sub-states possible
   - User Story: ACRE.CRT.US6 through ACRE.CRT.US11

3. **READY_TO_DEPLOY**
   - Development complete
   - Awaiting publication
   - User Story: ACRE.CRT.US12

4. **PUBLISHED**
   - Available in company store
   - Can be deployed to spaces
   - User Story: SPA.DEP.US1

### State Transitions

1. **DRAFT → IN_PROGRESS**
   - Trigger: Concept selection completed
   - Required: Valid concept option selected
   - User Story: ACRE.CRT.US5
   - Audit Log: "Application {title} moved to development"
   - Notifications:
     - To Creator: "Development phase started for {title}"

2. **IN_PROGRESS → READY_TO_DEPLOY**
   - Trigger: All development phases complete
   - Required: Prototype approved
   - User Story: ACRE.CRT.US11
   - Audit Log: "Application {title} ready for deployment"
   - Notifications:
     - To Creator: "Application {title} ready for deployment"
     - To Admins: "New application ready for review"

3. **READY_TO_DEPLOY → PUBLISHED**
   - Trigger: Creator publishes application
   - Required: All checks passed
   - User Story: ACRE.CRT.US12
   - Audit Log: "Application {title} published to store"
   - Notifications:
     - To Company: "New application {title} available"

4. **Any State → DRAFT**
   - Trigger: Creator reverts application
   - Required: Reversion reason
   - User Story: ACRE.CRT.US13
   - Audit Log: "Application {title} reverted to draft"
   - Notifications:
     - To Stakeholders: "Application {title} returned to draft"

## 4. Sub-Objects

### Feature
- **id**: UUID
- **name**: String
- **description**: String
- **priority**: Integer
- **status**: FeatureStatus
- **useCases**: Array of UUID

### UseCase
- **id**: UUID
- **featureId**: UUID
- **identifier**: String
- **name**: String
- **description**: String
- **userStories**: Array of UUID

### UserStory
- **id**: UUID
- **useCaseId**: UUID
- **identifier**: String
- **story**: String
- **acceptanceCriteria**: Array of String
- **priority**: Integer
- **status**: UserStoryStatus

## 5. Core Functions

### Creation Phase
1. **createApplication(details)**
   - Actor: Creator
   - User Story: ACRE.CRT.US1, ACRE.CRT.US2
   - Creates initial DRAFT application
   - Audit Log: "New application {title} created"

2. **selectConcept(applicationId, conceptId)**
   - Actor: Creator
   - User Story: ACRE.CRT.US5
   - Moves to IN_PROGRESS state
   - Audit Log: "Concept selected for {title}"

### Development Phase
1. **updateBacklog(applicationId, backlogItems)**
   - Actor: Creator
   - User Story: ACRE.CRT.US7
   - Manages product backlog
   - Audit Log: "Backlog updated for {title}"

2. **updateBlueprint(applicationId, blueprint)**
   - Actor: Creator
   - User Story: ACRE.CRT.US8
   - Updates technical design
   - Audit Log: "Blueprint updated for {title}"

### Deployment Phase
1. **publishApplication(applicationId)**
   - Actor: Creator
   - User Story: ACRE.CRT.US12
   - Makes application available
   - Audit Log: "Application {title} published"

2. **deployToSpace(applicationId, spaceId)**
   - Actor: Space Admin
   - User Story: SPA.DEP.US2
   - Deploys to specific space
   - Audit Log: "Application deployed to {spaceName}"

## 6. Access Control

### Creator Rights
- Full management during creation
- Blueprint modifications
- Publication control
- Version management

### Space Admin Rights
- View application details
- Deploy to owned spaces
- Manage space deployments
- View deployment history

## 7. Validation Rules

### Creation Phase
- Title uniqueness within company
- Required fields completion
- Concept selection validation
- User Story: ACRE.CRT.US2

### Development Phase
- Backlog item relationships
- Blueprint consistency
- Prototype requirements
- User Stories: ACRE.CRT.US7, ACRE.CRT.US8

### Deployment Phase
- Publication requirements
- Space compatibility
- Resource requirements
- User Story: SPA.DEP.US2

## 8. Integration Points

1. **Store System**
   - Publication updates
   - Availability status
   - Deployment tracking

2. **Space System**
   - Deployment management
   - Access control
   - Resource allocation

3. **User System**
   - Creator assignments
   - Role management
   - Permission validation