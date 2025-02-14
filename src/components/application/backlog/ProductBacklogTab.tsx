import React from 'react';
import { BaseCard } from '../../base/BaseCard';
import { generateProductBacklog } from '../../../services/mock/productBacklog';
import { FeatureList } from './FeatureList';

export function ProductBacklogTab() {
  const backlog = generateProductBacklog();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 pl-4">Product Backlog</h2>
      
      {/* Features List */}
      <div className="bg-white rounded-lg shadow">
        <FeatureList features={backlog.features} />
      </div>
    </div>
  );
}