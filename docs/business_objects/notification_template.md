# Notification Template Business Object

## Overview
Defines the structure and content of notifications, enabling consistent messaging across the system.

## Properties

### Core Properties
- id: UUID (Primary Key)
- name: String (Unique identifier for the template)
- description: String
- version: Integer
- status: String (Draft, Active, Deprecated)

### Content Properties
- title_template: String (Supports variables with {{variable}} syntax)
- message_template: String (Supports variables with {{variable}} syntax)
- language: String (ISO language code)
- fallback_language: String (ISO language code)

### Channel Properties
- supported_channels: Array[String] (UI, Email, Mobile Push, Slack)
- channel_specific_content: JSON {
    email: {
      subject_template: String,
      html_template: String,
      text_template: String
    },
    push: {
      title_template: String,
      body_template: String
    },
    slack: {
      blocks_template: JSON
    }
  }

### Metadata
- category: String (System, Security, Billing, etc.)
- severity: String (Info, Warning, Error, Critical)
- tags: Array[String]
- created_at: DateTime
- updated_at: DateTime
- created_by: UUID (Reference to user.id)
- updated_by: UUID (Reference to user.id)

### Validation
- required_variables: Array[String]
- optional_variables: Array[String]
- validation_rules: JSON (Rules for variable content)
- sample_data: JSON (Example variables for testing)

### Behavior
- auto_expire: Boolean
- expiry_duration: Integer (in hours)
- throttling_rules: JSON (Rate limiting settings)
- delivery_rules: JSON (Channel-specific delivery settings)
- action_buttons: Array[{
    label: String,
    action: String,
    style: String,
    url_template: String
  }]

## Relationships
- notifications: Array[Notification] (Notifications using this template)
- creator: User
- last_editor: User
- localized_versions: Array[NotificationTemplate]

## Indexes
- name (For quick template lookup)
- category (For filtering by type)
- status (For active template queries)
- language (For localization queries)

## Access Control
- Read: All users
- Create/Update: Admin users only
- Delete: System admin only
- Version management enforced
- Audit trail maintained

## Usage
- Template validation before activation
- Variable interpolation at runtime
- Localization support
- Channel-specific formatting
- Rate limiting enforcement
- Analytics tracking