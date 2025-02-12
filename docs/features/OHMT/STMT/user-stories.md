# Space Type Creation User Stories

## Use Case Information
Use Case: Space Type Creation
Identifier: OHMT.STMT
Uniqueness Check: 1

## User Story: OHMT.STMT.US1
Title: Company Admin creates Space Type
Identifier: OHMT.STMT.US1
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin provides a unique name, identifier, and description for the new space type (like "Region" with description "Geographic regional division of the organization"). The system verifies the uniqueness of this space type within the company context. Upon validation, the system creates a space type record that will serve as a template for creating actual spaces. The system prepares this type for field configuration and hierarchy rule definition. The system records this creation in the audit log.

## User Story: OHMT.STMT.US2
Title: Company Admin modifies Space Type
Identifier: OHMT.STMT.US2
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects an existing space type to update its name, identifier, or description. The system verifies that the modified name and identifier remain unique within the company context. If this space type is already in use by existing spaces, the system ensures the modifications don't impact them. Upon validation, the system updates the space type record and maintains a history of these changes in the audit log.