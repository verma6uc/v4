/* =====================================================
   Billing-Related Tables and Enums
   ===================================================== */

/* -----------------------------
   ENUM Type Definitions
   ----------------------------- */

/* Enum for invoice status */
DROP TYPE IF EXISTS invoice_status_enum;
CREATE TYPE invoice_status_enum AS ENUM ('DRAFT', 'PENDING', 'ISSUED', 'PAID', 'VOID', 'CANCELLED');

/* Enum for invoice type */
DROP TYPE IF EXISTS invoice_type_enum;
CREATE TYPE invoice_type_enum AS ENUM ('SUBSCRIPTION', 'USAGE', 'ADJUSTMENT', 'CREDIT_NOTE');

/* Enum for payment status */
DROP TYPE IF EXISTS payment_status_enum;
CREATE TYPE payment_status_enum AS ENUM ('SUCCESS', 'FAILURE');

/* Enum for subscription plan status */
DROP TYPE IF EXISTS subscription_plan_status_enum;
CREATE TYPE subscription_plan_status_enum AS ENUM ('DRAFT', 'ACTIVE', 'GRANDFATHERED', 'DISCONTINUED');

/* Enum for subscription plan visibility */
DROP TYPE IF EXISTS subscription_plan_visibility_enum;
CREATE TYPE subscription_plan_visibility_enum AS ENUM ('PUBLIC', 'PRIVATE', 'HIDDEN');

/* Enum for billing frequency */
DROP TYPE IF EXISTS billing_frequency_enum;
CREATE TYPE billing_frequency_enum AS ENUM ('MONTHLY', 'QUARTERLY', 'ANNUAL');

/* Enum for usage resource type */
DROP TYPE IF EXISTS usage_resource_type_enum;
CREATE TYPE usage_resource_type_enum AS ENUM ('USER_COUNT', 'STORAGE', 'API_CALLS', 'DATA_TRANSFER');

/* Enum for measurement type */
DROP TYPE IF EXISTS measurement_type_enum;
CREATE TYPE measurement_type_enum AS ENUM ('COUNTER', 'GAUGE', 'TIMER');

/* -----------------------------
   Invoices Table
   ----------------------------- */
CREATE TABLE invoices (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,
    invoice_number VARCHAR(50) NOT NULL UNIQUE, -- Example: INV-202502-0001
    status invoice_status_enum NOT NULL,
    type invoice_type_enum NOT NULL,
    billing_period_start TIMESTAMPTZ NOT NULL,
    billing_period_end TIMESTAMPTZ NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    currency VARCHAR(3) NOT NULL,
    
    /* Billing Contact Information */
    billing_contact_name VARCHAR(100),
    billing_contact_email VARCHAR(255),
    billing_contact_phone VARCHAR(30),
    billing_contact_address TEXT,
    
    /* Financial Totals */
    subtotal NUMERIC(10,2) NOT NULL,
    tax_total NUMERIC(10,2) NOT NULL,
    discount_total NUMERIC(10,2) NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    balance NUMERIC(10,2) NOT NULL,
    
    /* Payment Details */
    payment_terms TEXT,
    payment_due TIMESTAMPTZ,
    payment_method_type VARCHAR(50),         -- e.g., Credit Card, ACH
    payment_method_last_four VARCHAR(10),
    payment_method_expiry_date VARCHAR(10),
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_invoices_company 
        FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE
);

/* -----------------------------
   Invoice Line Items Table
   ----------------------------- */
CREATE TABLE invoice_line_items (
    id UUID PRIMARY KEY,
    invoice_id UUID NOT NULL,
    item_type invoice_type_enum NOT NULL,  -- Uses the same enum for consistency
    description TEXT NOT NULL,
    quantity NUMERIC(10,2) NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    tax_rate NUMERIC(5,2) NOT NULL,
    tax_amount NUMERIC(10,2) NOT NULL,
    metadata JSONB,                        -- Additional information as JSON
    created_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_invoice_line_items_invoice 
        FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE
);

/* -----------------------------
   Invoice Payments Table
   ----------------------------- */
CREATE TABLE invoice_payments (
    id UUID PRIMARY KEY,
    invoice_id UUID NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    payment_date TIMESTAMPTZ NOT NULL,
    method VARCHAR(50) NOT NULL,      -- e.g., Credit Card, Bank Transfer
    status payment_status_enum NOT NULL,
    transaction_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_invoice_payments_invoice 
        FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE
);

/* -----------------------------
   Invoice Credits Table
   ----------------------------- */
CREATE TABLE invoice_credits (
    id UUID PRIMARY KEY,
    invoice_id UUID NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    reason TEXT,
    applied_at TIMESTAMPTZ NOT NULL,
    
    CONSTRAINT fk_invoice_credits_invoice 
        FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE
);

/* -----------------------------
   Subscription Plans Table
   ----------------------------- */
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,         -- e.g., STD, ENT
    description TEXT,
    status subscription_plan_status_enum NOT NULL,
    visibility subscription_plan_visibility_enum NOT NULL,
    billing_frequency billing_frequency_enum NOT NULL,
    
    /* Base Pricing Details */
    base_price_amount NUMERIC(10,2) NOT NULL,
    base_price_currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    base_price_billing_term VARCHAR(20) NOT NULL,  -- e.g., per month
    
    /* Resource Limits */
    user_limit_included INTEGER,
    user_limit_max INTEGER,
    additional_user_price NUMERIC(10,2),
    storage_limit_included INTEGER,             -- in GB
    storage_limit_max INTEGER,
    additional_storage_price NUMERIC(10,2),
    api_limit_monthly INTEGER,
    additional_api_price NUMERIC(10,2),
    
    /* Contract and Validity Rules */
    minimum_term INTEGER,                       -- in months
    contract_required BOOLEAN NOT NULL DEFAULT false,
    auto_renew BOOLEAN NOT NULL DEFAULT true,
    cancellation_notice_period INTEGER,         -- in days
    cancellation_fee NUMERIC(10,2),
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

/* -----------------------------
   Usage Records Table
   ----------------------------- */
CREATE TABLE usage_records (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,
    resource_type usage_resource_type_enum NOT NULL,
    metric_code VARCHAR(50) NOT NULL,   -- Unique identifier for the metric
    timestamp TIMESTAMPTZ NOT NULL,
    value NUMERIC(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    measurement_type measurement_type_enum NOT NULL,
    interval VARCHAR(20),               -- e.g., HOURLY, DAILY
    space_id UUID,                      -- Optional: for space-specific usage
    application_id UUID,                -- Optional: for application-specific usage
    user_id UUID,                       -- Optional: for user-triggered events
    source VARCHAR(100),                -- System component name
    subscription_id UUID,               -- Optional: related subscription plan
    billing_period_start TIMESTAMPTZ,
    billing_period_end TIMESTAMPTZ,
    billable BOOLEAN NOT NULL DEFAULT true,
    billing_category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_usage_records_company 
        FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE,
    CONSTRAINT fk_usage_records_space 
        FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE SET NULL,
    CONSTRAINT fk_usage_records_application 
        FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE SET NULL,
    CONSTRAINT fk_usage_records_user 
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
);
