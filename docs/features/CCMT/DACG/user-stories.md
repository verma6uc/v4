# Company Default Access Governance User Stories

## Use Case Information
Use Case: Company Default Access Governance
Identifier: CCMT.DACG
Uniqueness Check: 1

## User Story: CCMT.DACG.US1
Title: Company Admin configures Access Review Policy
Identifier: CCMT.DACG.US1
Uniqueness Check: 1
Phase: Later

Description:
The Company Admin establishes when and how access reviews must be conducted across the organization. The Admin configures review frequency (e.g., quarterly, bi-annual) and review scope (user access, role assignments, space permissions). The system allows setting review deadlines and automatic reminders to designated reviewers. The system enforces documentation of review outcomes, requiring reviewers to confirm continued access needs or mark for removal. Upon completion, the system generates a review report capturing all decisions and maintains it in the audit log for compliance purposes.

## User Story: CCMT.DACG.US2
Title: Company Admin sets Access Documentation Requirements
Identifier: CCMT.DACG.US2
Uniqueness Check: 1

Description:
The Company Admin configures documentation requirements for access changes system-wide. The Admin can choose to apply requirements globally ('All Changes Need Documentation') or specify individual change types. When enabling global documentation, every access change requires justification, ensuring consistent governance. Similarly, for approvals, the Admin can enable global approval workflow ('All Changes Need Approval') or configure it for specific changes. When approval is enabled globally, the Admin defines approval levels and designates approvers that apply to all access changes. The system enforces these global or specific documentation requirements during access changes, collecting justifications and routing for approval based on configuration. The system maintains all access change records with their justifications and approvals in the audit trail.