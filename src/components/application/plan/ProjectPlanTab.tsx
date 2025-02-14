import React, { useState } from 'react';
import { generateProjectPlan } from '../../../services/mock/projectPlan';
import { Calendar, Clock, User, AlertCircle, Users } from 'lucide-react';
import { ApplicationTabWrapper } from '../ApplicationTabWrapper';
import type { Task } from '../../../services/mock/projectPlan';
import { useApplicationCreation } from '../../../pages/creator/application/context/ApplicationCreationContext';

export function ProjectPlanTab() {
  const { phases, summary } = generateProjectPlan();
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;
  const allTasks = phases.flatMap(phase => phase.tasks);

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'done': return 'success';
      case 'in-progress': return 'warning';
      case 'todo': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (dateString?: string): string => {
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
    <ApplicationTabWrapper currentTab="Plan">
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4 pl-4">
          <h2 className="text-xl font-semibold text-gray-900">Project Plan</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Current Phase: {summary.currentPhase}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Total Hours: {summary.totalHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Tasks: {summary.completedTasks}/{summary.totalTasks}</span>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Overview</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Status</h4>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">{summary.currentPhase}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Progress</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${summary.progress}%` }}></div>
                </div>
                <span className="text-sm text-gray-600">{summary.progress}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Hours</h4>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">{summary.actualHours}/{summary.totalHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-4">
          {phases.map((phase, index) => (
            <div key={phase.id} className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Phase {index + 1}: {phase.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    phase.status === 'Done' ? 'bg-green-100 text-green-800' :
                    phase.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{phase.description}</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {phase.tasks.map((task: Task) => (
                    <div key={task.id} className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={task.status === 'Done'}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        readOnly
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-500">{task.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{task.estimatedHours}h</span>
                        </div>
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{task.assignee.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ApplicationTabWrapper>
  );
}