# Role Pages Documentation

This directory contains documentation for each role's pages and their functionality.

## Role Hierarchy

1. Super Admin
   - System-wide administration
   - [Page Documentation](./super_admin.md)
   - [Audit Documentation](./audit.md#super-admin-audit)

2. Company Admin
   - Company-level administration
   - [Page Documentation](./company_admin.md)
   - [Audit Documentation](./audit.md#company-admin-audit)

3. Space Admin
   - Space-level administration
   - [Page Documentation](./space_admin.md)
   - [Audit Documentation](./audit.md#space-admin-audit)

4. Creator
   - Application creation and management
   - [Page Documentation](./creator.md)
   - Application-specific audit logs

## Common Patterns

### URL Structure
- Each role has its own URL prefix (e.g., /super-admin/, /company-admin/, /space-admin/, /creator/)
- Detail pages use :id parameter (e.g., /company-admin/spaces/:id)
- Settings pages are consistently named (e.g., /*/settings)
- Audit pages follow role scope (e.g., /super-admin/audit, /company-admin/audit)

### Page Elements
- Dashboard as main entry point
- List views with filters
- Detail views with tabs
- Modal-based actions
- Consistent navigation
- Audit logging

### Interactions
- Most creation/editing via modals
- Confirmations for critical actions
- Inline validations
- Real-time updates
- Activity tracking

### Access Control
- Role-based access
- Scope-based permissions
- Action auditing
- Security enforcement

### Audit Features
- Each role has audit capabilities
- Scoped to role's permissions
- Common filtering and search
- Export functionality
- Detailed activity logs