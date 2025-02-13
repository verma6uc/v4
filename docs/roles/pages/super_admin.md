# Super Admin Pages

## Dashboard (/super-admin/dashboard)
Main system overview showing:
- System status
- Growth metrics
- Resource metrics
- Usage metrics (based on usage_records table)
  - User count
  - Storage usage
  - API calls
  - Data transfer
- Space utilization
- User activities
- System alerts

Key Actions:
- View metrics
- Handle alerts
- Export reports

## Companies (/super-admin/companies)
Company management showing:
- Company list with fields:
  - Name
  - Identifier
  - Status (ACTIVE, SUSPENDED, ARCHIVED)
  - Primary email/phone
  - Website
  - Address details
  - Creation date
- Status indicators
- Quick actions

### Company Detail (/super-admin/companies/:id)
Detailed company view with tabs:

1. Overview Tab
   - Company profile
     - Basic info (name, identifier, status)
     - Contact details
     - Address information
     - Logo
   - Key metrics
   - Status management (activate, suspend, archive)
   - Quick actions

2. Configuration Tab
   - Localization settings
     - Language (en, es, fr, de, it, pt, zh, ja, ko, ru)
     - Timezone
     - Date format (DD_MM_YYYY, MM_DD_YYYY)
     - Time format (12/24 hour)
     - Number format (US/EU)
     - Week start (Monday/Sunday)
     - Currency code
   - Security settings
     - MFA configuration
     - Session management
     - IP restrictions
     - Password policies
   - App store settings
     - Status management
     - Deployment controls
     - Space admin permissions

3. Users Tab
   - User list with fields:
     - Name (first_name, last_name)
     - Email
     - Status (INVITED, ACTIVE, SUSPENDED, BLOCKED, ARCHIVED)
     - Designation
     - Platform role
     - Creation date
   - Role assignments
   - Access levels
   - User status management

4. Billing Tab
   - Current subscription plan details:
     - Plan name/code
     - Status
     - Billing frequency
     - Base price details
     - Resource limits
     - Contract terms
   - Usage tracking:
     - User count
     - Storage usage
     - API calls
     - Data transfer
   - Invoices:
     - Invoice number
     - Status
     - Type
     - Amount details
     - Due dates
   - Payment history

5. Email Templates Tab
   - Template management:
     - System templates
     - Custom templates
   - Template fields:
     - Name
     - Code
     - Type (SYSTEM/CUSTOM)
     - Status (DRAFT/ACTIVE/INACTIVE)
     - Content (subject, body)
     - Styling options

## Billing (/super-admin/billing)
Billing management showing:
- Plan management
  - Plan details:
    - Name/code
    - Status (DRAFT, ACTIVE, GRANDFATHERED, DISCONTINUED)
    - Visibility (PUBLIC, PRIVATE, HIDDEN)
    - Pricing structure
    - Resource limits
    - Contract terms
- Global pricing
- Invoice tracking:
  - Status tracking (DRAFT, PENDING, ISSUED, PAID, VOID, CANCELLED)
  - Payment processing
  - Credit management
  - Line item details

Key Actions:
- Manage subscription plans
- View and manage invoices
- Track revenue
- Handle payments and credits

## Audit (/super-admin/audit)
System-wide audit logs showing:
- All system activities
- Company operations
- Billing changes
- Security events
- User sessions
- Failed login attempts

Key Actions:
- View audit logs with filters:
  - Date range
  - Company
  - User
  - Event type
  - Status
- Export logs
- Search history
- Generate reports

## Common Elements
- All changes are logged in audit tables
- Critical actions need confirmation
- Most management via modals
- Detail views use tabs
- Status changes require reasons
- All data follows schema constraints