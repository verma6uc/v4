import React from 'react';
import { useParams } from 'react-router-dom';

export function ProjectPlanPage() {
  const { applicationId } = useParams();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Project Plan</h1>
          
          {/* Placeholder for Project Plan content */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500">
              Project Plan content for application {applicationId} will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}