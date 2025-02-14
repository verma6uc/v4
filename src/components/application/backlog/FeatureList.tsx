import React, { useState } from 'react';
import { Badge } from '../../Badge';
import { Feature } from '../../../services/mock/productBacklog';
import { UseCaseList } from './UseCaseList';
import { ChevronDown, ChevronRight, Clock, FileText } from 'lucide-react';

interface FeatureListProps {
  features: Feature[];
}

export function FeatureList({ features }: FeatureListProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
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
      {features.map(feature => (
        <div key={feature.id} className="border-b border-gray-200 last:border-b-0">
          {/* Feature Header */}
          <div 
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2">
                {activeFeature === feature.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
                <span className="font-medium">{feature.identifier}</span>
              </div>
              <span className="text-gray-900">{feature.name}</span>
              <Badge variant={getPriorityColor(feature.priority)}>{feature.priority}</Badge>
              <Badge variant={feature.status === 'Done' ? 'success' : 'default'}>
                {feature.status}
              </Badge>
              <Badge variant={getReviewStatusColor(feature.reviewStatus)}>
                {feature.reviewStatus}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                v{feature.version}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDate(feature.lastModified)}
              </div>
            </div>
          </div>

          {/* Feature Description */}
          {activeFeature === feature.id && (
            <div className="px-4 pb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{feature.description}</p>
              </div>
            </div>
          )}

          {/* Use Cases */}
          {activeFeature === feature.id && (
            <div className="bg-gray-50 border-t border-gray-200">
              <UseCaseList useCases={feature.useCases} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}