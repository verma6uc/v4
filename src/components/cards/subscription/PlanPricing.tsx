import React from 'react';
import { Percent } from 'lucide-react';

interface PlanPricingProps {
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
}

const billingTermDisplay = {
  MONTHLY: '/mo',
  QUARTERLY: '/qtr',
  ANNUAL: '/yr'
};

export function PlanPricing({ basePrice, discounts }: PlanPricingProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: basePrice.currency
  }).format(basePrice.amount);

  return (
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
  );
}