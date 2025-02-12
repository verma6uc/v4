# Role Assignment Business Object Specification

## 1. Overview
Role Assignment manages the association between users and their roles, handling both platform and application roles, with support for manual (MARA) and suggested (SARA) assignments.

## 2. Core Attributes

### Basic Information
- **id**: UUID (Primary Key)
- **userId**: UUID [Required]
  - Reference to assigned user
- **roleType**: Enum [Required]
  - Values: PLATFORM_ROLE, APPLICATION_ROLE
- **roleId**: UUID [Required]
  - Reference to actual role

### Context Information
- **companyId**: UUID [Required]
  - Company context
- **spaceId**: UUID
  - Required for space-scoped roles
- **applicationId**: UUID
  - Required for application roles
- **assignmentScope**: Enum
  - Values: COMPANY_WIDE, SPACE_SPECIFIC, APPLICATION_SPECIFIC

### Assignment Details
- **status**: AssignmentStatus [Required]
  - Values: PENDING, ACTIVE, SUSPENDED, REVOKED
- **assignmentType**: Enum [Required]
  - Values: MANUAL, SUGGESTED, AUTOMATIC
- **assignedBy**: UUID [Required]
  - Reference to assigning user/system
- **assignedAt**: DateTime [Required]
- **expiresAt**: DateTime
  - Optional expiration date

### Approval Information
- **requiresApproval**: Boolean
- **approvalStatus**: ApprovalStatus
  - Values: NOT_REQUIRED, PENDING, APPROVED, REJECTED
- **approvedBy**: UUID
- **approvedAt**: DateTime
- **approvalReason**: String

### SARA Information
- **suggestionConfidence**: Float
  - For SARA assignments
- **suggestionBasis**: Array of String
  - Reasons for suggestion
- **suggestionPattern**: Object
  - Pattern matching details

## 3. Assignment Types

### Manual Assignment (MARA)
```json
{
  "assignmentType": "MANUAL",
  "status": "ACTIVE",
  "requiresApproval": false,
  "auditContext": {
    "assignedBy": "admin-uuid",
    "reason": "Direct assignment by administrator"
  }
}
```

### Suggested Assignment (SARA)
```json
{
  "assignmentType": "SUGGESTED",
  "status": "PENDING",
  "requiresApproval": true,
  "suggestionConfidence": 0.85,
  "suggestionBasis": [
    "DESIGNATION_MATCH",
    "SPACE_PATTERN"
  ]
}
```

## 4. Core Functions

### Assignment Operations
1. **createAssignment(details)**
   - Actor: Admin/System
   - User Story: USPM.MARA.US1, USPM.SARA.US1
   - Validation:
     - User exists and active
     - Role valid for context
     - No conflicts exist
   - Creates assignment record

2. **bulkCreateAssignments(assignments)**
   - Actor: Admin
   - User Story: USPM.MARA.US3
   - Validation:
     - Batch validation
     - Transaction handling
   - Creates multiple assignments

### Approval Operations
1. **approveAssignment(assignmentId)**
   - Actor: Approver
   - Validation:
     - Approver has rights
     - Assignment pending
   - Updates status
   - Triggers notifications

2. **rejectAssignment(assignmentId, reason)**
   - Actor: Approver
   - Requires rejection reason
   - Updates status
   - Notifies stakeholders

### Management Operations
1. **revokeAssignment(assignmentId, reason)**
   - Actor: Admin
   - User Story: USPM.MARA.US6
   - Required: Revocation reason
   - Updates status
   - Handles cleanup

2. **modifyAssignment(assignmentId, updates)**
   - Actor: Admin
   - User Story: USPM.MARA.US4
   - Validation:
     - Valid modifications
     - Permission check
   - Updates assignment

## 5. State Machine

### States
1. **PENDING**
   - Initial state for new assignments
   - Awaiting approval if required
   - No active permissions

2. **ACTIVE**
   - Successfully assigned
   - Permissions in effect
   - Regular auditing

3. **SUSPENDED**
   - Temporarily inactive
   - Can be reactivated
   - Permissions suspended

4. **REVOKED**
   - Permanently inactive
   - Cannot be reactivated
   - Historical record

### State Transitions

1. **PENDING → ACTIVE**
   - Trigger: Approval received or auto-approved
   - Validation: All requirements met
   - Audit Log: "Role assignment activated"

2. **ACTIVE → SUSPENDED**
   - Trigger: Admin suspension
   - Required: Suspension reason
   - Audit Log: "Role assignment suspended"

3. **SUSPENDED → ACTIVE**
   - Trigger: Admin reactivation
   - Validation: Still eligible
   - Audit Log: "Role assignment reactivated"

4. **Any → REVOKED**
   - Trigger: Admin revocation
   - Required: Revocation reason
   - Audit Log: "Role assignment revoked"

## 6. Validation Rules

### Assignment Validation
1. **User Context**
   - Active user status
   - Appropriate designation
   - Valid space assignment

2. **Role Compatibility**
   - No conflicting roles
   - Prerequisites met
   - Scope appropriate

3. **Approval Requirements**
   - Proper approver level
   - Required justifications
   - Time constraints

## 7. Audit Requirements

### Assignment Events
```
Actor: {adminName} ({email})
Action: ASSIGN_ROLE
Context: Company: {companyName} > Space: {spaceName}
Details: Assigned {roleName} to {userName}
Type: {assignmentType}
```

### Status Change Events
```
Actor: {adminName} ({email})
Action: MODIFY_ASSIGNMENT
Context: Company: {companyName}
Details: Changed status from {oldStatus} to {newStatus}
Reason: {reason}
```

## 8. Special Considerations

### Performance
1. **Batch Processing**
   - Efficient bulk operations
   - Transaction management
   - Validation optimization

2. **Access Control**
   - Quick permission checks
   - Role inheritance
   - Scope validation

### Security
1. **Privilege Management**
   - Prevent escalation
   - Enforce separation
   - Regular review

2. **Audit Compliance**
   - Complete trail
   - Change tracking
   - Access monitoring

### Maintenance
1. **Regular Review**
   - Assignment validity
   - Pattern accuracy
   - Usage monitoring

2. **Cleanup Operations**
   - Expired assignments
   - Orphaned records
   - Historical data