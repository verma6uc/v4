import React from 'react';
import { SpaceMiniCard } from '../SpaceMiniCard';
import { SpaceMacroCard } from '../SpaceMacroCard';
import { exampleSpace } from '../examples/space.data';
import { createHandler } from '../examples/helpers';

export function SpaceCardsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Space Cards</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mini Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <SpaceMiniCard 
              {...exampleSpace}
              adminCount={exampleSpace.adminUsers.length}
              onSuspend={createHandler('Suspend Space')}
              onArchive={createHandler('Archive Space')}
            />
            <SpaceMiniCard 
              {...exampleSpace}
              status="DRAFT"
              adminCount={exampleSpace.adminUsers.length}
              onActivate={createHandler('Activate Space')}
            />
            <SpaceMiniCard 
              {...exampleSpace}
              status="SUSPENDED"
              adminCount={exampleSpace.adminUsers.length}
              onReactivate={createHandler('Reactivate Space')}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Macro Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <SpaceMacroCard 
              {...exampleSpace}
              onSuspend={createHandler('Suspend Space')}
              onArchive={createHandler('Archive Space')}
              onUpdateDetails={createHandler('Update Details')}
              onDeployApplication={createHandler('Deploy Application')}
              onRemoveApplication={createHandler('Remove Application')}
              onAssignUsers={createHandler('Assign Users')}
              onUpdateUserAccess={createHandler('Update User Access')}
            />
            <SpaceMacroCard 
              {...exampleSpace}
              status="SUSPENDED"
              onReactivate={createHandler('Reactivate Space')}
            />
            <SpaceMacroCard 
              {...exampleSpace}
              status="DRAFT"
              onActivate={createHandler('Activate Space')}
              onUpdateDetails={createHandler('Update Details')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}