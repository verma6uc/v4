# Company Application Store Business Object Specification

## 1. Overview
The Application Store is a company-specific catalog of applications that can be deployed across different spaces within that company. It provides discovery and deployment capabilities for space administrators within the company's organizational structure.

## 2. Core Objects

### Company App Store
- **id**: UUID (Primary Key)
- **companyId**: UUID [Required] (The company that owns this store)
- **status**: StoreStatus (ACTIVE, MAINTENANCE)
- **settings**: {
  - requireApprovalForDeployment: Boolean,
  - allowSpaceAdminDeployment: Boolean,
  - maxDeploymentsPerSpace: Integer
}

### Application Entries
- **id**: UUID
- **storeId**: UUID (Reference to Company App Store)
- **applicationId**: UUID (Reference to Application)
- **status**: ApplicationStatus (AVAILABLE, UNAVAILABLE)
- **deploymentCount**: Integer (Number of spaces using this app)
- **addedAt**: DateTime
- **lastDeployedAt**: DateTime

### Space Deployments
- **id**: UUID
- **storeId**: UUID
- **applicationId**: UUID
- **spaceId**: UUID
- **deployedBy**: UUID (User reference)
- **deployedAt**: DateTime
- **status**: DeploymentStatus (ACTIVE, INACTIVE)
- **version**: String

## 3. Core Functions

### Store Management
1. **viewAvailableApplications(spaceId)**
   - Actor: Space Admin
   - User Story: SPA.DEP.US1
   - Returns: List of applications available for deployment
   - Filters based on space type compatibility

2. **searchApplications(spaceId, criteria)**
   - Actor: Space Admin
   - User Story: SPA.DEP.US1
   - Searches within company's available applications
   - Filters by space compatibility

### Deployment Operations
1. **deployApplication(spaceId, applicationId)**
   - Actor: Space Admin
   - User Story: SPA.DEP.US2
   - Validation:
     - Space admin has deployment rights
     - Application is available
     - Space type is compatible
   - Creates deployment record

2. **removeApplication(spaceId, applicationId)**
   - Actor: Space Admin
   - User Story: SPA.DEP.US3
   - Validation:
     - Space admin has rights
     - Application is currently deployed
   - Updates deployment status

## 4. Audit Events

### Deployment Events
```
Actor: {spaceAdminName} ({email})
Action: DEPLOY_APPLICATION
Context: Company: {companyName} > Space: {spaceName}
Details: Deployed application {appName} to space
```

### Removal Events
```
Actor: {spaceAdminName} ({email})
Action: REMOVE_APPLICATION
Context: Company: {companyName} > Space: {spaceName}
Details: Removed application {appName} from space
```

## 5. View Templates

### Space Admin View
```json
{
  "availableApplications": [
    {
      "id": "uuid",
      "name": "Application Name",
      "description": "Description",
      "compatibleWithSpace": boolean,
      "currentlyDeployed": boolean,
      "deploymentCount": number
    }
  ],
  "deployedApplications": [
    {
      "id": "uuid",
      "name": "Application Name",
      "deployedAt": "timestamp",
      "deployedBy": "admin name",
      "status": "status"
    }
  ]
}
```

## 6. Access Control

### Company Admin
- Manage store settings
- View all deployments
- Configure deployment policies

### Space Admin
- View available applications
- Deploy to owned spaces
- Manage space deployments
- View space-specific deployment history

## 7. Deployment Workflow

1. Space Admin browses available applications
2. Selects application for deployment
3. System validates:
   - Space admin rights
   - Space type compatibility
   - Deployment limits
4. Creates deployment record
5. Initiates actual deployment
6. Updates deployment status
7. Notifies relevant stakeholders

## 8. Notifications

### Deployment Related
- Deployment initiated
- Deployment completed
- Deployment failed
- Application removed

### Administrative
- New application available
- Application deprecated
- Store maintenance updates

## 9. Special Considerations

### 1. Space Type Compatibility
- Validate before deployment
- Clear compatibility indicators
- Deployment prerequisites

### 2. Performance
- Efficient space-based filtering
- Quick deployment operations
- Responsive search

### 3. Security
- Space-based access control
- Deployment authorization
- Audit logging

### 4. User Experience
- Clear availability status
- Simple deployment process
- Helpful error messages