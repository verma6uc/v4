# Invitation Business Object Specification

## 1. Overview
The Invitation object manages the secure process of inviting new users to the platform. It handles both company admin invitations and regular user invitations with different workflows and security requirements.

## 2. Attributes

### Core Attributes
- **id**: UUID (Primary Key, System Generated)
- **companyId**: UUID (Reference to Company)
- **email**: String (Required)
  - Validation: Valid email format
  - Used in: USPM.UINV.US1, CPOV.CADI.US1
- **type**: InvitationType (Enum, Required)
  - Values: COMPANY_ADMIN, SPACE_ADMIN, USER
  - Used in: CPOV.CADI.US1, USPM.UINV.US1
- **status**: InvitationStatus (Enum, Required)
  - Values: PENDING, SENT, EXPIRED, ACCEPTED, CANCELLED
  - Used in: CPOV.CADI.US3, USPM.UINV.US7

### Time Controls
- **createdAt**: DateTime
- **expiresAt**: DateTime
  - Based on company configuration
  - Used in: CCMT.SECF.US1
- **sentAt**: DateTime
- **acceptedAt**: DateTime
- **cancelledAt**: DateTime
- **lastResendAt**: DateTime
- **resendCount**: Integer
  - Tracks number of resends
  - Used in: CPOV.CADI.US4

### Security
- **token**: String (Encrypted)
  - Unique invitation token
  - One-time use
- **tokenHash**: String
  - Stored hash for validation
- **ipCreated**: String
- **ipAccepted**: String

### User Details
- **firstName**: String (Required)
- **lastName**: String (Required)
- **designationId**: UUID (Reference to Designation)
- **initialSpaces**: Array of {
  - spaceId: UUID,
  - roleId: UUID
}
- Used in: USPM.UINV.US1

### System Fields
- **createdBy**: UUID (Reference to User)
- **cancelledBy**: UUID (Reference to User)
- **cancellationReason**: String
- **resendHistory**: Array of {
  - timestamp: DateTime,
  - requestedBy: UUID,
  - ipAddress: String
}

## 3. State Machine

### States
1. **PENDING**
   - Initial state before sending
   - Invitation configured but not sent
   - User Story: USPM.UINV.US1

2. **SENT**
   - Invitation email delivered
   - Token active and valid
   - User Story: USPM.UINV.US2

3. **EXPIRED**
   - Token validity period exceeded
   - No longer usable
   - User Story: CPOV.ACAT.US2

4. **ACCEPTED**
   - Successfully used by recipient
   - Token invalidated
   - User Story: CPOV.ACAT.US1

5. **CANCELLED**
   - Administratively cancelled
   - Token invalidated
   - User Story: CPOV.CADI.US5

### State Transitions

1. **PENDING → SENT**
   - Trigger: System sends invitation email
   - Validation: Valid email, within send limits
   - User Story: USPM.UINV.US2
   - Audit Log: "Invitation sent to {email}"
   - Notifications:
     - To Recipient: Invitation email
     - To Admin: "Invitation sent to {email}"

2. **SENT → EXPIRED**
   - Trigger: Time expiration
   - System automated transition
   - User Story: CPOV.ACAT.US2
   - Audit Log: "Invitation for {email} expired"
   - Notifications:
     - To Admin: "Invitation for {email} has expired"

3. **SENT → ACCEPTED**
   - Trigger: User accepts invitation
   - Validation: Valid token, within time limit
   - User Story: CPOV.ACAT.US1
   - Audit Log: "Invitation accepted by {email}"
   - Notifications:
     - To Admin: "Invitation for {email} has been accepted"

4. **SENT/PENDING → CANCELLED**
   - Trigger: Admin cancels invitation
   - Required: Cancellation reason
   - User Story: CPOV.CADI.US5
   - Audit Log: "Invitation for {email} cancelled. Reason: {reason}"
   - Notifications:
     - To Recipient: "Your invitation has been cancelled"
     - To Admin: "Invitation for {email} has been cancelled"

## 4. Actions/Methods

### Invitation Management
1. **createInvitation(companyId, details)**
   - Actor: Company Admin, Space Admin
   - User Story: USPM.UINV.US1
   - Validation:
     - Email not already registered
     - Valid designation
     - Valid spaces
   - Creates in PENDING state
   - Audit Log: "New invitation created for {email}"

2. **sendInvitation(invitationId)**
   - Actor: System
   - User Story: USPM.UINV.US2
   - Validation:
     - In PENDING state
     - Within send limits
   - Generates secure token
   - Audit Log: "Invitation sent to {email}"

3. **resendInvitation(invitationId)**
   - Actor: Admin
   - User Story: CPOV.CADI.US4
   - Validation:
     - Not exceeded resend limit
     - Previous token expired
   - Generates new token
   - Audit Log: "Invitation resent to {email}"

### Token Management
1. **validateToken(token)**
   - Actor: System
   - User Story: CPOV.ACAT.US1
   - Validation:
     - Token exists and valid
     - Not expired or cancelled
   - Audit Log: "Token validated for {email}"

2. **processAcceptance(token, details)**
   - Actor: User
   - User Story: CPOV.ACAT.US1
   - Validation:
     - Valid token
     - Password requirements met
   - Creates user account
   - Audit Log: "Invitation accepted and account created"

## 5. Relationships

1. **Company (Many-to-One)**
   - Invitation belongs to one company
   - Company controls settings

2. **Spaces (Many-to-Many)**
   - Through initial space assignments
   - With specified roles

3. **Designation (Many-to-One)**
   - Initial designation assignment
   - Influences role suggestions

## 6. Security Considerations

1. **Token Security**
   - One-time use
   - Time-limited validity
   - Secure transmission
   - Used in: CCMT.SECF.US1

2. **Rate Limiting**
   - Resend limitations
   - IP-based restrictions
   - Concurrent invitations

3. **Validation Rules**
   - Email uniqueness
   - Domain restrictions
   - Role permissions

## 7. Special Cases

1. **Company Admin Invitations**
   - Special privileges
   - Different validation rules
   - Critical security checks
   - Used in: CPOV.CADI.US1

2. **Bulk Invitations**
   - Batch processing
   - Error handling
   - Progress tracking
   - Used in: USPM.UINV.US4

3. **Auto-Expiry**
   - Configurable timeframes
   - Grace periods
   - Renewal options
   - Used in: CPOV.ACAT.US2

## 8. Additional Features

1. **Email Templates**
   - Customizable content
   - Localization support
   - Dynamic variables
   - Used in: CCMT.CMST.US3

2. **Analytics**
   - Success rates
   - Response times
   - Expiry patterns
   - Used in: USPM.UINV.US7

3. **Compliance**
   - Audit trail
   - Security logging
   - Privacy controls