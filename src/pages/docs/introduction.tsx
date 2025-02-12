import React from 'react';
import { DocsLayout } from '../../layouts/DocsLayout';

export default function IntroductionPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Introduction to YuVi</h1>
        <p className="text-gray-600 text-lg mb-8">
          YuVi is an enterprise management platform designed for multi-tenant environments,
          providing robust tools for organization management, user control, and system monitoring.
        </p>

        <h2 className="text-2xl font-semibold mb-4">What is YuVi?</h2>
        <p className="text-gray-600 mb-6">
          YuVi is a comprehensive solution that helps enterprises manage multiple organizations,
          users, and resources efficiently. It provides a secure, scalable, and flexible platform
          for handling complex organizational structures.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <span className="w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full" />
            <div>
              <strong className="block text-gray-900">Multi-Tenancy</strong>
              <span className="text-gray-600">Secure isolation between organizations with dedicated resources</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full" />
            <div>
              <strong className="block text-gray-900">User Management</strong>
              <span className="text-gray-600">Comprehensive user control with role-based access</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full" />
            <div>
              <strong className="block text-gray-900">Organization Hierarchy</strong>
              <span className="text-gray-600">Flexible organization structure with nested departments</span>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="text-gray-600 mb-4">
          To get started with YuVi, follow our installation guide and quickstart tutorial. You'll be
          up and running in minutes with our streamlined setup process.
        </p>

        <div className="mt-8 flex gap-4">
          <a href="/docs/installation" className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all duration-150">
            Installation Guide
          </a>
          <a href="/docs/quickstart" className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-[0.98] transition-all duration-150">
            Quickstart Tutorial
          </a>
        </div>
      </div>
    </DocsLayout>
  );
}