/* =====================================================
   Invitation-Related Tables and Enums
   ===================================================== */

/* -----------------------------
   ENUM Type Definitions
   ----------------------------- */

/* Enum for invitation type */
DROP TYPE IF EXISTS invitation_type_enum;
CREATE TYPE invitation_type_enum AS ENUM ('COMPANY_ADMIN', 'SPACE_ADMIN', 'USER');

/* Enum for invitation status */
DROP TYPE IF EXISTS invitation_status_enum;
CREATE TYPE invitation_status_enum AS ENUM ('PENDING', 'SENT', 'EXPIRED', 'ACCEPTED', 'CANCELLED');

/* -----------------------------
   Invitations Table
   ----------------------------- */
CREATE TABLE invitations (
    id UUID PRIMARY KEY,
    
    -- Invitation context references
    company_id UUID NOT NULL,         -- The company issuing the invitation
    space_id UUID,                    -- Optional: tied to a specific space
    application_id UUID,              -- Optional: tied to a specific application

    email VARCHAR(255) NOT NULL,      -- Invitee's email address
    type invitation_type_enum NOT NULL,      -- Type of invitation
    status invitation_status_enum NOT NULL,  -- Current status
    
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ,           -- Expiration timestamp per company configuration
    sent_at TIMESTAMPTZ,              -- When the invitation was sent
    accepted_at TIMESTAMPTZ,          -- When the invitation was accepted
    cancelled_at TIMESTAMPTZ,         -- When the invitation was cancelled
    last_resend_at TIMESTAMPTZ,       -- Timestamp of the last resend attempt
    resend_count INTEGER NOT NULL DEFAULT 0,  -- Number of times the invitation has been resent

    token VARCHAR(255) NOT NULL,      -- Secure invitation token

    CONSTRAINT fk_invitations_company 
        FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE,
    CONSTRAINT fk_invitations_space 
        FOREIGN KEY (space_id) REFERENCES spaces (id) ON DELETE SET NULL,
    CONSTRAINT fk_invitations_application 
        FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE SET NULL
);
