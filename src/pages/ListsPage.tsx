import React from 'react';
import { RecentActivityList } from '../components/lists/RecentActivityList';
import { NotificationList } from '../components/lists/NotificationList';
import { TaskList } from '../components/lists/TaskList';
import { Tabs } from '../components/Tabs';

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

// Sample data for NotificationList
const notifications = [
  {
    id: '1',
    title: 'System Update',
    message: 'A new version is available. Please update your system.',
    type: 'info' as const,
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    actionLabel: 'Update Now',
    onAction: () => console.log('Update action clicked')
  },
  {
    id: '2',
    title: 'Storage Warning',
    message: 'You are approaching your storage limit (85% used)',
    type: 'warning' as const,
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    read: false
  },
  {
    id: '3',
    title: 'Backup Complete',
    message: 'Your system backup was completed successfully',
    type: 'success' as const,
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
    read: true
  },
  {
    id: '4',
    title: 'Security Alert',
    message: 'Unusual login activity detected from a new device',
    type: 'error' as const,
    timestamp: new Date(Date.now() - 1 * 3600000).toISOString(),
    read: false,
    actionLabel: 'View Details'
  },
  {
    id: '5',
    title: 'Task Assigned',
    message: 'You have been assigned a new task by Alice Johnson',
    type: 'info' as const,
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    read: false,
    actionLabel: 'View Task'
  }
];

// Sample data for TaskList
const tasks = [
  {
    id: '1',
    title: 'Review Q4 Reports',
    description: 'Review and approve quarterly financial reports',
    status: 'in_progress' as const,
    priority: 'high' as const,
    dueDate: new Date(Date.now() + 2 * 24 * 3600000).toISOString(),
    assignee: {
      name: 'Alice Johnson'
    },
    tags: ['finance', 'quarterly']
  },
  {
    id: '2',
    title: 'Update Documentation',
    description: 'Update API documentation with new endpoints',
    status: 'todo' as const,
    priority: 'medium' as const,
    dueDate: new Date(Date.now() + 5 * 24 * 3600000).toISOString(),
    tags: ['documentation', 'api']
  },
  {
    id: '3',
    title: 'Deploy New Features',
    description: 'Deploy latest features to production',
    status: 'completed' as const,
    priority: 'high' as const,
    assignee: {
      name: 'Bob Wilson'
    },
    tags: ['deployment', 'production']
  },
  {
    id: '4',
    title: 'Security Audit',
    description: 'Perform monthly security audit',
    status: 'blocked' as const,
    priority: 'high' as const,
    dueDate: new Date(Date.now() + 1 * 24 * 3600000).toISOString(),
    assignee: {
      name: 'Security Team'
    },
    tags: ['security', 'audit']
  },
  {
    id: '5',
    title: 'Customer Feedback Review',
    description: 'Analyze and categorize recent customer feedback',
    status: 'todo' as const,
    priority: 'medium' as const,
    dueDate: new Date(Date.now() + 3 * 24 * 3600000).toISOString(),
    assignee: {
      name: 'Product Team'
    },
    tags: ['feedback', 'customer']
  }
];

export function ListsPage() {
  const tabs = [
    {
      id: 'activity',
      label: 'Recent Activity',
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
      id: 'notifications',
      label: 'Notifications',
      content: (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm text-gray-500">
              System notifications and alerts
            </p>
          </div>
          <NotificationList 
            notifications={notifications}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
            onNotificationClick={(notification) => console.log('Notification clicked:', notification)}
          />
        </div>
      )
    },
    {
      id: 'tasks',
      label: 'Tasks',
      content: (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track tasks
            </p>
          </div>
          <TaskList 
            tasks={tasks}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
            onStatusChange={(taskId, newStatus) => {
              console.log(`Task ${taskId} status changed to ${newStatus}`);
            }}
            onTaskClick={(task) => console.log('Task clicked:', task)}
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
          variant="pills"
          className="bg-white rounded-lg shadow-sm p-4"
        />
      </div>
    </div>
  );
}