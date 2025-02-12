import React from 'react';
import { DocsLayout } from '../../../../layouts/DocsLayout';
import { CreditCard, Package, BarChart3, Bell, RefreshCw } from 'lucide-react';

export default function BillingSubscriptionPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Billing & Subscription Management</h1>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Feature Identifier: BSUB</h2>
          <p className="text-blue-800">Uniqueness Level: 2</p>
        </div>

        <p className="text-gray-600 text-lg mb-8">
          The Billing and Subscription Management feature enables companies to manage their YuVi platform subscription, 
          monitor resource usage, and handle billing operations. Through this feature, Company Admins can view and modify 
          their subscription plans, track resource consumption, and manage billing details. The feature provides clear 
          visibility into current usage patterns and costs while maintaining comprehensive billing records.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Package className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">View Subscription Plan Details</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: BSUB.SUBM.US1</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Company Admin accesses their current subscription information where the system displays plan name, 
                      cost, billing cycle, included resources (user limits, storage limits, API limits), and current period 
                      details (start and end dates). The system shows any add-ons or special terms applied to the subscription. 
                      The system also displays the next billing date and any scheduled changes to the subscription.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Display clear resource limits and current usage</li>
                      <li>Show billing cycle information prominently</li>
                      <li>Highlight any upcoming changes or renewals</li>
                      <li>Include cost breakdown for transparency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <BarChart3 className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Compare Subscription Plans</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: BSUB.SUBM.US2</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Company Admin initiates plan comparison where the system presents available plans side by side with 
                      their current plan. The system highlights differences in resource limits, features, and costs between 
                      plans. For each compared plan, the system shows potential cost implications based on current usage 
                      patterns and indicates if any current usage would exceed the new plan's limits.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Highlight key differences between plans</li>
                      <li>Show cost savings or increases clearly</li>
                      <li>Flag potential resource limit issues</li>
                      <li>Include feature comparison matrix</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <RefreshCw className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Change Subscription Plan</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: BSUB.SUBM.US3</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Company Admin initiates a plan change, and the system validates if the change is possible based on 
                      current usage and any contract terms. The system shows the impact of the change including new limits, 
                      cost differences, and when the change will take effect. Upon confirmation, the system schedules the 
                      plan change and sends confirmation notifications. If immediate payment is required, the system initiates 
                      the payment process.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Validate resource usage compatibility</li>
                      <li>Calculate prorated costs if applicable</li>
                      <li>Handle immediate billing requirements</li>
                      <li>Send confirmation notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">View Usage Against Plan Limits</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: BSUB.SUBM.US4</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Company Admin accesses the usage dashboard where the system displays current consumption across all 
                      plan resources (users, storage, API calls). The system shows usage trends, highlights resources nearing 
                      limits (>80% used), and projects when limits might be reached based on current usage patterns. The 
                      system provides detailed breakdowns of usage by category and time period.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Track all resource usage metrics</li>
                      <li>Implement usage projections</li>
                      <li>Highlight approaching limits</li>
                      <li>Provide detailed usage reports</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Bell className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Subscription Renewal Notifications</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: BSUB.SUBM.US5</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The system sends renewal notifications to the Company Admin based on subscription terms. For automatic 
                      renewals, the system notifies of upcoming renewal dates and any price changes. For manual renewals, 
                      the system provides renewal instructions and deadline reminders. The system escalates notifications as 
                      the renewal date approaches.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Schedule notifications appropriately</li>
                      <li>Include clear renewal instructions</li>
                      <li>Track notification delivery</li>
                      <li>Maintain notification history</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}