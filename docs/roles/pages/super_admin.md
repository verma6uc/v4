# Super Admin Pages

## Dashboard (/super-admin/dashboard)
Main system overview showing:
- System status
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

## Companies (/super-admin/companies)
Company management showing:
- Company list
- Status indicators
- Quick actions

### Company Detail (/super-admin/companies/:id)
Detailed company view with tabs:

1. Overview Tab
   - Company profile
   - Key metrics
   - Status
   - Quick actions

2. Spaces Tab
   - Space list
   - Space hierarchy
   - Space usage

3. Users Tab
   - User list
   - Role assignments
   - Access levels

4. Billing Tab
   - Current plan
   - Usage details
   - Payment status

5. Usage Tab
   - Resource usage
   - Feature usage
   - Activity logs

## Billing (/super-admin/billing)
Billing management showing:
- Plan management
- Global pricing
- Invoice tracking

Key Actions:
- Manage plans
- View invoices
- Track revenue

## Audit (/super-admin/audit)
System-wide audit logs showing:
- All system activities
- Company operations
- Billing changes
- Security events

Key Actions:
- View audit logs
- Filter entries
- Export logs
- Search history

## Common Elements
- All changes are logged
- Critical actions need confirmation
- Most management via modals
- Detail views use tabs