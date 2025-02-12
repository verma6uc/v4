import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Flag,
  Calendar,
  User,
  Tag,
  Circle,
  Clock,
  CheckCircle2,
  XCircle
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

interface KanbanCardProps {
  task: Task;
  isDragging?: boolean;
  onClick?: () => void;
}

const statusConfig = {
  todo: {
    icon: Circle,
    color: 'text-gray-400',
    bg: 'bg-gray-50'
  },
  in_progress: {
    icon: Clock,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  completed: {
    icon: CheckCircle2,
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  blocked: {
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-red-50'
  }
};

const priorityConfig = {
  low: {
    color: 'text-gray-400',
    bg: 'bg-gray-50',
    ring: 'ring-gray-500/20'
  },
  medium: {
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    ring: 'ring-yellow-500/20'
  },
  high: {
    color: 'text-red-500',
    bg: 'bg-red-50',
    ring: 'ring-red-500/20'
  }
};

export function KanbanCard({
  task,
  isDragging,
  onClick
}: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const status = statusConfig[task.status];
  const StatusIcon = status.icon;
  const priority = task.priority ? priorityConfig[task.priority] : null;

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative flex flex-col gap-2 rounded-lg border bg-white p-3 shadow-sm transition-all duration-200 ${
        isDragging ? 'opacity-50' : ''
      } ${onClick ? 'cursor-pointer hover:border-gray-300' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <StatusIcon className={`h-4 w-4 flex-shrink-0 ${status.color}`} />
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {task.title}
          </h4>
        </div>
        {priority && (
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${priority.bg} ${priority.ring}`}>
            <Flag className={`h-3 w-3 ${priority.color}`} />
            {task.priority?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-auto pt-2 text-xs text-gray-500">
        {task.dueDate && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDueDate(task.dueDate)}
          </span>
        )}

        {task.assignee && (
          <span className="inline-flex items-center gap-1">
            {task.assignee.avatar ? (
              <img
                src={task.assignee.avatar}
                alt={task.assignee.name}
                className="h-4 w-4 rounded-full"
              />
            ) : (
              <User className="h-3 w-3" />
            )}
            <span className="truncate max-w-[100px]">
              {task.assignee.name}
            </span>
          </span>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
            >
              <Tag className="h-2.5 w-2.5" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}