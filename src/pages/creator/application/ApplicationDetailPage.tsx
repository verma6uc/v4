import React from 'react';
import { useParams } from 'react-router-dom';

export function ApplicationDetailPage() {
  const { applicationId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
          <p className="text-gray-500">View and manage your application</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Backlog Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Product Backlog</h2>
          <p className="text-gray-600 mb-4">
            Manage your application's features and requirements.
          </p>
          <a 
            href={`/creator/applications/${applicationId}/backlog`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View Backlog →
          </a>
        </div>

        {/* Project Plan Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Project Plan</h2>
          <p className="text-gray-600 mb-4">
            Plan and track your application's development timeline.
          </p>
          <a 
            href={`/creator/applications/${applicationId}/plan`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View Plan →
          </a>
        </div>

        {/* Prototype Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Prototype</h2>
          <p className="text-gray-600 mb-4">
            View and interact with your application's prototype.
          </p>
          <a 
            href={`/creator/applications/${applicationId}/prototype`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View Prototype →
          </a>
        </div>
      </div>
    </div>
  );
}