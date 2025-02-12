# Company Creation User Stories

## Use Case Information
Use Case: Company Creation
Identifier: CPOV.COCR
Uniqueness Check: 1

## User Story: CPOV.COCR.US1
Title: Super Admin creates a new Company
Identifier: CPOV.COCR.US1
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Superadmin provides the company's name and a logo. The system verifies this identifier's uniqueness across all existing companies. Upon validation, the system creates the company's record and generates a unique internal reference. This reference will link all company-specific configurations, user data, and organizational structures to this company. Once created, the company record is ready for CompanyAdmin invitation and subsequent organizational setup.

Notes/Questions:
1. What all default settings get applied by the system for that company. For example, password policy
2. We might want to show the defaults to the Super Admin and allow them change it when creating the company

## User Story: CPOV.COCR.US2
Title: Super Admin modifies Company details
Identifier: CPOV.COCR.US2
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Superadmin accesses the company details from the companies list. The system shows the company's current identifier and base information. The Superadmin updates required details, and the system validates changes, particularly ensuring company identifier uniqueness if modified. Upon validation, the system updates the company record. If the CompanyAdmin hasn't yet activated their account, they will see these updated details when they access their invitation link.