# Email Template Business Object Specification

## 1. Overview
Email Template manages the structure and content of all system communications, supporting both system-defined and custom templates with company branding and localization.

## 2. Core Attributes

### Basic Information
- **id**: UUID (Primary Key)
- **companyId**: UUID [Required]
- **name**: String [Required]
- **code**: String [Required, Unique per company]
  - Identifier for system use
- **type**: TemplateType [Required]
  - Values: SYSTEM, CUSTOM
- **status**: TemplateStatus
  - Values: DRAFT, ACTIVE, INACTIVE

### Content Management
- **subject**: Object [Required]
  - Template for email subject
  - Supports variables
  - Localization support
- **body**: Object [Required]
  - HTML content
  - Text content
  - Variable placeholders
  - Localization support
- Used in: CCMT.CMST.US3

### Branding Elements
- **header**: Object
  - logo: ImageMetadata
  - backgroundColor: String
  - textColor: String
- **footer**: Object
  - companyInfo: String
  - socialLinks: Array
  - disclaimer: String
- Used in: CCMT.CMST.US3

### Variable Configuration
- **variables**: Array of {
  - name: String,
  - type: String,
  - required: Boolean,
  - defaultValue: String,
  - description: String
}
- **validationRules**: Object
  - Rules for variable values

### System Fields
- **createdAt**: DateTime
- **createdBy**: UUID
- **updatedAt**: DateTime
- **updatedBy**: UUID
- **version**: Integer

## 3. Template Types

### System Templates
1. **User Management**
```json
{
  "code": "USER_INVITATION",
  "required_vars": ["userName", "inviteLink", "expiryTime"],
  "subject": "Welcome to {companyName}",
  "has_action": true,
  "action_type": "ACTIVATION"
}
```

2. **Security Notifications**
```json
{
  "code": "SECURITY_ALERT",
  "required_vars": ["alertType", "deviceInfo", "timestamp"],
  "subject": "Security Alert: {alertType}",
  "has_action": false
}
```

### Custom Templates
```json
{
  "code": "CUSTOM_NOTIFICATION",
  "variables": ["customVar1", "customVar2"],
  "subject": "Custom subject with {customVar1}",
  "has_action": true,
  "action_type": "CUSTOM"
}
```

## 4. Methods/Operations

### Template Management
1. **createTemplate(companyId, details)**
   - Actor: Company Admin
   - User Story: CCMT.CMST.US3
   - Validation:
     - Unique code
     - Required elements
     - Valid variables
   - Creates new template

2. **updateTemplate(templateId, updates)**
   - Actor: Company Admin
   - User Story: CCMT.CMST.US3
   - Validation:
     - Template exists
     - Valid changes
     - Version control
   - Updates template version

### Content Operations
1. **previewTemplate(templateId, testData)**
   - Actor: Company Admin
   - Renders template with test data
   - Shows all variations
   - Validates variables

2. **validateContent(templateId, content)**
   - Actor: System
   - Checks HTML validity
   - Validates variables
   - Verifies structure

## 5. Required Templates

### User Lifecycle
1. **Invitation**
```html
<template>
  <subject>Welcome to {companyName}</subject>
  <body>
    <h1>Welcome, {userName}!</h1>
    <p>Click the link below to get started:</p>
    <action_button href="{inviteLink}">
      Accept Invitation
    </action_button>
    <p>Link expires in {expiryTime}</p>
  </body>
</template>
```

2. **Password Reset**
```html
<template>
  <subject>Password Reset Request</subject>
  <body>
    <h1>Password Reset</h1>
    <p>Click below to reset your password:</p>
    <action_button href="{resetLink}">
      Reset Password
    </action_button>
    <p>Link expires in {expiryTime}</p>
  </body>
</template>
```

## 6. Variable System

### Variable Types
1. **System Variables**
   - {companyName}
   - {userName}
   - {currentDate}
   - {platformUrl}

2. **Template Variables**
   - Defined per template
   - Type validation
   - Required/Optional
   - Default values

### Variable Processing
1. **Resolution Order**
   - Template defaults
   - System values
   - Provided values
   - Error handling

2. **Validation Rules**
   - Type checking
   - Required fields
   - Format validation
   - Cross-field validation

## 7. Localization Support

### Language Management
- Default language
- Available translations
- Fallback handling
- RTL support

### Translation Structure
```json
{
  "en": {
    "subject": "Welcome to {companyName}",
    "body": "..."
  },
  "es": {
    "subject": "Bienvenido a {companyName}",
    "body": "..."
  }
}
```

## 8. Special Considerations

### Performance
1. **Template Caching**
   - Active templates
   - Compiled versions
   - Language variants

2. **Rendering Optimization**
   - Pre-compilation
   - Partial caching
   - Batch processing

### Security
1. **Content Safety**
   - HTML sanitization
   - Link validation
   - Image proxying

2. **Variable Escaping**
   - HTML escape
   - URL encode
   - Script prevention

### Maintenance
1. **Version Control**
   - Change tracking
   - Rollback capability
   - Audit history

2. **Usage Tracking**
   - Send statistics
   - Error rates
   - Performance metrics

## 9. Integration Points

### Email Service
- Template rendering
- Sending queue
- Delivery tracking

### User System
- Variable resolution
- Permission checking
- User preferences

### Branding System
- Company assets
- Style guidelines
- Theme integration