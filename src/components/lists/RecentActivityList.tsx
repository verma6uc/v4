import React from 'react';
import { 
  Clock, 
  User, 
  FileText, 
  Settings, 
  Mail, 
  Shield,
  LucideIcon
} from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  type: 'user' | 'document' | 'settings' | 'email' | 'security';
  status?: 'success' | 'warning' | 'error' | 'info';
  user?: {
    name: string;
    avatar?: string;
  };
}

interface RecentActivityListProps {
  activities: Activity[];
  maxItems?: number;
  showTimestamp?: boolean;
  className?: string;
}

const activityIcons: Record<Activity['type'], LucideIcon> = {
  user: User,
  document: FileText,
  settings: Settings,
  email: Mail,
  security: Shield
};

const statusColors = {
  success: 'bg-green-50 text-green-700 ring-green-600/20',
  warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  error: 'bg-red-50 text-red-700 ring-red-600/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20'
};

export function RecentActivityList({
  activities,
  maxItems,
  showTimestamp = true,
  className = ''
}: RecentActivityListProps) {
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
      {displayedActivities.map((activity) => {
        const Icon = activityIcons[activity.type];
        
        return (
          <div key={activity.id} className="relative flex gap-4">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-10 -bottom-10 w-px bg-gray-200 last:hidden" />
            
            {/* Icon */}
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200">
              <Icon className="h-5 w-5 text-gray-500" />
            </div>

            <div className="flex-auto">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  {activity.status && (
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColors[activity.status]}`}>
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
                <p className="mt-1 text-sm text-gray-500">
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
                  <span className="text-sm text-gray-500">
                    {activity.user.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}