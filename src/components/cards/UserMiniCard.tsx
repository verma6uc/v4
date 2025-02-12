import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { 
  User, 
  UserCheck, 
  UserX,
  Send,
  Ban,
  RefreshCw,
  Archive
} from 'lucide-react';

interface UserMiniCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'INVITED' | 'ACTIVE' | 'SUSPENDED' | 'BLOCKED' | 'ARCHIVED';
  designation?: string;
  onClick?: () => void;
  onSendInvitation?: () => void;
  onSuspend?: () => void;
  onReactivate?: () => void;
  onArchive?: () => void;
  onViewDetails?: () => void;
}

const statusConfig = {
  INVITED: { color: 'warning', icon: User },
  ACTIVE: { color: 'success', icon: UserCheck },
  SUSPENDED: { color: 'error', icon: UserX },
  BLOCKED: { color: 'error', icon: UserX },
  ARCHIVED: { color: 'default', icon: User }
} as const;

export function UserMiniCard({
  firstName,
  lastName,
  email,
  status,
  designation,
  onClick,
  onSendInvitation,
  onSuspend,
  onReactivate,
  onArchive,
  onViewDetails
}: UserMiniCardProps) {
  const StatusIcon = statusConfig[status].icon;
  
  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    > 
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {firstName} {lastName}
            </h3>
            <span className="capitalize">
              {status.toLowerCase()}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 truncate">{email}</p>
          {designation && (
            <p className="mt-1 text-xs text-gray-400">{designation}</p>
          )}
        </div>
        <StatusIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
      
      <div className="mt-4 flex items-center justify-end space-x-2">
        {status === 'INVITED' && onSendInvitation && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSendInvitation();
            }}
          >
            <Send className="w-4 h-4 mr-1" />
            Resend
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
        
        {(status === 'SUSPENDED' || status === 'BLOCKED') && onReactivate && (
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
        
        {status !== 'ARCHIVED' && onArchive && (
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