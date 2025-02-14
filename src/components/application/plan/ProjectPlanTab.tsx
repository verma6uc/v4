import React from 'react';
import { BaseCard } from '../../base/BaseCard';
import { Badge } from '../../Badge';
import { generateProjectPlan } from '../../../services/mock/projectPlan';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';

export function ProjectPlanTab() {
  const plan = generateProjectPlan();

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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
            <p className="mt-1 text-2xl font-semibold">{plan.summary.totalTasks}</p>
          </div>
        </BaseCard>
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Overall Progress</h3>
            <div className="flex items-center gap-2">
              <p className="mt-1 text-2xl font-semibold">{plan.summary.progress}%</p>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${plan.summary.progress}%` }}
                />
              </div>
            </div>
          </div>
        </BaseCard>
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Estimated Hours</h3>
            <p className="mt-1 text-2xl font-semibold">{plan.summary.totalHours}h</p>
          </div>
        </BaseCard>
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Current Phase</h3>
            <p className="mt-1 text-2xl font-semibold">{plan.summary.currentPhase}</p>
          </div>
        </BaseCard>
      </div>

      {/* Tasks by Phase */}
      {plan.phases.map(phase => (
        <div key={phase.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-gray-900">{phase.name}</h3>
              <Badge variant={phase.status === 'Done' ? 'success' : phase.status === 'In Progress' ? 'warning' : 'default'}>
                {phase.status}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phase.tasks.map(task => (
              <BaseCard key={task.id}>
                <div className="p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                    </div>
                    {task.priority === 'High' && (
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                    {task.progress > 0 && (
                      <Badge variant="default">{task.progress}% Complete</Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.estimatedHours}h
                    </div>
                    {task.assignee && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
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
              </BaseCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}