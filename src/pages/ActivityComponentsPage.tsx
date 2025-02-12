import React from 'react';
import { ShowcaseLayout } from '../layouts/ShowcaseLayout';
import { ActivityFeed, Activity } from '../components/ActivityFeed';
import { SystemEventsList, SystemEvent } from '../components/SystemEventsList';

const mockActivities: Activity[] = [
  {
    id: '1',
    user: { name: 'John Doe' },
    action: 'created a new',
    target: 'company',
    timestamp: '2 minutes ago',
    type: 'create'
  },
  {
    id: '2',
    user: { name: 'Jane Smith' },
    action: 'updated',
    target: 'billing settings',
    timestamp: '10 minutes ago',
    type: 'update'
  },
  {
    id: '3',
    user: { name: 'Mike Johnson' },
    action: 'deleted',
    target: 'user account',
    timestamp: '1 hour ago',
    type: 'delete'
  },
  {
    id: '4',
    user: { name: 'Sarah Wilson' },
    action: 'uploaded',
    target: 'company logo',
    timestamp: '2 hours ago',
    type: 'upload'
  },
  {
    id: '5',
    user: { name: 'Admin' },
    action: 'modified',
    target: 'security settings',
    timestamp: '3 hours ago',
    type: 'security'
  }
];

const mockSystemEvents: SystemEvent[] = [
  {
    id: '1',
    type: 'error',
    category: 'database',
    message: 'Database connection timeout',
    timestamp: '2 minutes ago',
    details: 'Connection to primary database failed after 30s'
  },
  {
    id: '2',
    type: 'warning',
    category: 'system',
    message: 'High CPU usage detected',
    timestamp: '10 minutes ago',
    details: 'System CPU usage exceeded 80% threshold'
  },
  {
    id: '3',
    type: 'success',
    category: 'security',
    message: 'SSL certificates renewed',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    type: 'info',
    category: 'network',
    message: 'CDN cache cleared',
    timestamp: '2 hours ago'
  },
  {
    id: '5',
    type: 'performance',
    category: 'storage',
    message: 'Disk cleanup completed',
    timestamp: '3 hours ago',
    details: 'Freed up 2.5GB of storage space'
  }
];

export function ActivityComponentsPage() {
  return (
    <ShowcaseLayout
      title="Activity Components"
      description="Components for displaying activity feeds and system events"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
          <ActivityFeed 
            activities={mockActivities}
            title="Recent Activities"
            description="Latest user actions and updates"
          />

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Usage</h3>
            <pre className="text-sm text-gray-600 bg-white p-3 rounded border">
{`<ActivityFeed
  activities={activities}
  maxItems={5}
  showHeader={true}
  title="Recent Activity"
  description="Latest actions"
/>`}
            </pre>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">System Events</h2>
          <SystemEventsList 
            events={mockSystemEvents}
            title="System Events"
            description="Recent system events and notifications"
          />

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Usage</h3>
            <pre className="text-sm text-gray-600 bg-white p-3 rounded border">
{`<SystemEventsList
  events={events}
  maxItems={5}
  showHeader={true}
  title="System Events"
  description="Recent events"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </ShowcaseLayout>
  );
}