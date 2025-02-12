import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  Box,
  PlayCircle,
  CheckCircle2,
  Upload,
  RotateCcw,
  Layout,
  Calendar,
  ListTodo,
  FileCode,
  TestTube,
  Settings,
  History,
  Lightbulb
} from 'lucide-react';

interface ApplicationMacroCardProps {
  id: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'READY_TO_DEPLOY' | 'PUBLISHED';
  currentVersion?: string;
  deployedSpaces: Array<{
    id: string;
    name: string;
    version: string;
    deployedAt: string;
  }>;
  concept?: {
    summary: string;
    selectedAt: string;
  };
  backlog?: {
    featuresCount: number;
    useCasesCount: number;
    userStoriesCount: number;
  };
  blueprint?: {
    version: string;
    lastModified: string;
  };
  prototype?: {
    version: string;
    status: string;
    feedbackCount: number;
    lastTested: string;
  };
  createdAt: string;
  updatedAt: string;
  onClick?: () => void;
  onStartDevelopment?: () => void;
  onMarkReady?: () => void;
  onPublish?: () => void;
  onRevertToDraft?: () => void;
  onUpdateBacklog?: () => void;
  onUpdateBlueprint?: () => void;
  onDeployToSpace?: () => void;
  onManageDeployments?: () => void;
}

const statusConfig = {
  DRAFT: { color: 'warning' as const },
  IN_PROGRESS: { color: 'info' as const },
  READY_TO_DEPLOY: { color: 'success' as const },
  PUBLISHED: { color: 'primary' as const }
};

export function ApplicationMacroCard({
  title,
  description,
  status,
  currentVersion,
  deployedSpaces,
  concept,
  backlog,
  blueprint,
  prototype,
  createdAt,
  updatedAt,
  onClick,
  onStartDevelopment,
  onMarkReady,
  onPublish,
  onRevertToDraft,
  onUpdateBacklog,
  onUpdateBlueprint,
  onDeployToSpace,
  onManageDeployments
}: ApplicationMacroCardProps) {
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
            dot
          >
            {status.toLowerCase().replace('_', ' ')}
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
          {concept && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Lightbulb className="w-4 h-4" />
              <div>
                <div className="font-medium">Concept</div>
                <div className="text-xs">{concept.summary}</div>
                <div className="text-xs text-gray-400">Selected: {concept.selectedAt}</div>
              </div>
            </div>
          )}
          
          {backlog && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ListTodo className="w-4 h-4" />
              <div>
                <div className="font-medium">Backlog</div>
                <div className="text-xs">
                  {backlog.featuresCount} Features, 
                  {backlog.useCasesCount} Use Cases, 
                  {backlog.userStoriesCount} Stories
                </div>
              </div>
            </div>
          )}
          
          {blueprint && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileCode className="w-4 h-4" />
              <div>
                <div className="font-medium">Blueprint v{blueprint.version}</div>
                <div className="text-xs">Modified: {blueprint.lastModified}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          {prototype && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TestTube className="w-4 h-4" />
              <div>
                <div className="font-medium">Prototype v{prototype.version}</div>
                <div className="text-xs">Status: {prototype.status}</div>
                <div className="text-xs">{prototype.feedbackCount} Feedback Items</div>
                <div className="text-xs text-gray-400">Tested: {prototype.lastTested}</div>
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
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <History className="w-4 h-4" />
            <div>
              <div className="text-xs">Created: {createdAt}</div>
              <div className="text-xs">Updated: {updatedAt}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {/* State Management Actions */}
          {status === 'DRAFT' && onStartDevelopment && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onStartDevelopment();
              }}
            >
              <PlayCircle className="w-4 h-4 mr-1" />
              Start Development
            </Button>
          )}
          
          {status === 'IN_PROGRESS' && onMarkReady && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMarkReady();
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Mark Ready
            </Button>
          )}
          
          {status === 'READY_TO_DEPLOY' && onPublish && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPublish();
              }}
            >
              <Upload className="w-4 h-4 mr-1" />
              Publish
            </Button>
          )}
          
          {status !== 'DRAFT' && onRevertToDraft && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRevertToDraft();
              }}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Revert to Draft
            </Button>
          )}

          {/* Development Actions */}
          {status === 'IN_PROGRESS' && (
            <>
              {onUpdateBacklog && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateBacklog();
                  }}
                >
                  <ListTodo className="w-4 h-4 mr-1" />
                  Update Backlog
                </Button>
              )}
              
              {onUpdateBlueprint && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateBlueprint();
                  }}
                >
                  <FileCode className="w-4 h-4 mr-1" />
                  Update Blueprint
                </Button>
              )}
            </>
          )}

          {/* Deployment Actions */}
          {status === 'PUBLISHED' && (
            <>
              {onDeployToSpace && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeployToSpace();
                  }}
                >
                  <Layout className="w-4 h-4 mr-1" />
                  Deploy to Space
                </Button>
              )}
              
              {onManageDeployments && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onManageDeployments();
                  }}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Manage Deployments
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}