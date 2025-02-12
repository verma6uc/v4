# Users & Permissions (USPM)

## Description
The Users & Permissions feature provides comprehensive user management capabilities for the YuVi platform. It handles all aspects of user administration, from designation management to user invitations and role assignments. Through this feature, administrators can create and manage designations that define user roles within their organization, control user access through various states, and manage the entire user lifecycle from invitation through to account management.

The feature ensures secure and controlled access to platform resources while maintaining clear audit trails of all user-related activities. It supports both individual and bulk operations, with robust validation and notification systems to keep all stakeholders informed of important changes.

## Use Cases

### [DCRT - Designation Creation](./DCRT/README.md)
Handles the creation and modification of organizational designations.
- [User Stories](./DCRT/user-stories.md)
  - USPM.DCRT.US1: Admin creates Designation
  - USPM.DCRT.US2: Admin modifies Designation Details

### [DSVW - Designations Search & View](./DSVW/README.md)
Provides search and view capabilities for designations.
- [User Stories](./DSVW/user-stories.md)
  - USPM.DSVW.US1: Admin views Designation List
  - USPM.DSVW.US2: Admin searches Designations
  - USPM.DSVW.US3: Admin filters Designation List
  - USPM.DSVW.US4: Admin applies Advanced Designation Filters
  - USPM.DSVW.US5: Admin views Designation Details
  - USPM.DSVW.US6: Admin sorts Designation List
  - USPM.DSVW.US7: Admin exports Designation List

### [DSTM - Designation State Management](./DSTM/README.md)
Manages the lifecycle states of designations.
- [User Stories](./DSTM/user-stories.md)
  - USPM.DSTM.US1: Admin deactivates Designation
  - USPM.DSTM.US2: Admin reactivates Designation
  - USPM.DSTM.US3: Admin archives Designation
  - USPM.DSTM.US4: Admin performs Bulk Designation State Change
  - USPM.DSTM.US5: Admin views Designation State History
  - USPM.DSTM.US6: System validates Designation State Change
  - USPM.DSTM.US7: System notifies Users of Designation State Change

### [UINV - User Invitation Management](./UINV/README.md)
Handles user invitations and account creation.
- [User Stories](./UINV/user-stories.md)
  - USPM.UINV.US1: Admin creates User Account
  - USPM.UINV.US2: System sends User Invitation
  - USPM.UINV.US3: Admin downloads Bulk User Template
  - USPM.UINV.US4: Admin creates Bulk User Accounts
  - USPM.UINV.US5: System notifies Admin of Single Invitation Delivery Failure
  - USPM.UINV.US6: System notifies Admin of Batch Invitation Delivery Failures
  - USPM.UINV.US7: Admin views Invitation Status
  - USPM.UINV.US8: Admin resends User Invitation
  - USPM.UINV.US9: Admin cancels User Invitation
  - USPM.UINV.US10: System expires User Invitation

## Identifier
- ID: USPM
- Uniqueness Check: 9

## Notes
- Designations can only be created and modified by Company Admins and Company User Managers