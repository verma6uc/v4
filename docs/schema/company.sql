/* =========================
   Enum Type Definitions
   ========================= */

/* Enum for company status */
DROP TYPE IF EXISTS company_status_enum;
CREATE TYPE company_status_enum AS ENUM ('ACTIVE', 'SUSPENDED', 'ARCHIVED');

/* Enum for date format */
DROP TYPE IF EXISTS date_format_enum;
CREATE TYPE date_format_enum AS ENUM ('DD_MM_YYYY', 'MM_DD_YYYY');

/* Enum for time format */
DROP TYPE IF EXISTS time_format_enum;
CREATE TYPE time_format_enum AS ENUM ('TWENTY_FOUR_HOUR', 'TWELVE_HOUR');

/* Enum for number format */
DROP TYPE IF EXISTS number_format_enum;
CREATE TYPE number_format_enum AS ENUM ('US', 'EU');

/* Enum for week start */
DROP TYPE IF EXISTS week_start_enum;
CREATE TYPE week_start_enum AS ENUM ('MONDAY', 'SUNDAY');

/* Enum for MFA enforcement level */
DROP TYPE IF EXISTS mfa_enforcement_level_enum;
CREATE TYPE mfa_enforcement_level_enum AS ENUM ('OPTIONAL', 'REQUIRED_FOR_ALL');

/* Enum for MFA default method */
DROP TYPE IF EXISTS mfa_default_method_enum;
CREATE TYPE mfa_default_method_enum AS ENUM ('EMAIL', 'AUTHENTICATOR_APP');

/* Enum for app store status */
DROP TYPE IF EXISTS app_store_status_enum;
CREATE TYPE app_store_status_enum AS ENUM ('ACTIVE', 'MAINTENANCE');

/* Enum for email template type */
DROP TYPE IF EXISTS email_template_type_enum;
CREATE TYPE email_template_type_enum AS ENUM ('SYSTEM', 'CUSTOM');

/* Enum for email template status */
DROP TYPE IF EXISTS email_template_status_enum;
CREATE TYPE email_template_status_enum AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE');

/* Enum for language */
DROP TYPE IF EXISTS language_enum;
CREATE TYPE language_enum AS ENUM ('en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ru');

/* Enum for timezone */
DROP TYPE IF EXISTS timezone_enum;
CREATE TYPE timezone_enum AS ENUM (
    'UTC', 'America/New_York', 'America/Los_Angeles', 'America/Chicago', 
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 
    'Asia/Shanghai', 'Asia/Singapore', 'Australia/Sydney'
);

/* =========================
   Companies Table
   ========================= */
CREATE TABLE companies (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    identifier VARCHAR(50) NOT NULL UNIQUE,
    status company_status_enum NOT NULL,
    primary_email VARCHAR(255),
    primary_phone VARCHAR(30),
    website VARCHAR(255),

    /* Address fields */
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_state VARCHAR(100),
    address_country VARCHAR(100),
    address_postal_code VARCHAR(20),

    /* Logo */
    logo_url VARCHAR(255),

    created_at TIMESTAMPTZ DEFAULT now(),
    activated_at TIMESTAMPTZ,
    suspended_at TIMESTAMPTZ,
    suspended_reason TEXT,
    archived_at TIMESTAMPTZ,
    archived_reason TEXT
);

/* =========================
   Companies Configurations Table
   ========================= */
CREATE TABLE company_configurations (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,  -- Reference to company

    /* Localization Settings */
    default_language language_enum NOT NULL DEFAULT 'en',
    default_timezone timezone_enum NOT NULL DEFAULT 'UTC',
    date_format date_format_enum NOT NULL DEFAULT 'DD_MM_YYYY',
    time_format time_format_enum NOT NULL DEFAULT 'TWENTY_FOUR_HOUR',
    number_format number_format_enum NOT NULL DEFAULT 'US',
    first_day_of_week week_start_enum NOT NULL DEFAULT 'MONDAY',
    currency_code VARCHAR(3) NOT NULL DEFAULT 'USD',

    /* MFA Configuration */
    mfa_enabled BOOLEAN NOT NULL DEFAULT false,
    mfa_enforcement_level mfa_enforcement_level_enum NOT NULL,
    mfa_default_method mfa_default_method_enum,

    /* Session Management */
    session_timeout INTEGER NOT NULL DEFAULT 30,
    max_concurrent_sessions INTEGER NOT NULL DEFAULT 3,

    /* IP Access Control */
    enforce_ip_restrictions BOOLEAN NOT NULL DEFAULT false,
    allowed_ip_ranges TEXT[],
    blocklisted_ip_ranges TEXT[],

    /* Account Security Settings */
    max_login_attempts INTEGER NOT NULL DEFAULT 5,
    lockout_duration INTEGER NOT NULL DEFAULT 30,
    password_reset_timeout INTEGER NOT NULL DEFAULT 24,
    invitation_validity_period INTEGER NOT NULL DEFAULT 72,
    password_policy_min_length INTEGER NOT NULL DEFAULT 8,
    password_policy_require_special_char BOOLEAN NOT NULL DEFAULT true,
    password_policy_require_number BOOLEAN NOT NULL DEFAULT true,
    password_policy_require_uppercase BOOLEAN NOT NULL DEFAULT true,
    password_policy_expiry_days INTEGER NOT NULL DEFAULT 90,
    password_expiry_enabled BOOLEAN NOT NULL DEFAULT true,
    password_history_count INTEGER NOT NULL DEFAULT 5,

    created_at TIMESTAMPTZ DEFAULT now(),

    CONSTRAINT fk_company_configurations_company 
        FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE
);

/* =========================
   Companies App Store Table
   ========================= */
CREATE TABLE company_app_stores (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,
    status app_store_status_enum NOT NULL,
    require_approval_for_deployment BOOLEAN NOT NULL DEFAULT false,
    allow_space_admin_deployment BOOLEAN NOT NULL DEFAULT true,
    max_deployments_per_space INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    CONSTRAINT fk_company_app_stores_company 
        FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE
);

/* =========================
   Email Templates Table
   ========================= */
CREATE TABLE email_templates (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    type email_template_type_enum NOT NULL,
    status email_template_status_enum NOT NULL,
    subject_text VARCHAR(255) NOT NULL,
    body_html TEXT NOT NULL,

    /* Optional Header Elements */
    header_logo_url VARCHAR(255),
    header_background_color VARCHAR(20),
    header_text_color VARCHAR(20),

    /* Optional Footer Elements */
    footer_company_info TEXT,
    footer_social_links VARCHAR(512),
    footer_disclaimer TEXT,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    version INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT fk_email_templates_company 
        FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE
);
