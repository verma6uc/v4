import React from 'react';
import { Zap } from 'lucide-react';
import { Badge } from '../../Badge';

interface PlanFeaturesProps {
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
}

export function PlanFeatures({ features }: PlanFeaturesProps) {
  return (
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
  );
}