import React from 'react';
import { Eye } from 'lucide-react';

interface AppVisualPRDProps {
  visualPRD: {
    version: string;
    mockups: string[];
    userFlows: string[];
    designSystem: {
      colors: string[];
      typography: string;
    };
    lastModified: string;
    reviewStatus: string;
  };
}

export function AppVisualPRD({ visualPRD }: AppVisualPRDProps) {
  return (
    <div className="flex items-start space-x-2 text-sm text-gray-600">
      <Eye className="w-4 h-4 mt-0.5" />
      <div>
        <div className="font-medium">Visual PRD v{visualPRD.version}</div>
        <div className="text-xs">Status: {visualPRD.reviewStatus}</div>
        <div className="mt-1">
          <div className="text-xs">Mockups: {visualPRD.mockups.join(', ')}</div>
          <div className="text-xs">Flows: {visualPRD.userFlows.join(', ')}</div>
        </div>
      </div>
    </div>
  );
}