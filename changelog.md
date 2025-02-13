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

### Documentation
- Enhanced super admin pages documentation with detailed schema information:
  - Added specific field names and data types from database schema
  - Expanded configuration options and management capabilities

### Todo
- Create schema.sql file to define database structure
- Create user-stories.md to document requirements
- Implement core features based on documentation structure