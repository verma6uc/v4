import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from '../../../components/Tabs';
import { ProductBacklogTab } from '../../../components/application/backlog/ProductBacklogTab';
import { ProjectPlanTab } from '../../../components/application/plan/ProjectPlanTab';
import { ApplicationCreationProvider } from './context/ApplicationCreationContext';

export function ApplicationDetailPage() {
  const { applicationId } = useParams();
  const [activeTab, setActiveTab] = useState('backlog');

  const tabs = [
    {
      id: 'backlog',
      label: 'Product Backlog',
      content: <ProductBacklogTab />
    },
    {
      id: 'plan',
      label: 'Project Plan',
      content: <ProjectPlanTab />
    },
    {
      id: 'prototype',
      label: 'Prototype',
      content: <div>Prototype content will be implemented here</div>
    }
  ];

  return (
    <ApplicationCreationProvider>
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
    </ApplicationCreationProvider>
  );
}