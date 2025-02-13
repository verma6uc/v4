import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationMacroCard } from '../../components/cards/ApplicationMacroCard';

type ApplicationStatus = 'MEMORY' | 'BLUEPRINT' | 'VISUAL_PRD' | 'DURING_DEVELOPMENT' | 'UNDER_TESTED' | 'DEVELOPMENT_COMPLETE';

// Mock data - in real app this would come from API
const mockApplications = [
  {
    id: '4',
    title: 'Task Management System',
    description: 'Team collaboration and task tracking platform',
    status: 'DEVELOPMENT_COMPLETE' as ApplicationStatus,
    currentVersion: '2.0.0',
    deployedSpaces: [
      {
        id: 'space1',
        name: 'Development',
        version: '2.0.0',
        deployedAt: '2025-02-13'
      },
      {
        id: 'space2',
        name: 'Production',
        version: '2.0.0',
        deployedAt: '2025-02-13'
      }
    ],
    development: {
      startedAt: '2 months ago',
      currentPhase: 'Completed',
      completedModules: 15,
      totalModules: 15,
      technicalDebt: []
    },
    testing: {
      startedAt: '1 week ago',
      testCases: 120,
      bugs: 0,
      testCoverage: 95,
      lastTestRun: '1 day ago'
    },
    createdAt: '2025-02-01',
    updatedAt: '2025-02-13'
  },
  {
    id: '5',
    title: 'Document Management',
    description: 'Enterprise document organization system',
    status: 'DEVELOPMENT_COMPLETE' as ApplicationStatus,
    currentVersion: '1.5.0',
    deployedSpaces: [
      {
        id: 'space3',
        name: 'Staging',
        version: '1.5.0',
        deployedAt: '2025-02-12'
      }
    ],
    development: {
      startedAt: '1 month ago',
      currentPhase: 'Completed',
      completedModules: 10,
      totalModules: 10,
      technicalDebt: []
    },
    testing: {
      startedAt: '5 days ago',
      testCases: 85,
      bugs: 0,
      testCoverage: 92,
      lastTestRun: '12 hours ago'
    },
    createdAt: '2025-02-05',
    updatedAt: '2025-02-12'
  }
];

export function AppStorePage() {
  const navigate = useNavigate();

  const handleAction = (action: string, appId: string) => {
    console.log(`${action} for app ${appId}`);
    // In real app, this would make API calls
  };

  // Filter only DEVELOPMENT_COMPLETE applications
  const completedApps = mockApplications.filter(
    app => app.status === 'DEVELOPMENT_COMPLETE'
  );

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