import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  Package,
  Users,
  Database,
  Globe,
  Power,
  Settings,
  Archive,
  XCircle,
  Clock
} from 'lucide-react';

interface SubscriptionPlanMiniCardProps {
  id: string;
  name: string;
  code: string;
  status: 'DRAFT' | 'ACTIVE' | 'GRANDFATHERED' | 'DISCONTINUED';
  visibility: 'PUBLIC' | 'PRIVATE' | 'HIDDEN';
  basePrice: {
    amount: number;
    currency: string;
    billingTerm: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  };
  limits: {
    users?: number;
    storage?: number;
    apiCalls?: number;
  };
  minimumTerm?: number;
  onClick?: () => void;
  onActivate?: () => void;
  onUpdate?: () => void;
  onGrandfather?: () => void;
  onDiscontinue?: () => void;
}

const statusConfig = {
  DRAFT: { color: 'warning' as const },
  ACTIVE: { color: 'success' as const },
  GRANDFATHERED: { color: 'info' as const },
  DISCONTINUED: { color: 'error' as const }
};

const visibilityConfig = {
  PUBLIC: { color: 'success' as const },
  PRIVATE: { color: 'warning' as const },
  HIDDEN: { color: 'default' as const }
};

const billingTermDisplay = {
  MONTHLY: '/mo',
  QUARTERLY: '/qtr',
  ANNUAL: '/yr'
};

export function SubscriptionPlanMiniCard({
  name,
  code,
  status,
  visibility,
  basePrice,
  limits,
  minimumTerm,
  onClick,
  onActivate,
  onUpdate,
  onGrandfather,
  onDiscontinue
}: SubscriptionPlanMiniCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: basePrice.currency
  }).format(basePrice.amount);

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {name}
              </h3>
              <p className="text-xs text-gray-500 truncate">{code}</p>
            </div>
          </div>

          <div className="mt-2 flex items-center space-x-2">
            <Badge 
              variant={statusConfig[status].color}
              size="sm"
            >
              {status.toLowerCase()}
            </Badge>
            <Badge 
              variant={visibilityConfig[visibility].color}
              size="sm"
            >
              {visibility.toLowerCase()}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-1">
          <div className="text-sm font-medium text-gray-900">
            {formattedPrice}
            <span className="text-xs text-gray-500">
              {billingTermDisplay[basePrice.billingTerm]}
            </span>
          </div>
          {minimumTerm && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>Min {minimumTerm}mo</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-500">
        {limits.users && (
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1" />
            <span>{limits.users === -1 ? 'Unlimited' : limits.users} users</span>
          </div>
        )}
        {limits.storage && (
          <div className="flex items-center">
            <Database className="w-3 h-3 mr-1" />
            <span>{limits.storage}GB</span>
          </div>
        )}
        {limits.apiCalls && (
          <div className="flex items-center">
            <Globe className="w-3 h-3 mr-1" />
            <span>{limits.apiCalls.toLocaleString()} calls</span>
          </div>
        )}
      </div>
      
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
        
        {status === 'ACTIVE' && (
          <>
            {onUpdate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate();
                }}
              >
                <Settings className="w-4 h-4 mr-1" />
                Update
              </Button>
            )}
            
            {onGrandfather && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onGrandfather();
                }}
              >
                <Archive className="w-4 h-4 mr-1" />
                Grandfather
              </Button>
            )}
          </>
        )}
        
        {status === 'GRANDFATHERED' && onDiscontinue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDiscontinue();
            }}
          >
            <XCircle className="w-4 h-4 mr-1" />
            Discontinue
          </Button>
        )}
      </div>
    </div>
  );
}