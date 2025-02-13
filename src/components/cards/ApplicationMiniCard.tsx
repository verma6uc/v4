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

interface ApplicationMiniCardProps {
  id: string;
  title: string;
  description: string;
  status: ApplicationStatus;
  currentVersion?: string;
  deployedSpacesCount: number;
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

export function ApplicationMiniCard({
  title,
  description,
  status,
  currentVersion,
  deployedSpacesCount,
  onClick,
  onMoveToBlueprint,
  onMoveToVisualPRD,
  onStartDevelopment,
  onStartTesting,
  onMarkComplete,
  onRevertToPrevious
}: ApplicationMiniCardProps) {
  const StatusIcon = statusConfig[status].icon;

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Box className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {title}
              </h3>
              <p className="text-xs text-gray-500 truncate">{description}</p>
            </div>
          </div>

          <div className="mt-2 flex items-center space-x-2">
            <Badge 
              variant={statusConfig[status].color}
              size="sm"
              icon={<StatusIcon className="w-3 h-3" />}
            >
              {statusConfig[status].label}
            </Badge>
            {currentVersion && (
              <Badge variant="default" size="sm">
                v{currentVersion}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Layout className="w-4 h-4 mr-1" />
          <span>{deployedSpacesCount}</span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end space-x-2">
        {status === 'MEMORY' && onMoveToBlueprint && (
          <Button
            variant="ghost"
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
            variant="ghost"
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
            variant="ghost"
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
            variant="ghost"
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
            variant="ghost"
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
            variant="ghost"
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
  );
}