# Company Provisioning (CPOV)

## Description
This feature enables the YuVi platform to onboard new companies onto the platform. Through this feature, Super Admins can create new company instances and establish their initial administrative access. The process begins with creating a company record with basic identification information. Following this, a Company Admin account is created and invited to access the platform. The feature handles the secure invitation process, allowing the Company Admin to set up their credentials and verify their access. This feature is critical as it establishes the foundation for a company's presence on the platform. It ensures secure initial access while maintaining proper isolation between different companies on the platform. The feature focuses solely on getting a company established and their admin activated, after which the Company Admin can begin configuring their organizational structure and other settings.

## Use Cases

### [COCR - Company Creation](./COCR/README.md)
Handles the initial establishment of a company instance on the platform.
- [User Stories](./COCR/user-stories.md)
  - CPOV.COCR.US1: Super Admin creates a new Company
  - CPOV.COCR.US2: Super Admin modifies Company details

### [CADI - Company Admin Invitation](./CADI/README.md)
Manages the secure process of inviting and setting up the initial company administrator.
- [User Stories](./CADI/user-stories.md)
  - CPOV.CADI.US1: Super Admin creates Company Admin Account for a company
  - CPOV.CADI.US2: System sends Admin Invitation Email
  - CPOV.CADI.US3: Super Admin view Invitation Status of Company Admins
  - CPOV.CADI.US4: Super Admin resends Admin Invitation
  - CPOV.CADI.US5: Superadmin cancels Admin Activation

### [ACAT - Company Admin Account Activation](./ACAT/README.md)
Handles the activation and initial setup of the Company Admin account.

## Identifier
- ID: CPOV
- Uniqueness Check: 3

## Implementation Notes
- Each use case has detailed user stories defining specific functionality
- All actions are audited for security and compliance
- Strong validation ensures data integrity and security
- Clear separation of concerns between company creation and admin management