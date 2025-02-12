# User Business Object Specification

## 1. Overview
The User object represents individuals who interact with the platform. It manages authentication, authorization, and maintains the user's relationship with companies, spaces, and applications.

## 2. Attributes

### Core Attributes
- **id**: UUID (Primary Key, System Generated)
- **companyId**: UUID (Reference to Company)
- **email**: String (Required, Unique across platform)
  - Validation: Valid email format
  - Used in: USPM.UINV.US1
- **firstName**: String (Required)
  - Validation: 1-50 characters
  - Used in: USPM.UAMG.US1
- **lastName**: String (Required)  
  - Validation: 1-50 characters
  - Used in: USPM.UAMG.US1
- **designationId**: UUID (Reference to Designation)
  - Used in: USPM.UINV.US1
- **status**: UserStatus (Enum, Required)
  - Values: INVITED, ACTIVE, SUSPENDED, BLOCKED, ARCHIVED
  - Used in: USPM.USTM.US1, USPM.USTM.US2

### Authentication
- **passwordHash**: String
- **passwordLastChanged**: DateTime
- **failedLoginAttempts**: Integer
- **lastLoginAt**: DateTime
- **mfaEnabled**: Boolean
- **mfaMethods**: Array of {
  - type: Enum (EMAIL, AUTHENTICATOR),
  - verified: Boolean,
  - lastVerifiedAt: DateTime
}
- Used in: CCMT.SECF.US2, CCMT.SECF.US6

### Contact & Profile
- **phone**: String
- **profilePicture**: Object {
  - url: String,
  - metadata: Object
}
- **locale**: String
- **timezone**: String
- Used in: USPM.UAMG.US3

### System Fields
- **createdAt**: DateTime
- **createdBy**: UUID (Reference to User)
- **updatedAt**: DateTime
- **updatedBy**: UUID (Reference to User)
- **activatedAt**: DateTime
- **suspendedAt**: DateTime
- **suspendedReason**: String
- **blockedAt**: DateTime
- **blockedReason**: String
- **archivedAt**: DateTime
- **archivedReason**: String

### Security & Preferences
- **sessionTimeout**: Integer (minutes)
- **ipAccessList**: Array of {
  - ip: String,
  - allowedUntil: DateTime,
  - description: String
}
- **notificationPreferences**: Object {
  - email: Boolean,
  - inPlatform: Boolean,
  - digest: Boolean
}
- Used in: CCMT.SECF.US4, USPM.UAMG.US5

## 3. State Machine

### States
1. **INVITED**
   - Initial state after invitation
   - Limited access to activation only
   - User Story: USPM.UINV.US1

2. **ACTIVE**
   - Normal operating state
   - Full access based on roles
   - User Story: USPM.UINV.US2

3. **SUSPENDED**
   - Administratively suspended
   - No access allowed
   - User Story: USPM.USTM.US2

4. **BLOCKED**
   - Automatically blocked (security)
   - No access allowed
   - User Story: USPM.STAT.US3

5. **ARCHIVED**
   - Permanently disabled
   - Historical reference only
   - User Story: USPM.USTM.US5

### State Transitions

1. **INVITED → ACTIVE**
   - Trigger: User completes activation
   - Validation: Valid invitation link, password set
   - User Story: USPM.UINV.US2
   - Audit Log: "User {email} activated their account"
   - Notifications:
     - To User: "Welcome to {companyName}"
     - To Admin: "User {email} has completed activation"

2. **ACTIVE → SUSPENDED**
   - Trigger: Admin suspends user
   - Required: Suspension reason
   - User Story: USPM.USTM.US2
   - Audit Log: "User {email} suspended by {actor}. Reason: {reason}"
   - Notifications:
     - To User: "Your account has been suspended"
     - To Admins: "User {email} has been suspended"

3. **ACTIVE → BLOCKED**
   - Trigger: Security violation (automatic)
   - User Story: USPM.STAT.US3
   - Audit Log: "User {email} blocked due to {reason}"
   - Notifications:
     - To User: "Your account has been blocked"
     - To Admins: "User {email} has been blocked"

4. **SUSPENDED/BLOCKED → ACTIVE**
   - Trigger: Admin reactivates user
   - Required: Reactivation reason
   - User Story: USPM.STAT.US4
   - Audit Log: "User {email} reactivated by {actor}"
   - Notifications:
     - To User: "Your account has been reactivated"
     - To Admins: "User {email} has been reactivated"

5. **ANY → ARCHIVED**
   - Trigger: Admin archives user
   - Required: Archival reason
   - User Story: USPM.USTM.US5
   - Audit Log: "User {email} archived by {actor}. Reason: {reason}"
   - Notifications:
     - To User: "Your account has been archived"
     - To Admins: "User {email} has been archived"

## 4. Actions/Methods

### Account Management
1. **createUser(companyId, details)**
   - Actor: Company Admin
   - User Story: USPM.UINV.US1
   - Validation:
     - Unique email
     - Valid company
     - Valid designation
   - Creates user in INVITED state
   - Audit Log: "New user account created for {email} by {actor}"

2. **sendInvitation(userId)**
   - Actor: System/Admin
   - User Story: USPM.UINV.US2
   - Validation:
     - User in INVITED state
     - Within resend limits
   - Audit Log: "Invitation sent to {email} by {actor}"

3. **activateAccount(userId, activationDetails)**
   - Actor: User
   - User Story: USPM.UINV.US2
   - Validation:
     - Valid invitation link
     - Password meets requirements
   - Changes state to ACTIVE
   - Audit Log: "User {email} activated their account"

### Profile Management
1. **updateProfile(userId, details)**
   - Actor: User/Admin
   - User Story: USPM.UAMG.US1
   - Validation:
     - User in ACTIVE state
     - Valid field values
   - Audit Log: "Profile updated for user {email}"

2. **changeEmail(userId, newEmail)**
   - Actor: User/Admin
   - User Story: USPM.UAMG.US2
   - Validation:
     - Unique email
     - Verification required
   - Audit Log: "Email changed from {oldEmail} to {newEmail}"

### Security Management
1. **resetPassword(userId)**
   - Actor: Admin
   - User Story: USPM.UAMG.US4
   - Validation:
     - User in ACTIVE state
   - Audit Log: "Password reset initiated for {email}"

2. **configureMultiFactorAuth(userId, mfaConfig)**
   - Actor: User
   - User Story: CCMT.SECF.US6
   - Validation:
     - User in ACTIVE state
     - Valid MFA method
   - Audit Log: "MFA configuration updated for {email}"

## 5. Relationships

1. **Company (Many-to-One)**
   - User belongs to one company
   - Company controls global settings

2. **Spaces (Many-to-Many)**
   - Through space assignments
   - Different roles per space

3. **Applications (Many-to-Many)**
   - Through application roles
   - Different roles per application

4. **Designation (Many-to-One)**
   - User has one designation
   - Influences role suggestions

## 6. Access Control

1. **Platform Roles**
   - Company Admin
   - Space Admin
   - User Manager
   - Basic User

2. **Application Roles**
   - Managed through MARA/SARA
   - Application-specific permissions
   - Used in: USPM.MARA.US1

3. **Space Permissions**
   - Inherited through hierarchy
   - Direct assignments
   - Used in: SPA.USM.US3

## 7. Special Considerations

1. **Security Measures**
   - Password policies
   - MFA requirements
   - Session management
   - IP restrictions

2. **Data Privacy**
   - PII handling
   - Data retention
   - Access logs

3. **Compliance**
   - Audit requirements
   - Password history
   - Access reviews