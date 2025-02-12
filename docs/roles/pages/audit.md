# Audit Log Pages

## Super Admin Audit (/super-admin/audit)
System-wide audit logs showing:
- All system activities
- Company creations/modifications
- Billing changes
- Security events

Features:
- Date range filtering
- User filtering
- Action type filtering
- Advanced search
- CSV export
- Column sorting

## Company Admin Audit (/company-admin/audit)
Company-scoped audit logs showing:
- Space management activities
- User management
- Application installations
- Configuration changes

Features:
- Date range filtering
- User filtering
- Action type filtering
- Advanced search
- CSV export
- Column sorting

## Space Admin Audit (/space-admin/spaces/:id/audit)
Space-scoped audit logs showing:
- Member activities
- Application usage
- Configuration changes
- Resource utilization

Features:
- Date range filtering
- User filtering
- Action type filtering
- Advanced search
- CSV export
- Column sorting

## Common Elements

### Filters
- Date range picker
- User selector
- Action type dropdown
- Search bar

### Actions
- Download logs (CSV)
- Apply filters
- Clear filters
- Sort columns
- Search entries

### Display
- Tabular format
- Timestamp
- User
- Action
- Details
- Status
- Pagination

### Security
- Role-based access
- Data scope enforcement
- Download authorization
- Filter validation