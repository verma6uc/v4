import React, { useState } from 'react';
import { Badge } from '../../Badge';
import { UserStory } from '../../../services/mock/productBacklog';
import { ChevronDown, ChevronRight, Clock } from 'lucide-react';

interface UserStoryListProps {
  stories: UserStory[];
}

export function UserStoryList({ stories }: UserStoryListProps) {
  const [expandedStories, setExpandedStories] = useState<string[]>([]);

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

  return (
    <>
      {stories.map(story => (
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
    </>
  );
}