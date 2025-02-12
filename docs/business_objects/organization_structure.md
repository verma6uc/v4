# Organization Structure Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- created_at: DateTime
- updated_at: DateTime

### Structure Information
- name: String (required)
- type: Enum ['division', 'department', 'team', 'unit']
- level: Integer
- path: String
- parent_id: UUID (references OrganizationStructure)
- root: Boolean
- depth: Integer

### Hierarchy Settings
- allow_children: Boolean
- max_depth: Integer
- max_children: Integer
- inheritance_enabled: Boolean
- cross_hierarchy_access: Boolean
- matrix_enabled: Boolean

### Membership Settings
- head_count: Integer
- min_members: Integer
- max_members: Integer
- require_manager: Boolean
- allow_multiple_managers: Boolean
- allow_matrix_reporting: Boolean

### Role Settings
- default_role: String
- available_roles: String[]
- custom_roles_enabled: Boolean
- role_hierarchy_enabled: Boolean
- role_inheritance_enabled: Boolean
- role_restrictions: String[]

### Resource Settings
- budget_code: String
- cost_center: String
- resource_quota: Integer
- resource_sharing_enabled: Boolean
- resource_inheritance_enabled: Boolean
- resource_restrictions: String[]

## States
1. DRAFT
   - Structure being defined
   - Can transition to: ACTIVE, DELETED

2. ACTIVE
   - Structure operational
   - Can transition to: REORGANIZING, INACTIVE

3. REORGANIZING
   - Structure being modified
   - Can transition to: ACTIVE, FAILED

4. INACTIVE
   - Structure temporarily disabled
   - Can transition to: ACTIVE, ARCHIVED

5. ARCHIVED
   - Structure preserved but unused
   - Can transition to: ACTIVE

6. FAILED
   - Reorganization failed
   - Can transition to: REORGANIZING

## Relationships
- Belongs to one Company
- Has one Parent Structure
- Has many Child Structures
- Has many Members
- Has many Roles
- Has many Resources

## Validations
- Name must be unique within level
- Path must be valid
- Hierarchy rules must be followed
- Member counts must be valid
- Role assignments must be valid

## Inheritance Rules
- Role inheritance
- Resource inheritance
- Setting inheritance
- Permission inheritance

## Security Rules
- Enforce access control
- Validate structure changes
- Control role assignments
- Maintain audit trail