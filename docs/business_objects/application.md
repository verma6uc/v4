# Application Business Object Specification

## 1. Overview
The **Application** object represents a digital product created by a Creator within our platform. It captures every phase of the product’s lifecycle—from the initial concept through creation, refinement, and finally deployment. Notably, only the Creator (or an entity with equivalent privileges) can modify the details of an Application. Other roles, such as Company Admins or SpaceAdmins, are limited to deploying the Application into designated Spaces, without altering its core data.

## 2. Core Attributes

### Basic Information
- **id**: UUID (Primary Key)  
  *Example:* `"a12e4567-e89b-12d3-a456-426614178900"`

- **companyId**: UUID [Required]  
  *(Identifies the Company that owns the Application)*

- **title**: String [Required]  
  - **Validation:** 3–100 characters  
  - **Usage:** Provided by the Creator during application creation.  
  *Example:* `"Customer Relationship Manager"`

- **description**: String [Required]  
  - **Validation:** Up to 2000 characters  
  - **Usage:** A detailed narrative of the Application’s vision and core functionality.  
  *Example:* `"A CRM solution designed to enhance customer engagement and streamline sales processes."`

- **status**: ApplicationStatus (Enum) [Required]  
  - **Possible Values:**  
    - `MEMORY` – Ideation phase  
    - `BLUEPRINT` – Technical design phase  
    - `VISUAL_PRD` – Visual design and UX review  
    - `DURING_DEVELOPMENT` – Active development phase  
    - `UNDER_TESTED` – Testing and QA phase  
    - `DEVELOPMENT_COMPLETE` – Ready for deployment  
  - **Usage:** Reflects the current lifecycle stage.  
  *Example:* `"MEMORY"`

### Phase-Specific Information
- **memory**: Object  
  - **Attributes:**  
    - **id**: UUID  
    - **summary**: String  
    - **createdAt**: DateTime  
    - **createdBy**: UUID  
    - **notes**: Array of Strings  
  - **Usage:** Captures initial concepts and requirements (e.g., ACRE.CRT.US4).

- **blueprint**: Object  
  - **Attributes:**  
    - **version**: String  
    - **diagram**: String (e.g., URL to SVG)  
    - **states**: Array of State  
    - **actions**: Array of Action  
    - **lastModified**: DateTime  
    - **reviewStatus**: String  
    - **reviewComments**: Array of Strings  
  - **Usage:** Documents technical architecture and state transitions (e.g., ACRE.CRT.US8).

- **visualPRD**: Object  
  - **Attributes:**  
    - **version**: String  
    - **mockups**: Array of Strings  
    - **userFlows**: Array of Flow  
    - **designSystem**: Object  
    - **lastModified**: DateTime  
    - **reviewStatus**: String  
  - **Usage:** Contains high-fidelity design and UX details (e.g., ACRE.CRT.US9).

- **development**: Object  
  - **Attributes:**  
    - **startedAt**: DateTime  
    - **currentPhase**: String  
    - **completedModules**: Array of Strings  
    - **pendingModules**: Array of Strings  
    - **technicalDebt**: Array of Strings  
  - **Usage:** Tracks progress during code implementation (e.g., ACRE.CRT.US10).

- **testing**: Object  
  - **Attributes:**  
    - **startedAt**: DateTime  
    - **testCases**: Array of TestCase  
    - **bugs**: Array of Bug  
    - **testCoverage**: Number  
    - **lastTestRun**: DateTime  
  - **Usage:** Captures testing metrics and quality information (e.g., ACRE.CRT.US11).

### System Fields
- **createdAt**, **createdBy**, **updatedAt**, **updatedBy**, **completedAt**, **completedBy**

---

## 3. State Machine

### States & Descriptions

1. **MEMORY**  
   - **Description:** Initial ideation where concepts and requirements are gathered.  
   - **User Story:** ACRE.CRT.US1  
   - **Transition Rule:** Remains in MEMORY until the concept is approved.

2. **BLUEPRINT**  
   - **Description:** Technical design phase where architecture and state transitions are documented.  
   - **User Story:** ACRE.CRT.US8  
   - **Transition Rule:** Moves from MEMORY to BLUEPRINT when the initial concept is fully documented and approved.

