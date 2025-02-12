# User Invitation Management User Stories

## Use Case Information
Use Case: User Invitation Management
Identifier: USPM.UINV
Uniqueness Check: 1

## User Story: USPM.UINV.US1
Title: Admin creates User Account
Identifier: USPM.UINV.US1
Uniqueness Check: 1

Description:
The Admin initiates user account creation and provides the user's email address and name. The system validates email format and checks for existing accounts or pending invitations with this email. The Admin selects an organizational designation (e.g., QA Manager, Production Supervisor) for the user based on their job function. The Admin assigns appropriate platform role(s) based on their scope. For company-level platform roles, the Company Admin can assign roles like Company Data Manager or Space Admin. For space-level platform roles, the Space Admin can assign roles like Space Data Manager. The system validates platform role assignments based on Admin's privileges. The Admin assigns the user to relevant spaces based on their role and function. Upon validation, the system creates the user account in invited state and triggers the invitation email process. The system records this creation in the audit log. Application role assignments will be handled as a separate process after account creation.

## User Story: USPM.UINV.US2
Title: System sends User Invitation
Identifier: USPM.UINV.US2
Uniqueness Check: 1

Description:
The Admin initiates bulk user creation by either uploading a completed template file or using a structured input form for multiple entries. For file upload, the system validates that the file follows the official template structure. The system performs pre-validation checks on all entries: email format validation, existing account verification, designation validity, and platform role assignment validity based on Admin's scope. The system presents a validation summary showing valid and invalid entries, allowing the Admin to correct errors before proceeding. For valid entries, the Admin confirms platform role assignments and space assignments that will apply to all users. Upon confirmation, the system creates user accounts in bulk and provides a detailed creation report showing successful and failed creations with specific reasons for failures. The system then triggers invitation emails for all successfully created accounts, managing these as individual invitations for tracking purposes. The system maintains individual audit trails while linking these accounts to the bulk creation event. Application role assignments will be handled separately after account creation completion.

## User Story: USPM.UINV.US3
Title: Admin downloads Bulk User Template
Identifier: USPM.UINV.US3
Uniqueness Check: 1

Description:
The Admin accesses the bulk user creation section where the system provides a downloadable template file in multiple formats (CSV/Excel). The template includes predefined columns for required information (email, name) and example data showing the expected format. The system includes clear column headers and data format requirements. The template contains embedded validation rules (in Excel format) to help Admins validate data during entry. The system maintains template versioning to ensure compatibility with the current bulk upload process.

## User Story: USPM.UINV.US4
Title: Admin creates Bulk User Accounts
Identifier: USPM.UINV.US4
Uniqueness Check: 1

Description:
The Admin initiates bulk user creation by either uploading a completed template file or using a structured input form for multiple entries. For file upload, the system validates that the file follows the official template structure. The system performs pre-validation checks on all entries: email format validation, existing account verification, and role assignment validity based on Admin's scope. The system presents a validation summary showing valid and invalid entries, allowing the Admin to correct errors before proceeding. For valid entries, the Admin confirms role assignments that will apply to all users. Upon confirmation, the system creates user accounts in bulk and provides a detailed creation report showing successful and failed creations with specific reasons for failures. The system then triggers invitation emails for all successfully created accounts, managing these as individual invitations for tracking purposes. The system maintains individual audit trails while linking these accounts to the bulk creation event.

## User Story: USPM.UINV.US5
Title: System notifies Admin of Single Invitation Delivery Failure
Identifier: USPM.UINV.US5
Uniqueness Check: 1

Description:
When an invitation email delivery fails, the system immediately generates a notification for the Admin who created the account. The system includes the failed recipient's details, failure reason (e.g., invalid email, mailbox full, server rejection), and timestamp of the attempt. The notification is delivered both via email and as an in-platform alert. The system provides direct links to view the invitation details and to resend the invitation. The system logs this failure notification in the audit trail.

## User Story: USPM.UINV.US6
Title: System notifies Admin of Batch Invitation Delivery Failures
Identifier: USPM.UINV.US6
Uniqueness Check: 1

Description:
When invitation emails from a bulk creation fail, the system generates a consolidated notification for the Admin. The system includes: the batch creation timestamp, total invitations in batch, number of successful deliveries, and list of failed deliveries with their respective failure reasons. The notification is delivered both via email and as an in-platform alert. The system provides a link to the batch details where the Admin can review all failures and take bulk actions like resending failed invitations. The system logs these failure notifications in the audit trail.

## User Story: USPM.UINV.US7
Title: Admin views Invitation Status
Identifier: USPM.UINV.US7
Uniqueness Check: 1

Description:
The Admin accesses the invitation management section where the system displays a list of all pending invitations. For each invitation, the system shows recipient details, role(s) assigned, invitation sent date, expiry date, current status (sent, expired, cancelled), and number of resend attempts. The Admin can filter invitations by status, date range, and roles. The system highlights invitations nearing expiry and those requiring attention (like failed deliveries). The system allows sorting by any column and provides search capability across all invitation data.

## User Story: USPM.UINV.US8
Title: Admin resends User Invitation
Identifier: USPM.UINV.US8
Uniqueness Check: 1

Description:
The Admin selects a pending invitation to resend. The system verifies that the invitation hasn't exceeded the company-configured maximum resend attempts and the account hasn't been cancelled. The system generates a new secure link, invalidating any previous links for this invitation. The system sends a fresh invitation email with the new link and updated expiry period. The system logs this resend action and updates the invitation record with new send time, expiry time, and remaining resend attempts.

## User Story: USPM.UINV.US9
Title: Admin cancels User Invitation
Identifier: USPM.UINV.US9
Uniqueness Check: 1

Description:
The Admin selects a pending invitation for cancellation and provides a cancellation reason. The system immediately invalidates the invitation link and updates the invitation status to cancelled. The system records the cancellation reason, timestamp, and cancelling Admin's details. If configured, the system sends a cancellation notification to the invited email address. The system maintains the cancelled invitation record for audit purposes but removes it from active invitation management views.

## User Story: USPM.UINV.US10
Title: System expires User Invitation
Identifier: USPM.UINV.US10
Uniqueness Check: 1

Description:
When an invitation reaches its configured expiry time, the system automatically invalidates the invitation link. The system updates the invitation status to expired and logs this state change. The system notifies the Admin who created the invitation about the expiry. The notification includes the invitation details and provides options to either resend (if attempts remain) or cancel the invitation. The system maintains the expired invitation record for tracking but marks it as requiring action in the invitation management view.