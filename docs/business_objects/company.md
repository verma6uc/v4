# Company Object

## Overview
The Company object is a foundational, first‑class business entity within our platform. It represents an individual organization that uses the platform and serves as the parent entity for other related objects (such as Spaces, Users, and Applications). The Company object encapsulates both data (attributes) and behaviors (methods and business rules) essential for managing an organization's lifecycle—from creation and configuration to billing and reporting.

This document covers two main flows for creating a Company:
- SuperAdmin Company Creation – A process initiated by a SuperAdmin that provisions a new Company and subsequently sets up administrative access.
- Self Signup – A process that allows prospective companies to onboard themselves through an interactive, guided self‑service experience.

## Attributes

### Company ID
- **Type**: UUID (string)
- **Description**: A unique identifier automatically assigned to each Company.
- **Example**: "123e4567-e89b-12d3-a456-426614174000"

### Name
- **Type**: String
- **Description**: The legal or trading name of the Company. Must be unique across the platform.
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
- **Description**: The sector in which the Company operates.
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
- **Description**: Customizable parameters that determine how the Company operates (e.g., theme, timezone, security policies).
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
- **Description**: Represents the lifecycle state of the Company.
- **Possible Values**:
  - ONBOARDING
  - ACTIVE
  - SUSPENDED
  - ARCHIVED
- **Example**: "ACTIVE"

## Behaviors & Methods

### Provisioning
- **SuperAdmin Flow**: A SuperAdmin creates a new Company by providing required details through a dedicated process.
- **Self Signup Flow**: A prospective Company Admin enters company details via a self‑service form.
- **Common Behavior**: Initialize default configuration settings and assign a unique Company ID.

### Configuration Management
- Update contact details, industry classification, and configuration settings.
- Enforce validations and uniqueness (e.g., unique Company Name, valid Industry enum).

### Lifecycle Management
- Transition through states (e.g., from ONBOARDING to ACTIVE, from ACTIVE to SUSPENDED or ARCHIVED).
- Ensure proper verification before transitions (e.g., activation requires successful account setup).

### Integration
- Link related objects such as Spaces, Users, and Applications.
- Drive billing, reporting, and access control based on Company configurations.

### Audit Logging
- Record every action and state transition with exact audit log messages for security, compliance, and debugging.

## Creation Flows

### 1. SuperAdmin Company Creation

#### Process Overview
1. **Initiation**:
   - A SuperAdmin accesses the company provisioning module and manually enters the necessary details for a new Company (name, contact info, industry, configuration settings, etc.).

2. **Data Input & Validation**:
   - The system validates the inputs—ensuring the Company Name is unique, the Industry field is selected from the enum, and all required fields are complete.

3. **Invitation & Activation**:
   - After the company record is created, the system automatically generates an invitation for the Company Admin.
   - An email is sent with an activation link.
   - Once activated, the Company's status transitions from ONBOARDING to ACTIVE.

#### Audit & Notifications (SuperAdmin)
- **Audit Log Example**:
  - On creation: "Company {companyId} created by SuperAdmin {username}."
  - On activation: "Company {companyId} activated by Company Admin {username}."
- **Notification**:
  - SuperAdmins receive in-app confirmations
  - Activation email is sent to the designated contact

### 2. Self Signup

