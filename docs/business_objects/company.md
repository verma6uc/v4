# Company Business Object Specification

## 1. Overview
The Company object represents an individual organization using the platform. It is the top-level tenant entity that contains all other objects (Spaces, Users, Applications).

## 2. Attributes

### Core Attributes
- **id**: UUID (Primary Key, System Generated)
- **name**: String (Required, Unique across platform)
  - Validation: 3-100 characters, alphanumeric with spaces
  - Used in: CPOV.COCR.US1
- **identifier**: String (Required, Unique across platform)
  - Validation: 3-50 characters, alphanumeric only, no spaces
  - Used in: CPOV.COCR.US1, CPOV.COCR.US2
- **status**: CompanyStatus (Enum, Required)
  - Values: DRAFT, ACTIVE, SUSPENDED, ARCHIVED, DELETED
  - Used in: COMM.COSM.US1, COMM.COSM.US3, COMM.COSM.US5

### Contact Information
- **primaryEmail**: String (Required)
  - Validation: Valid email format
  - Used in: CPOV.COCR.US1
- **primaryPhone**: String
  - Validation: Valid international phone format
  - Used in: CPOV.ACAT.US1
- **website**: String
  - Validation: Valid URL format
- **physicalAddress**: Object
  - street: String
  - city: String
  - state: String
  - country: String
  - postalCode: String
  - Used in: CPOV.ACAT.US1

### Branding
- **logo**: Object
  - url: String
  - metadata: {
    originalName: String,
    mimeType: String,
    size: Number
  }
  - Used in: CPOV.COCR.US1, CCMT.CPMT.US2

### System Fields
- **createdAt**: DateTime (System Generated)
- **createdBy**: UUID (Reference to User)
- **updatedAt**: DateTime (System Generated)
- **updatedBy**: UUID (Reference to User)
- **activatedAt**: DateTime (When company becomes ACTIVE)
- **suspendedAt**: DateTime
- **suspendedReason**: String
- **archivedAt**: DateTime
- **archivedReason**: String

### Configuration
- **defaultLocale**: String (Required)
  - Default: "en-US"
  - Used in: CCMT.DLOC.US1
- **timezone**: String (Required)
  - Default: "UTC"
  - Used in: CCMT.DLOC.US1
- **securitySettings**: Object
  - passwordPolicy: {
    minLength: Number,
    requireSpecialChar: Boolean,
    requireNumber: Boolean,
    requireUppercase: Boolean,
    expiryDays: Number
  }
  - sessionTimeout: Number (minutes)
  - maxLoginAttempts: Number
  - Used in: CCMT.SECF.US1, CCMT.SECF.US2

## 3. State Machine

### States
1. **DRAFT**
   - Initial state during company creation
   - Limited access to setup functions only
   - User Story: CPOV.COCR.US1

2. **ACTIVE**
   - Normal operating state
   - Full platform access
   - User Story: CPOV.ACAT.US1

3. **SUSPENDED**
   - Temporarily disabled
   - Read-only access
   - No new user activations
   - User Story: COMM.COSM.US1

4. **ARCHIVED**
   - Permanently disabled
   - Read-only access for audit purposes
   - No user access
   - User Story: COMM.COSM.US5

5. **DELETED**
   - Marked for deletion
   - No access
   - Data retained per retention policy
   - User Story: COMM.COSM.US6

### State Transitions

1. **DRAFT → ACTIVE**
   - Trigger: Company Admin completes activation
   - Validation: Required fields completed
   - User Story: CPOV.ACAT.US1
   - Audit Log: "Company {name} activated by {actor}"
   - Notification: "Company {name} is now active"

2. **ACTIVE → SUSPENDED**
   - Trigger: Super Admin suspends company
   - Required: Suspension reason
   - User Story: COMM.COSM.US1
   - Audit Log: "Company {name} suspended by {actor}. Reason: {reason}"
   - Notifications:
     - To Super Admin: "Company {name} has been suspended"
     - To Company Admin: "Your company access has been suspended"
     - To All Users: "Company access is currently suspended"

