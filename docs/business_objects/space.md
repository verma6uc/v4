# Space Business Object Specification

## 1. Overview
Space represents an organizational unit within a company, created based on a Space Type template. It serves as a container for applications and users, enforcing hierarchical organization and access control.

## 2. Attributes

### Core Attributes
- **id**: UUID (Primary Key, System Generated)
- **companyId**: UUID (Reference to Company)
- **spaceTypeId**: UUID (Reference to SpaceType)
- **parentSpaceId**: UUID (Optional, Reference to parent Space)
- **name**: String (Required, Unique within parent context)
  - Validation: 3-100 characters, alphanumeric with spaces
  - Used in: OHMT.SPCR.US1
- **identifier**: String (Required, Unique within company)
  - Validation: 3-50 characters, alphanumeric only, no spaces
  - Used in: OHMT.SPCR.US1
- **status**: SpaceStatus (Enum, Required)
  - Values: DRAFT, ACTIVE, SUSPENDED, ARCHIVED
  - Used in: OHMT.SPSM.US1, OHMT.SPSM.US3

### Hierarchical Attributes
- **path**: String (Generated)
  - Format: /parent-id/current-id
  - Used for hierarchy traversal
  - Auto-updated on parent changes
- **level**: Integer (Generated)
  - Indicates depth in hierarchy
  - Used for validation against SpaceType maxLevel
- **inheritedSettings**: Object
  - Settings inherited from parent spaces
  - Auto-updated on parent changes

### System Fields
- **createdAt**: DateTime (System Generated)
- **createdBy**: UUID (Reference to User)
- **updatedAt**: DateTime (System Generated)
- **updatedBy**: UUID (Reference to User)
- **activatedAt**: DateTime
- **suspendedAt**: DateTime
- **suspendedReason**: String
- **archivedAt**: DateTime
- **archivedReason**: String

### Dynamic Fields
- **fields**: Object (Based on SpaceType configuration)
  - Dynamic fields as defined by SpaceType
  - Validation rules from SpaceType
  - Used in: OHMT.SPCR.US1

### Access Control
- **adminUsers**: Array of UUID (References to Users)
- **readOnlyUsers**: Array of UUID (References to Users)
- **inheritedUsers**: Array of {
  - userId: UUID,
  - accessLevel: String,
  - inheritedFrom: UUID
}

## 3. State Machine

### States
1. **DRAFT**
   - Initial state during creation
   - Only accessible to creators and admins
   - User Story: OHMT.SPCR.US1

2. **ACTIVE**
   - Normal operating state
   - Full functionality available
   - User Story: OHMT.SPCR.US1

3. **SUSPENDED**
   - Temporarily disabled
   - Read-only access
   - Child spaces also suspended
   - User Story: OHMT.SPSM.US1

4. **ARCHIVED**
   - Permanently disabled
   - Read-only for historical reference
   - User Story: OHMT.SPSM.US5

### State Transitions

1. **DRAFT → ACTIVE**
   - Trigger: Space creation completion
   - Validation: All required fields completed
   - User Story: OHMT.SPCR.US1
   - Audit Log: "Space {name} activated by {actor}"
   - Notifications:
     - To Space Admins: "Space {name} is now active"
     - To Parent Space Admins: "New child space {name} activated"

2. **ACTIVE → SUSPENDED**
   - Trigger: Admin suspends space
   - Required: Suspension reason
   - User Story: OHMT.SPSM.US1
   - Audit Log: "Space {name} suspended by {actor}. Reason: {reason}"
   - Notifications:
     - To Space Admins: "Space {name} has been suspended"
     - To Space Users: "Space {name} access is now read-only"
     - To Child Space Admins: "Parent space {name} has been suspended"

3. **SUSPENDED → ACTIVE**
   - Trigger: Admin reactivates space
   - Validation: Parent space must be active
   - User Story: OHMT.SPSM.US3
   - Audit Log: "Space {name} reactivated by {actor}"
   - Notifications:
     - To Space Admins: "Space {name} has been reactivated"
     - To Space Users: "Space {name} access has been restored"
     - To Child Space Admins: "Parent space {name} has been reactivated"

