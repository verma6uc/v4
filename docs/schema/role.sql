/* -------------------------
   Enum Type Definitions
------------------------- */

/* Enum for platform role names */
DROP TYPE IF EXISTS platform_role_name_enum;
CREATE TYPE platform_role_name_enum AS ENUM ('SUPER_ADMIN', 'COMPANY_ADMIN', 'SPACE_ADMIN', 'USER_MANAGER');

/* Enum for role assignment type */
DROP TYPE IF EXISTS role_assignment_type_enum;
CREATE TYPE role_assignment_type_enum AS ENUM ('PLATFORM', 'APPLICATION');

/* Enum for role assignment status */
DROP TYPE IF EXISTS role_assignment_status_enum;
CREATE TYPE role_assignment_status_enum AS ENUM ('ACTIVE', 'ARCHIVED');

/* Enum for platform role type */
DROP TYPE IF EXISTS platform_role_type_enum;
CREATE TYPE platform_role_type_enum AS ENUM ('SYSTEM', 'COMPANY', 'SPACE');

/* -------------------------
   Applications Roles Table
------------------------- */
CREATE TABLE application_roles (
    id UUID PRIMARY KEY,
    application_id UUID NOT NULL,         -- Reference to the parent application
    name VARCHAR(50) NOT NULL,             -- Role identifier (e.g., APP_ADMIN, VIEWER)
    display_name VARCHAR(100) NOT NULL,    -- Localized display name
    description TEXT NOT NULL,             -- Detailed role description
    auto_assignable BOOLEAN NOT NULL DEFAULT false,  -- If true, SARA can automatically assign this role
    requires_approval BOOLEAN NOT NULL DEFAULT false, -- Whether manual approval is required
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_application_roles_application 
      FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
);

/* -------------------------
   Platform Roles Table
------------------------- */
CREATE TABLE platform_roles (
    id UUID PRIMARY KEY,
    name platform_role_name_enum NOT NULL,  -- Role name as an enum (e.g., SUPER_ADMIN, COMPANY_ADMIN)
    display_name VARCHAR(100) NOT NULL,      -- Localized display name
    description TEXT NOT NULL,               -- Detailed description of the role
    role_type platform_role_type_enum NOT NULL,  -- Scope indicator (ENUM: SYSTEM, COMPANY, SPACE)
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

/* -------------------------
   Application Role Assignments Table
------------------------- */
CREATE TABLE application_role_assignments (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,                  
    application_role_id UUID NOT NULL,       
    application_id UUID NOT NULL,            
    space_id UUID NULL,                      
    assigned_at TIMESTAMPTZ DEFAULT now(),
    status role_assignment_status_enum NOT NULL DEFAULT 'ACTIVE',
    
    CONSTRAINT fk_application_role_assignments_user 
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_application_role_assignments_role
        FOREIGN KEY (application_role_id) REFERENCES application_roles (id),
    CONSTRAINT fk_application_role_assignments_application 
        FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE,
    CONSTRAINT fk_application_role_assignments_space 
        FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE SET NULL
);