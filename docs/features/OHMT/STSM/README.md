# Space Type State Management (STSM)

## Description
This use case manages the lifecycle states of space types within the organization hierarchy. It enables Company Admins to control the availability and usage of space types through state transitions (active, suspended, archived). When a space type's state changes, the system ensures data integrity by managing the impact on existing spaces of that type. The use case includes validation checks to prevent disruption of critical operations during state transitions.

## User Stories
- [STSM.US1: Company Admin suspends Space Type](./user-stories.md#user-story-stsmus1)
- [STSM.US2: Company Admin reactivates Space Type](./user-stories.md#user-story-stsmus2)
- [STSM.US3: Company Admin archives Space Type](./user-stories.md#user-story-stsmus3)

## Identifier
- ID: OHMT.STSM
- Uniqueness Check: 1