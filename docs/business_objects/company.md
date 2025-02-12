# Company Object

## Overview
The Company object represents an organization using the platform. It is a first‑class business object that encapsulates both data and behavior necessary for managing an organization's presence. As the root entity in our multi‑tenant system, the Company object governs associated entities (such as Spaces, Users, and Applications) and is critical to functions like onboarding, configuration, billing, and reporting.

## Attributes

### Company ID
- **Type**: UUID (string)
- **Description**: A unique identifier assigned to each company.
- **Example**: "123e4567-e89b-12d3-a456-426614174000"

### Name
- **Type**: String
- **Description**: The legal or trading name of the company.
- **Example**: "Example Corp"

### Contact Information
- **Type**: Object (JSON)
- **Attributes**:
  - Email: Primary contact email.
  - Phone: Contact phone number.
  - Address: Physical or mailing address.
- **Example**:
```json
{
  "email": "contact@example.com",
  "phone": "123-456-7890",
  "address": "123 Main St, Anytown, Country"
}
```

### Industry
- **Type**: Enum (String)
- **Description**: The sector in which the company operates. This attribute is constrained to specific predefined values to maintain consistency.
- **Possible Values**:
  - TECHNOLOGY
  - FINANCE
  - HEALTHCARE
  - MANUFACTURING
  - RETAIL
  - EDUCATION
  - GOVERNMENT
  - ENERGY
  - LOGISTICS
- **Example**: "TECHNOLOGY"

### Configuration Settings
- **Type**: Object (JSON)
- **Description**: A set of customizable parameters that dictate the company's operating preferences (e.g., theme, timezone, security policies).
- **Example**:
```json
{
  "theme": "corporate",
  "timezone": "UTC",
  "securityPolicy": "standard"
}
```

### Status
- **Type**: Enum (String)
- **Description**: Represents the current lifecycle state of the company.
- **Possible Values**:
  - ONBOARDING
  - ACTIVE
  - SUSPENDED
  - ARCHIVED
- **Example**: "ACTIVE"

## Behaviors/Methods

### Provisioning
- Create a new Company instance with all required attributes.
- Initialize default configuration settings and assign a unique Company ID.

### Configuration Management
- Update contact details, industry classification, and configuration settings.
- Enforce business rules (e.g., only admins can update these fields).

### Lifecycle Management and State Transitions
Manage transitions between states. For instance:

#### Onboarding to Active
- A company transitions from ONBOARDING to ACTIVE only after successful verification of the initial admin account and completion of all setup steps.

#### Active to Suspended/Archived
- A company may be suspended due to non-compliance or resource issues.
- Archiving typically occurs when the company ceases to use the platform, preserving historical data while disabling active access.

### Audit Logging
- Record all changes, updates, and state transitions for compliance and debugging.

## Business Rules

### Uniqueness
- Every Company must have a unique Company ID and a unique name within the platform.
- The Industry attribute must match one of the predefined enum values, ensuring consistency across the system.

### Access Control
- Only authorized users (such as Company Admins) can modify the Company object.
- Critical changes (like state transitions) require proper authentication and must be logged.

### State Transitions
#### From ONBOARDING to ACTIVE
- The Company transitions to ACTIVE only after the initial setup, including admin account activation and configuration completion.

#### From ACTIVE to SUSPENDED/ARCHIVED
- Transitioning to SUSPENDED may occur due to non-compliance, security issues, or payment failures.
- Transitioning to ARCHIVED is permitted only after a company has been inactive for a defined period, ensuring data is preserved for historical reference while disabling further operations.
- All state transitions must trigger appropriate notifications and be recorded in the Audit Log.