import React from 'react';
import { 
  Bell,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  LucideIcon
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationListProps {
  notifications: Notification[];
  maxItems?: number;
  showTimestamp?: boolean;
  onNotificationClick?: (notification: Notification) => void;
  className?: string;
}

const notificationIcons: Record<Notification['type'], LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle
};

const notificationStyles: Record<Notification['type'], {
  icon: string;
  bg: string;
  text: string;
  ring: string;
}> = {
  info: {
    icon: 'text-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    ring: 'ring-blue-600/20'
  },
  warning: {
    icon: 'text-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-800',
    ring: 'ring-yellow-600/20'
  },
  success: {
    icon: 'text-green-500',
    bg: 'bg-green-50',
    text: 'text-green-800',
    ring: 'ring-green-600/20'
  },
  error: {
    icon: 'text-red-500',
    bg: 'bg-red-50',
    text: 'text-red-800',
    ring: 'ring-red-600/20'
  }
};

export function NotificationList({
  notifications,
  maxItems,
  showTimestamp = true,
  onNotificationClick,
  className = ''
}: NotificationListProps) {
  const displayedNotifications = maxItems 
    ? notifications.slice(0, maxItems) 
    : notifications;

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
    <div className={`space-y-4 ${className}`}>
      {displayedNotifications.map((notification) => {
        const Icon = notificationIcons[notification.type];
        const styles = notificationStyles[notification.type];
        
        return (
          <div
            key={notification.id}
            className={`relative flex gap-4 rounded-lg p-4 transition-colors duration-200 ${
              notification.read ? 'bg-white' : styles.bg
            } ${onNotificationClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
            onClick={() => onNotificationClick?.(notification)}
          >
            <div className={`mt-1 flex-none ${styles.icon}`}>
              <Icon className="h-5 w-5" />
            </div>

            <div className="flex-auto">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-sm font-medium ${styles.text}`}>
                    {notification.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {notification.message}
                  </p>
                </div>

                {showTimestamp && (
                  <time className="flex-none text-xs text-gray-500">
                    {formatTimestamp(notification.timestamp)}
                  </time>
                )}
              </div>

              {notification.actionLabel && (
                <button
                  type="button"
                  className={`mt-3 text-sm font-medium ${styles.text} hover:opacity-80`}
                  onClick={(e) => {
                    e.stopPropagation();
                    notification.onAction?.();
                  }}
                >
                  {notification.actionLabel}
                </button>
              )}
            </div>

            {!notification.read && (
              <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-blue-500" />
            )}
          </div>
        );
      })}
    </div>
  );
}