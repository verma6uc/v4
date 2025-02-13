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
   Role Assignments Table
------------------------- */
CREATE TABLE role_assignments (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,                  -- Reference to the user receiving the role
    role_id UUID NOT NULL,                  -- Reference to the role (platform or application)
    role_type role_assignment_type_enum NOT NULL, -- Indicates if the role is PLATFORM or APPLICATION
    application_id UUID NULL,               -- Nullable, used when assigning an application role
    space_id UUID NULL,                     -- Nullable, used when assigning a space-specific role
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status role_assignment_status_enum NOT NULL DEFAULT 'ACTIVE',  -- Assignment status: ACTIVE or ARCHIVED
    
    CONSTRAINT fk_role_assignments_user 
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,

    CONSTRAINT fk_role_assignments_application 
      FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE SET NULL,

    CONSTRAINT fk_role_assignments_space 
      FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE SET NULL

    -- Note: role_id is polymorphic and may reference either platform_roles or application_roles.
);