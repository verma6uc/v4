import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCard } from '../../../components/base/BaseCard';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Tabs } from '../../../components/Tabs';
import { generateProductBacklog, Feature, UseCase, UserStory } from '../../../services/mock/productBacklog';
import { Plus, Filter, ChevronRight, ChevronDown, Clock, FileText, Tag, ListChecks } from 'lucide-react';

export function ApplicationDetailPage() {
  const { applicationId } = useParams();
  const [activeTab, setActiveTab] = useState('backlog');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [expandedUseCases, setExpandedUseCases] = useState<string[]>([]);
  const [expandedStories, setExpandedStories] = useState<string[]>([]);
  const backlog = generateProductBacklog();

  const toggleUseCase = (useCaseId: string) => {
    setExpandedUseCases(prev => 
      prev.includes(useCaseId)
        ? prev.filter(id => id !== useCaseId)
        : [...prev, useCaseId]
    );
  };

  const toggleStory = (storyId: string) => {
    setExpandedStories(prev => 
      prev.includes(storyId)
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Complex': return 'error';
      case 'Medium': return 'warning';
      case 'Simple': return 'success';
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

  const ProductBacklogTab = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Features</h3>
            <p className="mt-1 text-2xl font-semibold">{backlog.summary.totalFeatures}</p>
          </div>
        </BaseCard>
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Use Cases</h3>
            <p className="mt-1 text-2xl font-semibold">{backlog.summary.totalUseCases}</p>
          </div>
        </BaseCard>
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Stories</h3>
            <p className="mt-1 text-2xl font-semibold">{backlog.summary.totalStories}</p>
          </div>
        </BaseCard>
        <BaseCard>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Hours</h3>
            <p className="mt-1 text-2xl font-semibold">{backlog.summary.totalEstimatedHours}</p>
          </div>
        </BaseCard>
      </div>

      {/* Features List */}
      <div className="bg-white rounded-lg shadow">
        {backlog.features.map(feature => (
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
                {feature.useCases.map(useCase => (
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
                        {useCase.userStories.map(story => (
                          <div key={story.id} className="border-b border-gray-200 last:border-b-0">
                            {/* Story Header */}
                            <div 
                              className="flex items-center justify-between p-4 pl-20 hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleStory(story.id)}
                            >
                              <div className="flex items-center gap-4 flex-1">
                                <div className="flex items-center gap-2">
                                  {expandedStories.includes(story.id) ? (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                  )}
                                  <span className="font-medium">{story.identifier}</span>
                                </div>
                                <span className="text-gray-900">{story.title}</span>
                                <div className="flex gap-2">
                                  <Badge variant={getPriorityColor(story.priority)}>
                                    {story.priority}
                                  </Badge>
                                  <Badge variant={getComplexityColor(story.complexity)}>
                                    {story.complexity}
                                  </Badge>
                                  <Badge variant={story.status === 'Done' ? 'success' : 'default'}>
                                    {story.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {story.estimatedHours}h
                                </div>
                                {story.sprint && (
                                  <div>Sprint {story.sprint}</div>
                                )}
                              </div>
                            </div>

                            {/* Story Details */}
                            {expandedStories.includes(story.id) && (
                              <div className="px-20 pb-4">
                                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{story.description}</p>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Acceptance Criteria</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                      {story.acceptanceCriteria.map((criteria, index) => (
                                        <li key={index} className="text-sm text-gray-600">{criteria}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Priority:</span>
                                          <Badge variant={getPriorityColor(story.priority)}>{story.priority}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Complexity:</span>
                                          <Badge variant={getComplexityColor(story.complexity)}>{story.complexity}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Status:</span>
                                          <Badge variant={story.status === 'Done' ? 'success' : 'default'}>{story.status}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Review Status:</span>
                                          <Badge variant={getReviewStatusColor(story.reviewStatus)}>{story.reviewStatus}</Badge>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="text-sm font-medium text-gray-700 mb-2">Planning</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Sprint:</span>
                                          <span>{story.sprint || '-'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Estimated Hours:</span>
                                          <span>{story.estimatedHours}h</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Assigned To:</span>
                                          <span>{story.assignedTo || '-'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Last Modified:</span>
                                          <span>{formatDate(story.lastModified)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {story.dependencies && story.dependencies.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-700 mb-2">Dependencies</h4>
                                      <div className="flex gap-2">
                                        {story.dependencies.map(dep => (
                                          <Badge key={dep} variant="default">{dep}</Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {story.tags && story.tags.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                                      <div className="flex gap-2">
                                        {story.tags.map(tag => (
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
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    {
      id: 'backlog',
      label: 'Product Backlog',
      content: <ProductBacklogTab />
    },
    {
      id: 'plan',
      label: 'Project Plan',
      content: <div>Project Plan content will be implemented here</div>
    },
    {
      id: 'prototype',
      label: 'Prototype',
      content: <div>Prototype content will be implemented here</div>
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
          <p className="text-gray-500">View and manage your application</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Tabs
          tabs={tabs}
          defaultTab="backlog"
          onChange={setActiveTab}
        />
      </div>
    </div>
  );
}