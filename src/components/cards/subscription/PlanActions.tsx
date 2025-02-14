import React from 'react';
import { Power, Settings, Archive, XCircle, BarChart2, Sliders, DollarSign, Building2 } from 'lucide-react';
import { Button } from '../../Button';

interface PlanActionsProps {
  status: 'DRAFT' | 'ACTIVE' | 'GRANDFATHERED' | 'DISCONTINUED';
  onActivate?: () => void;
  onUpdate?: () => void;
  onGrandfather?: () => void;
  onDiscontinue?: () => void;
  onViewUsage?: () => void;
  onConfigureFeatures?: () => void;
  onManagePricing?: () => void;
  onViewSubscriptions?: () => void;
}

export function PlanActions({
  status,
  onActivate,
  onUpdate,
  onGrandfather,
  onDiscontinue,
  onViewUsage,
  onConfigureFeatures,
  onManagePricing,
  onViewSubscriptions
}: PlanActionsProps) {
  return (
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
  );
}