import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { ApplicationMacroCard } from '../../components/cards/ApplicationMacroCard';

type ApplicationStatus = 'MEMORY' | 'BLUEPRINT' | 'VISUAL_PRD' | 'DURING_DEVELOPMENT' | 'UNDER_TESTED' | 'DEVELOPMENT_COMPLETE';

// Mock data - in real app this would come from API
const mockApplications = [
  {
    id: '1',
    title: 'Customer Portal',
    description: 'Self-service portal for customer account management',
    status: 'DURING_DEVELOPMENT' as ApplicationStatus,
    currentVersion: '0.1.0',
    deployedSpaces: [],
    development: {
      startedAt: '1 month ago',
      currentPhase: 'Frontend Implementation',
      completedModules: 8,
      totalModules: 12,
      technicalDebt: []
    },
    createdAt: '2025-02-10',
    updatedAt: '2025-02-13'
  },
  {
    id: '2',
    title: 'Inventory Manager',
    description: 'Real-time inventory tracking system',
    status: 'MEMORY' as ApplicationStatus,
    deployedSpaces: [],
    memory: {
      summary: 'Automated inventory tracking with real-time updates',
      createdAt: '2025-02-12',
      notes: ['Initial concept', 'Focus on automation']
    },
    createdAt: '2025-02-12',
    updatedAt: '2025-02-12'
  },
  {
    id: '3',
    title: 'Analytics Dashboard',
    description: 'Business intelligence and reporting platform',
    status: 'UNDER_TESTED' as ApplicationStatus,
    currentVersion: '0.9.0',
    deployedSpaces: [],
    development: {
      startedAt: '2 weeks ago',
      currentPhase: 'Testing',
      completedModules: 15,
      totalModules: 15,
      technicalDebt: []
    },
    testing: {
      startedAt: '2 days ago',
      testCases: 87,
      bugs: 3,
      testCoverage: 92,
      lastTestRun: '1 hour ago'
    },
    createdAt: '2025-02-09',
    updatedAt: '2025-02-11'
  }
];

export function DashboardPage() {
  const navigate = useNavigate();

  const handleAction = (action: string, appId: string) => {
    console.log(`${action} for app ${appId}`);
    // In real app, this would make API calls
  };

  // Filter out DEVELOPMENT_COMPLETE applications
  const inProgressApps = mockApplications.filter(
    app => app.status !== 'DEVELOPMENT_COMPLETE'
  );

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