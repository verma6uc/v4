import React from 'react';
import { DocsLayout } from '../../../../layouts/DocsLayout';
import { Check, X } from 'lucide-react';

export default function PlanComparisonPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Compare Subscription Plans</h1>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Feature Identifier: BSUB.SUBM.US2</h2>
          <p className="text-blue-800">Uniqueness Level: 1</p>
        </div>

        <p className="text-gray-600 text-lg mb-8">
          Compare available subscription plans to find the best fit for your organization's needs.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left bg-gray-50 border-b"></th>
                <th className="p-4 text-center bg-gray-50 border-b">
                  <div className="text-xl font-semibold text-gray-900">Basic</div>
                  <div className="text-gray-600">$99/month</div>
                </th>
                <th className="p-4 text-center bg-blue-50 border-b">
                  <div className="text-xl font-semibold text-blue-900">Professional</div>
                  <div className="text-blue-600">$299/month</div>
                  <div className="text-sm text-blue-600">(Current Plan)</div>
                </th>
                <th className="p-4 text-center bg-gray-50 border-b">
                  <div className="text-xl font-semibold text-gray-900">Enterprise</div>
                  <div className="text-gray-600">$499/month</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b font-medium">Users</td>
                <td className="p-4 text-center border-b">25 users</td>
                <td className="p-4 text-center border-b bg-blue-50">50 users</td>
                <td className="p-4 text-center border-b">100 users</td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Storage</td>
                <td className="p-4 text-center border-b">100 GB</td>
                <td className="p-4 text-center border-b bg-blue-50">500 GB</td>
                <td className="p-4 text-center border-b">1 TB</td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">API Calls</td>
                <td className="p-4 text-center border-b">100K/month</td>
                <td className="p-4 text-center border-b bg-blue-50">500K/month</td>
                <td className="p-4 text-center border-b">1M/month</td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Multi-tenant Environment</td>
                <td className="p-4 text-center border-b">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center border-b bg-blue-50">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center border-b">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Advanced Security</td>
                <td className="p-4 text-center border-b">
                  <X className="w-5 h-5 text-gray-300 mx-auto" />
                </td>
                <td className="p-4 text-center border-b bg-blue-50">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center border-b">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Priority Support</td>
                <td className="p-4 text-center border-b">
                  <X className="w-5 h-5 text-gray-300 mx-auto" />
                </td>
                <td className="p-4 text-center border-b bg-blue-50">
                  <X className="w-5 h-5 text-gray-300 mx-auto" />
                </td>
                <td className="p-4 text-center border-b">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Custom Integrations</td>
                <td className="p-4 text-center border-b">
                  <X className="w-5 h-5 text-gray-300 mx-auto" />
                </td>
                <td className="p-4 text-center border-b bg-blue-50">
                  <X className="w-5 h-5 text-gray-300 mx-auto" />
                </td>
                <td className="p-4 text-center border-b">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4"></td>
                <td className="p-4 text-center">
                  <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors">
                    Downgrade
                  </button>
                </td>
                <td className="p-4 text-center bg-blue-50">
                  <button className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg cursor-not-allowed" disabled>
                    Current Plan
                  </button>
                </td>
                <td className="p-4 text-center">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Upgrade
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Usage Impact Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Current Usage</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-gray-600">Users</span>
                  <span className="text-gray-900">45/50 (90%)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-600">Storage</span>
                  <span className="text-gray-900">350/500 GB (70%)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-600">API Calls</span>
                  <span className="text-gray-900">400K/500K (80%)</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Recommendations</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></span>
                  <span className="text-gray-600">Consider upgrading to Enterprise plan due to high user utilization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></span>
                  <span className="text-gray-600">Current storage usage suggests current plan is adequate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></span>
                  <span className="text-gray-600">API usage trending towards limit, monitor closely</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}