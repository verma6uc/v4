# Designation Business Object Specification

## 1. Overview
The Designation object represents job functions or roles within a company. It influences role suggestions, access patterns, and organizational reporting structures.

## 2. Attributes

### Core Attributes
- **id**: UUID (Primary Key, System Generated)
- **companyId**: UUID (Reference to Company)
- **name**: String (Required, Unique within company)
  - Validation: 3-100 characters, alphanumeric with spaces
  - Used in: USPM.DCRT.US1
- **identifier**: String (Required, Unique within company)
  - Validation: 3-50 characters, alphanumeric only, no spaces
  - Used in: USPM.DCRT.US1
- **description**: String
  - Purpose and scope of the designation
  - Used in: USPM.DCRT.US1
- **status**: DesignationStatus (Enum, Required)
  - Values: ACTIVE, INACTIVE, ARCHIVED
  - Used in: USPM.DSTM.US1, USPM.DSTM.US2

### System Fields
- **createdAt**: DateTime
- **createdBy**: UUID (Reference to User)
- **updatedAt**: DateTime
- **updatedBy**: UUID (Reference to User)
- **inactivatedAt**: DateTime
- **inactivatedReason**: String
- **archivedAt**: DateTime
- **archivedReason**: String

### Role Suggestion Configuration
- **defaultPlatformRoles**: Array of {
  - roleId: UUID,
  - automatic: Boolean,
  - requiresApproval: Boolean
}
- **defaultSpaceRoles**: Array of {
  - spaceTypeId: UUID,
  - roleId: UUID,
  - automatic: Boolean,
  - requiresApproval: Boolean
}
- Used in: USPM.SARA.US1

### Permission Patterns
- **suggestedApplicationRoles**: Array of {
  - applicationTypeId: UUID,
  - rolePatterns: Array of {
    - roleId: UUID,
    - confidence: Float,
    - basis: String
  }
}
- Used in: USPM.SARA.US1, USPM.SARA.US2

## 3. State Machine

### States
1. **ACTIVE**
   - Normal operating state
   - Can be assigned to users
   - User Story: USPM.DCRT.US1

2. **INACTIVE**
   - Temporarily disabled
   - Cannot be assigned to new users
   - User Story: USPM.DSTM.US1

3. **ARCHIVED**
   - Permanently disabled
   - Historical reference only
   - User Story: USPM.DSTM.US3

### State Transitions

1. **ACTIVE → INACTIVE**
   - Trigger: Admin deactivates designation
   - Required: No users currently assigned or user reassignment
   - User Story: USPM.DSTM.US1
   - Audit Log: "Designation {name} deactivated by {actor}. Reason: {reason}"
   - Notifications:
     - To Admins: "Designation {name} has been deactivated"
     - To User Managers: "Designation {name} is no longer available"

2. **INACTIVE → ACTIVE**
   - Trigger: Admin reactivates designation
   - Validation: Name still unique
   - User Story: USPM.DSTM.US2
   - Audit Log: "Designation {name} reactivated by {actor}. Reason: {reason}"
   - Notifications:
     - To Admins: "Designation {name} has been reactivated"
     - To User Managers: "Designation {name} is now available"

3. **INACTIVE → ARCHIVED**
   - Trigger: Admin archives designation
   - Required: Minimum inactive period
   - User Story: USPM.DSTM.US3
   - Audit Log: "Designation {name} archived by {actor}. Reason: {reason}"
   - Notifications:
     - To Admins: "Designation {name} has been archived"
     - To User Managers: "Designation {name} has been archived"

## 4. Actions/Methods

### Management Functions
1. **createDesignation(companyId, details)**
   - Actor: Company Admin, User Manager
   - User Story: USPM.DCRT.US1
   - Validation:
     - Unique name within company
     - Required fields present
   - Creates in ACTIVE state
   - Audit Log: "New designation {name} created by {actor}"

2. **updateDesignation(designationId, details)**
   - Actor: Company Admin, User Manager
   - User Story: USPM.DCRT.US2
   - Validation:
     - Designation in ACTIVE state
     - Name remains unique
   - Audit Log: "Designation {name} updated by {actor}"

### Role Management
1. **configureRoleSuggestions(designationId, suggestions)**
   - Actor: Company Admin
   - User Story: USPM.SARA.US1
   - Validation:
     - Valid roles referenced
     - Reasonable confidence levels
   - Audit Log: "Role suggestions updated for designation {name}"

2. **reviewRolePatterns(designationId)**
   - Actor: System
   - User Story: USPM.SARA.US2
   - Updates confidence levels based on actual assignments
   - Audit Log: "Role patterns reviewed for designation {name}"

### State Management
1. **deactivateDesignation(designationId, reason)**
   - Actor: Company Admin
   - User Story: USPM.DSTM.US1
   - Validation:
     - No users assigned or reassignment plan
   - Audit Log: "Designation {name} deactivated"

2. **bulkStateChange(designationIds, action, reason)**
   - Actor: Company Admin
   - User Story: USPM.DSTM.US4
   - Validation:
     - Valid state transition for each
     - Required conditions met
   - Audit Log: "Bulk state change performed on designations"

## 5. Relationships

1. **Company (Many-to-One)**
   - Designation belongs to one company
   - Company-wide unique naming

2. **Users (One-to-Many)**
   - Users assigned to designation
   - Influences role suggestions

3. **Role Patterns (Many-to-Many)**
   - Through suggestion configuration
   - Historical assignment patterns

## 6. Search & View Capabilities

1. **List View**
   - User Story: USPM.DSVW.US1
   - Filterable by status
   - User count tracking
   - Sort capabilities

2. **Detail View**
   - User Story: USPM.DSVW.US5
   - Full configuration
   - Assigned users
   - Role patterns
   - Audit history

3. **Advanced Search**
   - User Story: USPM.DSVW.US4
   - Complex criteria
   - Pattern matching
   - Usage analysis

## 7. Special Considerations

1. **Role Suggestion Algorithm**
   - Pattern recognition
   - Confidence calculation
   - Feedback loop
   - Used in: USPM.SARA.US1, USPM.SARA.US2

2. **State Change Impact**
   - User reassignment requirements
   - Role suggestion updates
   - Historical data preservation

3. **Compliance & Audit**
   - Change tracking
   - Usage patterns
   - Access reviews

4. **Performance Optimization**
   - Caching strategies
   - Bulk operations
   - Pattern analysis efficiency