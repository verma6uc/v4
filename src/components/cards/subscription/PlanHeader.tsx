import React from 'react';
import { Package } from 'lucide-react';
import { Badge } from '../../Badge';

interface PlanHeaderProps {
  name: string;
  code: string;
  description: string;
  status: 'DRAFT' | 'ACTIVE' | 'GRANDFATHERED' | 'DISCONTINUED';
  visibility: 'PUBLIC' | 'PRIVATE' | 'HIDDEN';
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

export function PlanHeader({ name, code, description, status, visibility }: PlanHeaderProps) {
  return (
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
  );
}