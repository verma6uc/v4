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
  Archive,
  Box,
  Settings,
  UserPlus,
  UserCog,
  Calendar
} from 'lucide-react';

interface SpaceMacroCardProps {
  id: string;
  name: string;
  identifier: string;
  status: 'DRAFT' | 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
  spaceType: string;
  parentSpaceName?: string;
  level: number;
  path: string;
  adminUsers: Array<{
    id: string;
    name: string;
  }>;
  applicationCount: number;
  inheritedSettings: {
    securityPolicies: boolean;
    accessControl: boolean;
    dataRetention: boolean;
  };
  createdAt: string;
  onClick?: () => void;
  onActivate?: () => void;
  onSuspend?: () => void;
  onReactivate?: () => void;
  onArchive?: () => void;
  onUpdateDetails?: () => void;
  onDeployApplication?: () => void;
  onRemoveApplication?: () => void;
  onAssignUsers?: () => void;
  onUpdateUserAccess?: () => void;
}

const statusConfig = {
  DRAFT: { color: 'warning' as const },
  ACTIVE: { color: 'success' as const },
  SUSPENDED: { color: 'error' as const },
  ARCHIVED: { color: 'default' as const }
};

export function SpaceMacroCard({
  name,
  identifier,
  status,
  spaceType,
  parentSpaceName,
  level,
  path,
  adminUsers,
  applicationCount,
  inheritedSettings,
  createdAt,
  onClick,
  onActivate,
  onSuspend,
  onReactivate,
  onArchive,
  onUpdateDetails,
  onDeployApplication,
  onRemoveApplication,
  onAssignUsers,
  onUpdateUserAccess
}: SpaceMacroCardProps) {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Layout className="w-12 h-12 text-gray-400" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{identifier}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={statusConfig[status].color}
            dot
          >
            {status.toLowerCase()}
          </Badge>
          <Badge variant="info">
            {spaceType}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FolderTree className="w-4 h-4" />
            <span>Level {level}</span>
          </div>
          {parentSpaceName && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Layout className="w-4 h-4" />
              <span>Parent: {parentSpaceName}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Box className="w-4 h-4" />
            <span>{applicationCount} Applications</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Created {createdAt}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>Admin Users</span>
            </div>
            <span>{adminUsers.length}</span>
          </div>
          <div className="text-sm text-gray-500">
            {adminUsers.slice(0, 3).map(user => (
              <div key={user.id} className="truncate">{user.name}</div>
            ))}
            {adminUsers.length > 3 && (
              <div className="text-xs text-gray-400">
                +{adminUsers.length - 3} more
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Inherited Settings
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm">
            <div className="text-gray-500">Security Policies</div>
            <div className="font-medium">
              {inheritedSettings.securityPolicies ? 'Inherited' : 'Custom'}
            </div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Access Control</div>
            <div className="font-medium">
              {inheritedSettings.accessControl ? 'Inherited' : 'Custom'}
            </div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Data Retention</div>
            <div className="font-medium">
              {inheritedSettings.dataRetention ? 'Inherited' : 'Custom'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {/* State Management Actions */}
          {status === 'DRAFT' && onActivate && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onActivate();
              }}
            >
              <Power className="w-4 h-4 mr-1" />
              Activate Space
            </Button>
          )}
          
          {status === 'ACTIVE' && onSuspend && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSuspend();
              }}
            >
              <Ban className="w-4 h-4 mr-1" />
              Suspend Space
            </Button>
          )}
          
          {status === 'SUSPENDED' && onReactivate && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onReactivate();
              }}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Reactivate Space
            </Button>
          )}
          
          {(status === 'ACTIVE' || status === 'SUSPENDED') && onArchive && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onArchive();
              }}
            >
              <Archive className="w-4 h-4 mr-1" />
              Archive Space
            </Button>
          )}

          {/* Space Management Actions */}
          {(status === 'DRAFT' || status === 'ACTIVE') && onUpdateDetails && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateDetails();
              }}
            >
              <Settings className="w-4 h-4 mr-1" />
              Update Details
            </Button>
          )}

          {/* Application Management Actions */}
          {status === 'ACTIVE' && (
            <>
              {onDeployApplication && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeployApplication();
                  }}
                >
                  <Box className="w-4 h-4 mr-1" />
                  Deploy App
                </Button>
              )}
              
              {onRemoveApplication && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveApplication();
                  }}
                >
                  <Box className="w-4 h-4 mr-1" />
                  Remove App
                </Button>
              )}
            </>
          )}

          {/* User Management Actions */}
          {status === 'ACTIVE' && (
            <>
              {onAssignUsers && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAssignUsers();
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Assign Users
                </Button>
              )}
              
              {onUpdateUserAccess && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateUserAccess();
                  }}
                >
                  <UserCog className="w-4 h-4 mr-1" />
                  Update Access
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t text-xs text-gray-500">
        <div className="flex items-center">
          <FolderTree className="w-4 h-4 mr-1" />
          Path: {path}
        </div>
      </div>
    </div>
  );
}