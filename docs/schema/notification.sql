/* =====================================================
   Notification Tables and Enums (Simplified & Updated)
   ===================================================== */

/* -----------------------------
   ENUM Type Definitions
   ----------------------------- */

/* Broad enum for notification type */
DROP TYPE IF EXISTS notification_type_enum;
CREATE TYPE notification_type_enum AS ENUM (
    'USER', 'APPLICATION', 'SPACE', 'COMPANY', 'BILLING', 'SECURITY', 'SYSTEM', 'OTHER'
);

/* Enum for notification priority */
DROP TYPE IF EXISTS notification_priority_enum;
CREATE TYPE notification_priority_enum AS ENUM (
    'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
);

/* Enum for recipient type */
DROP TYPE IF EXISTS notification_recipient_type_enum;
CREATE TYPE notification_recipient_type_enum AS ENUM (
    'TO', 'CC', 'BCC'
);

/* Enum for channel type */
DROP TYPE IF EXISTS notification_channel_type_enum;
CREATE TYPE notification_channel_type_enum AS ENUM (
    'EMAIL', 'PLATFORM', 'SMS'
);

/* Enum for channel status */
DROP TYPE IF EXISTS notification_channel_status_enum;
CREATE TYPE notification_channel_status_enum AS ENUM (
    'PENDING', 'SENT', 'FAILED'
);

/* -----------------------------
   Notifications Table
   ----------------------------- */
/*
   Stores the core details of a notification.
*/
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL,         -- Company context
    type notification_type_enum NOT NULL,  -- Broad notification type
    priority notification_priority_enum NOT NULL,
    template_id UUID,                 -- Optional: Reference to a template
    variables JSONB,                  -- Key-value pairs for dynamic content
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT,                  -- Deep link URL (if applicable)
    expires_at TIMESTAMPTZ,           -- Expiration timestamp

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    CONSTRAINT fk_notifications_company 
      FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE
);

/* -----------------------------
   Notification Deliveries Table
   ----------------------------- */
/*
   Combines recipient and channel details.
   Each row represents a delivery record for a specific recipient (by user ID)
   via a specified channel.
   - sent_at: When our system dispatched the notification.
   - is_read: For PLATFORM channels, indicates if the notification was read.
   - failure_reason: Captures any delivery failure details.
*/
CREATE TABLE notification_deliveries (
    id UUID PRIMARY KEY,
    notification_id UUID NOT NULL,
    recipient_id UUID NOT NULL,                       -- Recipient's user ID
    recipient_type notification_recipient_type_enum NOT NULL,  -- TO, CC, or BCC
    channel_type notification_channel_type_enum NOT NULL,      -- EMAIL, PLATFORM, or SMS
    channel_status notification_channel_status_enum NOT NULL,  -- Delivery status: PENDING, SENT, or FAILED

    sent_at TIMESTAMPTZ,         -- When our system sent the notification
    is_read BOOLEAN DEFAULT false,  -- Applicable for PLATFORM notifications
    failure_reason TEXT,         -- Reason for failure, if any

    created_at TIMESTAMPTZ DEFAULT now(),

    CONSTRAINT fk_notification_deliveries_notification 
      FOREIGN KEY (notification_id) REFERENCES notifications (id) ON DELETE CASCADE,
    CONSTRAINT fk_notification_deliveries_recipient 
      FOREIGN KEY (recipient_id) REFERENCES users (id) ON DELETE CASCADE
);
