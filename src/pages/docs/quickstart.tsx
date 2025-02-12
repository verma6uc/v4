import React from 'react';
import { DocsLayout } from '../../layouts/DocsLayout';

export default function QuickstartPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Quickstart Guide</h1>
        <p className="text-gray-600 text-lg mb-8">
          Learn how to quickly set up your first organization and start managing users.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Create Your First Organization</h2>
            <p className="text-gray-600 mb-4">
              After logging in as an admin, you can create your first organization:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>Navigate to the Organizations page</li>
              <li>Click "Create Organization"</li>
              <li>Fill in the organization details</li>
              <li>Set up the initial configuration</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Configure User Roles</h2>
            <p className="text-gray-600 mb-4">
              Set up roles and permissions for your organization:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>Go to the Roles section</li>
              <li>Create necessary roles (e.g., Admin, Manager, User)</li>
              <li>Define permissions for each role</li>
              <li>Assign roles to team members</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Invite Team Members</h2>
            <p className="text-gray-600 mb-4">
              Start adding users to your organization:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>Access the Users page</li>
              <li>Click "Invite Users"</li>
              <li>Enter email addresses</li>
              <li>Select roles for each user</li>
              <li>Send invitations</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Set Up Departments</h2>
            <p className="text-gray-600 mb-4">
              Organize your team structure:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>Navigate to Departments</li>
              <li>Create department structure</li>
              <li>Assign team members to departments</li>
              <li>Configure department-specific settings</li>
            </ol>
          </section>
        </div>

        <div className="mt-12 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Steps</h3>
          <p className="text-blue-800">
            Now that you have the basics set up, explore advanced features like SSO integration,
            audit logging, and custom workflows in our detailed guides.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <a href="/docs/advanced-features" className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all duration-150">
            Explore Advanced Features
          </a>
        </div>
      </div>
    </DocsLayout>
  );
}