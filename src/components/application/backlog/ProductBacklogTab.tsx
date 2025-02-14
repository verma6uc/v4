import React from 'react';
import { BaseCard } from '../../base/BaseCard';
import { generateProductBacklog } from '../../../services/mock/productBacklog';
import { FeatureList } from './FeatureList';

export function ProductBacklogTab() {
  const backlog = generateProductBacklog();

  return (
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
        <FeatureList features={backlog.features} />
      </div>
    </div>
  );
}