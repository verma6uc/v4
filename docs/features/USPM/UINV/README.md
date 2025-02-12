# User Invitation Management (UINV)

## Description
This use case manages the complete user invitation lifecycle, from initial account creation through invitation delivery and status tracking. It enables administrators to create user accounts both individually and in bulk, with appropriate designation and role assignments. The use case includes robust validation checks, delivery monitoring, and failure handling to ensure successful user onboarding. It provides comprehensive invitation management capabilities including status tracking, resending options, and expiration handling.

## User Stories
- [UINV.US1: Admin creates User Account](./user-stories.md#user-story-uinvus1)
- [UINV.US2: System sends User Invitation](./user-stories.md#user-story-uinvus2)
- [UINV.US3: Admin downloads Bulk User Template](./user-stories.md#user-story-uinvus3)
- [UINV.US4: Admin creates Bulk User Accounts](./user-stories.md#user-story-uinvus4)
- [UINV.US5: System notifies Admin of Single Invitation Delivery Failure](./user-stories.md#user-story-uinvus5)
- [UINV.US6: System notifies Admin of Batch Invitation Delivery Failures](./user-stories.md#user-story-uinvus6)
- [UINV.US7: Admin views Invitation Status](./user-stories.md#user-story-uinvus7)
- [UINV.US8: Admin resends User Invitation](./user-stories.md#user-story-uinvus8)
- [UINV.US9: Admin cancels User Invitation](./user-stories.md#user-story-uinvus9)
- [UINV.US10: System expires User Invitation](./user-stories.md#user-story-uinvus10)

## Identifier
- ID: USPM.UINV
- Uniqueness Check: 1

## Notes
- Application role assignments are handled as a separate process after account creation
- The system maintains individual audit trails while linking bulk-created accounts to their creation event