# Company Configuration Management (CCMT)

## Description
This feature provides Company Admins with tools to configure company-wide settings and policies on the YuVi platform. It encompasses various aspects of company operation, from basic profile management to security policies and integration settings. Through this feature, Company Admins can maintain company information and branding, configure security parameters like password policies and session management, set up communication preferences, and manage external integrations.

The feature ensures consistent application of policies across the company's platform usage while allowing flexibility where needed. It handles critical security configurations including authentication rules, MFA requirements, and IP access restrictions. The feature also manages audit logging configurations and integration settings with external systems. These configurations establish the operational framework within which all platform activities for the company take place.

## Use Cases

### [CPMT - Company Profile Management](./CPMT/README.md)
Manages company profile information and branding.
- [User Stories](./CPMT/user-stories.md)
  - CCMT.CPMT.US1: Company Admin updates Company Profile
  - CCMT.CPMT.US2: Company Admin manages Company Brand Assets

### [SECF - Account Security Configuration](./SECF/README.md)
Handles security-related configurations and policies.
- [User Stories](./SECF/user-stories.md)
  - CCMT.SECF.US1: Company Admin configures Invitation Settings
  - CCMT.SECF.US2: Company Admin updates Password Policy
  - CCMT.SECF.US3: Company Admin updates Account Lockout Policy
  - CCMT.SECF.US4: Company Admin configures Session Lock Rules
  - CCMT.SECF.US5: Company Admin configures Concurrent Session Rules
  - CCMT.SECF.US6: Company Admin configures MFA Requirements
  - CCMT.SECF.US7: Company Admin sets IP Access Rules

## Identifier
- ID: CCMT
- Uniqueness Check: 5

## Notes
- Platform-level rules needed to define security parameter constraints
- Security configurations must meet minimum platform requirements