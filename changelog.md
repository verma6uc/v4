# Changelog

## [Unreleased]

### Added
- Initial project setup with React + TypeScript + Vite
- Documentation site structure with features:
  - Multi-tenancy support
  - User management
  - Organization hierarchy
  - Billing and subscriptions
  - Company management
  - Space administration
  - Integrations
- Form components with enhanced styling:
  - Custom select component with white background and improved dropdown
  - Radio buttons with better hover/focus states
  - Checkboxes with improved visual feedback
  - Multi-select component with tag-based selection
- Card components for business objects:
  - Mini and Macro card variants for:
    - Users
    - Companies
    - Spaces
    - Applications
    - Invoices
    - Subscription Plans
  - Modular organization with separate example data and sections

- Added header component to showcase layout for better navigation and context
### Fixed
- Tables showcase page:
  - Added UUID generation for table data
  - Fixed prop name mismatch in AdvancedTable component

### Components
- Created reusable base components:
  - BaseCard component for consistent card styling
  - CompanyStatusBadge for status indicators
- Improved company components:
  - Split into CompanyMiniCard and CompanyMacroCard variants
  - Added proper TypeScript types based on schema

- Added role management components:
  - RoleManagementCard for platform and application roles
  - Added role types based on database schema
  - Added role assignment handling
  - Added role status indicators

- Added session management components:
  - SessionManagementCard for tracking user sessions
  - FailedLoginCard for monitoring login attempts
  - Added session status tracking
  - Added failed login monitoring

- Added audit and activity tracking:
  - AuditLogCard for displaying system audit events
  - ActivityLogCard for user activity monitoring
  - Added detailed geo-location tracking
  - Added device and browser tracking

### Documentation
- Enhanced super admin pages documentation with detailed schema information:
  - Added specific field names and data types from database schema
  - Expanded configuration options and management capabilities

### Todo
- Create schema.sql file to define database structure
- Create user-stories.md to document requirements
- Implement core features based on documentation structure