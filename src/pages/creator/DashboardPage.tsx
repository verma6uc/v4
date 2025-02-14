import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { ApplicationMacroCard } from '../../components/cards/ApplicationMacroCard';
import {
  memoryPhaseApp,
  blueprintPhaseApp,
  visualPRDPhaseApp,
  developmentPhaseApp,
  testingPhaseApp
} from '../../components/cards/examples/application.data';

export function DashboardPage() {
  const navigate = useNavigate();

  const handleAction = (action: string, appId: string) => {
    console.log(`${action} for app ${appId}`);
    // In real app, this would make API calls
  };

  // Filter out DEVELOPMENT_COMPLETE applications
  const inProgressApps = [
    memoryPhaseApp,
    blueprintPhaseApp,
    visualPRDPhaseApp,
    developmentPhaseApp,
    testingPhaseApp
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Create and manage your applications</p>
        </div>
        <Button
          onClick={() => navigate('/creator/applications/new')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {inProgressApps.map((app) => (
          <ApplicationMacroCard
            key={app.id}
            {...app}
            onClick={() => navigate(`/creator/applications/${app.id}/detail`)}
            onMoveToBlueprint={app.status === 'MEMORY' ? () => handleAction('move-to-blueprint', app.id) : undefined}
            onMoveToVisualPRD={app.status === 'BLUEPRINT' ? () => handleAction('move-to-visual-prd', app.id) : undefined}
            onStartDevelopment={app.status === 'VISUAL_PRD' ? () => handleAction('start-development', app.id) : undefined}
            onStartTesting={app.status === 'DURING_DEVELOPMENT' ? () => handleAction('start-testing', app.id) : undefined}
            onMarkComplete={app.status === 'UNDER_TESTED' ? () => handleAction('mark-complete', app.id) : undefined}
            onRevertToPrevious={app.status !== 'MEMORY' ? () => handleAction('revert-to-previous', app.id) : undefined}
          />
        ))}

        {inProgressApps.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications in progress</h3>
            <p className="text-gray-500">Start creating a new application to begin development.</p>
          </div>
        )}
      </div>
    </div>
  );
}