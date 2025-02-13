import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  Box,
  FileCode,
  Eye,
  Code,
  TestTube,
  CheckCircle2,
  RotateCcw,
  Layout,
  Lightbulb
} from 'lucide-react';

type ApplicationStatus = 'MEMORY' | 'BLUEPRINT' | 'VISUAL_PRD' | 'DURING_DEVELOPMENT' | 'UNDER_TESTED' | 'DEVELOPMENT_COMPLETE';

interface Memory {
  summary: string;
  createdAt: string;
  notes: string[];
}

interface Blueprint {
  version: string;
  diagram: string;
  states: string[];
  actions: string[];
  lastModified: string;
  reviewStatus: string;
  reviewComments: string[];
}

interface VisualPRD {
  version: string;
  mockups: string[];
  userFlows: string[];
  designSystem: {
    colors: string[];
    typography: string;
  };
  lastModified: string;
  reviewStatus: string;
}

interface Development {
  startedAt: string;
  currentPhase: string;
  completedModules: number;
  totalModules: number;
  technicalDebt: string[];
}

interface Testing {
  startedAt: string;
  testCases: number;
  bugs: number;
  testCoverage: number;
  lastTestRun: string;
}

interface DeployedSpace {
  id: string;
  name: string;
  version: string;
  deployedAt: string;
}

interface ApplicationMacroCardProps {
  id: string;
  title: string;
  description: string;
  status: ApplicationStatus;
  currentVersion?: string;
  deployedSpaces: DeployedSpace[];
  memory?: Memory;
  blueprint?: Blueprint;
  visualPRD?: VisualPRD;
  development?: Development;
  testing?: Testing;
  createdAt: string;
  updatedAt: string;
  onClick?: () => void;
  onMoveToBlueprint?: () => void;
  onMoveToVisualPRD?: () => void;
  onStartDevelopment?: () => void;
  onStartTesting?: () => void;
  onMarkComplete?: () => void;
  onRevertToPrevious?: () => void;
}

const statusConfig = {
  MEMORY: { color: 'warning' as const, icon: Lightbulb },
  BLUEPRINT: { color: 'info' as const, icon: FileCode },
  VISUAL_PRD: { color: 'info' as const, icon: Eye },
  DURING_DEVELOPMENT: { color: 'info' as const, icon: Code },
  UNDER_TESTED: { color: 'warning' as const, icon: TestTube },
  DEVELOPMENT_COMPLETE: { color: 'success' as const, icon: CheckCircle2 }
};

export function ApplicationMacroCard({
  title,
  description,
  status,
  currentVersion,
  deployedSpaces,
  memory,
  blueprint,
  visualPRD,
  development,
  testing,
  createdAt,
  updatedAt,
  onClick,
  onMoveToBlueprint,
  onMoveToVisualPRD,
  onStartDevelopment,
  onStartTesting,
  onMarkComplete,
  onRevertToPrevious
}: ApplicationMacroCardProps) {
  const StatusIcon = statusConfig[status].icon;

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Box className="w-12 h-12 text-gray-400" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={statusConfig[status].color}
            icon={<StatusIcon className="w-4 h-4" />}
          >
            {status.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
          </Badge>
          {currentVersion && (
            <Badge variant="default">
              v{currentVersion}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col space-y-3">
          {memory && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Lightbulb className="w-4 h-4" />
              <div>
                <div className="font-medium">Memory</div>
                <div className="text-xs">{memory.summary}</div>
                <div className="text-xs text-gray-400">Created: {memory.createdAt}</div>
              </div>
            </div>
          )}
          
          {blueprint && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileCode className="w-4 h-4" />
              <div>
                <div className="font-medium">Blueprint v{blueprint.version}</div>
                <div className="text-xs">Status: {blueprint.reviewStatus}</div>
                <div className="text-xs text-gray-400">Modified: {blueprint.lastModified}</div>
              </div>
            </div>
          )}

          {visualPRD && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Eye className="w-4 h-4" />
              <div>
                <div className="font-medium">Visual PRD v{visualPRD.version}</div>
                <div className="text-xs">Status: {visualPRD.reviewStatus}</div>
                <div className="text-xs text-gray-400">Modified: {visualPRD.lastModified}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          {development && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Code className="w-4 h-4" />
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
          )}
          
          {testing && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TestTube className="w-4 h-4" />
              <div>
                <div className="font-medium">Testing Status</div>
                <div className="text-xs">Coverage: {testing.testCoverage}%</div>
                <div className="text-xs">Open Bugs: {testing.bugs}</div>
                <div className="text-xs text-gray-400">Last Run: {testing.lastTestRun}</div>
              </div>
            </div>
          )}
          
          {deployedSpaces.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Layout className="w-4 h-4" />
              <div>
                <div className="font-medium">Deployed Spaces</div>
                {deployedSpaces.slice(0, 2).map(space => (
                  <div key={space.id} className="text-xs">
                    {space.name} (v{space.version})
                  </div>
                ))}
                {deployedSpaces.length > 2 && (
                  <div className="text-xs text-gray-400">
                    +{deployedSpaces.length - 2} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {status === 'MEMORY' && onMoveToBlueprint && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMoveToBlueprint();
              }}
            >
              <FileCode className="w-4 h-4 mr-1" />
              Move to Blueprint
            </Button>
          )}
          
          {status === 'BLUEPRINT' && onMoveToVisualPRD && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMoveToVisualPRD();
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              Move to Visual PRD
            </Button>
          )}
          
          {status === 'VISUAL_PRD' && onStartDevelopment && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onStartDevelopment();
              }}
            >
              <Code className="w-4 h-4 mr-1" />
              Start Development
            </Button>
          )}

          {status === 'DURING_DEVELOPMENT' && onStartTesting && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onStartTesting();
              }}
            >
              <TestTube className="w-4 h-4 mr-1" />
              Start Testing
            </Button>
          )}

          {status === 'UNDER_TESTED' && onMarkComplete && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMarkComplete();
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Mark Complete
            </Button>
          )}
          
          {status !== 'MEMORY' && onRevertToPrevious && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRevertToPrevious();
              }}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Revert to Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}