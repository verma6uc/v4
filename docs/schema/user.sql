/* ----------------------------------------------------
   Enum Type Definitions for Users & Designations
---------------------------------------------------- */

/* Enum for user status */
DROP TYPE IF EXISTS user_status_enum;
CREATE TYPE user_status_enum AS ENUM ('INVITED', 'ACTIVE', 'SUSPENDED', 'BLOCKED', 'ARCHIVED');

/* Enum for designation status */
DROP TYPE IF EXISTS designation_status_enum;
CREATE TYPE designation_status_enum AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

/* Enum for session status (including SUSPENDED) */
DROP TYPE IF EXISTS session_status_enum;
CREATE TYPE session_status_enum AS ENUM ('ACTIVE', 'SUSPENDED', 'TERMINATED', 'EXPIRED');


/* ----------------------------------------------------
   Designations Table
---------------------------------------------------- */
CREATE TABLE designations (
    id UUID PRIMARY KEY,
    company_id UUID NULL,                -- Reference to the company/ null for super admin
    name VARCHAR(100) NOT NULL,               -- Designation name (3-100 characters)
    identifier VARCHAR(50) NOT NULL,          -- Unique designation identifier (3-50 characters, no spaces)
    description TEXT,                         -- Purpose and scope of the designation
    status designation_status_enum NOT NULL DEFAULT 'ACTIVE',  -- Designation status
    created_at TIMESTAMPTZ DEFAULT now(),     -- Creation timestamp
    created_by UUID,                          -- Creator (user reference)
    updated_at TIMESTAMPTZ DEFAULT now(),     -- Last update timestamp
    updated_by UUID,                          -- Last updater (user reference)
    inactivated_at TIMESTAMPTZ,               -- Inactivation timestamp (if any)
    inactivated_reason TEXT,                  -- Reason for inactivation
    archived_at TIMESTAMPTZ,                  -- Archival timestamp (if any)
    archived_reason TEXT,                     -- Reason for archival
    
    CONSTRAINT fk_designations_company 
        FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE
);


/* ----------------------------------------------------
   Users Table
   (Note: "user" is a reserved keyword, so we use "users")
---------------------------------------------------- */
CREATE TABLE users (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,                      -- Reference to the company the user belongs to
    email VARCHAR(255) NOT NULL UNIQUE,             -- User's email (unique across the platform)
    first_name VARCHAR(50) NOT NULL,                -- User's first name (1-50 characters)
    last_name VARCHAR(50) NOT NULL,                 -- User's last name (1-50 characters)
    designation_id UUID,                            -- Reference to the user's designation (if any)
    status user_status_enum NOT NULL,               -- User status: INVITED, ACTIVE, SUSPENDED, BLOCKED, ARCHIVED

    /* Platform Role*/
    platform_role_id UUID, -- Reference to p

    /* Authentication Fields */
    password_hash VARCHAR(255),                     -- Hashed password

    /* Contact & Profile Information */
    phone VARCHAR(30),                              -- Contact phone number
    profile_picture_url VARCHAR(255),               -- URL to the user's profile picture

    /* System Audit Fields */
    created_at TIMESTAMPTZ DEFAULT now(),           -- Record creation timestamp
    created_by UUID,                                -- Creator (user reference)
    updated_at TIMESTAMPTZ DEFAULT now(),           -- Record update timestamp
    updated_by UUID,                                -- Last updater (user reference)
    activated_at TIMESTAMPTZ,                       -- Account activation timestamp
    suspended_at TIMESTAMPTZ,                       -- Suspension timestamp
    suspended_reason TEXT,                          -- Reason for suspension
    blocked_at TIMESTAMPTZ,                         -- Blocking timestamp (for security violations)
    blocked_reason TEXT,                            -- Reason for blocking
    archived_at TIMESTAMPTZ,                        -- Archival timestamp
    archived_reason TEXT,                           -- Reason for archival

    CONSTRAINT fk_users_company 
        FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE,
    CONSTRAINT fk_users_designation 
        FOREIGN KEY (designation_id) REFERENCES designations (id) ON DELETE SET NULL,
    CONSTRAINT fk_users_platform_role 
        FOREIGN KEY (platform_role_id) REFERENCES platform_roles (id)  ON DELETE SET NULL,
);


/* ----------------------------------------------------
   User Sessions Table
---------------------------------------------------- */
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,                        -- Reference to the user owning the session
    session_token VARCHAR(255) NOT NULL UNIQUE,   -- Unique session token
    ip_address VARCHAR(50),                       -- IP address from which the session was initiated
    user_agent VARCHAR(255),                      -- User agent information
    status session_status_enum NOT NULL DEFAULT 'ACTIVE',  -- Session status: ACTIVE, SUSPENDED, TERMINATED, or EXPIRED
    created_at TIMESTAMPTZ DEFAULT now(),         -- Session creation timestamp
    expires_at TIMESTAMPTZ,                       -- Session expiration timestamp

    CONSTRAINT fk_user_sessions_user 
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


/* ----------------------------------------------------
   Password Reset Tokens Table
---------------------------------------------------- */
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,                        -- Reference to the user for whom the token is issued
    token VARCHAR(255) NOT NULL UNIQUE,           -- Secure token (hashed or encrypted)
    created_at TIMESTAMPTZ DEFAULT now(),         -- Token creation timestamp
    expires_at TIMESTAMPTZ,                       -- Token expiration timestamp
    used BOOLEAN NOT NULL DEFAULT false,          -- Flag indicating whether the token has been used

    CONSTRAINT fk_password_reset_tokens_user 
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


/* ----------------------------------------------------
   Failed Login Attempts Table
---------------------------------------------------- */
CREATE TABLE failed_login_attempts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,                        -- Reference to the user who failed to log in
    attempt_at TIMESTAMPTZ DEFAULT now(),          -- Timestamp of the failed login attempt
    ip_address VARCHAR(50),                       -- IP address from which the attempt was made
    user_agent VARCHAR(255),                      -- User agent details
    failed_reason TEXT,                           -- Reason for the failure (e.g., "Incorrect password", "Account locked")

    CONSTRAINT fk_failed_login_attempts_user 
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);