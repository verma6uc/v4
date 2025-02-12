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
              deployedSpacesCount={exampleApplication.deployedSpaces.length}
              onMarkReady={createHandler('Mark Ready')}
              onRevertToDraft={createHandler('Revert to Draft')}
            />
            <ApplicationMiniCard 
              {...exampleApplication}
              status="DRAFT"
              deployedSpacesCount={0}
              onStartDevelopment={createHandler('Start Development')}
            />
            <ApplicationMiniCard 
              {...exampleApplication}
              status="READY_TO_DEPLOY"
              deployedSpacesCount={exampleApplication.deployedSpaces.length}
              onPublish={createHandler('Publish Application')}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Macro Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <ApplicationMacroCard 
              {...exampleApplication}
              onMarkReady={createHandler('Mark Ready')}
              onRevertToDraft={createHandler('Revert to Draft')}
              onUpdateBacklog={createHandler('Update Backlog')}
              onUpdateBlueprint={createHandler('Update Blueprint')}
            />
            <ApplicationMacroCard 
              {...exampleApplication}
              status="DRAFT"
              deployedSpaces={[]}
              concept={undefined}
              backlog={undefined}
              blueprint={undefined}
              onStartDevelopment={createHandler('Start Development')}
            />
            <ApplicationMacroCard 
              {...exampleApplication}
              status="READY_TO_DEPLOY"
              prototype={{
                version: '1.0.0-rc.1',
                status: 'Approved',
                feedbackCount: 15,
                lastTested: '1 day ago'
              }}
              onPublish={createHandler('Publish Application')}
              onRevertToDraft={createHandler('Revert to Draft')}
            />
            <ApplicationMacroCard 
              {...exampleApplication}
              status="PUBLISHED"
              currentVersion="1.0.0"
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
              onDeployToSpace={createHandler('Deploy to Space')}
              onManageDeployments={createHandler('Manage Deployments')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}