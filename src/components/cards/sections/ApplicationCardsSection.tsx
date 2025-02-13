import React from 'react';
import { ApplicationMiniCard } from '../ApplicationMiniCard';
import { ApplicationMacroCard } from '../ApplicationMacroCard';
import { exampleApplication } from '../examples/application.data';
import { createHandler } from '../examples/helpers';

export function ApplicationCardsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Application Cards</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mini Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <ApplicationMiniCard 
              {...exampleApplication}
              status="MEMORY"
              deployedSpacesCount={0}
              onMoveToBlueprint={createHandler('Move to Blueprint')}
            />
            <ApplicationMiniCard 
              {...exampleApplication}
              status="BLUEPRINT"
              deployedSpacesCount={0}
              onMoveToVisualPRD={createHandler('Move to Visual PRD')}
            />
            <ApplicationMiniCard 
              {...exampleApplication}
              status="VISUAL_PRD"
              deployedSpacesCount={0}
              onStartDevelopment={createHandler('Start Development')}
            />
            <ApplicationMiniCard 
              {...exampleApplication}
              status="DURING_DEVELOPMENT"
              deployedSpacesCount={1}
              onStartTesting={createHandler('Start Testing')}
            />
            <ApplicationMiniCard 
              {...exampleApplication}
              status="UNDER_TESTED"
              deployedSpacesCount={2}
              onMarkComplete={createHandler('Mark Complete')}
            />
            <ApplicationMiniCard 
              {...exampleApplication}
              status="DEVELOPMENT_COMPLETE"
              deployedSpacesCount={3}
              onRevertToPrevious={createHandler('Revert to Testing')}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Macro Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            {/* Memory Phase */}
            <ApplicationMacroCard 
              {...exampleApplication}
              status="MEMORY"
              memory={{
                summary: 'Initial concept for customer portal',
                createdAt: '1 day ago',
                notes: ['Focus on user experience', 'Real-time updates']
              }}
              development={{
                startedAt: '',
                currentPhase: 'Not Started',
                completedModules: 0,
                totalModules: 12,
                technicalDebt: []
              }}
              onMoveToBlueprint={createHandler('Move to Blueprint')}
            />

            {/* Blueprint Phase */}
            <ApplicationMacroCard 
              {...exampleApplication}
              status="BLUEPRINT"
              blueprint={{
                version: '1.0',
                diagram: 'https://example.com/diagrams/portal.svg',
                states: ['Login', 'Dashboard'],
                actions: ['Update Profile'],
                lastModified: '12 hours ago',
                reviewStatus: 'In Review',
                reviewComments: []
              }}
              development={{
                startedAt: '',
                currentPhase: 'Not Started',
                completedModules: 0,
                totalModules: 12,
                technicalDebt: []
              }}
              onMoveToVisualPRD={createHandler('Move to Visual PRD')}
              onRevertToPrevious={createHandler('Revert to Memory')}
            />

            {/* Visual PRD Phase */}
            <ApplicationMacroCard 
              {...exampleApplication}
              status="VISUAL_PRD"
              visualPRD={{
                version: '1.0',
                mockups: ['Dashboard', 'Profile'],
                userFlows: ['Login Flow'],
                designSystem: {
                  colors: ['#1a73e8'],
                  typography: 'Inter'
                },
                lastModified: '6 hours ago',
                reviewStatus: 'Approved'
              }}
              development={{
                startedAt: '',
                currentPhase: 'Not Started',
                completedModules: 0,
                totalModules: 12,
                technicalDebt: []
              }}
              onStartDevelopment={createHandler('Start Development')}
              onRevertToPrevious={createHandler('Revert to Blueprint')}
            />

            {/* Development Phase */}
            <ApplicationMacroCard 
              {...exampleApplication}
              status="DURING_DEVELOPMENT"
              development={{
                startedAt: '1 week ago',
                currentPhase: 'Frontend',
                completedModules: 8,
                totalModules: 12,
                technicalDebt: []
              }}
              onStartTesting={createHandler('Start Testing')}
              onRevertToPrevious={createHandler('Revert to Visual PRD')}
            />

            {/* Testing Phase */}
            <ApplicationMacroCard 
              {...exampleApplication}
              status="UNDER_TESTED"
              development={{
                startedAt: '2 weeks ago',
                currentPhase: 'Testing',
                completedModules: 12,
                totalModules: 12,
                technicalDebt: []
              }}
              testing={{
                startedAt: '2 days ago',
                testCases: 45,
                bugs: 3,
                testCoverage: 78,
                lastTestRun: '1 hour ago'
              }}
              onMarkComplete={createHandler('Mark Complete')}
              onRevertToPrevious={createHandler('Revert to Development')}
            />

            {/* Complete Phase */}
            <ApplicationMacroCard 
              {...exampleApplication}
              status="DEVELOPMENT_COMPLETE"
              currentVersion="1.0.0"
              development={{
                startedAt: '1 month ago',
                currentPhase: 'Completed',
                completedModules: 12,
                totalModules: 12,
                technicalDebt: []
              }}
              deployedSpaces={[
                { 
                  id: '1', 
                  name: 'Production',
                  version: '1.0.0',
                  deployedAt: '1 hour ago'
                },
                { 
                  id: '2', 
                  name: 'Staging',
                  version: '1.0.0-rc.2',
                  deployedAt: '1 day ago'
                }
              ]}
              onRevertToPrevious={createHandler('Revert to Testing')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}