import React, { useState } from 'react';
import { Badge } from '../../Badge';
import { generateProjectPlan } from '../../../services/mock/projectPlan';
import { Calendar, Clock, User, AlertCircle, Users, Calendar as CalendarIcon } from 'lucide-react';
import { useApplicationCreation } from '../../../pages/creator/application/context/ApplicationCreationContext';

export function ProjectPlanTab() {
  const plan = generateProjectPlan();
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;
  const allTasks = plan.phases.flatMap(phase => phase.tasks);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'todo': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
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

  // Get current tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = allTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(allTasks.length / tasksPerPage);

  return (
    <div className="bg-gray-50 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentTasks.map(task => (
          <div key={task.id} className="bg-white rounded shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                {task.priority === 'High' && (
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                )}
              </div>
              
              <p className="text-xs text-gray-500">{task.description}</p>

              <div className="flex flex-wrap gap-1">
                <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                {task.progress > 0 && (
                  <Badge variant="default">{task.progress}%</Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.estimatedHours}h
                </div>
                {task.assignee && (
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {task.assignee.name}
                  </div>
                )}
              </div>
              
              {task.dependencies && task.dependencies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.dependencies.map(dep => (
                    <Badge key={dep.taskId} variant="default" size="sm">
                      {dep.type}: Task {dep.taskId}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-white shadow-sm disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-white shadow-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}