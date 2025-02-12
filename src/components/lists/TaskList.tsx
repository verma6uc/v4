import React from 'react';
import { 
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Flag,
  MoreVertical,
  Calendar,
  User
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
}

interface TaskListProps {
  tasks: Task[];
  maxItems?: number;
  showDescription?: boolean;
  onTaskClick?: (task: Task) => void;
  onStatusChange?: (taskId: string, newStatus: Task['status']) => void;
  className?: string;
}

const statusIcons = {
  todo: Circle,
  in_progress: Clock,
  completed: CheckCircle2,
  blocked: AlertCircle
};

const statusStyles = {
  todo: {
    icon: 'text-gray-400',
    text: 'text-gray-700',
    bg: 'bg-gray-50'
  },
  in_progress: {
    icon: 'text-blue-500',
    text: 'text-blue-700',
    bg: 'bg-blue-50'
  },
  completed: {
    icon: 'text-green-500',
    text: 'text-green-700',
    bg: 'bg-green-50'
  },
  blocked: {
    icon: 'text-red-500',
    text: 'text-red-700',
    bg: 'bg-red-50'
  }
};

const priorityStyles = {
  low: {
    icon: 'text-gray-400',
    bg: 'bg-gray-50',
    text: 'text-gray-700'
  },
  medium: {
    icon: 'text-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700'
  },
  high: {
    icon: 'text-red-500',
    bg: 'bg-red-50',
    text: 'text-red-700'
  }
};

export function TaskList({
  tasks,
  maxItems,
  showDescription = true,
  onTaskClick,
  onStatusChange,
  className = ''
}: TaskListProps) {
  const displayedTasks = maxItems ? tasks.slice(0, maxItems) : tasks;

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    }
    
    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }

    // If it's within 7 days, show the day name
    if (date.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }

    // Otherwise, show the full date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {displayedTasks.map((task) => {
        const StatusIcon = statusIcons[task.status];
        const styles = statusStyles[task.status];
        
        return (
          <div
            key={task.id}
            className={`group relative flex items-start gap-4 rounded-lg border p-4 transition-colors duration-200 ${
              onTaskClick ? 'cursor-pointer hover:bg-gray-50' : ''
            }`}
            onClick={() => onTaskClick?.(task)}
          >
            {/* Status Icon */}
            <button
              className={`mt-1 flex-none rounded-full p-1 transition-colors duration-200 hover:${styles.bg}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onStatusChange) {
                  const statusOrder: Task['status'][] = ['todo', 'in_progress', 'completed', 'blocked'];
                  const currentIndex = statusOrder.indexOf(task.status);
                  const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
                  onStatusChange(task.id, nextStatus);
                }
              }}
            >
              <StatusIcon className={`h-5 w-5 ${styles.icon}`} />
            </button>

            {/* Task Content */}
            <div className="flex-auto min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {task.title}
                  </h3>
                  {showDescription && task.description && (
                    <p className="mt-1 text-sm text-gray-500">
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="flex-none">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <MoreVertical className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Task Metadata */}
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                {task.priority && (
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${priorityStyles[task.priority].bg} ${priorityStyles[task.priority].text}`}>
                    <Flag className="h-3 w-3" />
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                )}

                {task.dueDate && (
                  <span className="inline-flex items-center gap-1 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {formatDueDate(task.dueDate)}
                  </span>
                )}

                {task.assignee && (
                  <span className="inline-flex items-center gap-1 text-gray-500">
                    {task.assignee.avatar ? (
                      <img
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        className="h-5 w-5 rounded-full"
                      />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    {task.assignee.name}
                  </span>
                )}

                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}