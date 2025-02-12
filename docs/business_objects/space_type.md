# Space Type Business Object Specification

## 1. Overview
Space Type defines the template for creating organizational units (Spaces) within a company. It enforces standardization and governs the hierarchical relationships between different types of spaces.

## 2. Attributes

### Core Attributes
- **id**: UUID (Primary Key, System Generated)
- **companyId**: UUID (Reference to Company)
- **name**: String (Required, Unique within company)
  - Validation: 3-100 characters, alphanumeric with spaces
  - Used in: OHMT.STMT.US1
- **identifier**: String (Required, Unique within company)
  - Validation: 3-50 characters, alphanumeric only, no spaces
  - Used in: OHMT.STMT.US1
- **description**: String
  - Used in: OHMT.STMT.US1
- **status**: SpaceTypeStatus (Enum, Required)
  - Values: ACTIVE, SUSPENDED, ARCHIVED
  - Used in: OHMT.STSM.US1, OHMT.STSM.US2

### System Fields
- **createdAt**: DateTime (System Generated)
- **createdBy**: UUID (Reference to User)
- **updatedAt**: DateTime (System Generated)
- **updatedBy**: UUID (Reference to User)
- **suspendedAt**: DateTime
- **suspendedReason**: String
- **archivedAt**: DateTime
- **archivedReason**: String

### Field Configuration
- **fields**: Array of {
  - id: UUID
  - name: String (Required)
  - type: Enum (Required)
    - Values: TEXT, NUMBER, DATE, DROPDOWN, BOOLEAN, EMAIL, PHONE
  - required: Boolean
  - order: Integer
  - validation: Object {
    - minLength: Number
    - maxLength: Number
    - pattern: String (regex)
    - minValue: Number
    - maxValue: Number
    - options: Array (for dropdown)
  }
  - defaultValue: Any
  - description: String
  - displayFormat: String
  - Used in: OHMT.STCF.US1, OHMT.STCF.US2
}

### Hierarchy Rules
- **allowedParentTypes**: Array of UUID (References to other SpaceTypes)
- **allowedChildTypes**: Array of UUID (References to other SpaceTypes)
- **maxLevel**: Integer (Maximum depth in hierarchy)
- Used in: OHMT.STHY.US1

## 3. State Machine

### States
1. **ACTIVE**
   - Normal operating state
   - Can be used to create spaces
   - User Story: OHMT.STMT.US1

2. **SUSPENDED**
   - Temporarily disabled
   - Cannot create new spaces
   - Existing spaces remain functional
   - User Story: OHMT.STSM.US1

3. **ARCHIVED**
   - Permanently disabled
   - Cannot create new spaces
   - Used for historical reference
   - User Story: OHMT.STSM.US3

### State Transitions

1. **ACTIVE → SUSPENDED**
   - Trigger: Company Admin suspends space type
   - Required: Suspension reason
   - User Story: OHMT.STSM.US1
   - Audit Log: "Space Type {name} suspended by {actor}. Reason: {reason}"
   - Notifications:
     - To Company Admin: "Space Type {name} has been suspended"
     - To Space Admins: "Space Type {name} has been suspended"

2. **SUSPENDED → ACTIVE**
   - Trigger: Company Admin reactivates space type
   - Required: Reactivation reason
   - User Story: OHMT.STSM.US2
   - Audit Log: "Space Type {name} reactivated by {actor}. Reason: {reason}"
   - Notifications:
     - To Company Admin: "Space Type {name} has been reactivated"
     - To Space Admins: "Space Type {name} is now available for use"

3. **SUSPENDED → ARCHIVED**
   - Trigger: Company Admin archives space type
   - Required: Archival reason
   - User Story: OHMT.STSM.US3
   - Audit Log: "Space Type {name} archived by {actor}. Reason: {reason}"
   - Notifications:
     - To Company Admin: "Space Type {name} has been archived"
     - To Space Admins: "Space Type {name} has been archived"

## 4. Actions/Methods

### Creation and Setup
1. **createSpaceType(companyId, name, identifier, description)**
   - Actor: Company Admin
   - User Story: OHMT.STMT.US1
   - Validation:
     - Unique name and identifier within company
     - Valid company ID
   - Creates space type in ACTIVE state
   - Audit Log: "New Space Type {name} created by {actor}"

2. **updateSpaceType(spaceTypeId, details)**
   - Actor: Company Admin
   - User Story: OHMT.STMT.US2
   - Validation:
     - Space type in ACTIVE state
     - No conflicts with existing spaces
   - Audit Log: "Space Type {name} updated by {actor}"

### Field Management
1. **addField(spaceTypeId, fieldDetails)**
   - Actor: Company Admin
   - User Story: OHMT.STCF.US1
   - Validation:
     - Valid field configuration
     - Unique field name
   - Audit Log: "Field {fieldName} added to Space Type {name} by {actor}"

2. **updateField(spaceTypeId, fieldId, updates)**
   - Actor: Company Admin
   - User Story: OHMT.STCF.US2
   - Validation:
     - Field exists
     - Updates don't conflict with existing data
   - Audit Log: "Field {fieldName} updated in Space Type {name} by {actor}"

3. **deactivateField(spaceTypeId, fieldId)**
   - Actor: Company Admin
   - User Story: OHMT.STCF.US3
   - Validation:
     - Field not required
     - No dependencies
   - Audit Log: "Field {fieldName} deactivated in Space Type {name} by {actor}"

### Hierarchy Management
1. **defineHierarchyRules(spaceTypeId, rules)**
   - Actor: Company Admin
   - User Story: OHMT.STHY.US1
   - Validation:
     - Valid parent/child relationships
     - No circular references
   - Audit Log: "Hierarchy rules updated for Space Type {name} by {actor}"

2. **validateHierarchy(spaceTypeId)**
   - Actor: System
   - User Story: OHMT.STHY.US2
   - Validation:
     - Complete hierarchy paths
     - No orphaned types
   - Audit Log: "Hierarchy validation completed for Space Type {name}"

## 5. Relationships

1. **Company (Many-to-One)**
   - Space Type belongs to a company
   - Company controls lifecycle

2. **Spaces (One-to-Many)**
   - Space Type serves as template for multiple spaces
   - Changes affect future space creation

3. **Other Space Types (Many-to-Many)**
   - Through hierarchy rules
   - Parent-child relationships

## 6. Validation Rules

1. **Field Validation**
   - Required fields must have validation rules
   - Data type specific validations
   - Custom validation expressions
   - Used in: OHMT.STCF.US5

2. **Hierarchy Validation**
   - No circular references
   - Valid parent-child relationships
   - Maximum depth limits
   - Used in: OHMT.STHY.US2

3. **Naming Convention**
   - Unique within company
   - Format requirements
   - Reserved keywords

## 7. Search & View Capabilities

1. **List View**
   - User Story: OHMT.STSV.US1
   - Filterable by status
   - Sortable by name, creation date
   - Pagination support

2. **Detail View**
   - User Story: OHMT.STSV.US2
   - Complete configuration
   - Field definitions
   - Hierarchy rules
   - Usage statistics

3. **Hierarchy View**
   - User Story: OHMT.STSV.US3
   - Visual representation
   - Parent-child relationships
   - Status indicators