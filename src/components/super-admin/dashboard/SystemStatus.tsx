import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { BaseCard } from '../../base/BaseCard';

interface SystemService {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latency?: number;
  uptime?: number;
  lastIncident?: string;
}

const mockServices: SystemService[] = [
  {
    name: 'Authentication',
    status: 'healthy',
    latency: 45,
    uptime: 99.99,
    lastIncident: '30 days ago'
  },
  {
    name: 'Database',
    status: 'healthy',
    latency: 12,
    uptime: 99.95,
    lastIncident: '15 days ago'
  },
  {
    name: 'Storage',
    status: 'degraded',
    latency: 250,
    uptime: 99.5,
    lastIncident: '2 hours ago'
  },
  {
    name: 'API Gateway',
    status: 'healthy',
    latency: 89,
    uptime: 99.98,
    lastIncident: '7 days ago'
  }
];

const statusColors = {
  healthy: 'text-green-500',
  degraded: 'text-yellow-500',
  down: 'text-red-500'
};

const StatusIcon = ({ status }: { status: SystemService['status'] }) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'degraded':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'down':
      return <XCircle className="w-5 h-5 text-red-500" />;
  }
};

export function SystemStatus() {
  return (
    <BaseCard>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
        
        <div className="space-y-4">
          {mockServices.map((service) => (
            <div 
              key={service.name}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <StatusIcon status={service.status} />
                <div>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500">
                    {service.latency}ms • {service.uptime}% uptime
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-medium ${statusColors[service.status]}`}>
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </div>
                <div className="text-xs text-gray-500">
                  Last incident: {service.lastIncident}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
            <button className="text-blue-600 hover:text-blue-700">
              View detailed status
            </button>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}