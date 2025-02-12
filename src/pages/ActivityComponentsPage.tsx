import React from 'react';
import { ActivityFeed, Activity } from '../components/ActivityFeed';
import { SystemEventsList, SystemEvent } from '../components/SystemEventsList';
import { Tabs } from '../components/Tabs';

// Sample data for Activity Feed
const activities: Activity[] = [
  {
    id: '1',
    title: 'New user registered',
    description: 'John Doe created a new account',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    type: 'user',
    status: 'success',
    action: 'registered',
    target: 'platform',
    user: {
      name: 'John Doe'
    },
    link: {
      text: 'View Profile',
      url: '#'
    }
  },
  {
    id: '2',
    title: 'Document updated',
    description: 'Sales report Q4 2024 was modified',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    type: 'document',
    action: 'updated',
    target: 'sales-report',
    user: {
      name: 'Jane Smith'
    },
    link: {
      text: 'View Document',
      url: '#'
    }
  },
  {
    id: '3',
    title: 'Security alert',
    description: 'Multiple failed login attempts detected',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    type: 'security',
    status: 'warning',
    action: 'detected',
    target: 'login-attempts'
  },
  {
    id: '4',
    title: 'Email campaign sent',
    description: 'Monthly newsletter was sent to 2,500 subscribers',
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    type: 'email',
    status: 'success',
    action: 'sent',
    target: 'subscribers',
    user: {
      name: 'Marketing Team'
    }
  },
  {
    id: '5',
    title: 'System settings updated',
    description: 'Security policies were modified',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    type: 'settings',
    status: 'info',
    action: 'modified',
    target: 'security-policies',
    user: {
      name: 'Admin'
    }
  }
];

// Sample data for System Events
const systemEvents: SystemEvent[] = [
  {
    id: '1',
    title: 'Multiple Failed Login Attempts',
    description: '10 failed login attempts detected from IP 192.168.1.100',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    type: 'security',
    status: 'error',
    category: 'Authentication',
    message: 'Potential brute force attack detected'
  },
  {
    id: '2',
    title: 'Unusual Access Pattern',
    description: 'Unusual access pattern detected for user john.doe@example.com',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    type: 'security',
    status: 'warning',
    category: 'Access Control',
    message: 'User behavior analysis flagged suspicious activity'
  },
  {
    id: '3',
    title: 'System Backup Completed',
    description: 'Daily system backup completed successfully',
    timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
    type: 'system',
    status: 'success',
    category: 'Maintenance',
    message: 'All databases and files backed up'
  },
  {
    id: '4',
    title: 'Database Migration',
    description: 'Database schema migration completed',
    timestamp: new Date(Date.now() - 8 * 3600000).toISOString(),
    type: 'system',
    status: 'info',
    category: 'Database',
    message: 'Schema version updated to v2.5.0'
  },
  {
    id: '5',
    title: 'API Rate Limit Exceeded',
    description: 'Rate limit exceeded for /api/users endpoint',
    timestamp: new Date(Date.now() - 10 * 3600000).toISOString(),
    type: 'api',
    status: 'warning',
    category: 'API Gateway',
    message: 'Client exceeded 1000 requests per minute limit'
  }
];

export function ActivityComponentsPage() {
  const tabs = [
    {
      id: 'activity',
      label: 'Activity Feed',
      content: (
        <div className="p-6">
          <ActivityFeed 
            activities={activities}
            onActivityClick={(activity) => console.log('Activity clicked:', activity)}
          />
        </div>
      )
    },
    {
      id: 'system-events',
      label: 'System Events',
      badge: {
        text: '2',
        variant: 'error' as const
      },
      content: (
        <div className="p-6">
          <SystemEventsList 
            events={systemEvents}
            onEventClick={(event) => console.log('System event clicked:', event)}
          />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Activity Components</h1>
          <p className="mt-1 text-sm text-gray-500">
            Different types of activity and event lists
          </p>
        </div>

        <Tabs 
          tabs={tabs}
          variant="underline"
        />
      </div>
    </div>
  );
}