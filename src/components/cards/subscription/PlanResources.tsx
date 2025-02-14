import React from 'react';
import { Users, Database, Globe } from 'lucide-react';

interface PlanResourcesProps {
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
}

export function PlanResources({ userLimits, storageLimits, apiLimits }: PlanResourcesProps) {
  return (
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
  );
}