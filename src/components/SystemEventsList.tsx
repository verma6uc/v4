import React from 'react';
import { Badge } from './Badge';
import { 
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Info,
  Server,
  Shield,
  Database,
  Wifi,
  HardDrive
} from 'lucide-react';

export interface SystemEvent {
  id: string;
  type: 'security' | 'performance' | 'error' | 'warning' | 'info' | 'success';
  category: 'system' | 'database' | 'network' | 'security' | 'storage';
  message: string;
  timestamp: string;
  details?: string;
  metadata?: Record<string, any>;
}

interface SystemEventsListProps {
  events: SystemEvent[];
  maxItems?: number;
  showHeader?: boolean;
  title?: string;
  description?: string;
}

const eventIcons = {
  security: Shield,
  database: Database,
  network: Wifi,
  system: Server,
  storage: HardDrive
};

const statusIcons = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
  security: Shield,
  performance: Server
};

const statusColors: Record<SystemEvent['type'], 'error' | 'warning' | 'info' | 'success' | 'primary'> = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
  security: 'primary',
  performance: 'info'
};

export function SystemEventsList({
  events,
  maxItems = 5,
  showHeader = true,
  title = "System Events",
  description = "Recent system events and notifications"
}: SystemEventsListProps) {
  const displayedEvents = events.slice(0, maxItems);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 overflow-hidden">
      {showHeader && (
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {displayedEvents.map((event) => {
          const StatusIcon = statusIcons[event.type];
          const CategoryIcon = eventIcons[event.category];
          
          return (
            <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                    ${event.type === 'error' ? 'bg-red-50' :
                      event.type === 'warning' ? 'bg-yellow-50' :
                      event.type === 'success' ? 'bg-green-50' :
                      'bg-blue-50'}`}>
                    <StatusIcon className={`w-5 h-5
                      ${event.type === 'error' ? 'text-red-600' :
                        event.type === 'warning' ? 'text-yellow-600' :
                        event.type === 'success' ? 'text-green-600' :
                        'text-blue-600'}`} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusColors[event.type]} size="sm">
                      {event.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <CategoryIcon className="w-4 h-4" />
                      <span>{event.category}</span>
                    </div>
                  </div>

                  <p className="mt-1 text-sm text-gray-900">
                    {event.message}
                  </p>

                  {event.details && (
                    <p className="mt-1 text-sm text-gray-500">
                      {event.details}
                    </p>
                  )}

                  <span className="mt-1 text-xs text-gray-500 block">
                    {event.timestamp}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {events.length > maxItems && (
        <div className="p-3 bg-gray-50 border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center">
            View all events
          </button>
        </div>
      )}
    </div>
  );
}