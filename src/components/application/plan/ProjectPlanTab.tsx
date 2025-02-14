import React from 'react';
import { BaseCard } from '../../base/BaseCard';
import { Badge } from '../../Badge';
import { generateProjectPlan } from '../../../services/mock/projectPlan';
import { Calendar, Clock, User, AlertCircle, Users, Calendar as CalendarIcon } from 'lucide-react';
import { useApplicationCreation } from '../../../pages/creator/application/context/ApplicationCreationContext';

export function ProjectPlanTab() {
  const { applicationData } = useApplicationCreation();

  // If application data isn't ready, show loading state
  if (!applicationData?.title || !applicationData?.description) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Please complete the application creation process to view the project plan.</p>
      </div>
    );
  }

  const plan = generateProjectPlan(applicationData);

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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Hours</h3>
            <div className="mt-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <p className="text-2xl font-semibold">{plan.totalEstimatedHours}h</p>
            </div>
          </div>
        </BaseCard>
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Team Size</h3>
            <div className="mt-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <p className="text-2xl font-semibold">{plan.recommendedTeamSize}</p>
            </div>
          </div>
        </BaseCard>
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Duration</h3>
            <div className="mt-1 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <p className="text-2xl font-semibold">{plan.estimatedDuration}</p>
            </div>
          </div>
        </BaseCard>
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Phases</h3>
            <p className="mt-1 text-2xl font-semibold">{plan.phases.length}</p>
          </div>
        </BaseCard>
      </div>

      {/* Key Milestones */}
      <BaseCard>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Milestones</h3>
          <div className="space-y-2">
            {plan.keyMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-700">{milestone}</span>
              </div>
            ))}
          </div>
        </div>
      </BaseCard>

      {/* Risks */}
      <BaseCard>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Risks & Mitigations</h3>
          <div className="space-y-4">
            {plan.risks.map((risk, index) => (
              <div key={index} className="flex items-start gap-4">
                <Badge variant={getPriorityColor(risk.severity)}>{risk.severity}</Badge>
                <div>
                  <p className="font-medium text-gray-900">{risk.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{risk.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BaseCard>

      {/* Tasks by Phase */}
      {plan.phases.map(phase => (
        <div key={phase.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-gray-900">{phase.title}</h3>
              <Badge variant={getStatusColor(phase.status)}>{phase.status}</Badge>
            </div>
            {(phase.startDate || phase.endDate) && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
              </div>
            )}
          </div>

          <p className="text-gray-600">{phase.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phase.tasks.map(task => (
              <BaseCard key={task.id}>
                <div className="p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                    </div>
                    {task.priority === 'high' && (
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                    {task.tags.map(tag => (
                      <Badge key={tag} variant="default">{tag}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.estimatedHours}h
                    </div>
                    {task.assignee && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {task.assignee}
                      </div>
                    )}
                  </div>

                  {task.dependencies && task.dependencies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {task.dependencies.map(depId => (
                        <Badge key={depId} variant="default" size="sm">
                          Depends on: {depId}
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