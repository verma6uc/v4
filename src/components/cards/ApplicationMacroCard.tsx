import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FileCode,
  Eye,
  Code,
  TestTube,
  CheckCircle2,
  RotateCcw,
  Layout,
  Lightbulb,
  Clock,
  ListChecks,
  Bug,
  BarChart,
  FileText,
  FileSpreadsheet,
  FileLineChart,
  Monitor
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
  MEMORY: { color: 'warning' as const, icon: Lightbulb, label: 'Memory' },
  BLUEPRINT: { color: 'info' as const, icon: FileCode, label: 'Blueprint' },
  VISUAL_PRD: { color: 'info' as const, icon: Eye, label: 'Visual PRD' },
  DURING_DEVELOPMENT: { color: 'info' as const, icon: Code, label: 'In Development' },
  UNDER_TESTED: { color: 'warning' as const, icon: TestTube, label: 'Testing' },
  DEVELOPMENT_COMPLETE: { color: 'success' as const, icon: CheckCircle2, label: 'Complete' }
};

export function ApplicationMacroCard({
  id,
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
  const navigate = useNavigate();
  
  // Helper function to determine if a stage is accessible
  const canAccessStage = (requiredStage: ApplicationStatus) => {
    const stages: ApplicationStatus[] = [
      'MEMORY',
      'BLUEPRINT',
      'VISUAL_PRD',
      'DURING_DEVELOPMENT',
      'UNDER_TESTED',
      'DEVELOPMENT_COMPLETE'
    ];
    return stages.indexOf(status) >= stages.indexOf(requiredStage);
  };

  const StatusIcon = statusConfig[status].icon;

  const handleActionClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    navigate(path);
  };

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
            {statusConfig[status].label}
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
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <Lightbulb className="w-4 h-4 mt-0.5" />
              <div>
                <div className="font-medium">Memory Phase</div>
                <div className="text-xs">{memory.summary}</div>
                <div className="mt-1 space-y-1">
                  {memory.notes.map((note, idx) => (
                    <div key={idx} className="text-xs text-gray-500">• {note}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {blueprint && (
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
          )}

          {visualPRD && (
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
          )}
        </div>

        <div className="flex flex-col space-y-3">
          {development && (
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
          )}
          
          {testing && (
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <TestTube className="w-4 h-4 mt-0.5" />
              <div>
                <div className="font-medium">Testing Status</div>
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-xs">Coverage</div>
                    <div className="font-medium">{testing.testCoverage}%</div>
                  </div>
                  <div>
                    <div className="text-xs">Test Cases</div>
                    <div className="font-medium">{testing.testCases}</div>
                  </div>
                  <div>
                    <div className="text-xs">Open Bugs</div>
                    <div className="font-medium">{testing.bugs}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Last Run: {testing.lastTestRun}</div>
              </div>
            </div>
          )}
          
          {deployedSpaces.length > 0 && (
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <Layout className="w-4 h-4 mt-0.5" />
              <div>
                <div className="font-medium">Deployed Spaces</div>
                {deployedSpaces.map(space => (
                  <div key={space.id} className="text-xs">
                    {space.name} (v{space.version}) - {space.deployedAt}
                  </div>
                ))}
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

          {/* Creation flow page links */}
          {/* Product Backlog - Available from Memory stage */}
          {canAccessStage('MEMORY') && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => handleActionClick(e, `/creator/applications/${id}/backlog`)}
            >
              <FileSpreadsheet className="w-4 h-4 mr-1" />
              Product Backlog
            </Button>
          )}

          {/* Project Plan - Available from Blueprint stage */}
          {canAccessStage('BLUEPRINT') && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => handleActionClick(e, `/creator/applications/${id}/plan`)}
            >
              <FileLineChart className="w-4 h-4 mr-1" />
              Project Plan
            </Button>
          )}

          {/* Prototype - Available from Visual PRD stage */}
          {canAccessStage('VISUAL_PRD') && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => handleActionClick(e, `/creator/applications/${id}/prototype`)}
            >
              <Monitor className="w-4 h-4 mr-1" />
              Prototype
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <div>Created: {createdAt}</div>
        <div>Updated: {updatedAt}</div>
      </div>
    </div>
  );
}