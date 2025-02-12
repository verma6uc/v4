import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  Building2, 
  Users, 
  Layout, 
  Phone, 
  Mail, 
  MapPin,
  Shield as ShieldIcon,
  Settings,
  Power,
  Ban,
  RefreshCw,
  Archive,
  Trash2,
  Globe as GlobeIcon,
  Calendar
} from 'lucide-react';

interface CompanyMacroCardProps {
  id: string;
  name: string;
  identifier: string;
  status: 'DRAFT' | 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED' | 'DELETED';
  primaryEmail: string;
  primaryPhone?: string;
  website?: string;
  physicalAddress?: {
    city: string;
    country: string;
  };
  userCount: number;
  spaceCount: number;
  securitySettings: {
    mfaRequired: boolean;
    passwordExpiryDays: number;
    sessionTimeout: number;
  };
  createdAt: string;
  logo?: string;
  onClick?: () => void;
  onActivate?: () => void;
  onSuspend?: () => void;
  onReactivate?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onUpdateDetails?: () => void;
  onUpdateSecurity?: () => void;
  onUpdateLocalization?: () => void;
}

const statusConfig = {
  DRAFT: { color: 'warning' as const },
  ACTIVE: { color: 'success' as const },
  SUSPENDED: { color: 'error' as const },
  ARCHIVED: { color: 'default' as const },
  DELETED: { color: 'error' as const }
};

export function CompanyMacroCard({
  name,
  identifier,
  status,
  primaryEmail,
  primaryPhone,
  website,
  physicalAddress,
  userCount,
  spaceCount,
  securitySettings,
  createdAt,
  logo,
  onClick,
  onActivate,
  onSuspend,
  onReactivate,
  onArchive,
  onDelete,
  onUpdateDetails,
  onUpdateSecurity,
  onUpdateLocalization
}: CompanyMacroCardProps) {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          {logo ? (
            <img 
              src={logo} 
              alt={`${name} logo`} 
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <Building2 className="w-12 h-12 text-gray-400" />
          )}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{identifier}</p>
          </div>
        </div>
        <Badge 
          variant={statusConfig[status].color}
          dot
        >
          {status.toLowerCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{primaryEmail}</span>
          </div>
          {primaryPhone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{primaryPhone}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <GlobeIcon className="w-4 h-4" />
              <span>{website}</span>
            </div>
          )}
          {physicalAddress && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{physicalAddress.city}, {physicalAddress.country}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{userCount} Users</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Layout className="w-4 h-4" />
            <span>{spaceCount} Spaces</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Created {createdAt}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <ShieldIcon className="w-4 h-4 mr-2" />
          Security Settings
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm">
            <div className="text-gray-500">MFA Required</div>
            <div className="font-medium">
              {securitySettings.mfaRequired ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Password Expiry</div>
            <div className="font-medium">
              {securitySettings.passwordExpiryDays} days
            </div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Session Timeout</div>
            <div className="font-medium">
              {securitySettings.sessionTimeout} minutes
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
              Activate Company
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
              Suspend Company
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
              Reactivate Company
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
              Archive Company
            </Button>
          )}
          
          {status === 'ARCHIVED' && onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete Company
            </Button>
          )}

          {/* Configuration Actions */}
          {(status === 'DRAFT' || status === 'ACTIVE') && (
            <>
              {onUpdateDetails && (
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
              
              {status === 'ACTIVE' && onUpdateSecurity && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateSecurity();
                  }}
                >
                  <ShieldIcon className="w-4 h-4 mr-1" />
                  Security Settings
                </Button>
              )}
              
              {status === 'ACTIVE' && onUpdateLocalization && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateLocalization();
                  }}
                >
                  <GlobeIcon className="w-4 h-4 mr-1" />
                  Localization
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}