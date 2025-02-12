import React from 'react';
import { Card } from '../../components/Card';
import { 
  Users,
  Building2,
  ShieldAlert,
  Activity
} from 'lucide-react';

const metrics = [
  {
    title: 'Total Users',
    value: '12,345',
    change: '+12%',
    trend: 'up' as const,
    icon: Users,
    description: 'Active users across all companies'
  },
  {
    title: 'Companies',
    value: '567',
    change: '+5%',
    trend: 'up' as const,
    icon: Building2,
    description: 'Total registered companies'
  },
  {
    title: 'Security Alerts',
    value: '23',
    change: '-8%',
    trend: 'down' as const,
    icon: ShieldAlert,
    description: 'Active security alerts'
  },
  {
    title: 'System Health',
    value: '99.9%',
    change: '+0.1%',
    trend: 'up' as const,
    icon: Activity,
    description: 'Overall system uptime'
  }
];

export function DashboardPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of system metrics and recent activity
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            description={metric.description}
          />
        ))}
      </div>

      {/* Activity and Events */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-sm text-gray-500">
            No recent activity
          </div>
        </div>

        {/* System Events */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Events</h2>
          <div className="text-sm text-gray-500">
            No system events
          </div>
        </div>
      </div>
    </>
  );
}