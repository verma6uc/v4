import React from 'react';
import { BaseCard } from '../../base/BaseCard';
import { Shield, AlertTriangle } from 'lucide-react';
import { SecurityAlertsProps } from '../../../types/dashboard';

export function SecurityAlerts({ data }: SecurityAlertsProps) {
  const getAlertColor = (count: number) => {
    if (count === 0) return 'text-green-600';
    if (count < 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'failed_login':
        return <Shield className="w-4 h-4" />;
      case 'suspicious_ip':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60)),
      'minute'
    );
  };

  return (
    <BaseCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Security Alerts</h2>
            <p className="text-sm text-gray-500">Active security issues</p>
          </div>
          <div className={`text-2xl font-bold ${getAlertColor(data.activeAlerts)}`}>
            {data.activeAlerts}
            <span className="text-sm ml-2">
              {data.change >= 0 ? '+' : ''}{data.change}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {data.recentEvents.map((event, index) => (
            <div 
              key={`${event.type}-${index}`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  event.type === 'failed_login' ? 'bg-red-50 text-red-600' :
                  event.type === 'suspicious_ip' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {getEventIcon(event.type)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {event.type === 'failed_login' ? 'Failed Login Attempts' :
                     event.type === 'suspicious_ip' ? 'Suspicious IP Activity' :
                     'Security Event'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Source: {event.source}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {event.count} {event.count === 1 ? 'event' : 'events'}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTimestamp(event.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.recentEvents.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No recent security events
          </div>
        )}
      </div>
    </BaseCard>
  );
}