import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { 
  User, 
  UserCheck, 
  UserX, 
  Building2, 
  Clock, 
  Shield,
  Mail,
  Send,
  Ban,
  RefreshCw,
  Archive,
  Settings,
  Key,
  Edit,
  Lock
} from 'lucide-react';

interface UserMacroCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'INVITED' | 'ACTIVE' | 'SUSPENDED' | 'BLOCKED' | 'ARCHIVED';
  designation?: string;
  companyName: string;
  lastLoginAt?: string;
  mfaEnabled: boolean;
  roles: string[];
  onClick?: () => void;
  onSendInvitation?: () => void;
  onSuspend?: () => void;
  onReactivate?: () => void;
  onArchive?: () => void;
  onUpdateProfile?: () => void;
  onChangeEmail?: () => void;
  onResetPassword?: () => void;
  onConfigureMfa?: () => void;
}

const statusConfig = {
  INVITED: { color: 'warning', icon: User },
  ACTIVE: { color: 'success', icon: UserCheck },
  SUSPENDED: { color: 'error', icon: UserX },
  BLOCKED: { color: 'error', icon: UserX },
  ARCHIVED: { color: 'default', icon: User }
} as const;

export function UserMacroCard({
  firstName,
  lastName,
  email,
  status,
  designation,
  companyName,
  lastLoginAt,
  mfaEnabled,
  roles,
  onClick,
  onSendInvitation,
  onSuspend,
  onReactivate,
  onArchive,
  onUpdateProfile,
  onChangeEmail,
  onResetPassword,
  onConfigureMfa
}: UserMacroCardProps) {
  const StatusIcon = statusConfig[status].icon;
  
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-gray-900">
              {firstName} {lastName}
            </h3>
            <Badge variant={statusConfig[status].color as any} dot>
              {status.toLowerCase()}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-gray-500">{email}</p>
          {designation && (
            <p className="mt-1 text-sm text-gray-400">{designation}</p>
          )}
        </div>
        <StatusIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Building2 className="w-4 h-4" />
          <span>{companyName}</span>
        </div>
        
        {lastLoginAt && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Last login: {lastLoginAt}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>{mfaEnabled ? 'MFA Enabled' : 'MFA Disabled'}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>Email {status === 'ACTIVE' ? 'Verified' : 'Pending'}</span>
        </div>
      </div>

      {roles.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {roles.map((role) => (
            <Badge key={role} variant="primary" size="sm">
              {role}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="mt-6 border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {/* Account Management Actions */}
          {status === 'INVITED' && onSendInvitation && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSendInvitation();
              }}
            >
              <Send className="w-4 h-4 mr-1" />
              Resend Invitation
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
              Suspend User
            </Button>
          )}
          
          {(status === 'SUSPENDED' || status === 'BLOCKED') && onReactivate && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onReactivate();
              }}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Reactivate User
            </Button>
          )}
          
          {status !== 'ARCHIVED' && onArchive && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onArchive();
              }}
            >
              <Archive className="w-4 h-4 mr-1" />
              Archive User
            </Button>
          )}

          {/* Profile Management Actions */}
          {status === 'ACTIVE' && (
            <>
              {onUpdateProfile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateProfile();
                  }}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Update Profile
                </Button>
              )}
              
              {onChangeEmail && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeEmail();
                  }}
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Change Email
                </Button>
              )}
            </>
          )}

          {/* Security Management Actions */}
          {status === 'ACTIVE' && (
            <>
              {onResetPassword && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onResetPassword();
                  }}
                >
                  <Key className="w-4 h-4 mr-1" />
                  Reset Password
                </Button>
              )}
              
              {onConfigureMfa && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfigureMfa();
                  }}
                >
                  <Lock className="w-4 h-4 mr-1" />
                  Configure MFA
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}