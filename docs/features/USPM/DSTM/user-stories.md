# Designation State Management User Stories

## Use Case Information
Use Case: Designation State Management
Identifier: USPM.DSTM
Uniqueness Check: 1

## User Story: USPM.DSTM.US1
Title: Admin deactivates Designation
Identifier: USPM.DSTM.US1
Uniqueness Check: 1

Description:
The Admin selects an active designation and initiates deactivation. The system checks for all users currently assigned this designation, preventing deactivation if there are any assigned users. If users exist, the system provides the Admin a detailed list of these users and requires a different designation to be assigned to them before proceeding with deactivation. The Admin must provide a reason for deactivation which the system records. Upon confirmation and successful user reassignment, the system changes the designation state to inactive. The deactivated designation remains visible in filtered views but cannot be assigned to new users or selected during user modifications. The system records the deactivation details including timestamp, actor, reason, and any user reassignments in the audit log. The system then triggers notifications to relevant administrators about this state change.

## User Story: USPM.DSTM.US2
Title: Admin reactivates Designation
Identifier: USPM.DSTM.US2
Uniqueness Check: 1

Description:
The Admin selects an inactive designation and initiates reactivation. The system verifies that the designation name remains unique among active designations, as naming conflicts might have arisen during its inactive period. The Admin must provide a reason for reactivation which the system records. Upon confirmation, the system changes the designation state to active, making it available for user assignments and modifications. The system records the reactivation details including timestamp, actor, and reason in the audit log. The system then makes the designation available for user assignment in both new user creation and user modification workflows. The system triggers notifications to relevant administrators about this state change.

## User Story: USPM.DSTM.US3
Title: Admin archives Designation
Identifier: USPM.DSTM.US3
Uniqueness Check: 1

Description:
The Admin selects an inactive designation and initiates archival. The system verifies that the designation has been inactive for a minimum required period and has no users assigned. The Admin must provide an archival reason which the system records. Upon confirmation, the system changes the designation state to archived. Archived designations are removed from standard views but remain accessible through specific archive filters. The system maintains all historical data related to this designation including past assignments and state changes. The system prevents any future state changes or modifications to archived designations. The system records the archival details including timestamp, actor, and reason in the audit log. The system then triggers notifications to relevant administrators about this archival.

## User Story: USPM.DSTM.US4
Title: Admin performs Bulk Designation State Change
Identifier: USPM.DSTM.US4
Uniqueness Check: 1

Description:
The Admin selects multiple designations and initiates a state change action (deactivate, reactivate, or archive). The system validates each designation individually against state change rules. For deactivation, the system identifies all designations with assigned users and requires reassignment plans. For reactivation, the system checks naming conflicts across all selected designations. For archival, the system verifies inactive duration and user assignment status for each designation. The Admin provides a single reason that applies to all valid state changes. The system processes each valid state change sequentially, recording individual results. For any designations that fail validation, the system provides detailed failure reasons. The system creates individual audit log entries for each processed designation. The system then triggers a consolidated notification showing the summary of all state changes.

## User Story: USPM.DSTM.US5
Title: Admin views Designation State History
Identifier: USPM.DSTM.US5
Uniqueness Check: 1

Description:
The Admin accesses the state history view for a designation. The system displays a chronological list of all state changes, showing previous and new states, timestamp of change, actor who performed the change, and the recorded reason. For each state change involving user reassignments, the system shows the impacted user count and provides access to the detailed reassignment records. The system displays this history in a timeline view, making it easy to understand the designation's lifecycle. The Admin can filter the history by date range, state change type, or actor. The system provides export capabilities for the state history, useful for audit and compliance purposes.

## User Story: USPM.DSTM.US6
Title: System validates Designation State Change
Identifier: USPM.DSTM.US6
Uniqueness Check: 1

Description:
The system automatically validates state change requests based on designation type and current state. For deactivation, the system checks for assigned users, active dependencies, and system rules. For reactivation, the system verifies naming uniqueness, company status, and reactivation policies. For archival, the system confirms inactive duration, user assignment status, and archival policies. The system enforces state transition rules, preventing invalid state changes like direct active-to-archived transitions. Upon validation failure, the system provides detailed error messages explaining the specific validation issues and suggested remediation steps. The system logs all validation attempts, including failed ones, for audit purposes.

## User Story: USPM.DSTM.US7
Title: System notifies Users of Designation State Change
Identifier: USPM.DSTM.US7
Uniqueness Check: 1

Description:
The system automatically generates notifications when a designation's state changes. For deactivation, the system notifies all users who were reassigned, their direct managers, and relevant administrators, including details of their new designation assignments. For reactivation, the system notifies all administrators who might need to consider this designation for user assignments. For archival, the system notifies relevant administrators for record-keeping purposes. Each notification includes the designation name, old and new states, reason for change, timestamp, and actor who performed the change. The system sends these notifications through configured channels (email, in-platform notifications) and maintains a record of notification delivery and acknowledgment. The notifications include appropriate links to view more details about the state change.