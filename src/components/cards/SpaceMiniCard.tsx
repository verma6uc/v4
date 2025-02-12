import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { 
  Layout, 
  FolderTree, 
  Users,
  Power,
  Ban,
  RefreshCw,
  Archive
} from 'lucide-react';

interface SpaceMiniCardProps {
  id: string;
  name: string;
  identifier: string;
  status: 'DRAFT' | 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
  spaceType: string;
  parentSpaceName?: string;
  level: number;
  adminCount: number;
  onClick?: () => void;
  onActivate?: () => void;
  onSuspend?: () => void;
  onReactivate?: () => void;
  onArchive?: () => void;
}

const statusConfig = {
  DRAFT: { color: 'warning' as const },
  ACTIVE: { color: 'success' as const },
  SUSPENDED: { color: 'error' as const },
  ARCHIVED: { color: 'default' as const }
};

export function SpaceMiniCard({
  name,
  identifier,
  status,
  spaceType,
  parentSpaceName,
  level,
  adminCount,
  onClick,
  onActivate,
  onSuspend,
  onReactivate,
  onArchive
}: SpaceMiniCardProps) {
  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Layout className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {name}
              </h3>
              <p className="text-xs text-gray-500 truncate">{identifier}</p>
            </div>
          </div>

          <div className="mt-2 flex items-center space-x-2">
            <Badge 
              variant={statusConfig[status].color}
              size="sm"
            >
              {status.toLowerCase()}
            </Badge>
            <Badge variant="info" size="sm">
              {spaceType}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>{adminCount}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FolderTree className="w-4 h-4 mr-1" />
            <span>Level {level}</span>
          </div>
        </div>
      </div>

      {parentSpaceName && (
        <div className="mt-2 text-xs text-gray-500">
          Parent: {parentSpaceName}
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-end space-x-2">
        {status === 'DRAFT' && onActivate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onActivate();
            }}
          >
            <Power className="w-4 h-4 mr-1" />
            Activate
          </Button>
        )}
        
        {status === 'ACTIVE' && onSuspend && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSuspend();
            }}
          >
            <Ban className="w-4 h-4 mr-1" />
            Suspend
          </Button>
        )}
        
        {status === 'SUSPENDED' && onReactivate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onReactivate();
            }}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Reactivate
          </Button>
        )}
        
        {(status === 'ACTIVE' || status === 'SUSPENDED') && onArchive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onArchive();
            }}
          >
            <Archive className="w-4 h-4 mr-1" />
            Archive
          </Button>
        )}
      </div>
    </div>
  );
}