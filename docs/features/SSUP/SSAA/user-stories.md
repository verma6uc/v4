# Self Signup & Account Activation User Stories

## Use Case Information
Use Case: Self Signup & Account Activation
Identifier: SSUP.SSAA
Uniqueness Check: 1

## User Story: SSUP.SSAA.US1
Title: Self Signup and Account Activation for Prospective Company Admin
Identifier: SSUP.SSAA.US1
Uniqueness Check: 1

Description:
The self-signup process consists of several key stages:

### Initiation & Data Collection
Given I navigate to the Self Signup portal,
When I select the self-register option,
Then I should see a form requesting:
- Company Details:
  * Company Name
  * Company Email/Contact
  * Physical Address
  * Phone Number
  * Other identifying details
- User Details:
  * Full Name
  * Primary Email Address
  * Designation/Role (Optional)
  * Security questions or MFA preferences
And inline help, tooltips, and real-time validations are available to guide my input.

### Input Validation & Duplication Checks
Given I fill in the required information,
When I submit the form,
Then the system must validate:
- Mandatory fields are completed
- Data formats are correct (e.g., email format, password complexity rules on later steps)
- There are no duplicate entries (e.g., the company name and email are unique across the platform)
And if validation fails, detailed error messages should be displayed with guidance on how to correct the issues.

### Provisional Company Record and Admin Account Creation
Given all input passes validation,
When the form is successfully submitted,
Then the system will:
- Automatically create a new company record with a unique identifier
- Create a provisional Company Admin account in a "Pending Activation" state linked to that company

### Activation Email Dispatch
Given the provisional account is created,
When the signup process completes,
Then the system sends an activation email to the provided primary email address containing:
- A secure, time-limited activation token embedded in a personalized activation link
- Clear instructions on how to complete the activation (e.g., setting up a password and verifying the email)
- Information regarding the token's validity period and steps to follow if the link expires

### Account Activation & Setup
Given I receive the activation email,
When I click the activation link,
Then I should be directed to a secure setup page where I can:
- Set up my account password following security requirements
- Configure additional security settings (MFA, recovery options)
- Review and accept terms of service and privacy policies
And upon completion, my account should be activated and ready for use.

### Post-Activation Flow
Given my account is successfully activated,
When I first log in,
Then I should:
- See a welcome message with getting started guidance
- Have immediate access to my company's admin dashboard
- Receive follow-up emails with onboarding resources and next steps
And the system should maintain audit records of the entire signup and activation process.