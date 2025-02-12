# Company Security Settings Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- created_at: DateTime
- updated_at: DateTime
- last_reviewed_at: DateTime

### Invitation Settings
- invitation_validity_days: Integer
- max_invitation_resends: Integer
- require_manager_approval: Boolean
- domains_whitelist: String[]

### Password Policy Settings
- min_length: Integer
- require_uppercase: Boolean
- require_lowercase: Boolean
- require_numbers: Boolean
- require_special_chars: Boolean
- password_expiry_days: Integer
- password_history_count: Integer
- prevent_common_passwords: Boolean

### Account Lockout Settings
- max_failed_attempts: Integer
- lockout_duration_minutes: Integer
- reset_attempts_after_minutes: Integer
- notify_admin_on_lockout: Boolean

### Session Settings
- session_timeout_minutes: Integer
- max_concurrent_sessions: Integer
- force_logout_on_security_change: Boolean
- remember_me_allowed: Boolean

### MFA Settings
- mfa_required: Boolean
- allowed_mfa_methods: String[]
- mfa_grace_period_days: Integer
- mfa_reminder_frequency_days: Integer

### IP Access Settings
- ip_whitelist_enabled: Boolean
- allowed_ip_ranges: String[]
- block_tor_traffic: Boolean
- geo_restriction_enabled: Boolean
- allowed_countries: String[]

## States
1. INITIAL_SETUP
   - Default security settings
   - Can transition to: CONFIGURED

2. CONFIGURED
   - Custom security settings
   - Can transition to: STRICT, RELAXED

3. STRICT
   - Enhanced security settings
   - Can transition to: CONFIGURED

4. RELAXED
   - Minimal security settings
   - Can transition to: CONFIGURED

## Relationships
- Belongs to one Company
- Has many SecurityPolicyVersions
- Has many SecurityAuditLogs
- Has many SecurityExceptions

## Validations
- All timeouts and durations must be positive
- Password length must meet minimum platform requirements
- IP ranges must be valid CIDR notation
- MFA methods must be from allowed list
- Country codes must be valid ISO codes

## Audit Requirements
- Track all setting changes
- Log security policy updates
- Record security exceptions
- Maintain settings history

## Security Rules
- Critical changes require admin approval
- Changes trigger user notifications
- Policy updates may force re-authentication
- Regular security review reminders

## Compliance Rules
- Enforce minimum security standards
- Regular compliance checks
- Policy effectiveness monitoring
- Security posture reporting