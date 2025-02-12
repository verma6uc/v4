# Platform Role Business Object Specification

## 1. Overview
Platform Roles define system-level permissions and access rights across the platform. These are distinct from application-specific roles and control core platform functionality access.

## 2. Core Attributes

### Basic Information
- **id**: UUID (Primary Key)
- **name**: String [Required]
  - System-defined, immutable
  - Examples: SUPER_ADMIN, COMPANY_ADMIN, SPACE_ADMIN, USER_MANAGER
- **displayName**: String [Required]
  - Localized display name
- **description**: String [Required]
  - Detailed role description
- **type**: RoleType [Required]
  - Values: SYSTEM, COMPANY, SPACE
  - Defines scope of role

### Permission Sets
- **permissions**: Array of {
  - resource: String [Required]
    - e.g., COMPANY, SPACE, USER, APPLICATION
  - actions: Array of String [Required]
    - e.g., CREATE, READ, UPDATE, DELETE
  - constraints: Object
    - Additional permission rules
}

### Hierarchy Information
- **level**: Integer [Required]
  - Hierarchy level (1 being highest)
- **inheritsFrom**: Array of UUID
  - Reference to parent roles
- **incompatibleWith**: Array of UUID
  - Roles that cannot be assigned together

### System Fields
- **isSystem**: Boolean
  - True for built-in roles
- **isActive**: Boolean
  - Role availability status
- **createdAt**: DateTime
- **updatedAt**: DateTime

## 3. Built-in Platform Roles

### Super Admin
```json
{
  "name": "SUPER_ADMIN",
  "type": "SYSTEM",
  "level": 1,
  "permissions": [
    {
      "resource": "*",
      "actions": ["*"]
    }
  ]
}
```

### Company Admin
```json
{
  "name": "COMPANY_ADMIN",
  "type": "COMPANY",
  "level": 2,
  "permissions": [
    {
      "resource": "COMPANY",
      "actions": ["READ", "UPDATE"],
      "constraints": {
        "companyId": "${currentCompany}"
      }
    },
    {
      "resource": "SPACE",
      "actions": ["*"],
      "constraints": {
        "companyId": "${currentCompany}"
      }
    }
  ]
}
```

### Space Admin
```json
{
  "name": "SPACE_ADMIN",
  "type": "SPACE",
  "level": 3,
  "permissions": [
    {
      "resource": "SPACE",
      "actions": ["READ", "UPDATE", "DEPLOY"],
      "constraints": {
        "spaceId": "${assignedSpaces}"
      }
    }
  ]
}
```

## 4. Permission Structure

### Resources
1. **Company Management**
   - COMPANY
   - COMPANY_CONFIG
   - COMPANY_USERS
   - COMPANY_BILLING

2. **Space Management**
   - SPACE
   - SPACE_TYPE
   - SPACE_CONFIG
   - SPACE_USERS

3. **User Management**
   - USER
   - ROLE
   - INVITATION
   - DESIGNATION

4. **Application Management**
   - APPLICATION
   - DEPLOYMENT
   - APP_STORE

### Actions
1. **Basic Operations**
   - CREATE
   - READ
   - UPDATE
   - DELETE

2. **Specialized Operations**
   - APPROVE
   - DEPLOY
   - SUSPEND
   - ARCHIVE

### Constraints
1. **Scope Limitations**
   - companyId
   - spaceId
   - spaceHierarchy

2. **Time Restrictions**
   - timeWindow
   - validUntil

3. **Quantity Limits**
   - maxItems
   - maxValue

## 5. Role Assignment Rules

### Validation Rules
1. **Company Context**
   - Cannot assign company roles without company
   - Company roles valid only within company

2. **Space Context**
   - Space roles require valid space assignment
   - Respect space hierarchy

3. **Combination Rules**
   - Check role compatibility
   - Validate inheritance
   - Prevent privilege escalation

## 6. Audit Requirements

### Assignment Events
```
Actor: {adminName} ({email})
Action: ASSIGN_ROLE
Context: Company: {companyName}
Details: Assigned {roleName} to {userName}
```

### Modification Events
```
Actor: {adminName} ({email})
Action: MODIFY_ROLE_PERMISSIONS
Context: Company: {companyName}
Details: Modified permissions for {roleName}
```

## 7. Access Control Matrix

### Resource Access
- Define which roles can access each resource
- Specify allowed actions per resource
- Document constraints and conditions

### Special Cases
1. **Emergency Access**
   - Break-glass procedures
   - Temporary elevation
   - Audit requirements

2. **Delegated Access**
   - Time-bound delegation
   - Scope limitations
   - Approval workflow

## 8. Implementation Requirements

### 1. Performance
- Cache role definitions
- Optimize permission checks
- Efficient hierarchy traversal

### 2. Security
- Immutable audit trail
- Prevent privilege escalation
- Regular access review

### 3. Scalability
- Handle multiple role assignments
- Support large permission sets
- Efficient validation

## 9. Integration Points

### 1. Authentication System
- Role-based access control
- Permission validation
- Session management

### 2. Audit System
- Track role changes
- Monitor access patterns
- Record violations

### 3. Notification System
- Role assignment alerts
- Permission changes
- Access violations