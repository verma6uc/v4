# Space Admin Pages

## Dashboard (/space-admin/dashboard)
Main space overview showing:
- Space status
- Usage metrics
- Active users
- Recent activities
- System alerts

Key Actions:
- View metrics
- Handle alerts
- Monitor activity

## Members (/space-admin/members)
Member management showing:
- Member directory
- Status indicators
- Quick actions
- Activity feed

### Member Detail (/space-admin/members/:id)
Detailed member view showing:
- User profile
- Activity history
- Current status
- Recent actions

Key Actions:
- View profile
- Monitor activity
- Manage status

## Applications (/space-admin/applications)
Application management showing:
- Installed applications
- Application status
- Usage statistics
- Configuration status

Key Actions:
- View applications
- Configure apps
- Monitor status
- View documentation

## Audit (/space-admin/spaces/:id/audit)
Space-scoped audit logs showing:
- Member activities
- Application usage
- Configuration changes
- Resource utilization

Key Actions:
- View audit logs
- Filter entries
- Export logs
- Search history

## Settings (/space-admin/settings)
Space configuration showing:
- Space profile
- Security settings
- Integration settings

Key Actions:
- Update profile
- Configure security
- Manage integrations

## Notes
- All changes are logged
- Critical actions need confirmation
- Most management via modals
- Detail views use tabs
- Resource management handled at company level
- Access control managed by company admin