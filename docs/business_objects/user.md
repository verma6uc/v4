# User Object

## Overview
The User object represents an individual interacting with our platform. It is a first‑class business object that encapsulates personal details, roles, permissions, and the current operational status of a user. Our system supports various user roles—such as CREATOR, COMPANY_ADMIN, and SPACE_ADMIN—and the User object is central to enforcing security, managing access rights, and driving interactions across the platform. In addition to standard attributes, the User object includes a Status field that reflects the full lifecycle of a user account, based on our behavior-driven user stories.

## Attributes

### User ID
- **Type**: UUID (string)
- **Description**: A unique identifier for the user.
- **Example**: "a1b2c3d4-e89b-12d3-a456-426614174001"

### Name
- **Type**: String
- **Description**: The full name of the user.
- **Example**: "John Doe"

### Email
- **Type**: String
- **Description**: The primary email address, which must be unique and follow standard email formatting.
- **Example**: "john.doe@example.com"

### Role
- **Type**: Enum (String)
- **Description**: The role assigned to the user, which determines access levels and permissions.
- **Possible Values**:
  - CREATOR
  - COMPANY_ADMIN
  - SPACE_ADMIN
- **Example**: "CREATOR"

### Permissions
- **Type**: Array of Strings (or a JSON object)
- **Description**: A list of permissions associated with the user, typically derived from their role.
- **Example**: ["CREATE_APP", "VIEW_BACKLOG", "UPDATE_PROFILE"]

### Status
- **Type**: Enum (String)
- **Description**: The current operational state of the user account. In our system, the status reflects a range of states to capture the complete lifecycle of a user.
- **Possible Values**:
  - PENDING – When a user has registered (e.g., via self-signup) but not yet verified their account.
  - ACTIVE – When the user account is fully activated and operational.
  - SUSPENDED – When the user account is temporarily disabled due to compliance, security issues, or inactivity.
  - BLOCKED – When the user account is blocked due to policy violations or security risks.
  - ARCHIVED – When the user account is no longer active (e.g., the user has left the organization) but the record is preserved for historical purposes.
- **Example**: "ACTIVE"

### Last Login
- **Type**: DateTime
- **Description**: The timestamp of the user's most recent successful login.
- **Example**: "2025-01-20T14:45:00Z"

## Behaviors / Methods
The User object includes several behaviors that encapsulate its lifecycle and role-based interactions:

### Create User
- **Method**: Register a new user via self-signup or by an administrator.
- **Behavior**: Validate input fields (name, email, role) and ensure the email is unique; assign a unique User ID and set the initial status to PENDING.
- **Audit Log**: "User {userId} created by Self Signup/Admin {username}."

### Update User Details
- **Method**: Modify the user's name, email, or role.
- **Behavior**: Validate changes (e.g., email format, required fields) and update the user record.
- **Audit Log**: "User {userId} details updated by {adminUsername}."

### Activate User Account
- **Method**: Transition a new user from PENDING to ACTIVE after verification (e.g., via email confirmation).
- **Behavior**: Verify the activation token, enforce password rules, and update the status.
- **Audit Log**: "User {userId} activated by {username}."
- **Notification**: "Your account is now active."

### Suspend/Block User
- **Method**: Change the user's status to SUSPENDED or BLOCKED in response to security or compliance issues.
- **Behavior**: Enforce suspension or blocking rules, log the action, and restrict user access accordingly.
- **Audit Log**: "User {userId} suspended/blocked by {adminUsername}."

### Archive User Account
- **Method**: Archive the user record when the account is no longer active.
- **Behavior**: Transition the status to ARCHIVED while preserving historical data.
- **Audit Log**: "User {userId} archived by {adminUsername}."

### Role & Permission Management
- **Method**: Update the user's role and permissions dynamically if changes are required.
- **Behavior**: Validate role changes and adjust permissions accordingly, ensuring consistency with business rules.
- **Audit Log**: "User {userId} role changed from {oldRole} to {newRole} by {adminUsername}."

## Business Rules

### Input Validation
1. **Name**: Must be non-empty and not exceed 100 characters.
2. **Email**: Must be unique and conform to standard email format.
3. **Role**: Must be one of the predefined enum values (CREATOR, COMPANY_ADMIN, SPACE_ADMIN).
4. **Status**: Must be a valid status value (e.g., PENDING, ACTIVE, SUSPENDED, BLOCKED, or ARCHIVED).

### Role-Based Access
1. **Creators**:
   - Can create and update applications.
   - Have limited administrative functions.

2. **Company Admins**:
   - Can manage user accounts across the company.
   - Have permissions to update user details and enforce account policies.

3. **SpaceAdmins**:
   - Manage users within specific Spaces.
   - Can update access rights for users in their Spaces.

### State Transition Rules
1. **PENDING → ACTIVE**:
   - Transition occurs upon successful verification of the user account (e.g., email confirmation).

2. **ACTIVE → SUSPENDED/BLOCKED**:
   - Transition occurs if a user violates policies or poses security risks.

3. **ACTIVE/SUSPENDED/BLOCKED → ARCHIVED**:
   - Transition occurs when the user is no longer active, preserving historical data.
   - All state transitions trigger appropriate audit log entries and notifications.

## Audit Logging and Notifications
Every significant action performed on the User object is logged with detailed messages and timestamps. For example:

1. **User Creation**:
   - Audit Log: "User {userId} created by Self Signup/Admin {username}."

2. **User Update**:
   - Audit Log: "User {userId} details updated by {adminUsername}."

3. **User Activation**:
   - Audit Log: "User {userId} activated by {username}."

4. **Role Change**:
   - Audit Log: "User {userId} role changed from {oldRole} to {newRole} by {adminUsername}."

Notifications are displayed in-app and may also be sent via email to confirm actions (e.g., "Your account is now active" or "Your role has been updated").

## Data Format Examples

### Example JSON Representation
```json
{
  "userId": "a1b2c3d4-e89b-12d3-a456-426614174001",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "CREATOR",
  "permissions": ["CREATE_APP", "VIEW_BACKLOG", "UPDATE_PROFILE"],
  "status": "ACTIVE",
  "lastLogin": "2025-01-20T14:45:00Z"
}
```

## Integration Points
1. **Company Object**:
   - Each User is associated with a Company
   - Changes to user roles or details may affect Company-level access and configurations

2. **Spaces**:
   - Users, particularly SpaceAdmins, are linked to specific Spaces
   - Manage access within those Spaces

3. **Applications**:
   - The User's role determines the operations they can perform on Applications
   - Example: a Creator can create Applications, while a Company Admin can publish them

4. **Audit Logging System**:
   - All user-related actions are captured in the Audit Log for security and compliance purposes

## Summary
The User object is a core first‑class business entity that encapsulates all critical details about an individual interacting with the platform. It includes attributes such as User ID, Name, Email, Role, Permissions, and an expanded Status that covers multiple lifecycle states (PENDING, ACTIVE, SUSPENDED, BLOCKED, ARCHIVED). The object supports behaviors for creation, updating, activation, suspension, role changes, and archiving, each governed by rigorous input validations and role-based access controls. State transitions are enforced through clear business rules, and every action is recorded in the Audit Log with precise messages and notifications. This comprehensive design ensures that the User object is robust, secure, and seamlessly integrated with other first‑class objects in our multi‑tenant platform.