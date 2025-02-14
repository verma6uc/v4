import React from 'react';
import { PlanHeader } from './subscription/PlanHeader';
import { PlanPricing } from './subscription/PlanPricing';
import { PlanResources } from './subscription/PlanResources';
import { PlanFeatures } from './subscription/PlanFeatures';
import { PlanContract } from './subscription/PlanContract';
import { PlanActions } from './subscription/PlanActions';

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

export function SubscriptionPlanMacroCard(props: SubscriptionPlanMacroCardProps) {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={props.onClick}
    >
      <PlanHeader
        name={props.name}
        code={props.code}
        description={props.description}
        status={props.status}
        visibility={props.visibility}
      />

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col space-y-4">
          <PlanPricing
            basePrice={props.basePrice}
            discounts={props.discounts}
          />
          <PlanResources
            userLimits={props.userLimits}
            storageLimits={props.storageLimits}
            apiLimits={props.apiLimits}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <PlanFeatures features={props.features} />
          <PlanContract contractTerms={props.contractTerms} />
        </div>
      </div>

      <PlanActions
        status={props.status}
        onActivate={props.onActivate}
        onUpdate={props.onUpdate}
        onGrandfather={props.onGrandfather}
        onDiscontinue={props.onDiscontinue}
        onViewUsage={props.onViewUsage}
        onConfigureFeatures={props.onConfigureFeatures}
        onManagePricing={props.onManagePricing}
        onViewSubscriptions={props.onViewSubscriptions}
      />
    </div>
  );
}