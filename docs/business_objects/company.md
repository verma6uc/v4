# Company Business Object

## Properties
- name: String (required)
- email: String (required)
- contact: String (required)
- physical_address: String (required)
- phone_number: String (required)
- created_at: DateTime
- updated_at: DateTime

## States
1. PENDING_ACTIVATION
   - Initial state when company is created through self-signup
   - Awaiting email verification and admin account activation
   - Can transition to: ACTIVE

2. ACTIVE
   - Normal operating state
   - Full access to platform features
   - Can transition to: SUSPENDED, ARCHIVED

3. SUSPENDED
   - Temporary deactivation
   - Limited access to platform
   - Can transition to: ACTIVE, ARCHIVED

4. ARCHIVED
   - Permanent deactivation
   - Read-only access to historical data
   - Terminal state, no further transitions

## State Transitions
1. PENDING_ACTIVATION → ACTIVE
   - Trigger: Email verification and admin account activation
   - Validation: Valid email verification and admin account setup

2. ACTIVE → SUSPENDED
   - Trigger: Administrative action or policy violation
   - Effect: Restricts access to platform features
   - Validation: Requires admin privileges

3. SUSPENDED → ACTIVE
   - Trigger: Administrative action
   - Effect: Restores full platform access
   - Validation: Requires admin privileges, compliance verification

4. ACTIVE/SUSPENDED → ARCHIVED
   - Trigger: Administrative action or long-term inactivity
   - Effect: Permanent deactivation
   - Validation: Requires high-level admin privileges

## Relationships
- Has many Spaces
- Has many Users
- Has many Applications
- Has one Subscription
- Has many Integrations

## Validations
- Company name must be unique
- Email must be valid format and unique
- Phone number must be valid format
- Required fields cannot be empty
- State transitions must follow defined paths

## Audit Requirements
- Log all state transitions
- Track all relationship modifications
- Record administrative actions
- Maintain history of key field changes