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
  Clock,
  Zap,
  DollarSign,
  Percent,
  FileText,
  BarChart2,
  Sliders,
  CreditCard,
  Building2
} from 'lucide-react';

interface SubscriptionPlanMacroCardProps {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'DRAFT' | 'ACTIVE' | 'GRANDFATHERED' | 'DISCONTINUED';
  visibility: 'PUBLIC' | 'PRIVATE' | 'HIDDEN';
  basePrice: {
    amount: number;
    currency: string;
    billingTerm: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  };
  discounts?: Array<{
    type: string;
    value: number;
    condition: string;
  }>;
  userLimits: {
    minUsers: number;
    maxUsers: number;
    includedUsers: number;
    additionalUserPrice: number;
  };
  storageLimits: {
    included: number;
    maxStorage: number;
    additionalStoragePrice: number;
  };
  apiLimits: {
    monthlyRequests: number;
    additionalRequestsPrice: number;
  };
  features: Array<{
    featureId: string;
    name: string;
    included: boolean;
    limits?: {
      [key: string]: number;
    };
    overage?: {
      allowed: boolean;
      price: number;
      unit: string;
    };
  }>;
  contractTerms: {
    minimumTerm: number;
    contractRequired: boolean;
    autoRenew: boolean;
    cancellationTerms?: {
      noticePeriod: number;
      earlyTerminationFee: number;
    };
  };
  onClick?: () => void;
  onActivate?: () => void;
  onUpdate?: () => void;
  onGrandfather?: () => void;
  onDiscontinue?: () => void;
  onViewUsage?: () => void;
  onConfigureFeatures?: () => void;
  onManagePricing?: () => void;
  onViewSubscriptions?: () => void;
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

export function SubscriptionPlanMacroCard({
  name,
  code,
  description,
  status,
  visibility,
  basePrice,
  discounts,
  userLimits,
  storageLimits,
  apiLimits,
  features,
  contractTerms,
  onClick,
  onActivate,
  onUpdate,
  onGrandfather,
  onDiscontinue,
  onViewUsage,
  onConfigureFeatures,
  onManagePricing,
  onViewSubscriptions
}: SubscriptionPlanMacroCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: basePrice.currency
  }).format(basePrice.amount);

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Package className="w-12 h-12 text-gray-400" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{code}</p>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={statusConfig[status].color}
            dot
          >
            {status.toLowerCase()}
          </Badge>
          <Badge variant={visibilityConfig[visibility].color}>
            {visibility.toLowerCase()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-900 mb-2">Pricing</div>
            <div className="text-2xl font-bold text-gray-900">
              {formattedPrice}
              <span className="text-sm font-normal text-gray-500">
                {billingTermDisplay[basePrice.billingTerm]}
              </span>
            </div>
            {discounts && discounts.length > 0 && (
              <div className="mt-2 space-y-1">
                {discounts.map((discount, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    <Percent className="w-3 h-3 mr-1" />
                    <span>{discount.value}% off - {discount.condition}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-sm font-medium text-gray-900 mb-2">Resource Limits</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Users</span>
                </div>
                <div className="text-gray-900">
                  {userLimits.includedUsers} included
                  {userLimits.maxUsers > userLimits.includedUsers && (
                    <span className="text-gray-500">
                      {' '}(max {userLimits.maxUsers})
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Database className="w-4 h-4 mr-2" />
                  <span>Storage</span>
                </div>
                <div className="text-gray-900">
                  {storageLimits.included}GB included
                  {storageLimits.maxStorage > storageLimits.included && (
                    <span className="text-gray-500">
                      {' '}(max {storageLimits.maxStorage}GB)
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>API Calls</span>
                </div>
                <div className="text-gray-900">
                  {apiLimits.monthlyRequests.toLocaleString()}/mo
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-900 mb-2">Features</div>
            <div className="space-y-2">
              {features.slice(0, 4).map(feature => (
                <div key={feature.featureId} className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Zap className="w-4 h-4 mr-2" />
                    <span>{feature.name}</span>
                  </div>
                  <Badge 
                    variant={feature.included ? 'success' : 'default'}
                    size="sm"
                  >
                    {feature.included ? 'Included' : 'Not Included'}
                  </Badge>
                </div>
              ))}
              {features.length > 4 && (
                <div className="text-xs text-gray-500">
                  +{features.length - 4} more features
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-900 mb-2">Contract Terms</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Minimum term: {contractTerms.minimumTerm} months</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                <span>Contract {contractTerms.contractRequired ? 'required' : 'optional'}</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                <span>Auto-renew: {contractTerms.autoRenew ? 'Yes' : 'No'}</span>
              </div>
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
              Activate Plan
            </Button>
          )}
          
          {status === 'ACTIVE' && (
            <>
              {onUpdate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdate();
                  }}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Update Plan
                </Button>
              )}
              
              {onGrandfather && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onGrandfather();
                  }}
                >
                  <Archive className="w-4 h-4 mr-1" />
                  Grandfather Plan
                </Button>
              )}
            </>
          )}
          
          {status === 'GRANDFATHERED' && onDiscontinue && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDiscontinue();
              }}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Discontinue Plan
            </Button>
          )}

          {/* Additional Actions */}
          {status !== 'DRAFT' && (
            <>
              {onViewUsage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewUsage();
                  }}
                >
                  <BarChart2 className="w-4 h-4 mr-1" />
                  View Usage
                </Button>
              )}
              
              {onConfigureFeatures && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfigureFeatures();
                  }}
                >
                  <Sliders className="w-4 h-4 mr-1" />
                  Configure Features
                </Button>
              )}
              
              {onManagePricing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onManagePricing();
                  }}
                >
                  <DollarSign className="w-4 h-4 mr-1" />
                  Manage Pricing
                </Button>
              )}
              
              {onViewSubscriptions && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewSubscriptions();
                  }}
                >
                  <Building2 className="w-4 h-4 mr-1" />
                  View Subscriptions
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}