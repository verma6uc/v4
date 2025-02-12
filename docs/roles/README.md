# Role System

## Core Roles

The system has four core roles arranged in a hierarchical structure:

1. **Super Admin**
   - System-wide administration
   - Platform governance
   - Company oversight
   - Global configuration

2. **Company Admin**
   - Company-wide administration
   - Resource management
   - User management
   - Company configuration

3. **Space Admin**
   - Space-level administration
   - Space resource management
   - Space user management
   - Space configuration

4. **Creator**
   - Application creation
   - Content management
   - Resource utilization
   - Feature development

## Role Hierarchy

```
Super Admin
    └── Company Admin
            └── Space Admin
                    └── Creator
```

## Access Scope

- **Super Admin**: Full system access
- **Company Admin**: Full company access
- **Space Admin**: Full space access
- **Creator**: Limited space access

## Role Inheritance

Each role inherits permissions from roles below it in the hierarchy:

- Super Admin has all permissions
- Company Admin has Space Admin and Creator permissions
- Space Admin has Creator permissions
- Creator has base permissions

## Role Assignment Rules

1. Super Admin
   - Assigned by system configuration
   - Limited to trusted personnel
   - Requires additional verification

2. Company Admin
   - Assigned by Super Admin
   - One or more per company
   - Company-specific scope

3. Space Admin
   - Assigned by Company Admin
   - One or more per space
   - Space-specific scope

4. Creator
   - Assigned by Space Admin
   - Multiple per space
   - Limited to assigned spaces

## Permission Inheritance

Permissions flow downward in the hierarchy:

1. Super Admin
   - System configuration
   - Company management
   - All lower permissions

2. Company Admin
   - Company configuration
   - Space management
   - All lower permissions

3. Space Admin
   - Space configuration
   - User management
   - All lower permissions

4. Creator
   - Application creation
   - Content management
   - Resource utilization