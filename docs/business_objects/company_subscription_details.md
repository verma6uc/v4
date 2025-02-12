# Company Subscription Details Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- created_at: DateTime
- updated_at: DateTime

### Plan Information
- plan_id: UUID (required)
- plan_name: String (required)
- plan_type: Enum ['trial', 'basic', 'professional', 'enterprise']
- billing_cycle: Enum ['monthly', 'quarterly', 'annual']
- price_per_unit: Decimal
- currency: String (ISO currency code)

### Usage Limits
- max_users: Integer
- max_storage_gb: Integer
- max_api_calls: Integer
- max_environments: Integer
- max_applications: Integer
- included_features: String[]

### Billing Details
- billing_start_date: Date
- billing_end_date: Date
- next_billing_date: Date
- trial_end_date: Date
- commitment_period_months: Integer
- minimum_commitment_amount: Decimal

### Usage Tracking
- current_active_users: Integer
- current_storage_usage_gb: Decimal
- current_api_calls: Integer
- current_environments: Integer
- current_applications: Integer

### Add-ons
- addon_ids: UUID[]
- addon_quantities: Integer[]
- addon_start_dates: Date[]
- addon_end_dates: Date[]

## States
1. TRIAL
   - Initial trial period
   - Can transition to: ACTIVE, EXPIRED

2. ACTIVE
   - Paid subscription
   - Can transition to: PAST_DUE, SUSPENDED, CANCELLED

3. PAST_DUE
   - Payment overdue
   - Can transition to: ACTIVE, SUSPENDED

4. SUSPENDED
   - Service access restricted
   - Can transition to: ACTIVE, CANCELLED

5. CANCELLED
   - Subscription terminated
   - Can transition to: TRIAL, ACTIVE

6. EXPIRED
   - Trial period ended
   - Can transition to: ACTIVE

## Relationships
- Belongs to one Company
- Has many SubscriptionPlans
- Has many AddOns
- Has many UsageRecords
- Has many BillingCycles

## Validations
- Plan must be valid and active
- Usage limits must be non-negative
- Dates must be chronologically valid
- Currency must match billing settings
- Add-ons must be compatible with plan

## Audit Requirements
- Track all plan changes
- Log usage limit modifications
- Record add-on changes
- Monitor usage patterns

## Billing Rules
- Pro-rate partial periods
- Handle plan upgrades/downgrades
- Calculate overage charges
- Apply volume discounts

## Notification Rules
- Alert on usage threshold reached
- Notify before renewal
- Alert on plan changes
- Warn of commitment end