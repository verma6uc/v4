import React from 'react';
import { BaseCard } from '../../base/BaseCard';
import { useNavigate } from 'react-router-dom';
import { Server } from 'lucide-react';
import { ServiceHealthTableProps } from '../../../types/dashboard';

export function ServiceHealthTable({ services }: ServiceHealthTableProps) {
  const getStatusColor = (uptime: number, errorRate: number, responseTime: number) => {
    if (uptime < 99.9 || errorRate > 1 || responseTime > 500) return 'text-red-600';
    if (uptime < 99.95 || errorRate > 0.5 || responseTime > 200) return 'text-yellow-600';
    return 'text-green-600';
  };

  const navigate = useNavigate();

  return (
    <BaseCard>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Health</h2>
        
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-500">
            <div>Service</div>
            <div className="text-right">Uptime</div>
            <div className="text-right">Response</div>
            <div className="text-right">Errors</div>
            <div className="text-right">Weight</div>
          </div>

          {services.map((service) => (
            <div 
              key={service.name}
              className="grid grid-cols-5 gap-4 px-4 py-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group"
              onClick={() => navigate(`/super-admin/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/super-admin/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </span>
              </div>
              <div className={`text-right ${getStatusColor(service.uptime, service.errorRate, service.responseTime)}`}>
                {service.uptime}%
              </div>
              <div className={`text-right ${getStatusColor(service.uptime, service.errorRate, service.responseTime)}`}>
                {service.responseTime}ms
              </div>
              <div className={`text-right ${getStatusColor(service.uptime, service.errorRate, service.responseTime)}`}>
                {(service.errorRate * 100).toFixed(2)}%
              </div>
              <div className="text-right text-gray-500">
                {(service.weight * 100).toFixed(0)}%
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