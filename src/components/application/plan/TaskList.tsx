import React, { useState } from 'react';
import { Badge } from '../../Badge';
import { Task } from '../../../services/mock/projectPlan';
import { ChevronDown, ChevronRight, Calendar, Clock, User } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);

  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'success';
      case 'In Progress': return 'warning';
      case 'Blocked': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      {tasks.map(task => (
        <div key={task.id} className="border-b border-gray-200 last:border-b-0">
          {/* Task Header */}
          <div 
            className="flex items-center justify-between p-4 pl-12 hover:bg-gray-100 cursor-pointer"
            onClick={() => toggleTask(task.id)}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2">
                {expandedTasks.includes(task.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-gray-900">{task.title}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge variant={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {task.estimatedHours}h
              </div>
              {task.progress > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <span>{task.progress}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Task Details */}
          {expandedTasks.includes(task.id) && (
            <div className="px-12 pb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{task.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Priority:</span>
                        <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Progress:</span>
                        <span>{task.progress}%</span>
                      </div>
                      {task.assignee && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Assignee:</span>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{task.assignee.name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Time</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Start Date:</span>
                        <span>{formatDate(task.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Due Date:</span>
                        <span>{formatDate(task.dueDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated:</span>
                        <span>{task.estimatedHours}h</span>
                      </div>
                      {task.actualHours !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Actual:</span>
                          <span>{task.actualHours}h</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {task.dependencies && task.dependencies.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Dependencies</h4>
                    <div className="flex gap-2">
                      {task.dependencies.map(dep => (
                        <Badge key={dep.taskId} variant="default">
                          {dep.type}: Task {dep.taskId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {task.notes && task.notes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {task.notes.map((note, index) => (
                        <li key={index} className="text-sm text-gray-600">{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {task.tags && task.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                    <div className="flex gap-2">
                      {task.tags.map(tag => (
                        <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}