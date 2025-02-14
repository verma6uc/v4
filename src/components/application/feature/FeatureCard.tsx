import React, { useState } from 'react';
import { BaseCard } from '../../base/BaseCard';
import { Badge } from '../../Badge';
import { UseCase } from '../../../services/mock/useCases';
import { Feature } from '../../../services/mock/features';

interface FeatureCardProps extends Feature {
  useCases: UseCase[];
  isLoading: boolean;
}

export function FeatureCard({ id, title, description, complexity, useCases, isLoading }: FeatureCardProps) {
  const [selectedUseCases, setSelectedUseCases] = useState<Set<string>>(new Set());

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const toggleUseCase = (useCaseId: string) => {
    setSelectedUseCases(prev => {
      const next = new Set(prev);
      if (next.has(useCaseId)) {
        next.delete(useCaseId);
      } else {
        next.add(useCaseId);
      }
      return next;
    });
  };

  return (
    <BaseCard className="w-full bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <Badge variant={getComplexityColor(complexity)} size="sm">
            {complexity.toUpperCase()}
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="border-t border-gray-100 pt-4 mt-auto">
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Crafting use cases for this feature...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {useCases.map(useCase => (
                <label
                  key={useCase.id}
                  className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedUseCases.has(useCase.id)}
                    onChange={() => toggleUseCase(useCase.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{useCase.title}</div>
                    <div className="text-sm text-gray-500">{useCase.description}</div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
}