# Designation Creation User Stories

## Use Case Information
Use Case: Designation Creation
Identifier: USPM.DCRT
Uniqueness Check: 1

## User Story: USPM.DCRT.US1
Title: Admin creates Designation
Identifier: USPM.DCRT.US1
Uniqueness Check: 1

Description:
The Admin initiates designation creation in the system. The Admin provides the designation name (e.g., 'Senior QA Analyst', 'Production Supervisor') which must be unique within the company. The Admin provides a description detailing the purpose of this designation. The system validates the uniqueness of the designation name within the company context. Upon validation, the system creates the designation in active state. The system records this creation in the audit log with timestamp and creator details. The new designation becomes available for user assignment during user creation and role management.

Notes:
Designations can only be created by Company Admins and Company User Managers

## User Story: USPM.DCRT.US2
Title: Admin modifies Designation Details
Identifier: USPM.DCRT.US2
Uniqueness Check: 1

Description:
The Admin selects an existing designation to modify its details. The system displays current designation information including name and description. The Admin can update either of these fields. If modifying the designation name, the system ensures the new name remains unique within the company. Upon validation, the system updates the designation details. For users currently assigned this designation, the system maintains their assignment with the updated details. The system records all modifications in the audit log, tracking specific fields changed, timestamp, and who made the changes.

Notes:
Designations can only be modified by Company Admins and Company User Managers