import React from 'react';
import { BaseCard } from '../../base/BaseCard';
import { Activity } from 'lucide-react';
import { SystemHealthProps } from '../../../types/dashboard';

export function SystemHealth({ data }: SystemHealthProps) {
  const getHealthColor = (score: number) => {
    if (score >= 98) return 'text-green-600';
    if (score >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <BaseCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
            <p className="text-sm text-gray-500">Overall system status</p>
          </div>
          <div className={`text-2xl font-bold ${getHealthColor(data.score)}`}>
            {data.score}%
            <span className="text-sm ml-2">
              {data.change >= 0 ? '+' : ''}{data.change}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {data.services.map((service) => (
            <div 
              key={service.name}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500">
                    {service.responseTime}ms • {service.uptime}% uptime
                  </p>
                </div>
              </div>
              <div className={`text-sm font-medium ${getHealthColor(service.uptime)}`}>
                {service.errorRate > 0 ? 
                  `${(service.errorRate * 100).toFixed(2)}% errors` : 
                  'Healthy'
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseCard>
  );
}