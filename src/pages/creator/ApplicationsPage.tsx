import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';

// Mock data - in real app this would come from API
const mockApplications = [
  {
    id: '1',
    title: 'Customer Portal',
    description: 'Self-service portal for customer account management',
    status: 'IN_PROGRESS',
    updatedAt: '2025-02-13T14:30:00Z'
  },
  {
    id: '2',
    title: 'Inventory Manager',
    description: 'Real-time inventory tracking system',
    status: 'DRAFT',
    updatedAt: '2025-02-12T09:15:00Z'
  },
  {
    id: '3',
    title: 'Analytics Dashboard',
    description: 'Business intelligence and reporting platform',
    status: 'READY_TO_DEPLOY',
    updatedAt: '2025-02-11T16:45:00Z'
  }
];

export function ApplicationsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500">Create and manage your applications</p>
        </div>
        <Button
          onClick={() => navigate('/creator/applications/new')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Applications List */}
      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        {mockApplications.map((app) => (
          <div
            key={app.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {app.title}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${app.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                      app.status === 'DRAFT' ? 'bg-gray-100 text-gray-700' :
                        'bg-green-100 text-green-700'}`}>
                    {app.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="mt-1 text-gray-500">{app.description}</p>
                <p className="mt-2 text-sm text-gray-400">
                  Last updated: {new Date(app.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => navigate(`/creator/applications/${app.id}/detail`)}
                className="ml-6 flex items-center text-indigo-600 hover:text-indigo-900"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}

        {mockApplications.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No applications found. Create your first application to get started.
          </div>
        )}
      </div>
    </div>
  );
}