import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCard } from '../../../components/base/BaseCard';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Tabs } from '../../../components/Tabs';
import { generateProductBacklog, Feature, UseCase, UserStory } from '../../../services/mock/productBacklog';
import { Plus, Filter, ChevronRight, ChevronDown } from 'lucide-react';

export function ApplicationDetailPage() {
  const { applicationId } = useParams();
  const [activeTab, setActiveTab] = useState('backlog');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [expandedUseCases, setExpandedUseCases] = useState<string[]>([]);
  const backlog = generateProductBacklog();

  const toggleUseCase = (useCaseId: string) => {
    setExpandedUseCases(prev => 
      prev.includes(useCaseId)
        ? prev.filter(id => id !== useCaseId)
        : [...prev, useCaseId]
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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {activeFeature === feature.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="font-medium">{feature.code}</span>
                </div>
                <span className="text-gray-900">{feature.name}</span>
                <Badge variant={getPriorityColor(feature.priority)}>{feature.priority}</Badge>
              </div>
              <Badge variant={feature.status === 'Done' ? 'success' : 'default'}>
                {feature.status}
              </Badge>
            </div>

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
                      <div className="flex items-center gap-2">
                        {expandedUseCases.includes(useCase.id) ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="text-gray-900">{useCase.title}</span>
                      </div>
                      <Badge variant={useCase.status === 'Done' ? 'success' : 'default'}>
                        {useCase.status}
                      </Badge>
                    </div>

                    {/* User Stories */}
                    {expandedUseCases.includes(useCase.id) && (
                      <div className="bg-white border-t border-gray-200">
                        {useCase.userStories.map(story => (
                          <div 
                            key={story.id}
                            className="flex items-center justify-between p-4 pl-20 hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-gray-900">{story.title}</span>
                              <div className="flex gap-2">
                                <Badge variant={getPriorityColor(story.priority)}>
                                  {story.priority}
                                </Badge>
                                <Badge variant={getComplexityColor(story.complexity)}>
                                  {story.complexity}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">
                                {story.estimatedHours}h
                              </span>
                              <Badge variant={story.status === 'Done' ? 'success' : 'default'}>
                                {story.status}
                              </Badge>
                            </div>
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