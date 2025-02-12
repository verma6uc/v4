# Notification Business Object

## Overview
Represents a system notification that can be triggered by various events and delivered to users through multiple channels.

## Properties

### Core Properties
- id: UUID (Primary Key)
- timestamp: DateTime (When notification was created)
- type: String (Alert, Info, Warning, Success)
- title: String
- message: String
- source_type: String (Audit, System, Application, User)
- source_id: UUID

### Delivery Properties
- channels: Array[String] (UI, Email, Mobile Push, Slack)
- delivery_status: JSON {
    ui: String (Pending, Sent, Read),
    email: String (Pending, Sent, Delivered, Failed),
    push: String (Pending, Sent, Delivered, Failed),
    slack: String (Pending, Sent, Failed)
  }
- delivery_timestamp: JSON {
    ui: DateTime,
    email: DateTime,
    push: DateTime,
    slack: DateTime
  }

### Target Properties
- recipient_id: UUID (Reference to user.id)
- recipient_type: String (User, Role, Team)
- scope_type: String (System, Company, Space, Application)
- scope_id: UUID
- priority: String (Low, Medium, High, Critical)

### Content Properties
- template_id: UUID (Reference to notification template)
- data: JSON (Dynamic content for template)
- action_url: String (Deep link to relevant page)
- thumbnail_url: String (Optional icon or image)
- expiry: DateTime (When notification becomes irrelevant)

### Interaction Properties
- read_timestamp: DateTime
- action_taken: Boolean
- action_timestamp: DateTime
- dismissed: Boolean
- dismiss_timestamp: DateTime

## Relationships
- recipient: User (The user receiving the notification)
- source: Any (Polymorphic relation to notification source)
- scope: Any (Polymorphic relation to scope entity)
- template: NotificationTemplate
- related_notifications: Array[Notification]

## Indexes
- timestamp (For efficient filtering)
- recipient_id (For user's notifications)
- scope_type, scope_id (For scoped queries)
- type (For filtering by type)
- priority (For sorting by importance)
- read_timestamp (For unread filters)

## Access Control
- Users can only view their own notifications
- Admins can view notifications within their scope
- System can create notifications
- Users can mark as read/unread
- Users can dismiss notifications

## Retention
- Read notifications: 30 days
- Unread notifications: 90 days
- Critical notifications: 1 year
- Archived after retention period