# User State Management (USTM)

## Description
This use case manages the lifecycle states of user accounts within the platform. It enables administrators to control user access through various states (active, suspended, blocked, archived) while maintaining proper security and audit trails. The use case handles both manual and automatic state transitions, with comprehensive impact analysis and notification systems. It ensures proper handling of user data and access rights throughout state changes while maintaining compliance with security policies.

## User Stories
- [USTM.US1: Admin views User States](./user-stories.md#user-story-ustmus1)
- [USTM.US2: Admin suspends User Account](./user-stories.md#user-story-ustmus2)
- [USTM.US3: System automatically suspends User Account](./user-stories.md#user-story-ustmus3)
- [USTM.US4: Admin reactivates User Account](./user-stories.md#user-story-ustmus4)
- [USTM.US5: Admin archives User Account](./user-stories.md#user-story-ustmus5)
- [USTM.US6: Admin changes Multiple User States](./user-stories.md#user-story-ustmus6)
- [USTM.US7: System notifies State Change](./user-stories.md#user-story-ustmus7)
- [USTM.US8: System notifies Admin of Automatic State Change](./user-stories.md#user-story-ustmus8)
- [USTM.US9: Admin views User Status Change History](./user-stories.md#user-story-ustmus9)

## Identifier
- ID: USPM.USTM
- Uniqueness Check: 1

## Notes
- System supports both manual and automatic state transitions
- All state changes require proper documentation and maintain audit trails
- Critical role holders require additional validation for state changes