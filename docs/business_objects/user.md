# User Business Object

## Properties
- id: UUID (primary key)
- created_at: DateTime
- updated_at: DateTime
- last_login_at: DateTime
- last_active_at: DateTime

### Authentication
- email: String (required, unique)
- username: String (required, unique)
- password_hash: String (required)
- password_salt: String (required)
- password_last_changed: DateTime
- force_password_change: Boolean
- failed_login_attempts: Integer
- last_failed_login: DateTime
- lockout_until: DateTime

### Security
- mfa_enabled: Boolean
- mfa_type: Enum ['app', 'sms', 'email', 'hardware']
- mfa_secret: String (encrypted)
- backup_codes: String[] (encrypted)
- recovery_email: String
- security_questions: String[]
- security_answers: String[] (encrypted)

### Account Status
- status: Enum ['pending', 'active', 'suspended', 'locked', 'deactivated']
- email_verified: Boolean
- phone_verified: Boolean
- identity_verified: Boolean
- verification_token: String
- verification_expiry: DateTime

### Session Management
- current_session_id: String
- session_token: String
- refresh_token: String
- token_expiry: DateTime
- last_token_refresh: DateTime
- active_sessions: Integer

### Access Control
- super_admin: Boolean
- system_roles: String[]
- global_permissions: String[]
- ip_whitelist: String[]
- access_restrictions: String[]
- trusted_devices: String[]

## States
1. PENDING
   - Account created but not verified
   - Can transition to: ACTIVE

2. ACTIVE
   - Account operational
   - Can transition to: SUSPENDED, LOCKED, DEACTIVATED

3. SUSPENDED
   - Account temporarily disabled
   - Can transition to: ACTIVE, DEACTIVATED

4. LOCKED
   - Account security locked
   - Can transition to: ACTIVE, SUSPENDED

5. DEACTIVATED
   - Account permanently disabled
   - Terminal state

## Relationships
- Has one UserProfile
- Has one UserPreferences
- Has many Sessions
- Has many AccessTokens
- Has many LoginAttempts
- Has many SecurityEvents

## Validations
- Email must be valid format
- Username must meet requirements
- Password must meet policy
- MFA setup must be complete
- Security answers required

## Security Rules
- Hash passwords with salt
- Encrypt sensitive data
- Rate limit login attempts
- Monitor suspicious activity
- Enforce MFA policies

## Audit Requirements
- Log all login attempts
- Track security changes
- Record status updates
- Monitor access patterns
- Log password changes