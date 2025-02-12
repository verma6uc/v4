# Company Admin Pages

## Dashboard (/company-admin/dashboard)
Main company overview showing:
- Company status
- Growth metrics
- Resource metrics
- Usage metrics
- Space utilization
- User activities
- System alerts

Key Actions:
- View metrics
- Handle alerts
- Export reports

## Spaces (/company-admin/spaces)
Space management showing:
- Space hierarchy
- Space statuses
- Resource allocation
- Quick actions

### Space Detail (/company-admin/spaces/:id)
Detailed space view with tabs:

1. Overview Tab
   - Space information
   - Key metrics
   - Status
   - Quick actions

2. Members Tab
   - Member list
   - Role assignments
   - Access management

3. Resources Tab
   - Resource allocation
   - Usage tracking
   - Quotas

4. Applications Tab
   - Installed apps
   - App status
   - Configurations

5. Settings Tab
   - Space configuration
   - Integration settings
   - Access controls

## Users (/company-admin/users)
User management showing:
- User directory
- Role assignments
- Status indicators
- Quick actions

### User Detail (/company-admin/users/:id)
Detailed user view with:
- User profile
- Role assignments
- Access levels
- Activity history

## App Store (/company-admin/app-store)
Application marketplace showing:
- Available applications
- Installed applications
- Featured apps
- Categories
- Installation status

## Billing (/company-admin/billing)
Billing management showing:
- Current subscription
- Usage details
- Payment history
- Invoices

## Audit (/company-admin/audit)
Company-wide audit logs showing:
- Space operations
- User management
- Application activities
- Configuration changes

Key Actions:
- View audit logs
- Filter entries
- Export logs
- Search history

## Settings (/company-admin/settings)
Company configuration showing:
- Company profile
- Security settings
- Integration settings

## Notes
- All changes are logged
- Critical actions need confirmation
- Most management via modals
- Detail views use tabs