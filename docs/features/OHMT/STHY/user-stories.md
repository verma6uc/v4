# Space Type Hierarchy User Stories

## Use Case Information
Use Case: Space Type Hierarchy
Identifier: OHMT.STHY
Uniqueness Check: 1

## User Story: OHMT.STHY.US1
Title: Company Admin defines Space Type Hierarchy Rules
Identifier: OHMT.STHY.US1
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin establishes the relationship rules between space types, specifying which types can be parents or children of other types. The system presents existing space types for the Company Admin to define allowed parent-child relationships. The Company Admin creates these rules, like "Region can only contain Division" or "Division can only contain Department". Upon configuration, the system validates that these rules create a coherent hierarchy without circular references.

## User Story: OHMT.STHY.US2
Title: Company Admin validates Space Type Hierarchy
Identifier: OHMT.STHY.US2
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin initiates validation of the defined hierarchy rules. The system verifies all established parent-child relationships for completeness and consistency. The system checks for potential issues such as orphaned space types, circular references, or incomplete paths to leaf nodes. The system presents validation results highlighting any issues found and suggests possible resolutions. Upon successful validation, the system marks the hierarchy rules ready for publication.

## User Story: OHMT.STHY.US3
Title: Company Admin publishes Space Type Hierarchy
Identifier: OHMT.STHY.US3
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin reviews the validated hierarchy rules and initiates publication. The system performs a final validation check, and upon confirmation, makes the hierarchy rules active. The system now enables space creation following these established rules, allowing only valid parent-child relationships between space types. The system records this publication in the audit log. All subsequent space creation and movement operations will be governed by these published hierarchy rules.