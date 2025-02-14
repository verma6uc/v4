import React from 'react';
import { Badge } from '../../Badge';
import { Feature } from '../../../services/mock/productBacklog';
import { UseCaseList } from './UseCaseList';
import { ChevronDown, ChevronRight, Clock, FileText, MoreVertical } from 'lucide-react';
import { Button } from '../../Button';

interface FeatureListProps {
  features: Feature[];
  activeFeature: string | null;
  onFeatureClick: (featureId: string) => void;
}

export function FeatureList({ features, activeFeature, onFeatureClick }: FeatureListProps) {
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
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
      {features.map(feature => (
        <div key={feature.id} className="group">
          {/* Feature Header */}
          <div 
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => onFeatureClick(feature.id)}
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
            <div className="flex items-center gap-4">
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
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Description */}
          {activeFeature === feature.id && (
            <>
              <div className="px-4 pb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-700">Description</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Add Use Case</Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{feature.description}</p>
                </div>
              </div>

              {/* Use Cases */}
              <div className="bg-gray-50 border-t border-gray-200">
                <UseCaseList useCases={feature.useCases} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}