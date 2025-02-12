import React from 'react';
import { DocsLayout } from '../../layouts/DocsLayout';

export default function InstallationPage() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Installation</h1>
        <p className="text-gray-600 text-lg mb-8">
          Get started with YuVi by following these installation steps.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Node.js 18 or higher</li>
            <li>npm or yarn package manager</li>
            <li>PostgreSQL 14 or higher</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Installation Steps</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">1. Clone the Repository</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>git clone https://github.com/yuvi/yuvi.git
cd yuvi</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">2. Install Dependencies</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>npm install</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">3. Configure Environment</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>cp .env.example .env
# Edit .env with your configuration</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">4. Run Migrations</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>npm run migrate</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">5. Start the Application</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>npm run dev</code>
            </pre>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <a href="/docs/quickstart" className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all duration-150">
            Continue to Quickstart
          </a>
        </div>
      </div>
    </DocsLayout>
  );
}