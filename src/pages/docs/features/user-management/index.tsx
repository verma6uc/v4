import React from 'react';
import { DocsLayout } from '../../../../layouts/DocsLayout';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function UserManagementPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Users & Permissions Management</h1>
        <p className="text-gray-600 text-lg mb-8">
          This feature provides comprehensive user management and access control capabilities within the YuVi platform. It 
          enables companies to manage user accounts, designations, and application role assignments effectively. Through this 
          feature, administrators can handle the complete lifecycle of user accounts, from invitation through state changes 
          to archival. The system supports both manual and intelligent role assignments, ensuring proper access control 
          while maintaining security and compliance.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/docs/features/user-management/designation-creation"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">Designation Creation</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Create and manage organizational roles and positions</p>
            </Link>

            <Link 
              to="/docs/features/user-management/designation-search"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">Designations Search & View</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Find and examine organizational designations</p>
            </Link>

            <Link 
              to="/docs/features/user-management/designation-state"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">Designation State Management</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Manage designation lifecycles and transitions</p>
            </Link>

            <Link 
              to="/docs/features/user-management/user-invitation"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">User Invitation Management</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Handle user invitations and onboarding</p>
            </Link>

            <Link 
              to="/docs/features/user-management/role-assignment"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">Manual Role Assignment</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Manage application role assignments manually</p>
            </Link>

            <Link 
              to="/docs/features/user-management/suggested-roles"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">Suggested Role Assignment</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Intelligent role suggestions and automation</p>
            </Link>

            <Link 
              to="/docs/features/user-management/user-search"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">Users Search & View</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Find and examine user information</p>
            </Link>

            <Link 
              to="/docs/features/user-management/account-management"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">User Account Management</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Manage user profiles and settings</p>
            </Link>

            <Link 
              to="/docs/features/user-management/user-state"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">User State Management</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Control user account states and status</p>
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}