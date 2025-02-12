# Space Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- parent_space_id: UUID (optional, references Space)
- created_at: DateTime
- updated_at: DateTime

### Basic Information
- name: String (required)
- display_name: String (required)
- description: String
- type: Enum ['team', 'project', 'department', 'division']
- visibility: Enum ['public', 'private', 'restricted']
- icon: String
- color: String

### Hierarchy Settings
- level: Integer
- path: String
- root_space: Boolean
- allow_subspaces: Boolean
- max_depth: Integer
- inheritance_enabled: Boolean

### Access Control
- owner_id: UUID (references UserProfile)
- admin_ids: UUID[] (references UserProfile)
- member_ids: UUID[] (references UserProfile)
- default_role: String
- guest_access: Boolean
- require_approval: Boolean

### Resource Limits
- max_members: Integer
- max_applications: Integer
- max_storage_gb: Integer
- max_environments: Integer
- resource_quota_enabled: Boolean
- inherit_quotas: Boolean

### Integration Settings
- enable_notifications: Boolean
- enable_analytics: Boolean
- enable_search: Boolean
- enable_sharing: Boolean
- external_access: Boolean
- api_enabled: Boolean

## States
1. CREATING
   - Space being set up
   - Can transition to: ACTIVE, FAILED

2. ACTIVE
   - Space operational
   - Can transition to: RESTRICTED, ARCHIVED

3. RESTRICTED
   - Limited access
   - Can transition to: ACTIVE, ARCHIVED

4. ARCHIVED
   - Read-only access
   - Can transition to: ACTIVE

5. FAILED
   - Setup failed
   - Can transition to: CREATING

## Relationships
- Belongs to one Company
- Has one Parent Space (optional)
- Has many Child Spaces
- Has many Members
- Has many Applications
- Has many Resources

## Validations
- Name must be unique within parent
- Path must be valid
- Resource limits must be valid
- Member counts within limits
- Hierarchy rules followed

## Audit Requirements
- Track membership changes
- Log access patterns
- Record resource usage
- Monitor hierarchy changes

## Security Rules
- Enforce access control
- Validate permissions
- Control resource access
- Maintain audit logs

## Inheritance Rules
- Role inheritance
- Permission inheritance
- Setting inheritance
- Resource quota inheritance