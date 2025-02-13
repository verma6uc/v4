/* =====================================================
   Application-Related Tables and Enums
   ===================================================== */

/* -----------------------------
   ENUM Type Definitions
   ----------------------------- */

/* Enum for application status */
DROP TYPE IF EXISTS application_status_enum;
CREATE TYPE application_status_enum AS ENUM ('DRAFT', 'IN_PROGRESS', 'READY_TO_DEPLOY', 'PUBLISHED');

/* Enum for prototype status */
DROP TYPE IF EXISTS prototype_status_enum;
CREATE TYPE prototype_status_enum AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'REJECTED');

/* Enum for application deployment status */
DROP TYPE IF EXISTS application_deployment_status_enum;
CREATE TYPE application_deployment_status_enum AS ENUM ('DEPLOYED', 'INACTIVE');

/* Enum for Deployment Environment */
DROP TYPE IF EXISTS environment_enum;
CREATE TYPE environment_enum AS ENUM ('TEST', 'UAT', 'PRODUCTION');

/* -----------------------------
   Applications Table
   ----------------------------- */
CREATE TABLE applications (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,          -- Reference to the company that owns the application
    title VARCHAR(100) NOT NULL,        -- Application title (3-100 characters)
    description TEXT NOT NULL,          -- Application description (up to 2000 characters)
    status application_status_enum NOT NULL,  -- DRAFT, IN_PROGRESS, READY_TO_DEPLOY, or PUBLISHED
    current_version VARCHAR(50),        -- Currently deployed version, if any

    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID,
    updated_at TIMESTAMPTZ DEFAULT now(),
    updated_by UUID,
    published_at TIMESTAMPTZ,
    published_by UUID,
    
    CONSTRAINT fk_applications_company 
       FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE
);

/* -----------------------------
   Application Meta Data Table
   ----------------------------- */
CREATE TABLE application_meta_data (
    id UUID PRIMARY KEY,
    application_id UUID NOT NULL,
    meta_key VARCHAR(100) NOT NULL,      
    meta_value TEXT,                      
    is_required BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT fk_app_meta_data_application 
        FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE,
    CONSTRAINT unique_app_meta_key 
        UNIQUE (application_id, meta_key)
);

/* Create index for faster lookups by application */
CREATE INDEX idx_app_meta_data_application_id 
    ON application_meta_data(application_id);

/* -----------------------------
   Application Deployments Table
   ----------------------------- */
/*
   Tracks deployments of the application into spaces.
   This table records in which space the application is deployed,
   who deployed it, when, with what version, and its deployment status.
*/
CREATE TABLE application_deployments (
    id UUID PRIMARY KEY,
    application_id UUID NOT NULL,
    space_id UUID NOT NULL,         -- Reference to the space where deployed
    deployed_by UUID NOT NULL,      -- User who deployed the application
    deployed_at TIMESTAMPTZ NOT NULL,
    version VARCHAR(50) NOT NULL,   -- Version deployed
    status application_deployment_status_enum NOT NULL,  -- DEPLOYED or INACTIVE
    environment environment_enum NOT NULL,  -- TEST, PRODUCTION, or UAT
    
    CONSTRAINT fk_app_deployments_application 
       FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE,
    CONSTRAINT fk_app_deployments_space 
       FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE CASCADE,
    CONSTRAINT fk_app_deployments_user 
       FOREIGN KEY (deployed_by) REFERENCES users (id) ON DELETE SET NULL
);

/* -----------------------------
   Application Features Table
   ----------------------------- */
/*
   Each application can have multiple features, which are high-level items in the product backlog.
*/
CREATE TABLE application_features (
    id UUID PRIMARY KEY,
    application_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    priority INTEGER,               -- Lower number = higher priority, for example
    status VARCHAR(50) NOT NULL,    -- e.g., PLANNED, IN_PROGRESS, COMPLETED
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_app_features_application 
       FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
);

/* -----------------------------
   Application Use Cases Table
   ----------------------------- */
/*
   Each feature can be broken down into multiple use cases.
*/
CREATE TABLE application_use_cases (
    id UUID PRIMARY KEY,
    feature_id UUID NOT NULL,       -- Reference to the feature
    identifier VARCHAR(50) NOT NULL, -- Unique identifier within the application context
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_app_use_cases_feature 
       FOREIGN KEY (feature_id) REFERENCES application_features (id) ON DELETE CASCADE
);

/* -----------------------------
   Application User Stories Table
   ----------------------------- */
/*
   Each use case can have multiple user stories that detail specific requirements.
*/
CREATE TABLE application_user_stories (
    id UUID PRIMARY KEY,
    use_case_id UUID NOT NULL,         -- Reference to the use case
    identifier VARCHAR(50) NOT NULL,    -- Unique identifier (e.g., US-001)
    story TEXT NOT NULL,                -- The user story description
    acceptance_criteria TEXT[] NOT NULL,  -- An array of acceptance criteria (if your DB supports arrays)
    priority INTEGER,
    status VARCHAR(50) NOT NULL,        -- e.g., NOT_STARTED, IN_PROGRESS, DONE
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_app_user_stories_use_case 
       FOREIGN KEY (use_case_id) REFERENCES application_use_cases (id) ON DELETE CASCADE
);

/* -----------------------------
   Application Concepts Table
   ----------------------------- */
/*
   Stores the selected concept for an application.
*/
CREATE TABLE application_concepts (
    id UUID PRIMARY KEY,
    application_id UUID NOT NULL,
    concept_summary TEXT,           -- Summary of the selected concept
    selected_at TIMESTAMPTZ,        -- When the concept was selected
    selected_by UUID,               -- User who selected the concept
    
    CONSTRAINT fk_app_concepts_application 
       FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
);

/* -----------------------------
   Application Blueprints Table
   ----------------------------- */
/*
   Stores technical design information (blueprint) for an application.
*/
CREATE TABLE application_blueprints (
    id UUID PRIMARY KEY,
    application_id UUID NOT NULL,
    version VARCHAR(50) NOT NULL,
    diagram TEXT,                   -- Could be a URL, encoded image, or diagram data
    states JSONB,                   -- Array of states (if applicable)
    actions JSONB,                  -- Array of actions (if applicable)
    last_modified TIMESTAMPTZ,
    
    CONSTRAINT fk_app_blueprints_application 
       FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
);

/* -----------------------------
   Application Prototypes Table
   ----------------------------- */
/*
   Stores prototype details for an application.
*/
CREATE TABLE application_prototypes (
    id UUID PRIMARY KEY,
    application_id UUID NOT NULL,
    version VARCHAR(50) NOT NULL,
    status prototype_status_enum NOT NULL,  -- Prototype status (e.g., DRAFT, IN_REVIEW, APPROVED, REJECTED)
    feedback_count INTEGER DEFAULT 0,
    last_tested TIMESTAMPTZ,
    
    CONSTRAINT fk_app_prototypes_application 
       FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
);
