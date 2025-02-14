import React from 'react';
import { generateProductBacklog } from '../../../services/mock/productBacklog';
import { FeatureList } from './FeatureList';
import { ApplicationTabWrapper } from '../ApplicationTabWrapper';

export function ProductBacklogTab() {
  const backlog = generateProductBacklog();

  return (
    <ApplicationTabWrapper currentTab="Product Backlog">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pl-4">Product Backlog</h2>
        <FeatureList features={backlog.features} />
      </div>
    </ApplicationTabWrapper>
  );
}