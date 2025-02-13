import React from 'react';
import { BaseCard } from '../../base/BaseCard';
import { useNavigate } from 'react-router-dom';
import { ResourceMetricsProps } from '../../../types/dashboard';

export function ResourceMetrics({ metrics }: ResourceMetricsProps) {
  const getStatusColor = (value: number) => {
    if (value > 90) return 'bg-red-500';
    if (value > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTextColor = (value: number) => {
    if (value > 90) return 'text-red-600';
    if (value > 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const navigate = useNavigate();

  const resources = [
    { id: 'cpu', name: 'CPU', value: metrics.cpu },
    { id: 'memory', name: 'Memory', value: metrics.memory },
    { id: 'storage', name: 'Storage', value: metrics.storage },
    { id: 'network', name: 'Network', value: metrics.network }
  ];

  return (
    <BaseCard>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resource Utilization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <div 
              key={resource.name}
              className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50/50 border border-transparent hover:border-blue-200 transition-all duration-200 cursor-pointer group"
              onClick={() => navigate(`/super-admin/sources/${resource.id}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/super-admin/sources/${resource.id}`);
                }
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {resource.name}
                </h3>
                <span className={`text-sm font-medium ${getTextColor(resource.value)}`}>
                  {resource.value}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(resource.value)}`}
                  style={{ width: `${resource.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}