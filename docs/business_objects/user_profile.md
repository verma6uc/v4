# User Profile Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- created_at: DateTime
- updated_at: DateTime
- last_login_at: DateTime

### Basic Information
- username: String (required, unique)
- email: String (required, unique)
- first_name: String (required)
- last_name: String (required)
- display_name: String
- title: String
- department: String
- employee_id: String
- hire_date: Date

### Contact Information
- work_phone: String
- mobile_phone: String
- office_location: String
- time_zone: String (required)
- language: String (required, ISO language code)

### Account Status
- status: Enum ['active', 'inactive', 'suspended', 'pending']
- email_verified: Boolean
- phone_verified: Boolean
- mfa_enabled: Boolean
- last_password_change: DateTime
- force_password_change: Boolean

### Profile Settings
- avatar_url: String
- theme_preference: String
- accessibility_settings: String[]
- notification_channels: String[]
- default_view: String

### Role Information
- primary_role: String (required)
- secondary_roles: String[]
- role_start_date: Date
- role_expiry_date: Date
- reporting_manager_id: UUID

## States
1. PENDING
   - Account created but not activated
   - Can transition to: ACTIVE

2. ACTIVE
   - Account fully operational
   - Can transition to: SUSPENDED, INACTIVE

3. SUSPENDED
   - Account temporarily disabled
   - Can transition to: ACTIVE, INACTIVE

4. INACTIVE
   - Account permanently disabled
   - Can transition to: ACTIVE

## Relationships
- Belongs to one Company
- Has many UserPreferences
- Has many UserRoles
- Has many UserPermissions
- Has many UserSessions
- Has many ActivityLogs

## Validations
- Email must be valid format
- Username must be unique within company
- Phone numbers must be valid format
- Required fields cannot be empty
- Dates must be valid

## Audit Requirements
- Track all profile changes
- Log authentication attempts
- Record status changes
- Monitor role changes

## Security Rules
- Encrypt sensitive data
- Validate email changes
- Verify phone changes
- Control role assignments

## Privacy Rules
- Mask sensitive data
- Control data visibility
- Handle data export
- Manage data retention