4. **ACTIVE/SUSPENDED → ARCHIVED**
   - Trigger: Admin archives space
   - Required: Archival reason
   - User Story: OHMT.SPSM.US5
   - Audit Log: "Space {name} archived by {actor}. Reason: {reason}"
   - Notifications:
     - To Space Admins: "Space {name} has been archived"
     - To Space Users: "Space {name} has been archived"
     - To Parent Space Admins: "Child space {name} has been archived"

## 4. Actions/Methods

### Creation and Setup
1. **createSpace(companyId, spaceTypeId, details)**
   - Actor: Company Admin, Space Admin
   - User Story: OHMT.SPCR.US1
   - Validation:
     - Valid space type
     - Parent-child relationship allowed
     - Required fields present
   - Creates space in DRAFT state
   - Audit Log: "New space {name} created by {actor}"

2. **updateSpace(spaceId, details)**
   - Actor: Space Admin
   - User Story: OHMT.SPCR.US2
   - Validation:
     - Space in ACTIVE state
     - Field validations from space type
   - Audit Log: "Space {name} details updated by {actor}"

### Application Management
1. **deployApplication(spaceId, applicationId)**
   - Actor: Space Admin
   - User Story: SPA.DEP.US2
   - Validation:
     - Space in ACTIVE state
     - Application published
     - Deployment permissions
   - Audit Log: "Application {appName} deployed to space {name} by {actor}"

2. **removeApplication(spaceId, applicationId)**
   - Actor: Space Admin
   - Validation:
     - No active users
     - Data backup complete
   - Audit Log: "Application {appName} removed from space {name} by {actor}"

### User Management
1. **assignUsers(spaceId, userIds, role)**
   - Actor: Space Admin
   - User Story: SPA.USM.US1
   - Validation:
     - Valid users
     - Valid role assignments
   - Audit Log: "Users assigned to space {name} by {actor}"

2. **updateUserAccess(spaceId, userId, newRole)**
   - Actor: Space Admin
   - User Story: SPA.USM.US3
   - Validation:
     - User exists
     - Valid role transition
   - Audit Log: "User {userName} access updated in space {name} by {actor}"

## 5. Relationships

1. **Company (Many-to-One)**
   - Space belongs to a company
   - Company controls global settings

2. **Space Type (Many-to-One)**
   - Space follows space type template
   - Inherits field definitions and validations

3. **Parent Space (Many-to-One)**
   - Optional hierarchical relationship
   - Inherits settings and permissions

4. **Child Spaces (One-to-Many)**
   - Can contain multiple child spaces
   - Hierarchy rules from space type

5. **Applications (Many-to-Many)**
   - Spaces can have multiple applications
   - Applications can be in multiple spaces

6. **Users (Many-to-Many)**
   - Through space roles
   - Inherited access from parent spaces

## 6. Search & View Capabilities

1. **List View**
   - User Story: OHMT.SPSV.US1
   - Filterable by multiple criteria
   - Sortable columns
   - Pagination support

2. **Hierarchy View**
   - User Story: OHMT.SPSV.US3
   - Visual tree structure
   - Expandable/collapsible nodes
   - Status indicators

3. **Detail View**
   - User Story: OHMT.SPSV.US2
   - All space attributes
   - Deployed applications
   - User assignments
   - Audit history

## 7. Special Considerations

1. **Hierarchy Management**
   - Automatic path updates
   - Circular reference prevention
   - Level depth validation
   - Used in: OHMT.STHY.US1

2. **Permission Inheritance**
   - Cascading permissions
   - Override rules
   - Access conflict resolution

3. **State Propagation**
   - Parent state affects children
   - Suspension cascades
   - Archival impact

4. **Data Migration**
   - Space type changes
   - Hierarchy restructuring
   - Application redeployment