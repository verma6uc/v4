# Company Status Management User Stories

## Use Case Information
Use Case: Company Status Management
Identifier: COMM.COSM
Uniqueness Check: 1

## User Story: COMM.COSM.US1
Title: Super Admin suspends Company Access
Identifier: COMM.COSM.US1
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Super Admin selects a company from the active companies list and initiates suspension. The system verifies that the company is in an active state and can be suspended. Upon confirmation, the system changes the company status to suspended, which prevents all company users from accessing the system. The system sends an automatic notification to the Company Admin informing them of the suspension. The system maintains a record of this suspension action in the audit log.

## User Story: COMM.COSM.US2
Title: Company Admin receives a Company Suspended Notification
Identifier: COMM.COSM.US2
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
When the system changes a company's status to suspended, it generates a high-priority notification to the Company Admin. The system sends this notification via email, informing them that their company access has been suspended, preventing all company users from accessing the system. The system includes the suspension timestamp and provides guidance for contacting support regarding the suspension. This notification is also made available in the system for future reference.

## User Story: COMM.COSM.US3
Title: Super Admin reactivates Company
Identifier: COMM.COSM.US3
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Super Admin selects a company from the suspended companies list and initiates reactivation. The system verifies that the company is in a suspended state and can be reactivated. Upon confirmation, the system changes the company status to active, restoring system access for all company users. The system sends an automatic notification to the Company Admin informing them of the reactivation. The system maintains a record of this reactivation action in the audit log.

## User Story: COMM.COSM.US4
Title: Company Admin receives a Company Reactivated Notification
Identifier: COMM.COSM.US4
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
When the system changes a company's status to active, it generates a notification to the Company Admin. The system sends this notification via email, informing them that their company access has been restored and all company users can now access the system. The system includes the reactivation timestamp. This notification is also made available in the system for future reference.

## User Story: COMM.COSM.US5
Title: Super Admin archives a Company
Identifier: COMM.COSM.US5
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Super Admin selects a company from the active companies list and initiates archival. The system verifies that the company is in an active or suspended state and can be archived. Upon confirmation, the system changes the company status to archived, which makes all company data read-only and prevents user access to the system. The system sends an automatic notification to the Company Admin informing them of the archival. The system maintains a record of this archival action in the audit log.

## User Story: COMM.COSM.US6
Title: Super Admin deletes a Company
Identifier: COMM.COSM.US6
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Super Admin selects a company from the archived companies list and initiates deletion. The system verifies that the company is in an archived state and can be deleted. Upon confirmation and secondary verification (due to the permanent nature of deletion), the system permanently removes all company data and user access from the system. The system sends a final notification to the Company Admin confirming the company deletion. The system maintains a record of this deletion action in a secure audit log.