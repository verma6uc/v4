import React from 'react';
import { Code } from 'lucide-react';

interface AppDevelopmentProps {
  development: {
    startedAt: string;
    currentPhase: string;
    completedModules: number;
    totalModules: number;
    technicalDebt: string[];
  };
}

export function AppDevelopment({ development }: AppDevelopmentProps) {
  return (
    <div className="flex items-start space-x-2 text-sm text-gray-600">
      <Code className="w-4 h-4 mt-0.5" />
      <div>
        <div className="font-medium">Development Progress</div>
        <div className="text-xs">Phase: {development.currentPhase}</div>
        <div className="text-xs">{development.completedModules}/{development.totalModules} Modules</div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
          <div
            className="bg-blue-600 h-1.5 rounded-full"
            style={{ width: `${(development.completedModules / development.totalModules) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}