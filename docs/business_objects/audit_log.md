# Audit Log Business Object Specification

## 1. Core Purpose
Track every action in the system answering:
1. WHO performed the action
2. WHEN it was performed
3. WHAT was done
4. WHERE it was done (hierarchical context)

## 2. Essential Attributes

### Who (Actor Information)
- **actorId**: UUID (Reference to User) [Required]
- **actorName**: String (User's full name at time of action)
- **actorEmail**: String (User's email at time of action)
- **actorDesignation**: String (User's designation at time of action)
- **actorIpAddress**: String

### When (Temporal Information)
- **timestamp**: DateTime (Required, UTC with microsecond precision)
- **systemTimestamp**: DateTime (Server time for reconciliation)

### What (Action Information)
- **action**: String (Required)
  - Specific verb: CREATE, UPDATE, DELETE, VIEW, DEPLOY etc.
- **status**: String (Required)
  - SUCCESS or FAILURE
- **details**: Object
  - oldValue: Any (State before change)
  - newValue: Any (State after change)
  - description: String (Human-readable description of what changed)

### Where (Context Hierarchy)
- **companyId**: UUID (Required)
- **companyName**: String (Company name at time of action)
- **spaceId**: UUID
- **spaceName**: String (Space name at time of action)
- **spacePath**: String (Full space hierarchy path)
- **applicationId**: UUID
- **applicationName**: String (Application name at time of action)

## 3. Log Templates

### Template Structure
```
{actorName} ({actorEmail}) [actorDesignation] | {action} | {timestamp}
In: Company: {companyName} > Space: {spaceName} > App: {applicationName}
Details: {description}
```

### Example Templates:

1. **User Creation**
```
John Doe (john@company.com) [HR Manager] | CREATE_USER | 2024-02-12T15:30:00Z
In: Company: Acme Corp > Space: HR Department
Details: Created new user account for Jane Smith (jane@company.com)
```

2. **Application Deployment**
```
Sarah Connor (sarah@company.com) [Space Admin] | DEPLOY_APPLICATION | 2024-02-12T16:45:00Z
In: Company: Acme Corp > Space: Sales > App: CRM System
Details: Deployed version 2.1.0 to production environment
```

3. **Space Configuration**
```
Mike Ross (mike@company.com) [Company Admin] | UPDATE_SPACE_CONFIG | 2024-02-12T17:15:00Z
In: Company: Acme Corp > Space: Marketing
Details: Updated user access policy from "Open" to "Restricted"
```

4. **Role Assignment**
```
Lisa Brown (lisa@company.com) [Team Lead] | ASSIGN_ROLE | 2024-02-12T14:20:00Z
In: Company: Acme Corp > Space: Engineering > App: Build System
Details: Assigned "Developer" role to James Wilson (james@company.com)
```

## 4. Implementation Requirements

### 1. Performance
- Write optimization for high-volume logging
- Efficient indexing on all search fields
- Partitioning by company and date

### 2. Search Capabilities
- Quick filters for each context level (Company, Space, Application)
- Full-text search across all fields
- Date range searches
- Actor-based searches

### 3. Retention
- Company-specific retention policies
- Automated archival process
- Compliance with legal requirements

### 4. Export Formats
- CSV with all context fields
- JSON with full detail
- PDF for formal audit reports

## 5. Access Control

### 1. View Permissions
- Company Admins: All logs within company
- Space Admins: All logs within their spaces
- Regular Users: No access

### 2. Export Permissions
- Company Admins: Can export all company logs
- Space Admins: Can export space-specific logs
- Requires explicit export permission

## 6. Critical Success Factors

### 1. Completeness
- No missing context in any log entry
- Full hierarchical path always available
- All actor details captured at time of action

### 2. Performance
- Sub-second write times
- Quick search response
- Efficient storage utilization

### 3. Usability
- Clear, readable log formats
- Easy filtering and search
- Meaningful exports

### 4. Compliance
- Tamper-proof records
- Complete audit trails
- Data retention compliance