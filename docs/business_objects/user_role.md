# User Role Business Object

## Properties
- id: UUID (primary key)
- created_at: DateTime
- updated_at: DateTime

### Role Information
- name: String (required)
- display_name: String (required)
- description: String
- type: Enum ['system', 'company', 'space', 'custom']
- scope: Enum ['global', 'company', 'space', 'application']
- scope_id: UUID (references scope entity)

### Role Configuration
- permissions: String[] (references Permission)
- parent_role: UUID (references Role)
- child_roles: UUID[] (references Role)
- precedence: Integer
- auto_assign: Boolean
- requires_approval: Boolean

### Assignment Rules
- max_users: Integer
- min_users: Integer
- exclusive: Boolean
- temporary: Boolean
- duration_days: Integer
- expiry_notification_days: Integer

### Access Control
- assignable_by: String[] (role names)
- visible_to: String[] (role names)
- restricted_to: String[] (company/space IDs)
- ip_restrictions: String[]
- time_restrictions: String[]

### Inheritance Settings
- inherit_permissions: Boolean
- inherit_restrictions: Boolean
- inherit_assignments: Boolean
- block_inheritance: Boolean
- override_parent: Boolean

## States
1. DRAFT
   - Role being defined
   - Can transition to: ACTIVE

2. ACTIVE
   - Role in use
   - Can transition to: DISABLED, DEPRECATED

3. DISABLED
   - Role temporarily inactive
   - Can transition to: ACTIVE, ARCHIVED

4. DEPRECATED
   - Role being phased out
   - Can transition to: ARCHIVED

5. ARCHIVED
   - Role no longer in use
   - Terminal state

## Relationships
- Has many Users
- Has many Permissions
- Has many ChildRoles
- Has one ParentRole
- Has many RoleAssignments
- Has many AuditLogs

## Validations
- Name must be unique within scope
- Required permissions must exist
- Role hierarchy must be valid
- Assignment rules must be valid
- Scope must be valid

## Inheritance Rules
- Permission inheritance
- Restriction inheritance
- Assignment inheritance
- Override rules
- Conflict resolution

## Security Rules
- Validate assignments
- Check restrictions
- Enforce hierarchy
- Control visibility
- Audit changes

## Audit Requirements
- Track assignments
- Log permission changes
- Record state changes
- Monitor usage
- Track inheritance