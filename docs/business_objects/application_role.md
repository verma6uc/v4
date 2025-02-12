# Application Role Business Object Specification

## 1. Overview
Application Roles define permissions and access rights specific to individual applications. These roles are managed through both manual (MARA) and suggested (SARA) assignment systems.

## 2. Core Attributes

### Basic Information
- **id**: UUID (Primary Key)
- **applicationId**: UUID [Required]
  - Reference to parent application
- **name**: String [Required]
  - Role identifier within application
  - e.g., APP_ADMIN, DATA_MANAGER, VIEWER
- **displayName**: String [Required]
  - Localized display name
- **description**: String [Required]
  - Detailed role description

### Permission Configuration
- **permissions**: Array of {
  - feature: String [Required]
    - Application feature identifier
  - actions: Array of String [Required]
    - Allowed actions on feature
  - constraints: Object
    - Feature-specific limitations
}

### Assignment Rules
- **autoAssignable**: Boolean
  - Can be assigned by SARA
- **requiresApproval**: Boolean
  - Manual approval needed
- **minimumDesignationLevel**: String
  - Required user designation
- **incompatibleRoles**: Array of UUID
  - Cannot be assigned with these roles

### SARA Configuration
- **suggestionConfidence**: Float
  - 0.0 to 1.0 scale
- **suggestionRules**: Array of {
  - designationId: UUID
  - spaceTypeId: UUID
  - confidence: Float
  - reason: String
}
- Used in: USPM.SARA.US1, USPM.SARA.US2

### System Fields
- **createdAt**: DateTime
- **createdBy**: UUID
- **updatedAt**: DateTime
- **updatedBy**: UUID
- **version**: Integer
- **isActive**: Boolean

## 3. Role Templates

### Application Administrator
```json
{
  "name": "APP_ADMIN",
  "permissions": [
    {
      "feature": "*",
      "actions": ["*"]
    }
  ],
  "autoAssignable": false,
  "requiresApproval": true,
  "minimumDesignationLevel": "MANAGER"
}
```

### Data Manager
```json
{
  "name": "DATA_MANAGER",
  "permissions": [
    {
      "feature": "DATA",
      "actions": ["READ", "WRITE", "DELETE"],
      "constraints": {
        "dataTypes": ["assigned"]
      }
    }
  ],
  "autoAssignable": true,
  "suggestionConfidence": 0.8
}
```

## 4. Assignment Systems

### MARA (Manual Assignment)
1. **Direct Assignment**
   - Actor: Space Admin
   - User Story: USPM.MARA.US1
   - Validation:
     - Admin permissions
     - Role compatibility
     - User eligibility
   - Audit Log: "Role {roleName} manually assigned to {userName}"

2. **Bulk Assignment**
   - Actor: Space Admin
   - User Story: USPM.MARA.US3
   - Validation:
     - Batch validation
     - Conflict checking
   - Audit Log: "Bulk role assignment completed for {count} users"

### SARA (Suggested Assignment)
1. **Suggestion Generation**
   - Actor: System
   - User Story: USPM.SARA.US1
   - Triggers:
     - New user creation
     - Designation change
     - Space assignment
   - Audit Log: "Role suggestions generated for {userName}"

2. **Suggestion Processing**
   - Actor: Space Admin
   - User Story: USPM.SARA.US2
   - Actions:
     - Review suggestions
     - Modify if needed
     - Approve/Reject
   - Audit Log: "Role suggestions processed for {userName}"

## 5. Validation Rules

### Assignment Validation
1. **User Context**
   - Valid space assignment
   - Appropriate designation
   - No role conflicts

2. **Role Compatibility**
   - Check incompatible roles
   - Validate prerequisites
   - Verify constraints

3. **Approval Requirements**
   - Check approval needs
   - Validate approver rights
   - Track approval status

## 6. State Transitions

### Role States
1. **ACTIVE**
   - Available for assignment
   - Used in permission checks
   - Normal operating state

2. **DEPRECATED**
   - No new assignments
   - Existing assignments valid
   - Migration path required

3. **INACTIVE**
   - Not available
   - Existing assignments invalid
   - Requires reassignment

### Assignment States
1. **PENDING**
   - Awaiting approval
   - Temporary access possible
   - Time-limited state

2. **ACTIVE**
   - Fully approved
   - Permissions granted
   - Regular auditing

3. **REVOKED**
   - Access removed
   - Audit trail maintained
   - Reason required

## 7. Integration Points

### User Management
- Designation validation
- Space assignment check
- Access history

### Permission System
- Runtime permission checks
- Access enforcement
- Constraint validation

### Audit System
- Assignment tracking
- Access monitoring
- Change history

## 8. Special Considerations

### Performance
1. **Permission Caching**
   - Role definitions
   - User assignments
   - Regular refresh

2. **Batch Operations**
   - Bulk assignments
   - Mass updates
   - Efficient validation

### Security
1. **Privilege Control**
   - Prevent escalation
   - Enforce separation
   - Regular review

2. **Audit Requirements**
   - Complete trail
   - Change tracking
   - Access monitoring

### Maintenance
1. **Role Updates**
   - Version control
   - Migration paths
   - User notification

2. **Regular Review**
   - Usage patterns
   - Assignment accuracy
   - Suggestion quality

## 9. SARA Algorithms

### Confidence Calculation
1. **Factors**:
   - Designation match
   - Space context
   - Historical patterns
   - User behavior

2. **Adjustments**:
   - Usage feedback
   - Admin overrides
   - Time patterns

### Pattern Recognition
1. **Analysis**:
   - Common assignments
   - Success rates
   - Rejection patterns

2. **Optimization**:
   - Learning from changes
   - Pattern refinement
   - Accuracy improvement