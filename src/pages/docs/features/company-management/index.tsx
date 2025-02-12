import React from 'react';
import { DocsLayout } from '../../../../layouts/DocsLayout';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function CompanyManagementPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Company Management and Monitoring</h1>
        <p className="text-gray-600 text-lg mb-8">
          This feature provides Super Admins with tools to oversee and manage companies using the YuVi platform. It enables 
          comprehensive visibility into company operations, status, and health. Super Admins can view, search, and filter 
          companies, monitor their resource usage and activity patterns, and manage their operational status (active, suspended, 
          archived). The feature provides insights into company growth trends, system usage patterns, and potential issues that 
          need attention.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/docs/features/company-management/search-view"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">Company Search & View</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Find and examine company information</p>
            </Link>

            <Link 
              to="/docs/features/company-management/status"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">Company Status Management</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Manage company lifecycle states</p>
            </Link>

            <Link 
              to="/docs/features/company-management/monitoring"
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-900">Company Monitoring</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-600">Monitor company health and usage</p>
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}