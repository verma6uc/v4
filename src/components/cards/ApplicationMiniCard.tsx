import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  Box,
  PlayCircle,
  CheckCircle2,
  Upload,
  RotateCcw,
  ArrowUpRight,
  Layout
} from 'lucide-react';

interface ApplicationMiniCardProps {
  id: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'READY_TO_DEPLOY' | 'PUBLISHED';
  currentVersion?: string;
  deployedSpacesCount: number;
  onClick?: () => void;
  onStartDevelopment?: () => void;
  onMarkReady?: () => void;
  onPublish?: () => void;
  onRevertToDraft?: () => void;
  onViewDetails?: () => void;
}

const statusConfig = {
  DRAFT: { color: 'warning' as const },
  IN_PROGRESS: { color: 'info' as const },
  READY_TO_DEPLOY: { color: 'success' as const },
  PUBLISHED: { color: 'primary' as const }
};

export function ApplicationMiniCard({
  title,
  description,
  status,
  currentVersion,
  deployedSpacesCount,
  onClick,
  onStartDevelopment,
  onMarkReady,
  onPublish,
  onRevertToDraft,
  onViewDetails
}: ApplicationMiniCardProps) {
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
            >
              {status.toLowerCase().replace('_', ' ')}
            </Badge>
            {currentVersion && (
              <Badge variant="default" size="sm">
                v{currentVersion}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Layout className="w-4 h-4 mr-1" />
            <span>{deployedSpacesCount}</span>
          </div>
          {onViewDetails && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end space-x-2">
        {status === 'DRAFT' && onStartDevelopment && (
          <Button
            variant="ghost"
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
            variant="ghost"
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
            variant="ghost"
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
            variant="ghost"
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
      </div>
    </div>
  );
}