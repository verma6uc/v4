/* =====================================================
   Flattened Space Domain Tables and Enums (with Separate Options Table)
   ===================================================== */

/* -----------------------------
   ENUM Type Definitions
   ----------------------------- */

/* Enum for Space status */
DROP TYPE IF EXISTS space_status_enum;
CREATE TYPE space_status_enum AS ENUM ('DRAFT', 'ACTIVE', 'SUSPENDED', 'ARCHIVED');

/* Enum for Space Type status */
DROP TYPE IF EXISTS space_type_status_enum;
CREATE TYPE space_type_status_enum AS ENUM ('ACTIVE', 'SUSPENDED', 'ARCHIVED');

/* Enum for Space Field Type */
DROP TYPE IF EXISTS space_field_type_enum;
CREATE TYPE space_field_type_enum AS ENUM ('TEXT', 'NUMBER', 'DATE', 'DROPDOWN', 'BOOLEAN', 'EMAIL', 'PHONE');

/* -----------------------------
   Space Types Table (Flattened)
   ----------------------------- */
CREATE TABLE space_types (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,              -- Owning company
    parent_space_type_id UUID,             -- Optional: Parent space type for hierarchy
    name VARCHAR(100) NOT NULL,            -- Display name (3-100 characters)
    identifier VARCHAR(50) NOT NULL,       -- Unique identifier (3-50 characters, no spaces)
    description TEXT,                      -- Description of the space type
    status space_type_status_enum NOT NULL, -- ACTIVE, SUSPENDED, or ARCHIVED
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_space_types_company 
        FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE,
    CONSTRAINT fk_space_types_parent 
        FOREIGN KEY (parent_space_type_id) REFERENCES space_types (id) ON DELETE SET NULL
);

/* -----------------------------
   Space Type Fields Table
   ----------------------------- */
/*
   This table stores the definitions for fields associated with a space type.
   It includes validation options such as min/max lengths, regex pattern,
   numeric min/max, and a default value.
   The options for dropdown fields are stored in a separate table.
*/
CREATE TABLE space_type_fields (
    id UUID PRIMARY KEY,
    space_type_id UUID NOT NULL,           -- Reference to a space type
    field_name VARCHAR(100) NOT NULL,       -- Internal name (identifier)
    field_label VARCHAR(150) NOT NULL,      -- User-friendly label
    field_type space_field_type_enum NOT NULL,  -- Field type
    is_required BOOLEAN NOT NULL DEFAULT false,
    min_length INTEGER,                     -- For text fields
    max_length INTEGER,                     -- For text fields
    pattern TEXT,                           -- Regex pattern for validation
    min_value NUMERIC,                      -- For numeric fields
    max_value NUMERIC,                      -- For numeric fields
    default_value TEXT,                     -- Default value stored as text
    display_order INTEGER,                  -- Order for display purposes
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_space_type_fields_space_type 
        FOREIGN KEY (space_type_id) REFERENCES space_types (id) ON DELETE CASCADE
);

/* -----------------------------
   Space Type Field Options Table
   ----------------------------- */
/*
   For fields of type DROPDOWN, the available options are stored here.
*/
CREATE TABLE space_type_field_options (
    id UUID PRIMARY KEY,
    field_id UUID NOT NULL,                -- Reference to the space type field (must be DROPDOWN type)
    option_value TEXT NOT NULL,            -- The value for the dropdown option
    display_order INTEGER,                 -- Order in which the option should appear
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_field_options_field 
        FOREIGN KEY (field_id) REFERENCES space_type_fields (id) ON DELETE CASCADE
);

/* -----------------------------
   Spaces Table (Flattened)
   ----------------------------- */
CREATE TABLE spaces (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,              -- Owning company
    space_type_id UUID NOT NULL,           -- Reference to a space type
    parent_space_id UUID,                  -- Optional: Parent space for hierarchy
    name VARCHAR(100) NOT NULL,            -- Space name
    identifier VARCHAR(50) NOT NULL,       -- Unique identifier within the company
    status space_status_enum NOT NULL,     -- DRAFT, ACTIVE, SUSPENDED, or ARCHIVED

    /* Flattened Hierarchical Attributes */
    path VARCHAR(255),                     -- e.g., '/parentID/currentID'
    level INTEGER,                         -- Depth in hierarchy
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    activated_at TIMESTAMPTZ,
    suspended_at TIMESTAMPTZ,
    suspended_reason TEXT,
    archived_at TIMESTAMPTZ,
    archived_reason TEXT,
    
    CONSTRAINT fk_spaces_company 
        FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE,
    CONSTRAINT fk_spaces_space_type 
        FOREIGN KEY (space_type_id) REFERENCES space_types (id) ON DELETE CASCADE,
    CONSTRAINT fk_spaces_parent 
        FOREIGN KEY (parent_space_id) REFERENCES spaces (id) ON DELETE SET NULL
);

/* -----------------------------
   Space Field Values Table
   ----------------------------- */
/*
   This table stores the actual values for each field defined for a space.
   Each record ties a space with a field (from space_type_fields) and stores
   its value as text.
*/
CREATE TABLE space_field_values (
    id UUID PRIMARY KEY,
    space_id UUID NOT NULL,                -- Reference to a space
    field_id UUID NOT NULL,                -- Reference to a space type field
    field_value TEXT,                      -- The value provided for this field
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_space_field_values_space 
        FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE CASCADE,
    CONSTRAINT fk_space_field_values_field 
        FOREIGN KEY (field_id) REFERENCES space_type_fields (id) ON DELETE CASCADE,
    UNIQUE (space_id, field_id)           -- One value per field per space
);

/* -----------------------------
   Space Users Table
   ----------------------------- */
/*
   Associates users with a space. This table simply tracks which users
   are assigned to which spaces. (Role information is omitted per requirements.)
*/
CREATE TABLE space_users (
    id UUID PRIMARY KEY,
    space_id UUID NOT NULL,                 -- Reference to the space
    user_id UUID NOT NULL,                  -- Assigned user
    assigned_at TIMESTAMPTZ DEFAULT now(),  -- When the user was assigned
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_space_users_space 
        FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE CASCADE,
    CONSTRAINT fk_space_users_user 
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE (space_id, user_id)              -- Prevent duplicate assignments per space
);
