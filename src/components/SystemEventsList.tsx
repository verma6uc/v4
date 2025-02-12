import React from 'react';
import { 
  Shield,
  Database,
  Globe,
  AlertTriangle,
  Check,
  Info,
  LucideIcon
} from 'lucide-react';

export interface SystemEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'security' | 'system' | 'api';
  status: 'success' | 'warning' | 'error' | 'info';
  category: string;
  message: string;
}

interface SystemEventsListProps {
  events: SystemEvent[];
  maxItems?: number;
  showTimestamp?: boolean;
  className?: string;
  onEventClick?: (event: SystemEvent) => void;
}

const eventIcons: Record<SystemEvent['type'], LucideIcon> = {
  security: Shield,
  system: Database,
  api: Globe
};

const statusIcons: Record<string, LucideIcon> = {
  success: Check,
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info
};

const statusStyles: Record<string, { icon: string; bg: string; text: string }> = {
  success: {
    icon: 'text-green-500',
    bg: 'bg-green-50',
    text: 'text-green-700'
  },
  warning: {
    icon: 'text-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700'
  },
  error: {
    icon: 'text-red-500',
    bg: 'bg-red-50',
    text: 'text-red-700'
  },
  info: {
    icon: 'text-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700'
  }
};

export function SystemEventsList({
  events,
  maxItems,
  showTimestamp = true,
  className = '',
  onEventClick
}: SystemEventsListProps) {
  const displayedEvents = maxItems ? events.slice(0, maxItems) : events;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {displayedEvents.map((event, index) => {
        const Icon = eventIcons[event.type];
        const styles = statusStyles[event.status];
        const isLast = index === displayedEvents.length - 1;
        
        return (
          <div 
            key={event.id}
            className={`relative flex gap-4 ${
              onEventClick ? 'cursor-pointer hover:bg-gray-50 transition-colors duration-200' : ''
            }`}
            onClick={() => onEventClick?.(event)}
          >
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-5 top-10 -bottom-14 w-px bg-gray-200" />
            )}
            
            {/* Icon */}
            <div className={`relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full ${styles.bg}`}>
              <Icon className={`h-5 w-5 ${styles.icon}`} />
            </div>

            <div className="flex-auto">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">
                    {event.title}
                  </h3>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${styles.bg} ${styles.text}`}>
                    {event.status}
                  </span>
                </div>
                {showTimestamp && (
                  <time className="flex-none text-xs text-gray-500">
                    {formatTimestamp(event.timestamp)}
                  </time>
                )}
              </div>
              
              <p className="mt-1 text-sm text-gray-600">
                {event.description}
              </p>

              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <span className="font-medium">Category:</span>
                  {event.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="font-medium">Message:</span>
                  {event.message}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}