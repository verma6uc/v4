import React from 'react';
import { useParams } from 'react-router-dom';

export function PrototypePage() {
  const { applicationId } = useParams();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Prototype Viewer</h1>
          
          {/* Placeholder for Prototype Viewer content */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500">
              Prototype Viewer content for application {applicationId} will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}