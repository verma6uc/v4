import React, { useState } from 'react';
import { Badge } from '../../Badge';
import { UseCase } from '../../../services/mock/productBacklog';
import { UserStoryList } from './UserStoryList';
import { ChevronDown, ChevronRight, Clock, FileText } from 'lucide-react';

interface UseCaseListProps {
  useCases: UseCase[];
}

export function UseCaseList({ useCases }: UseCaseListProps) {
  const [expandedUseCases, setExpandedUseCases] = useState<string[]>(useCases[0] ? [useCases[0].id] : []);

  const toggleUseCase = (useCaseId: string) => {
    setExpandedUseCases(prev => 
      prev.includes(useCaseId)
        ? prev.filter(id => id !== useCaseId)
        : [...prev, useCaseId]
    );
  };

  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Changes Requested': return 'error';
      case 'In Review': return 'warning';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {useCases.map(useCase => (
        <div key={useCase.id} className="border-b border-gray-200 last:border-b-0">
          {/* Use Case Header */}
          <div 
            className="flex items-center justify-between p-4 pl-12 hover:bg-gray-100 cursor-pointer"
            onClick={() => toggleUseCase(useCase.id)}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2">
                {expandedUseCases.includes(useCase.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
                <span className="font-medium">{useCase.identifier}</span>
              </div>
              <span className="text-gray-900">{useCase.title}</span>
              <Badge variant={useCase.status === 'Done' ? 'success' : 'default'}>
                {useCase.status}
              </Badge>
              <Badge variant={getReviewStatusColor(useCase.reviewStatus)}>
                {useCase.reviewStatus}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {useCase.version && (
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  v{useCase.version}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDate(useCase.lastModified)}
              </div>
            </div>
          </div>

          {/* Use Case Description */}
          {expandedUseCases.includes(useCase.id) && (
            <div className="px-12 pb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{useCase.description}</p>
              </div>
            </div>
          )}

          {/* User Stories */}
          {expandedUseCases.includes(useCase.id) && (
            <div className="bg-white border-t border-gray-200">
              <UserStoryList stories={useCase.userStories} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}