# Company Admin Account Activation User Stories

## Use Case Information
Use Case: Company Admin Account Activation
Identifier: CPOV.ACAT
Uniqueness Check: 1

## User Story: CPOV.ACAT.US1
Title: Company Admin activates their Account via the Invitation Link
Identifier: CPOV.ACAT.US1
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
When the CompanyAdmin opens the invitation link, they are welcomed with their company's name and logo prominently displayed. They see and can edit their company's foundational information including company name, primary business address, and contact phone number. The system also displays their own details - name, title, and email address - which they can verify and update except the email. Below this, they create a secure password that will protect their administrator account. They can also see the password policy that was set as a default for the company. The page provides a clear, welcoming experience that combines account security with the ability to verify and refine their company's core information, ensuring accuracy before they begin their administrative journey.

## User Story: CPOV.ACAT.US2
Title: Company Admin can't activate their Account via an expired Invitation Link
Identifier: CPOV.ACAT.US2
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
When the CompanyAdmin clicks an expired invitation link, the system identifies that the link's validity period has elapsed. The system displays a clear message explaining that the invitation has expired and cannot be used for activation. The system guides the CompanyAdmin to contact their Superadmin for a new invitation while maintaining the security of the account setup process. The system logs this expired link access attempt, enabling Superadmins to track activation issues.

## User Story: CPOV.ACAT.US3
Title: Company Admin requests for a new Invitation Link
Identifier: CPOV.ACAT.US3
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
When their invitation link has expired, the Company Admin accesses the expired link page and selects the option to request a new invitation. The system verifies that the requesting email matches the original invitation email. Upon verification, the system automatically generates a new secure invitation link, invalidates any previous links, and sends a fresh invitation email to the CompanyAdmin. The system displays a confirmation message informing the CompanyAdmin to check their email for the new invitation.

## User Story: CPOV.ACAT.US4
Title: Company Admin can't activate their Account via a canceled invite
Identifier: CPOV.ACAT.US4
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
When the CompanyAdmin clicks a cancelled invitation link, the system identifies that the invitation has been revoked by the Superadmin. The system displays a message explaining that the invitation is no longer valid and access has been denied. The system does not provide an option to request a new link since this was an intentional cancellation by the Superadmin, and guides the CompanyAdmin to contact their company representative for clarification.