import React from 'react';
import { DocsLayout } from '../../../../layouts/DocsLayout';
import { Package, Users, Database, Activity } from 'lucide-react';

export default function SubscriptionDetailsPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">View Subscription Plan Details</h1>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Feature Identifier: BSUB.SUBM.US1</h2>
          <p className="text-blue-800">Uniqueness Level: 1</p>
        </div>

        <p className="text-gray-600 text-lg mb-8">
          This feature enables Company Admins to view and understand their current subscription plan details, including 
          resource limits, costs, and billing information.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Current Plan Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Package className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Enterprise Plan</h3>
                  <p className="text-gray-600">$499/month</p>
                  <p className="text-sm text-gray-500 mt-1">Next billing date: March 1, 2025</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Activity className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Plan Status</h3>
                  <p className="text-gray-600">Active</p>
                  <p className="text-sm text-gray-500 mt-1">Auto-renews on March 1, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Resource Limits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Users</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">75/100</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">25 seats remaining</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Database className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Storage</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">400/1000 GB</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">600 GB remaining</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Activity className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">API Calls</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">600K/1M</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">400K calls remaining</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Plan Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Included Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-600">Multi-tenant environment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-600">Advanced security controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-600">24/7 priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-600">Custom integrations</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Add-ons</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  <span className="text-gray-600">Additional user packs (25 users)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  <span className="text-gray-600">Extended storage (500 GB)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  <span className="text-gray-600">API call packs (250K calls)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Billing Information</h2>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Method</h3>
                <p className="text-gray-600">Visa ending in 4242</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Billing Email</h3>
                <p className="text-gray-600">billing@company.com</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Billing Address</h3>
                <p className="text-gray-600">123 Business St</p>
                <p className="text-gray-600">Suite 100</p>
                <p className="text-gray-600">San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Change Plan
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors">
            Update Billing Info
          </button>
        </div>
      </div>
    </DocsLayout>
  );
}