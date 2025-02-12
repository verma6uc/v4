# Audit Log Business Object

## Overview
Represents a record of system activity, capturing who did what and when.

## Properties

### Core Properties
- id: UUID (Primary Key)
- timestamp: DateTime
- actor_id: UUID (Reference to user.id)
- actor_type: String (User, System, Integration)
- action: String (Create, Update, Delete, View, etc.)
- entity_type: String (Company, Space, User, Application, etc.)
- entity_id: UUID
- scope_type: String (System, Company, Space, Application)
- scope_id: UUID

### Details
- previous_state: JSON (Before state of affected entity)
- new_state: JSON (After state of affected entity)
- changes: JSON (Specific changes made)
- metadata: JSON (Additional context)
- ip_address: String
- user_agent: String

### Status
- status: String (Success, Failed, Pending)
- error_message: String (If status is Failed)
- severity: String (Info, Warning, Error, Critical)

## Relationships
- actor: User (The user who performed the action)
- entity: Any (Polymorphic relation to affected entity)
- scope: Any (Polymorphic relation to scope entity)

## Indexes
- timestamp (For efficient filtering by date range)
- actor_id (For finding user's activities)
- entity_type, entity_id (For finding entity's history)
- scope_type, scope_id (For scoped queries)
- action (For filtering by action type)
- status (For finding failed operations)

## Access Control
- Read access based on scope permissions
- No direct write access (system-generated only)
- No update/delete operations allowed
- Export permissions configurable

## Retention
- Retention period configurable per scope
- Critical logs retained indefinitely
- Archived after retention period
- Exportable before archival