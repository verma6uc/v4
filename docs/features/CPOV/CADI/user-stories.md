# Company Admin Invitation User Stories

## Use Case Information
Use Case: Company Admin Invitation
Identifier: CPOV.CADI
Uniqueness Check: 1

## User Story: CPOV.CADI.US1
Title: Super Admin creates Company Admin Account for a company
Identifier: CPOV.CADI.US1
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
For a selected comapny the Superadmin specifies the email address and name for the designated CompanyAdmin. The system verifies the email is not associated with any existing account across companies. Upon validation, the system creates an admin account record and associates it with the company. The system assigns CompanyAdmin permissions to this account, making it the primary administrator for the company.

## User Story: CPOV.CADI.US2
Title: System sends Admin Invitation Email
Identifier: CPOV.CADI.US2
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The system generates a secure, time-limited invitation link for the CompanyAdmin account. Using the provided email address, the system sends an invitation email containing this link along with initial access instructions. This invitation allows the CompanyAdmin to set up their credentials and access the system for the first time.

## User Story: CPOV.CADI.US3
Title: Super Admin view Invitation Status of Company Admins
Identifier: CPOV.CADI.US3
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

## User Story: CPOV.CADI.US4
Title: Super Admin resends Admin Invitation
Identifier: CPOV.CADI.US4
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Superadmin selects the unactivated company admin account and triggers a new invitation. The system invalidates any previously sent invitation links for security. The system then generates a new secure invitation link with a fresh expiration period. Using the Company Admin's email address, the system sends a new invitation email containing this link. The system records this resend action in the audit log, tracking both the timestamp and the Superadmin who initiated it.

## User Story: CPOV.CADI.US5
Title: Superadmin cancels Admin Activation
Identifier: CPOV.CADI.US5
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Superadmin selects the unactivated admin account and initiates cancellation. The system immediately invalidates any existing invitation links sent to this admin. The system reverts the admin account to an inactive state, removing any association with the company while preserving the company record itself. The system adds this cancellation to the audit log. This allows the Superadmin to assign a different admin to the company through a new admin account creation.