#### Process Overview
1. **Initiation**:
   - A prospective Company Admin clicks the "Self Signup" button on the public landing page (e.g., https://app.example.com/self-signup).
   - User is directed to a dedicated Self Signup page.

2. **Data Input**:
   - The user interacts with a concierge bot that prompts for:
     - Application Title: (Unique string)
     - Description: (Multi-line text up to 300 characters)
     - Target Audience: (Text or dropdown)
     - Industry: (Dropdown selection from predefined enum values)
     - Contact Information: (JSON object including email, phone, address)
     - Initial Configuration Parameters: (JSON object for theme, timezone, etc.)

3. **Processing & Animation**:
   - After submission, the system displays an AI-induced animated GIF (2–5 seconds) to indicate processing.

4. **Provisional Company Creation & Invitation**:
   - The system creates a provisional Company object with status PENDING_ACTIVATION
   - Sends an activation email (with a secure, time-limited token) to the provided contact email.

5. **Account Activation**:
   - The prospective Company Admin clicks the activation link
   - Completes account activation
   - Company's status transitions to ACTIVE

#### Audit & Notifications (Self Signup)
- **Audit Log Example**:
  - On provisional creation: "Self Signup: Provisional Company {companyId} created; activation email sent to {email}."
  - On activation: "Self Signup: Company {companyId} activated by {username}."
- **Notification**:
  - System displays in-app messages such as "Your company has been successfully created" and "Your company is now active"

## State Transitions & Business Rules

### Industry Enum Business Rule
- **Rule**: The Industry field must be one of the predefined enum values
- **Validation**: If an invalid industry is provided, the input is rejected

### Lifecycle State Transitions
1. **Onboarding → Active**:
   - **Condition**: For both SuperAdmin creation and Self Signup, a Company transitions from ONBOARDING (or PENDING_ACTIVATION for self signup) to ACTIVE only after successful verification and account activation.
   - **Audit Log**: "Company {companyId} activated by {username}."

2. **Active → Suspended/Archived**:
   - **Condition**: A Company may be suspended or archived by a SuperAdmin if compliance issues, payment failures, or inactivity is detected.
   - **Audit Log**: "Company {companyId} suspended/archived by {username}."

3. **Security & Notifications**:
   - All transitions trigger appropriate notifications (e.g., in-app and email)
   - All transitions are recorded in the Audit Log

## Input and Output Formats

### Input
1. **Text Fields**:
   - Company Name and Description are entered as strings
   - Validations enforce length and format (e.g., unique Company Name)

2. **Dropdowns**:
   - Industry is selected from a dropdown containing enum values

3. **JSON Objects**:
   - Contact Information and Configuration Settings are submitted as JSON objects

### Output
1. **API Responses**:
   - Data is returned as JSON for backend processes and validations

2. **User Interface**:
   - Forms, status messages, and dynamic content are rendered in the UI using tables, cards, and notifications

3. **Audit Logs**:
   - Audit log entries include timestamps, actor names, and action details in a structured log format

## Integration Points
1. **Spaces, Users, and Applications**:
   - Changes to the Company object affect all related objects
   - Updating Company configuration may propagate to Spaces and Users

2. **Billing & Reporting**:
   - The Company object is central to billing processes
   - Used to generate reports

3. **Audit Logging**:
   - Every significant action is logged
   - Integrated with the Audit Log module for security and compliance

4. **Activation & Onboarding**:
   - Self Signup and SuperAdmin creation flows feed directly into the Company object's lifecycle
   - Transitions from provisional state to active state

## Example JSON for a Provisional Company (Self Signup)
```json
{
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Example Startup",
  "contact": {
    "email": "admin@examplestartup.com",
    "phone": "987-654-3210",
    "address": "456 Startup Ave, Innovation City, Country"
  },
  "industry": "TECHNOLOGY",
  "settings": {
    "theme": "modern",
    "timezone": "UTC",
    "securityPolicy": "enhanced"
  },
  "status": "PENDING_ACTIVATION"
}
```

## Summary
The Company object is a central first‑class business object that represents an organization on our platform. It is created either via a SuperAdmin-driven company creation process or through a Self Signup flow. In both cases, the Company object captures essential attributes like Company ID, Name, Contact Information, Industry (as an enum), Configuration Settings, and Status.

- SuperAdmin Company Creation involves a manual provisioning process where a SuperAdmin enters the company details, which are then validated and confirmed via an invitation process.
- Self Signup allows prospective Company Admins to onboard themselves by entering their details into a guided form, viewing processing animations, and completing account activation through a secure email link.
- State transitions are strictly governed by business rules—ensuring that a Company moves from ONBOARDING or PENDING_ACTIVATION to ACTIVE only after proper verification, and that further transitions (such as SUSPENDED or ARCHIVED) are managed by authorized roles with appropriate audit logging and notifications.

By integrating robust input validations, clearly defined output formats, and comprehensive audit logging, the Company object and its associated processes ensure that every organization is uniquely identifiable, securely managed, and fully integrated into the platform's multi‑tenant ecosystem.