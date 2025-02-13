/* =====================================================
   Audit Log and Activity Log Tables and Enums (Updated)
   ===================================================== */

/* -----------------------------
   ENUM Type Definitions for Audit Logs
   ----------------------------- */

/* Enum for audit action */
DROP TYPE IF EXISTS audit_action_enum;
CREATE TYPE audit_action_enum AS ENUM (
    'LOGIN', 'LOGOUT', 'FAILED_LOGIN', 'PASSWORD_RESET', 'PASSWORD_CHANGE',
    'CREATE_USER', 'UPDATE_USER', 'DELETE_USER', 'ACTIVATE_USER', 'SUSPEND_USER', 'REACTIVATE_USER', 'ARCHIVE_USER',
    'CREATE_APPLICATION', 'UPDATE_APPLICATION', 'DELETE_APPLICATION', 'SUBMIT_APPLICATION', 'APPROVE_APPLICATION', 'REJECT_APPLICATION', 'PUBLISH_APPLICATION', 'DEPLOY_APPLICATION', 'REMOVE_APPLICATION',
    'CREATE_SPACE', 'UPDATE_SPACE', 'DELETE_SPACE', 'SUSPEND_SPACE', 'REACTIVATE_SPACE', 'ARCHIVE_SPACE',
    'CREATE_COMPANY', 'UPDATE_COMPANY', 'SUSPEND_COMPANY', 'REACTIVATE_COMPANY', 'ARCHIVE_COMPANY',
    'ASSIGN_ROLE', 'REVOKE_ROLE', 'UPDATE_ROLE',
    'CONFIGURE_MFA', 'UPDATE_SECURITY_SETTINGS', 'CONFIGURE_PASSWORD_POLICY', 'RESET_PASSWORD',
    'GENERATE_INVOICE', 'PROCESS_PAYMENT', 'APPLY_CREDIT', 'UPDATE_SUBSCRIPTION',
    'SEND_NOTIFICATION', 'UPDATE_NOTIFICATION', 'EXPORT_DATA', 'IMPORT_DATA',
    'UPDATE_CONFIGURATION', 'SYSTEM_ERROR', 'OTHER'
);

/* Enum for audit category */
DROP TYPE IF EXISTS audit_category_enum;
CREATE TYPE audit_category_enum AS ENUM (
    'AUTH', 'USER_MANAGEMENT', 'APPLICATION_MANAGEMENT', 'SPACE_MANAGEMENT', 'COMPANY_MANAGEMENT', 'ROLE_MANAGEMENT',
    'SECURITY', 'BILLING', 'NOTIFICATION', 'CONFIGURATION', 'DATA_EXPORT', 'DATA_IMPORT', 'SYSTEM', 'OTHER'
);

/* -----------------------------
   Audit Logs Table (Flattened)
   ----------------------------- */
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY,
    actor_id UUID NOT NULL,            -- Reference to the acting user
    timestamp TIMESTAMPTZ NOT NULL,    -- When the action occurred (UTC)
    
    old_values JSONB,                  -- JSON representing the state before the change
    new_values JSONB,                  -- JSON representing the state after the change
    detailed_description TEXT,         -- A human-readable description of the change
    
    action audit_action_enum NOT NULL,       -- Standardized action (e.g., LOGIN, CREATE_USER, DEPLOY_APPLICATION, etc.)
    category audit_category_enum NOT NULL,     -- Business category (e.g., AUTH, USER_MANAGEMENT, etc.)
    
    company_id UUID,                   -- Optional: Company context (nullable)
    space_id UUID,                     -- Optional: Space context
    application_id UUID,               -- Optional: Application context
    
    created_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_audit_actor FOREIGN KEY (actor_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_audit_company FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE SET NULL,
    CONSTRAINT fk_audit_space FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE SET NULL,
    CONSTRAINT fk_audit_application FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE SET NULL
);

/* -----------------------------
   Activity Logs Table (Flattened and Extended)
   ----------------------------- */
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY,
    company_id UUID,                    -- Optional: Company context
    user_id UUID,                       -- Optional: Acting user
    session_id UUID,                    -- Optional: Session identifier
    timestamp TIMESTAMPTZ NOT NULL,     -- When the activity occurred
    
    /* Retained basic activity details */
    category VARCHAR(100) NOT NULL,     -- High-level grouping (e.g., Navigation, Feature)
    action VARCHAR(100) NOT NULL,       -- Specific action performed (e.g., "View", "Click")
    label VARCHAR(255),                 -- Additional information (e.g., URL, button label)
    value INTEGER,                      -- Numeric value if applicable
    duration INTEGER,                   -- Duration in milliseconds
    
    space_id UUID,                      -- Optional: Space context
    application_id UUID,                -- Optional: Application context
    
    user_agent VARCHAR(255),            -- Browser or client information
    ip_address VARCHAR(50),             -- User's IP address
    
    /* Flattened device information */
    device_type VARCHAR(50),            -- e.g., Mobile, Desktop, Tablet
    device_os VARCHAR(50),              -- e.g., Windows, macOS, Android, iOS
    device_browser VARCHAR(50),         -- e.g., Chrome, Firefox, Safari
    device_version VARCHAR(50),         -- Browser version
    
    /* Flattened geo-location information */
    geo_country VARCHAR(50),            -- e.g., US, UK
    geo_region VARCHAR(50),             -- e.g., California, England
    geo_city VARCHAR(50),               -- e.g., San Francisco, London
    
    /* New columns for API-related info */
    api_endpoint VARCHAR(255),          -- API endpoint accessed (if applicable)
    api_method VARCHAR(10),             -- HTTP method (GET, POST, etc.)
    api_status_code INTEGER,            -- HTTP status code returned
    api_response_time INTEGER,          -- API response time in milliseconds
    
    /* New columns for error-related info */
    error_code VARCHAR(50),             -- Error code, if an error occurred
    error_message TEXT,                 -- Human-readable error message
    error_details JSONB,                -- Additional error details (stack trace, etc.)
    
    metadata JSONB,                     -- Additional metadata (if needed)
    created_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_activity_company FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE SET NULL,
    CONSTRAINT fk_activity_space FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE SET NULL,
    CONSTRAINT fk_activity_application FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE SET NULL,
    CONSTRAINT fk_activity_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
);
