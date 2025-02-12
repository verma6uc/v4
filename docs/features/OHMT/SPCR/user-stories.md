# Space Creation User Stories

## Use Case Information
Use Case: Space Creation
Identifier: OHMT.SPCR
Uniqueness Check: 1

## User Story: OHMT.SPCR.US1
Title: Company Admin creates Space
Identifier: OHMT.SPCR.US1
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin initiates space creation by selecting a space type from available types. The system shows possible parent spaces based on the hierarchy rules for the selected type. The Company Admin provides a unique name, selects the parent space, and fills in all type-specific fields. The system validates the space name uniqueness, parent-child relationship compliance with hierarchy rules, and all field values against their configured validation rules. Upon validation, the system creates the space record in draft state, preparing it for activation.

## User Story: OHMT.SPCR.US2
Title: Company Admin modifies Space
Identifier: OHMT.SPCR.US2
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects an existing space to update its information. The system shows all current field values and parent assignment based on the space's type. The Company Admin makes required changes to field values while the parent remains unmodifiable as it would affect the hierarchy. The system validates all modified values against their configured validation rules. Upon validation, the system updates the space record and maintains a history of these changes in the audit log.