import React from 'react';
import { 
  AlertTriangle, 
  Info, 
  Settings,
  Shield,
  User
} from 'lucide-react';
import { ActivityFeedProps, ActivityItem } from '../types/dashboard';

export function ActivityFeed({ items }: ActivityFeedProps) {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'security_event':
        return <Shield className="w-4 h-4" />;
      case 'system_event':
        return <Settings className="w-4 h-4" />;
      case 'user_event':
        return <User className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: ActivityItem['severity']) => {
    switch (severity) {
      case 'error':
        return 'bg-red-50 text-red-600';
      case 'warning':
        return 'bg-yellow-50 text-yellow-600';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-600';
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
    <div className="space-y-4">
      {items.map((item) => (
        <div 
          key={item.id}
          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
        >
          <div className={`p-2 rounded-lg ${getSeverityColor(item.severity)}`}>
            {getIcon(item.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {item.message}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {formatTimestamp(item.timestamp)}
            </p>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No recent activity
        </div>
      )}
    </div>
  );
}