3. **VISUAL_PRD**  
   - **Description:** Visual design and user experience review phase.  
   - **User Story:** ACRE.CRT.US9  
   - **Transition Rule:** Transitions from BLUEPRINT to VISUAL_PRD once the technical design is approved.

4. **DURING_DEVELOPMENT**  
   - **Description:** Active development where code is implemented.  
   - **User Story:** ACRE.CRT.US10  
   - **Transition Rule:** Changes from VISUAL_PRD to DURING_DEVELOPMENT when development begins.

5. **UNDER_TESTED**  
   - **Description:** Testing phase where quality assurance and bug fixes are performed.  
   - **User Story:** ACRE.CRT.US11  
   - **Transition Rule:** Moves from DURING_DEVELOPMENT to UNDER_TESTED when all modules are implemented and initial tests are completed.

6. **DEVELOPMENT_COMPLETE**  
   - **Description:** Final state indicating readiness for deployment.  
   - **User Story:** ACRE.CRT.US12  
   - **Transition Rule:** Transitions from UNDER_TESTED to DEVELOPMENT_COMPLETE after all tests pass and quality standards are met.

### Example Transition
- **MEMORY → BLUEPRINT**  
  - **Trigger:** Approval of the initial concept  
  - **Audit Log:** `"Application {title} moved to blueprint phase."`  
  - **Notification:** "Blueprint phase started for {title}."

---

## 4. Core Functions

### Memory Phase
- **createMemory(details)**  
  - **Actor:** Creator  
  - **Input:** Summary, initial requirements, notes  
  - **Output:** Memory document stored under the Application  
  - **Audit Log:** `"Memory created for {title}."`

### Blueprint Phase
- **createBlueprint(details)**  
  - **Actor:** Creator  
  - **Input:** Technical design details, diagrams, state mappings  
  - **Output:** Blueprint document with versioning  
  - **Audit Log:** `"Blueprint created for {title}."`

### Visual PRD Phase
- **createVisualPRD(details)**  
  - **Actor:** Creator  
  - **Input:** Visual mockups, user flows, design system data  
  - **Output:** Visual PRD document  
  - **Audit Log:** `"Visual PRD created for {title}."`

### Development Phase
- **startDevelopment(applicationId)**  
  - **Actor:** Creator  
  - **Input:** Confirmation to begin development  
  - **Output:** Status change to DURING_DEVELOPMENT; tasks initialized  
  - **Audit Log:** `"Development started for {title}."`

### Testing Phase
- **startTesting(applicationId)**  
  - **Actor:** Creator  
  - **Input:** Initiation of test cases  
  - **Output:** Testing metrics, bug logs, test coverage data  
  - **Audit Log:** `"Testing started for {title}."`

---

## 5. Validation Rules

### Memory Phase
- The memory document must include a clear summary, problem statement, and initial requirements outline.

### Blueprint Phase
- Technical design documentation must be complete with clear architecture diagrams, state mappings, and defined actions.

### Visual PRD Phase
- Visual mockups and user flows must adhere to the design system; all elements must meet quality standards.

### Development Phase
- Code quality must meet defined standards; modules are marked complete only after passing unit tests and documentation checks.

### Testing Phase
- Test cases must achieve a minimum test coverage (e.g., 80%); all bugs must be resolved or documented based on severity thresholds.

---

## 6. Access Control

### Role-Based Rights
- **Creator:**  
  - Has exclusive rights to create, update, and modify the Application object during its lifecycle.  
  - No other role can change the Application's details once it is created.
- **Company Admin / SpaceAdmin:**  
  - Can deploy the Application into a Space but cannot modify the Application’s internal details.
- **Super Admin:**  
  - Can override state transitions in exceptional circumstances but does not edit core Application data.

---

## 7. Integration Points

1. **Version Control System:**  
   - Manages code repositories and tracks changes during development.
2. **Testing System:**  
   - Handles test case management, bug tracking, and coverage reporting.
3. **Documentation System:**  
   - Stores technical and user documentation related to the Application.
4. **Billing & Subscription System:**  
   - Uses Application status and usage data for invoicing and resource allocation.
5. **Audit Logging System:**  
   - Records every action on the Application with precise audit log messages.
6. **Deployment System:**  
   - Integrates with Company and Space objects to manage Application deployment.

---

## 8. Example JSON Representation

