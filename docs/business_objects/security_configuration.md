# Security Configuration Business Object Specification

## 1. Overview
Security Configuration manages comprehensive security settings at both company and space levels, including MFA, session management, IP access, and other security controls.

## 2. Core Objects

### Security Configuration
- **id**: UUID (Primary Key)
- **companyId**: UUID [Required]
- **spaceId**: UUID (Optional, for space-specific)
- **status**: ConfigStatus (ACTIVE, DRAFT)
- **version**: Integer
- **effectiveFrom**: DateTime
- **updatedAt**: DateTime
- **updatedBy**: UUID

### MFA Configuration
- **enabled**: Boolean [Required]
  - Default: false
- **requiredFor**: Array of {
  - roleId: UUID,
  - userGroups: Array of String
}
- **methods**: Array of {
  - type: MFAType (EMAIL, AUTHENTICATOR_APP),
  - enabled: Boolean,
  - priority: Integer
}
- **enforcementLevel**: Enum
  - Values: OPTIONAL, REQUIRED_FOR_SOME, REQUIRED_FOR_ALL
- Used in: CCMT.SECF.US6

### Session Management
- **sessionTimeout**: Integer (minutes)
  - Default: 30
- **maxConcurrentSessions**: Integer
  - Default: 3
- **extendSessionOnActivity**: Boolean
  - Default: true
- **mobileSessionTimeout**: Integer
- **rememberMeDuration**: Integer (days)
- Used in: CCMT.SECF.US4

### IP Access Control
- **enforceIPRestrictions**: Boolean
  - Default: false
- **allowedIPs**: Array of {
  - ipRange: String,
  - description: String,
  - addedBy: UUID,
  - addedAt: DateTime,
  - expiresAt: DateTime
}
- **blockListedIPs**: Array of {
  - ipRange: String,
  - reason: String,
  - addedBy: UUID,
  - addedAt: DateTime
}
- Used in: CCMT.SECF.US7

### Account Security
- **maxLoginAttempts**: Integer
  - Default: 5
- **lockoutDuration**: Integer (minutes)
  - Default: 30
- **passwordResetTimeout**: Integer (hours)
  - Default: 24
- **invitationValidityPeriod**: Integer (hours)
  - Default: 72
- Used in: CCMT.SECF.US1

## 3. Methods/Operations

### Configuration Management
1. **createSecurityConfig(companyId, config)**
   - Actor: Company Admin
   - User Story: CCMT.SECF.US1
   - Validation:
     - Company exists
     - Valid settings
     - No conflicts
   - Creates new configuration version

2. **updateSecurityConfig(configId, updates)**
   - Actor: Company Admin
   - User Story: CCMT.SECF.US2
   - Validation:
     - Config exists
     - Valid changes
     - Version control
   - Creates new version

### MFA Operations
1. **enableMFA(configId, mfaSettings)**
   - Actor: Company Admin
   - User Story: CCMT.SECF.US6
   - Validation:
     - Valid methods
     - User group validation
   - Updates MFA configuration

2. **validateMFASetup(userId, method)**
   - Actor: System
   - Validates MFA configuration
   - Checks requirements
   - Updates user status

### Session Management
1. **configureSessionRules(configId, sessionSettings)**
   - Actor: Company Admin
   - User Story: CCMT.SECF.US4
   - Validation:
     - Valid timeouts
     - Concurrent session limits
   - Updates session rules

2. **validateSession(sessionId)**
   - Actor: System
   - Checks timeout rules
   - Validates concurrent sessions
   - Updates session status

## 4. State Machine

### Configuration States
1. **DRAFT**
   - Initial state
   - Being edited
   - Not enforced

2. **PENDING_APPROVAL**
   - Changes ready
   - Under review
   - Current version active

3. **ACTIVE**
   - Current version
   - Being enforced
   - Can be updated

4. **ARCHIVED**
   - Previous version
   - Kept for history
   - Cannot be modified

### State Transitions

1. **DRAFT → PENDING_APPROVAL**
   - Trigger: Admin submits changes
   - Validation: All required settings
   - Audit Log: "Security configuration submitted for approval"

2. **PENDING_APPROVAL → ACTIVE**
   - Trigger: Approved by authority
   - Validation: No conflicts
   - Audit Log: "New security configuration activated"

3. **ACTIVE → ARCHIVED**
   - Trigger: New version activated
   - Stores complete configuration
   - Audit Log: "Security configuration archived"

## 5. Validation Rules

### MFA Validation
```json
{
  "rules": {
    "methods": "At least one method must be enabled",
    "userGroups": "Valid user groups must be specified",
    "enforcement": "Valid enforcement level required"
  },
  "errorMessages": {
    "methods": "Enable at least one MFA method",
    "userGroups": "Specify valid user groups for MFA",
    "enforcement": "Select valid enforcement level"
  }
}
```

### Session Validation
```json
{
  "rules": {
    "timeout": "Must be between 5 and 480 minutes",
    "concurrent": "Must be between 1 and 10 sessions",
    "mobile": "Must be between 5 and 240 minutes"
  },
  "errorMessages": {
    "timeout": "Session timeout must be between 5 and 480 minutes",
    "concurrent": "Concurrent sessions must be between 1 and 10",
    "mobile": "Mobile timeout must be between 5 and 240 minutes"
  }
}
```

## 6. Audit Requirements

### Configuration Changes
```
Actor: {adminName} ({email})
Action: UPDATE_SECURITY_CONFIG
Context: Company: {companyName}
Details: Updated {section} configuration
Changes: [List of changed settings]
```

### Security Events
```
Actor: System
Action: SECURITY_RULE_VIOLATION
Context: User: {userName}
Details: Violated {ruleName}: {details}
```

## 7. Integration Points

### Authentication System
- MFA enforcement
- Session validation
- IP restriction checks

### User Management
- Group validation
- Role checks
- Access control

### Notification System
- Configuration changes
- Security violations
- Status updates

## 8. Special Considerations

### Performance
1. **Caching Strategy**
   - Active configurations
   - Validation rules
   - IP allowlists

2. **Validation Optimization**
   - Quick session checks
   - Efficient IP matching
   - MFA status caching

### Security
1. **Change Control**
   - Version tracking
   - Approval workflow
   - Audit logging

2. **Emergency Access**
   - Override procedures
   - Break-glass access
   - Incident logging

### Compliance
1. **Documentation**
   - Configuration history
   - Change justification
   - Regular reviews

2. **Reporting**
   - Security metrics
   - Violation tracking
   - Effectiveness analysis