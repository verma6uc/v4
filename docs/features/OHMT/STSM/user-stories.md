# Space Type State Management User Stories

## Use Case Information
Use Case: Space Type State Management
Identifier: OHMT.STSM
Uniqueness Check: 1

## User Story: OHMT.STSM.US1
Title: Company Admin suspends Space Type
Identifier: OHMT.STSM.US1
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects an active space type and initiates suspension. The system verifies that suspension won't disrupt existing spaces using this type, making them read-only but still accessible. The system prevents creation of new spaces using this suspended type. The system records this suspension in the audit log.

## User Story: OHMT.STSM.US2
Title: Company Admin reactivates Space Type
Identifier: OHMT.STSM.US2
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects a suspended space type and initiates reactivation. The system verifies that the space type can be safely reactivated and restores full functionality. Upon confirmation, the system changes the space type status to active, re-enabling creation of new spaces using this type and restoring edit capabilities for existing spaces. The system notifies space admins managing spaces of this type about the reactivation. The system records this reactivation in the audit log.

## User Story: OHMT.STSM.US3
Title: Company Admin archives Space Type
Identifier: OHMT.STSM.US3
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects a suspended space type and initiates archival. The system verifies that archiving this type won't impact critical operations by checking its usage in existing spaces. Upon confirmation, the system changes the space type status to archived, maintaining all historical data and relationships while preventing any future use of this type. The system records this archival action in the audit log.