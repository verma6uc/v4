import React from 'react';
import { FileCode } from 'lucide-react';

interface AppBlueprintProps {
  blueprint: {
    version: string;
    diagram: string;
    states: string[];
    actions: string[];
    lastModified: string;
    reviewStatus: string;
    reviewComments: string[];
  };
}

export function AppBlueprint({ blueprint }: AppBlueprintProps) {
  return (
    <div className="flex items-start space-x-2 text-sm text-gray-600">
      <FileCode className="w-4 h-4 mt-0.5" />
      <div>
        <div className="font-medium">Blueprint v{blueprint.version}</div>
        <div className="text-xs">Status: {blueprint.reviewStatus}</div>
        <div className="mt-1">
          <div className="text-xs">States: {blueprint.states.join(', ')}</div>
          <div className="text-xs">Actions: {blueprint.actions.join(', ')}</div>
        </div>
      </div>
    </div>
  );
}