```json
{
  "id": "a12e4567-e89b-12d3-a456-426614178900",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Customer Relationship Manager",
  "description": "A CRM solution designed to enhance customer engagement and streamline sales processes.",
  "status": "MEMORY",
  "memory": {
    "id": "m123e4567",
    "summary": "Initial concept capturing key CRM features.",
    "createdAt": "2025-01-15T10:30:00Z",
    "createdBy": "u123e4567",
    "notes": ["Integrate marketing tools", "Focus on intuitive interface"]
  },
  "blueprint": {
    "version": "v1.0",
    "diagram": "https://app.example.com/diagrams/crm_blueprint.svg",
    "states": ["MEMORY", "BLUEPRINT", "VISUAL_PRD"],
    "actions": ["Create", "Update", "Publish"],
    "lastModified": "2025-01-16T08:00:00Z",
    "reviewStatus": "Pending",
    "reviewComments": []
  },
  "visualPRD": {
    "version": "v1.0",
    "mockups": ["https://app.example.com/mockups/crm_ui1.png"],
    "userFlows": ["Login Flow", "Customer Data Flow"],
    "designSystem": {"colors": ["#123456", "#abcdef"], "typography": "Roboto"},
    "lastModified": "2025-01-17T09:00:00Z",
    "reviewStatus": "Approved"
  },
  "development": {
    "startedAt": "2025-01-18T10:00:00Z",
    "currentPhase": "Coding",
    "completedModules": [],
    "pendingModules": ["Frontend", "Backend"],
    "technicalDebt": []
  },
  "testing": {
    "startedAt": "2025-01-20T11:00:00Z",
    "testCases": [],
    "bugs": [],
    "testCoverage": 75,
    "lastTestRun": "2025-01-21T12:00:00Z"
  },
  "createdAt": "2025-01-15T10:30:00Z",
  "createdBy": "u123e4567",
  "updatedAt": "2025-01-21T12:00:00Z",
  "updatedBy": "u123e4567",
  "completedAt": null,
  "completedBy": null
}


# Application Subobject Specifications

This document details several key subobjects that form part of the overall **Application** business object. These subobjects include the **Product Backlog**, **Project Plan**, and **Questionnaire** used during the clarification phase. Each subobject is defined with its core attributes, structure, behaviors, and integration points.

---

## 1. Product Backlog Subobject

### Overview
The **Product Backlog** is a structured, hierarchical collection of refined requirements, features, use cases, and user stories associated with an Application. It serves as the definitive record of the creator’s vision and guides the subsequent design, development, and testing phases.

### Core Attributes
- **backlogId**: UUID  
  *Example:* `"b123e4567-e89b-12d3-a456-426614178901"`

- **features**: Array of Feature Objects  
  Each **Feature Object** includes:
  - **featureId**: UUID  
    *Example:* `"f123e4567-e89b-12d3-a456-426614178902"`
  - **title**: String  
    *Example:* `"User Management"`
  - **description**: String  
    *Example:* `"Allows creation, updating, and deletion of user accounts."`
  - **useCases**: Array of Use Case Objects  
    Each **Use Case Object** includes:
    - **useCaseId**: UUID  
      *Example:* `"uc123e4567-e89b-12d3-a456-426614178903"`
    - **title**: String  
      *Example:* `"Create User"`
    - **description**: String  
      *Example:* `"Guides a company admin to create a new user with appropriate validations."`

- **createdAt**: DateTime  
  *Example:* `"2025-01-15T10:30:00Z"`

- **updatedAt**: DateTime  
  *Example:* `"2025-01-20T14:00:00Z"`

### Behaviors / Methods
- **addFeature(feature)**:  
  Adds a new feature to the backlog. Validates that the feature title is unique within the backlog.
- **updateUseCase(featureId, useCase)**:  
  Updates a specific use case under a given feature.
- **removeItem(itemId)**:  
  Removes a feature or use case from the backlog.

### Integration Points
- The Product Backlog feeds directly into the **Blueprint** and **Project Plan** subobjects, ensuring that the refined requirements guide both architectural design and task planning.
- It is updated dynamically as feedback is received during the clarification and blueprint phases.

---

## 2. Project Plan Subobject

### Overview
The **Project Plan** subobject represents the development roadmap for an Application. Typically visualized as a Kanban board, it outlines discrete tasks, milestones, and dependencies required to build and deploy the Application prototype.

### Core Attributes
- **planId**: UUID  
  *Example:* `"p123e4567-e89b-12d3-a456-426614178904"`

- **tasks**: Array of Task Objects  
  Each **Task Object** includes:
  - **taskId**: UUID  
    *Example:* `"t123e4567-e89b-12d3-a456-426614178905"`
  - **title**: String  
    *Example:* `"Develop Login Module"`
  - **description**: String  
    *Example:* `"Implement user authentication and session management."`
  - **status**: Enum (e.g., `TODO`, `IN_PROGRESS`, `DONE`)  
    *Example:* `"TODO"`
  - **dependencies**: Array of taskIds (optional)  
    *Example:* `["t123e4567-e89b-12d3-a456-426614178906"]`
  - **assignedTo**: UUID (userId of the assigned developer)

- **createdAt**: DateTime  
  *Example:* `"2025-01-17T09:00:00Z"`

- **updatedAt**: DateTime  
  *Example:* `"2025-01-21T12:00:00Z"`

### Behaviors / Methods
- **addTask(task)**:  
  Adds a new task to the project plan and sets its initial status.
- **updateTaskStatus(taskId, status)**:  
  Updates the status of a task (e.g., from `TODO` to `IN_PROGRESS`).
- **setTaskDependencies(taskId, dependencies)**:  
  Links tasks based on dependencies, ensuring that tasks cannot begin until prerequisites are complete.

### Integration Points
- The Project Plan is generated from the refined **Product Backlog** and serves as a blueprint for development.
- It integrates with the Version Control and Testing systems to track progress and task completion in real time.
- Changes in task statuses trigger audit log entries and notifications for stakeholders.

---

## 3. Questionnaire Subobject

### Overview
The **Questionnaire** subobject is used during the Clarification Q&A phase to capture detailed requirements from the creator. It consists of a set of multiple-choice and open-ended questions designed to clarify the application’s intent and functionality. The answers provided help generate the Product Backlog and guide subsequent phases.

### Core Attributes
- **questionnaireId**: UUID  
  *Example:* `"q123e4567-e89b-12d3-a456-426614178906"`

- **questions**: Array of Question Objects  
  Each **Question Object** includes:
  - **questionId**: UUID  
    *Example:* `"qst123e4567-e89b-12d3-a456-426614178907"`
  - **text**: String  
    *Example:* `"What is the primary goal of the application?"`
  - **type**: Enum (e.g., `MULTIPLE_CHOICE`, `OPEN_ENDED`)  
    *Example:* `"MULTIPLE_CHOICE"`
  - **options**: Array of Strings (if applicable)  
    *Example:* `["Increase sales", "Improve customer service", "Streamline operations"]`
  - **answer**: String or Array of Strings (optional, once answered)  
    *Example:* `"Improve customer service"`

- **createdAt**: DateTime  
  *Example:* `"2025-01-16T08:00:00Z"`

- **updatedAt**: DateTime  
  *Example:* `"2025-01-16T08:30:00Z"`

### Behaviors / Methods
- **addQuestion(question)**:  
  Adds a new question to the questionnaire.
- **recordAnswer(questionId, answer)**:  
  Records an answer for a specific question, ensuring the response adheres to the expected format.
- **validateResponses()**:  
  Ensures all required questions have been answered before progressing to the next phase.

### Integration Points
- The Questionnaire feeds into the **Product Backlog** generation, helping to clarify and refine requirements.
- Responses from the Questionnaire are stored and reviewed as part of the overall Application creation process.
- Validation of responses ensures that only complete and consistent data is used to drive subsequent phases like Blueprint creation.

---

## Summary

This document provides a detailed specification for key subobjects within the **Application** business object:
- The **Product Backlog** organizes refined requirements into a hierarchical structure, guiding design and development.
- The **Project Plan** outlines the development tasks and milestones, serving as a roadmap for building the Application.
- The **Questionnaire** captures detailed clarifications through a structured set of questions, ensuring that the Application’s intent is fully understood.

Each subobject is defined with clear attributes, behaviors, and integration points, ensuring a robust and cohesive development process. The detailed audit logging, state transitions, and notifications ensure transparency and control throughout the application lifecycle.

If additional details or further modifications are required for any of these subobjects, please let me know!
