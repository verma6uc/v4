import React from 'react';
import { ApplicationMiniCard } from '../ApplicationMiniCard';
import { ApplicationMacroCard } from '../ApplicationMacroCard';
import { 
  exampleApplication,
  memoryPhaseApp,
  blueprintPhaseApp,
  visualPRDPhaseApp,
  developmentPhaseApp,
  testingPhaseApp,
  completedApp
} from '../examples/application.data';
import { createHandler } from '../examples/helpers';

export function ApplicationCardsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Application Cards</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mini Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            {/* Memory Phase */}
            <ApplicationMiniCard 
              {...memoryPhaseApp}
              deployedSpacesCount={0}
              onMoveToBlueprint={createHandler('Move to Blueprint')}
            />

            {/* Blueprint Phase */}
            <ApplicationMiniCard 
              {...blueprintPhaseApp}
              deployedSpacesCount={0}
              onMoveToVisualPRD={createHandler('Move to Visual PRD')}
              onRevertToPrevious={createHandler('Revert to Memory')}
            />

            {/* Visual PRD Phase */}
            <ApplicationMiniCard 
              {...visualPRDPhaseApp}
              deployedSpacesCount={0}
              onStartDevelopment={createHandler('Start Development')}
              onRevertToPrevious={createHandler('Revert to Blueprint')}
            />

            {/* Development Phase */}
            <ApplicationMiniCard 
              {...developmentPhaseApp}
              deployedSpacesCount={1}
              onStartTesting={createHandler('Start Testing')}
              onRevertToPrevious={createHandler('Revert to Visual PRD')}
            />

            {/* Testing Phase */}
            <ApplicationMiniCard 
              {...testingPhaseApp}
              deployedSpacesCount={1}
              onMarkComplete={createHandler('Mark Complete')}
              onRevertToPrevious={createHandler('Revert to Development')}
            />

            {/* Complete Phase */}
            <ApplicationMiniCard 
              {...completedApp}
              deployedSpacesCount={2}
              onRevertToPrevious={createHandler('Revert to Testing')}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Macro Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            {/* Memory Phase */}
            <ApplicationMacroCard 
              {...memoryPhaseApp}
              onMoveToBlueprint={createHandler('Move to Blueprint')}
            />

            {/* Blueprint Phase */}
            <ApplicationMacroCard 
              {...blueprintPhaseApp}
              onMoveToVisualPRD={createHandler('Move to Visual PRD')}
              onRevertToPrevious={createHandler('Revert to Memory')}
            />

            {/* Visual PRD Phase */}
            <ApplicationMacroCard 
              {...visualPRDPhaseApp}
              onStartDevelopment={createHandler('Start Development')}
              onRevertToPrevious={createHandler('Revert to Blueprint')}
            />

            {/* Development Phase */}
            <ApplicationMacroCard 
              {...developmentPhaseApp}
              onStartTesting={createHandler('Start Testing')}
              onRevertToPrevious={createHandler('Revert to Visual PRD')}
            />

            {/* Testing Phase */}
            <ApplicationMacroCard 
              {...testingPhaseApp}
              onMarkComplete={createHandler('Mark Complete')}
              onRevertToPrevious={createHandler('Revert to Development')}
            />

            {/* Complete Phase */}
            <ApplicationMacroCard 
              {...completedApp}
              onRevertToPrevious={createHandler('Revert to Testing')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}