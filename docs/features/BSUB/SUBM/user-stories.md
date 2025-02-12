# Subscription Management User Stories

## Use Case Information
Use Case: Subscription Management
Identifier: BSUB.SUBM
Phase: Later

## User Story: BSUB.SUBM.US1
Title: Company Admin views Subscription Plan Details
Identifier: BSUB.SUBM.US1
Uniqueness Check: 1
Phase: Later
Spec Link: LINK

Description:
The Company Admin accesses their current subscription information where the system displays plan name, cost, billing cycle, included resources (user limits, storage limits, API limits), and current period details (start and end dates). The system shows any add-ons or special terms applied to the subscription. The system also displays the next billing date and any scheduled changes to the subscription.

Notes/Questions:
- What is a subscription plan for YuVi?

## User Story: BSUB.SUBM.US2
Title: Company Admin compares Subscription Plans
Identifier: BSUB.SUBM.US2
Uniqueness Check: 1
Phase: Later
Spec Link: LINK

Description:
The Company Admin initiates plan comparison where the system presents available plans side by side with their current plan. The system highlights differences in resource limits, features, and costs between plans. For each compared plan, the system shows potential cost implications based on current usage patterns and indicates if any current usage would exceed the new plan's limits.

## User Story: BSUB.SUBM.US3
Title: Company Admin changes Subscription Plan
Identifier: BSUB.SUBM.US3
Uniqueness Check: 1
Phase: Later
Spec Link: LINK

Description:
The Company Admin initiates a plan change, and the system validates if the change is possible based on current usage and any contract terms. The system shows the impact of the change including new limits, cost differences, and when the change will take effect. Upon confirmation, the system schedules the plan change and sends confirmation notifications. If immediate payment is required, the system initiates the payment process.

## User Story: BSUB.SUBM.US4
Title: Company Admin views Usage Against Plan Limits
Identifier: BSUB.SUBM.US4
Uniqueness Check: 1
Phase: Later
Spec Link: LINK

Description:
The Company Admin accesses the usage dashboard where the system displays current consumption across all plan resources (users, storage, API calls). The system shows usage trends, highlights resources nearing limits (>80% used), and projects when limits might be reached based on current usage patterns. The system provides detailed breakdowns of usage by category and time period.

## User Story: BSUB.SUBM.US5
Title: System notifies Subscription Renewal
Identifier: BSUB.SUBM.US5
Uniqueness Check: 1
Phase: Later
Spec Link: LINK

Description:
The system sends renewal notifications to the Company Admin based on subscription terms. For automatic renewals, the system notifies of upcoming renewal dates and any price changes. For manual renewals, the system provides renewal instructions and deadline reminders. The system escalates notifications as the renewal date approaches.

## User Story: BSUB.SUBM.US6
Title: Company Admin receives notification for Subscription Renewal
Identifier: BSUB.SUBM.US6
Uniqueness Check: 1
Phase: Later
Spec Link: LINK

Description:
When the system identifies an upcoming subscription renewal date, it notifies the Company Admin through multiple channels. The system generates an email 30 days before renewal that includes the renewal date, any price changes, payment details, and actions required (if any). The system also creates an in-platform notification that appears in the Company Admin's notification center. For subscriptions with significant changes (like price increases) or requiring manual renewal, the system sends follow-up notifications at 15 days and 7 days before renewal. Each notification includes a direct link to subscription management where the Company Admin can take any necessary actions.