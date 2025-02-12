import React from 'react';
import { RecentActivityList } from '../components/lists/RecentActivityList';
import { Tabs } from '../components/Tabs';
import { 
  AlertTriangle,
  Clock
} from 'lucide-react';

type TabBadgeVariant = 'primary' | 'success' | 'warning' | 'error';

interface TabBadge {
  text: string;
  variant: TabBadgeVariant;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  content: React.ReactNode;
  badge?: TabBadge;
}

// Sample data for RecentActivityList
const activities = [
  {
    id: '1',
    title: 'New user registered',
    description: 'John Doe created a new account',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    type: 'user' as const,
    status: 'success' as const,
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
    type: 'document' as const,
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
    type: 'security' as const,
    status: 'warning' as const
  },
  {
    id: '4',
    title: 'Email campaign sent',
    description: 'Monthly newsletter was sent to 2,500 subscribers',
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    type: 'email' as const,
    status: 'success' as const,
    user: {
      name: 'Marketing Team'
    }
  },
  {
    id: '5',
    title: 'System settings updated',
    description: 'Security policies were modified',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    type: 'settings' as const,
    status: 'info' as const,
    user: {
      name: 'Admin'
    }
  }
];

// Sample data for System Events
const systemEvents = [
  {
    id: '1',
    title: 'Multiple Failed Login Attempts',
    description: '10 failed login attempts detected from IP 192.168.1.100',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    type: 'security' as const,
    status: 'error' as const
  },
  {
    id: '2',
    title: 'Unusual Access Pattern',
    description: 'Unusual access pattern detected for user john.doe@example.com',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    type: 'security' as const,
    status: 'warning' as const
  },
  {
    id: '3',
    title: 'System Backup Completed',
    description: 'Daily system backup completed successfully',
    timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
    type: 'system' as const,
    status: 'success' as const
  },
  {
    id: '4',
    title: 'Database Migration',
    description: 'Database schema migration completed',
    timestamp: new Date(Date.now() - 8 * 3600000).toISOString(),
    type: 'system' as const,
    status: 'info' as const
  },
  {
    id: '5',
    title: 'API Rate Limit Exceeded',
    description: 'Rate limit exceeded for /api/users endpoint',
    timestamp: new Date(Date.now() - 10 * 3600000).toISOString(),
    type: 'api' as const,
    status: 'warning' as const
  }
];

export function ListsPage() {
  const tabs: TabItem[] = [
    {
      id: 'activity',
      label: 'Recent Activity',
      icon: Clock,
      content: (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <p className="mt-1 text-sm text-gray-500">
              Track all recent activities and events
            </p>
          </div>
          <RecentActivityList 
            activities={activities}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
            onActivityClick={(activity) => console.log('Activity clicked:', activity)}
          />
        </div>
      )
    },
    {
      id: 'system-events',
      label: 'System Events',
      icon: AlertTriangle,
      badge: {
        text: '2',
        variant: 'error' as const
      },
      content: (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">System Events</h2>
            <p className="mt-1 text-sm text-gray-500">
              Monitor system events and alerts
            </p>
          </div>
          <RecentActivityList 
            activities={systemEvents}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
            onActivityClick={(activity) => console.log('System event clicked:', activity)}
          />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">List Components</h1>
          <p className="mt-1 text-sm text-gray-500">
            Examples of different list components and their variations
          </p>
        </div>

        <Tabs 
          tabs={tabs}
          variant="underline"
          className="bg-white rounded-lg shadow-sm p-4"
        />
      </div>
    </div>
  );
}