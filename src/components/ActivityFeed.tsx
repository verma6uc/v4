import React from 'react';
import { 
  Clock, 
  User, 
  FileText, 
  Settings, 
  Mail, 
  Shield,
  LucideIcon,
  ArrowRight,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'user' | 'document' | 'settings' | 'email' | 'security';
  status?: 'success' | 'warning' | 'error' | 'info';
  action: string;
  target: string;
  user?: {
    name: string;
    avatar?: string;
  };
  link?: {
    text: string;
    url: string;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
  showTimestamp?: boolean;
  className?: string;
  onActivityClick?: (activity: Activity) => void;
}

const activityIcons: Record<Activity['type'], LucideIcon> = {
  user: User,
  document: FileText,
  settings: Settings,
  email: Mail,
  security: Shield
};

const statusIcons: Record<string, LucideIcon> = {
  success: Check,
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info
};

const statusStyles: Record<string, { icon: string; bg: string; text: string; ring: string }> = {
  success: {
    icon: 'text-green-500',
    bg: 'bg-green-50',
    text: 'text-green-700',
    ring: 'ring-green-600/20'
  },
  warning: {
    icon: 'text-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    ring: 'ring-yellow-600/20'
  },
  error: {
    icon: 'text-red-500',
    bg: 'bg-red-50',
    text: 'text-red-700',
    ring: 'ring-red-600/20'
  },
  info: {
    icon: 'text-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-blue-600/20'
  }
};

export function ActivityFeed({
  activities,
  maxItems,
  showTimestamp = true,
  className = '',
  onActivityClick
}: ActivityFeedProps) {
  const displayedActivities = maxItems ? activities.slice(0, maxItems) : activities;

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
      {displayedActivities.map((activity, index) => {
        const Icon = activityIcons[activity.type];
        const styles = activity.status ? statusStyles[activity.status] : null;
        const isLast = index === displayedActivities.length - 1;
        
        return (
          <div 
            key={activity.id}
            className={`relative flex gap-4 ${
              onActivityClick ? 'cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200' : ''
            }`}
            onClick={() => onActivityClick?.(activity)}
          >
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-5 top-10 -bottom-14 w-px bg-gray-200" />
            )}
            
            {/* Icon */}
            <div className={`relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md ring-1 ring-gray-200/50 ${
              styles?.bg || 'bg-gray-50'
            }`}>
              <Icon className={`h-5 w-5 ${styles?.icon || 'text-gray-500'}`} />
            </div>

            <div className="flex-auto">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">
                    {activity.title}
                  </h3>
                  {activity.status && (
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      styles?.bg
                    } ${styles?.text} ${styles?.ring}`}>
                      {activity.status}
                    </span>
                  )}
                </div>
                {showTimestamp && (
                  <time className="flex-none text-xs text-gray-500">
                    {formatTimestamp(activity.timestamp)}
                  </time>
                )}
              </div>
              
              {activity.description && (
                <p className="mt-1 text-sm text-gray-600">
                  {activity.description}
                </p>
              )}

              {activity.user && (
                <div className="mt-2 flex items-center gap-2">
                  {activity.user.avatar ? (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                  <span className="text-sm text-gray-600">
                    {activity.user.name}
                  </span>
                </div>
              )}

              {activity.link && (
                <a
                  href={activity.link.url}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  {activity.link.text}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}