3. **SUSPENDED → ACTIVE**
   - Trigger: Super Admin reactivates company
   - Required: Reactivation reason
   - User Story: COMM.COSM.US3
   - Audit Log: "Company {name} reactivated by {actor}. Reason: {reason}"
   - Notifications:
     - To Super Admin: "Company {name} has been reactivated"
     - To Company Admin: "Your company access has been restored"
     - To All Users: "Company access has been restored"

4. **ACTIVE/SUSPENDED → ARCHIVED**
   - Trigger: Super Admin archives company
   - Required: Archival reason
   - User Story: COMM.COSM.US5
   - Audit Log: "Company {name} archived by {actor}. Reason: {reason}"
   - Notifications:
     - To Super Admin: "Company {name} has been archived"
     - To Company Admin: "Your company has been archived"

5. **ARCHIVED → DELETED**
   - Trigger: Super Admin initiates deletion
   - Required: Deletion reason, Secondary verification
   - User Story: COMM.COSM.US6
   - Audit Log: "Company {name} marked for deletion by {actor}. Reason: {reason}"
   - Notifications:
     - To Super Admin: "Company {name} has been marked for deletion"
     - To Company Admin: "Your company has been scheduled for deletion"

## 4. Actions/Methods

### Creation and Setup
1. **createCompany(name, identifier, email)**
   - Actor: Super Admin
   - User Story: CPOV.COCR.US1
   - Validation:
     - Unique company name and identifier
     - Valid email format
   - Creates company in DRAFT state
   - Audit Log: "New company {name} created by {actor}"

2. **updateCompanyDetails(companyId, details)**
   - Actor: Super Admin, Company Admin
   - User Story: CPOV.COCR.US2, CCMT.CPMT.US1
   - Validation:
     - Company in DRAFT or ACTIVE state
     - Required fields present
   - Audit Log: "Company {name} details updated by {actor}"

### State Management
1. **activateCompany(companyId)**
   - Actor: Company Admin
   - User Story: CPOV.ACAT.US1
   - Validation:
     - All required fields completed
     - Admin account activated
   - Changes state to ACTIVE
   - Audit Log: "Company {name} activated by {actor}"

2. **suspendCompany(companyId, reason)**
   - Actor: Super Admin
   - User Story: COMM.COSM.US1
   - Validation:
     - Valid suspension reason
     - Company in ACTIVE state
   - Changes state to SUSPENDED
   - Audit Log: "Company {name} suspended by {actor}. Reason: {reason}"

### Configuration
1. **updateSecuritySettings(companyId, settings)**
   - Actor: Company Admin
   - User Story: CCMT.SECF.US1, CCMT.SECF.US2
   - Validation:
     - Company in ACTIVE state
     - Valid security parameters
   - Audit Log: "Security settings updated for company {name} by {actor}"

2. **updateLocalization(companyId, locale, timezone)**
   - Actor: Company Admin
   - User Story: CCMT.DLOC.US1
   - Validation:
     - Valid locale and timezone
     - Company in ACTIVE state
   - Audit Log: "Localization settings updated for company {name} by {actor}"

## 5. Relationships

1. **Users (One-to-Many)**
   - Company has multiple users
   - Cascade suspend/archive operations

2. **Spaces (One-to-Many)**
   - Company contains multiple spaces
   - Hierarchical organization structure

3. **Applications (One-to-Many)**
   - Company owns multiple applications
   - Deployment managed through spaces

4. **SpaceTypes (One-to-Many)**
   - Company defines multiple space types
   - Used for space creation templates

## 6. Monitoring & Metrics

1. **Health Metrics**
   - User Story: COMM.COMN.US1
   - System uptime
   - Error rates
   - Resource consumption
   - Critical incidents

2. **Usage Metrics**
   - User Story: COMM.COMN.US2
   - Active user count
   - Feature utilization
   - API consumption
   - Storage usage

3. **Growth Metrics**
   - User Story: COMM.COMN.US3
   - User growth rate
   - Application creation rate
   - Space utilization trends
   - Resource usage trends