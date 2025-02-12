# Self Signup & Account Activation (SSAA)

## Description
This use case manages the end-to-end self-service onboarding workflow for new companies. Through this use case, prospective company administrators can register their companies and create their admin accounts through a streamlined self-service process. The use case handles comprehensive input validation, company record creation, admin account provisioning, and secure account activation. It ensures that self-signup users receive the same level of security and operational readiness as those onboarded through invitations.

## User Stories
- [SSAA.US1: Self Signup and Account Activation for Prospective Company Admin](./user-stories.md#user-story-ssaaus1)

## Identifier
- ID: SSUP.SSAA
- Uniqueness Check: 1

## Notes
- System performs thorough validation of all input data
- Automatically creates company records with unique identifiers
- Generates provisional admin accounts in "Pending Activation" state
- Implements secure email verification and activation process
- Integrates with company provisioning and admin activation flows