import React from 'react';
import { MetricCard } from '../../components/MetricCard';
import { Chart } from '../../components/Chart';
import { ActivityFeed, Activity } from '../../components/ActivityFeed';
import { SystemEventsList, SystemEvent } from '../../components/SystemEventsList';
import { Activity as ActivityIcon, Users, Building2, AlertTriangle } from 'lucide-react';

export function SuperAdminDashboardPage() {
  const recentActivities: Activity[] = [
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
      user: { name: 'Admin' },
      action: 'modified',
      target: 'security settings',
      timestamp: '30 minutes ago',
      type: 'security'
    }
  ];

  const systemEvents: SystemEvent[] = [
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
    }
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">System Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor system health, growth metrics, and key activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Companies"
          value="156"
          change={12}
          icon={Building2}
          status="success"
        />
        <MetricCard
          title="Active Users"
          value="2,847"
          change={5}
          icon={Users}
          status="success"
        />
        <MetricCard
          title="System Load"
          value="67%"
          change={-3}
          icon={ActivityIcon}
          status="warning"
        />
        <MetricCard
          title="Active Alerts"
          value="3"
          change={2}
          icon={AlertTriangle}
          status="error"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Chart 
          title="Resource Usage"
          type="line"
          data={[
            { label: 'Mon', value: 65 },
            { label: 'Tue', value: 59 },
            { label: 'Wed', value: 80 },
            { label: 'Thu', value: 81 },
            { label: 'Fri', value: 56 },
            { label: 'Sat', value: 55 },
            { label: 'Sun', value: 40 }
          ]}
          color="blue"
          height="md"
        />

        <Chart 
          title="User Growth"
          type="bar"
          data={[
            { label: 'Jan', value: 65 },
            { label: 'Feb', value: 59 },
            { label: 'Mar', value: 80 },
            { label: 'Apr', value: 81 },
            { label: 'May', value: 56 },
            { label: 'Jun', value: 55 }
          ]}
          color="green"
          height="md"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed 
          activities={recentActivities}
          title="Recent Activity"
          description="Latest user actions and updates"
        />

        <SystemEventsList 
          events={systemEvents}
          title="System Events"
          description="Recent system events and notifications"
        />
      </div>
    </>
  );
}