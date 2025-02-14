import React from 'react';
import { Badge } from '../../Badge';
import { Clock, User, Calendar } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  assignee?: string;
  dueDate?: string;
  estimatedHours: number;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Set up company database schema',
    description: 'Create and configure initial database tables for company data',
    status: 'In Progress',
    priority: 'High',
    assignee: 'John Doe',
    dueDate: '2025-02-20',
    estimatedHours: 8
  },
  {
    id: '2',
    title: 'Implement company admin invitation flow',
    description: 'Create secure invitation process with email notifications',
    status: 'To Do',
    priority: 'High',
    assignee: 'Jane Smith',
    dueDate: '2025-02-22',
    estimatedHours: 12
  },
  {
    id: '3',
    title: 'Design admin dashboard wireframes',
    description: 'Create initial wireframes for company admin dashboard',
    status: 'Done',
    priority: 'Medium',
    assignee: 'Mike Johnson',
    dueDate: '2025-02-15',
    estimatedHours: 6
  },
  {
    id: '4',
    title: 'Write API documentation',
    description: 'Document all company management API endpoints',
    status: 'In Review',
    priority: 'Low',
    assignee: 'Sarah Wilson',
    dueDate: '2025-02-18',
    estimatedHours: 4
  },
  {
    id: '5',
    title: 'Implement email templates',
    description: 'Create and style email templates for company communications',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '2025-02-25',
    estimatedHours: 6
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'error';
    case 'Medium': return 'warning';
    case 'Low': return 'success';
    default: return 'default';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Done': return 'success';
    case 'In Progress': return 'warning';
    case 'In Review': return 'info';
    default: return 'default';
  }
};

export function ProjectPlanTab() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Project Tasks</h2>
        <p className="text-sm text-gray-500">View project tasks and their status</p>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {mockTasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-4">
                {task.assignee && (
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{task.assignee}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{task.estimatedHours}h</span>
                </div>
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}