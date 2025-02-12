import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';

export default function MultiTenancyPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Multi-Tenancy</h1>
        <p className="text-gray-600 text-lg mb-8">
          Secure isolation between organizations with dedicated resources and configurations.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Enterprise SaaS Deployment</h3>
              <p className="text-gray-600 mb-4">
                Large enterprises managing multiple subsidiary companies with separate data and user bases.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Separate data storage for each subsidiary</li>
                <li>Custom branding and configurations</li>
                <li>Independent user management</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Managed Service Provider</h3>
              <p className="text-gray-600 mb-4">
                MSPs managing multiple client organizations with distinct service levels.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Client-specific resource allocation</li>
                <li>Isolated client environments</li>
                <li>Customized service offerings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">User Stories</h2>
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                As a System Administrator
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-sm">1</span>
                  <p className="text-blue-800">I want to create isolated environments for each client organization</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-sm">2</span>
                  <p className="text-blue-800">I want to configure custom resource limits for each tenant</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-sm">3</span>
                  <p className="text-blue-800">I want to monitor resource usage across all tenants</p>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                As an Organization Admin
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-sm">1</span>
                  <p className="text-blue-800">I want to customize my organization's branding and settings</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-sm">2</span>
                  <p className="text-blue-800">I want to manage users within my organization independently</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-sm">3</span>
                  <p className="text-blue-800">I want to view usage analytics for my organization only</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Implementation Guidelines</h2>
          <div className="prose prose-blue">
            <h3>Database Isolation</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{`// Example schema with tenant isolation
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  settings JSONB
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  org_id UUID REFERENCES organizations(id),
  email TEXT NOT NULL
);`}</code>
            </pre>

            <h3>Resource Management</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{`// Example resource limits configuration
{
  "resourceLimits": {
    "storage": "50GB",
    "users": 100,
    "apiCalls": 10000
  }
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}