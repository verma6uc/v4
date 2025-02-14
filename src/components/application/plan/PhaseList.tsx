import React, { useState } from 'react';
import { Badge } from '../../Badge';
import { Phase } from '../../../services/mock/projectPlan';
import { TaskList } from './TaskList';
import { ChevronDown, ChevronRight, Calendar } from 'lucide-react';

interface PhaseListProps {
  phases: Phase[];
}

export function PhaseList({ phases }: PhaseListProps) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>([]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId)
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'success';
      case 'In Progress': return 'warning';
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
      {phases.map(phase => (
        <div key={phase.id} className="border-b border-gray-200 last:border-b-0">
          {/* Phase Header */}
          <div 
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => togglePhase(phase.id)}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2">
                {expandedPhases.includes(phase.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
                <span className="font-medium">{phase.name}</span>
              </div>
              <Badge variant={getStatusColor(phase.status)}>
                {phase.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
              </div>
            </div>
          </div>

          {/* Phase Description */}
          {expandedPhases.includes(phase.id) && (
            <div className="px-4 pb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{phase.description}</p>
              </div>
            </div>
          )}

          {/* Tasks */}
          {expandedPhases.includes(phase.id) && (
            <div className="bg-gray-50 border-t border-gray-200">
              <TaskList tasks={phase.tasks} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}