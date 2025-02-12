import React from 'react';
import { Badge } from './Badge';
import { 
  User, 
  Settings, 
  FileText, 
  Upload, 
  Download,
  Trash,
  Edit,
  Plus,
  Lock,
  Unlock,
  RefreshCw
} from 'lucide-react';

export interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'upload' | 'download' | 'security' | 'system';
  metadata?: Record<string, any>;
}

interface ActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
  showHeader?: boolean;
  title?: string;
  description?: string;
}

const actionIcons = {
  create: Plus,
  update: Edit,
  delete: Trash,
  upload: Upload,
  download: Download,
  security: Lock,
  system: Settings
};

const actionColors: Record<Activity['type'], 'success' | 'info' | 'error' | 'warning' | 'primary'> = {
  create: 'success',
  update: 'info',
  delete: 'error',
  upload: 'info',
  download: 'info',
  security: 'warning',
  system: 'primary'
};

export function ActivityFeed({ 
  activities, 
  maxItems = 5,
  showHeader = true,
  title = "Recent Activity",
  description = "Latest actions and updates"
}: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 overflow-hidden">
      {showHeader && (
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      )}
      
      <div className="divide-y divide-gray-100">
        {displayedActivities.map((activity) => {
          const Icon = actionIcons[activity.type];
          return (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {activity.user.avatar ? (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user.name}
                    </p>
                    <Badge variant={actionColors[activity.type]} size="sm">
                      {activity.type}
                    </Badge>
                  </div>
                  
                  <p className="mt-0.5 text-sm text-gray-600">
                    {activity.action} <span className="font-medium">{activity.target}</span>
                  </p>
                  
                  <span className="mt-1 text-xs text-gray-500">
                    {activity.timestamp}
                  </span>
                </div>

                <div className="flex-shrink-0">
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {activities.length > maxItems && (
        <div className="p-3 bg-gray-50 border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
}