import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationMacroCard } from '../../components/cards/ApplicationMacroCard';
import { completedApp } from '../../components/cards/examples/application.data';

export function AppStorePage() {
  const navigate = useNavigate();

  const handleAction = (action: string, appId: string) => {
    console.log(`${action} for app ${appId}`);
    // In real app, this would make API calls
  };

  // Only show DEVELOPMENT_COMPLETE applications
  const completedApps = [completedApp];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">App Store</h1>
        <p className="text-gray-500">Browse and deploy completed applications</p>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {completedApps.map((app) => (
          <ApplicationMacroCard
            key={app.id}
            {...app}
            onClick={() => navigate(`/creator/applications/${app.id}/detail`)}
            onRevertToPrevious={() => handleAction('revert-to-testing', app.id)}
          />
        ))}

        {completedApps.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications available</h3>
            <p className="text-gray-500">Applications that are completed will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}