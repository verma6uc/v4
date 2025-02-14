import React from 'react';
import { Button } from '../../Button';
import { Search, Filter, Plus } from 'lucide-react';

export function ApplicationHeader() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
          <p className="text-gray-500">View and manage your application</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 p-4 bg-white rounded-lg shadow">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search features, use cases, or stories..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Status</option>
            <option value="planned">Planned</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Sort By</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="modified">Last Modified</option>
          </select>
        </div>
      </div>
    </div>
  );
}