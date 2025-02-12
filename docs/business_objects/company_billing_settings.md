# Company Billing Settings Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- created_at: DateTime
- updated_at: DateTime

### Billing Contact
- billing_contact_name: String (required)
- billing_contact_email: String (required)
- billing_contact_phone: String
- billing_department: String

### Billing Address
- billing_street_address: String (required)
- billing_address_line2: String
- billing_city: String (required)
- billing_state_province: String (required)
- billing_postal_code: String (required)
- billing_country: String (required, ISO country code)

### Payment Settings
- default_payment_method: Enum ['credit_card', 'bank_transfer', 'direct_debit']
- payment_terms: Enum ['net_30', 'net_45', 'net_60']
- currency: String (required, ISO currency code)
- tax_id: String
- vat_number: String
- po_required: Boolean
- po_number_format: String

### Invoice Settings
- invoice_delivery_method: Enum ['email', 'portal', 'api']
- invoice_email_recipients: String[]
- invoice_frequency: Enum ['monthly', 'quarterly', 'yearly']
- invoice_language: String (ISO language code)
- invoice_template_id: UUID
- consolidate_invoices: Boolean

### Credit Settings
- credit_limit: Decimal
- credit_hold_threshold: Decimal
- auto_payment_enabled: Boolean
- late_payment_interest_rate: Decimal
- grace_period_days: Integer

## States
1. SETUP_INCOMPLETE
   - Missing required billing information
   - Can transition to: ACTIVE

2. ACTIVE
   - Billing fully configured
   - Can transition to: ON_HOLD, SUSPENDED

3. ON_HOLD
   - Credit limit exceeded
   - Can transition to: ACTIVE, SUSPENDED

4. SUSPENDED
   - Payment issues or violations
   - Can transition to: ACTIVE

## Relationships
- Belongs to one Company
- Has many PaymentMethods
- Has many InvoiceTemplates
- Has many BillingContacts
- Has many PaymentRecords

## Validations
- Email addresses must be valid format
- Phone numbers must be valid format
- Country codes must be valid ISO codes
- Currency codes must be valid ISO codes
- Tax IDs must match country format
- Credit values must be non-negative

## Audit Requirements
- Track all setting changes
- Log payment method updates
- Record credit limit changes
- Monitor payment status changes

## Compliance Rules
- Validate tax ID formats by country
- Ensure VAT number validity
- Maintain payment record history
- Follow regional billing regulations

## Notification Rules
- Alert on credit limit approach
- Notify of payment method expiry
- Send invoice delivery confirmations
- Alert on payment failures