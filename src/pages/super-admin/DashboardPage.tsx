import React from 'react';
import { SystemHealth } from '../../components/super-admin/dashboard/SystemHealth';
import { SecurityAlerts } from '../../components/super-admin/dashboard/SecurityAlerts';
import { ResourceMetrics } from '../../components/super-admin/dashboard/ResourceMetrics';
import { ServiceHealthTable } from '../../components/super-admin/dashboard/ServiceHealthTable';
import { GrowthMetrics } from '../../components/super-admin/dashboard/GrowthMetrics';
import { ActivityFeed } from '../../components/ActivityFeed';
import { BaseCard } from '../../components/base/BaseCard';
import { Button } from '../../components/Button';
import { Download } from 'lucide-react';
import {
  SystemHealthData,
  SecurityAlertsData,
  ResourceUsageData,
  ServiceHealth,
  GrowthData,
  ActivityItem
} from '../../types/dashboard';

// Mock data matching our defined types
const mockData: {
  systemHealth: SystemHealthData;
  securityAlerts: SecurityAlertsData;
  resourceUsage: ResourceUsageData;
  growth: GrowthData;
  recentActivity: ActivityItem[];
} = {
  systemHealth: {
    score: 98.5,
    change: 0.5,
    services: [
      {
        name: 'Authentication',
        uptime: 99.99,
        responseTime: 150,
        errorRate: 0.05,
        weight: 0.30
      },
      {
        name: 'Database',
        uptime: 99.95,
        responseTime: 200,
        errorRate: 0.08,
        weight: 0.25
      },
      {
        name: 'Storage',
        uptime: 99.90,
        responseTime: 180,
        errorRate: 0.03,
        weight: 0.20
      }
    ]
  },
  securityAlerts: {
    activeAlerts: 2,
    change: -8,
    recentEvents: [
      {
        type: 'failed_login',
        count: 5,
        source: '192.168.1.100',
        timestamp: new Date().toISOString()
      },
      {
        type: 'suspicious_ip',
        count: 1,
        source: '203.0.113.0',
        timestamp: new Date().toISOString()
      }
    ]
  },
  resourceUsage: {
    cpu: 65,
    memory: 72,
    storage: 68,
    network: 55
  },
  growth: {
    users: {
      total: 12847,
      change: 15
    },
    companies: {
      total: 342,
      change: 8
    },
    revenue: {
      total: '$1.2M',
      change: 12
    }
  },
  recentActivity: [
    {
      id: '1',
      type: 'system_event',
      message: 'System update completed successfully',
      timestamp: new Date().toISOString(),
      severity: 'info'
    },
    {
      id: '2',
      type: 'security_event',
      message: 'Multiple failed login attempts detected',
      timestamp: new Date().toISOString(),
      severity: 'warning'
    }
  ]
};

export function DashboardPage() {
  const [timeRange, setTimeRange] = React.useState('24h');

  const handleExport = () => {
    // TODO: Implement dashboard data export
    console.log('Exporting dashboard data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            System overview and key metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1h">Last hour</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Critical Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemHealth data={mockData.systemHealth} />
        <SecurityAlerts data={mockData.securityAlerts} />
      </div>

      {/* Growth Metrics */}
      <GrowthMetrics data={mockData.growth} />

      {/* Resource & Service Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResourceMetrics metrics={mockData.resourceUsage} />
        <ServiceHealthTable services={mockData.systemHealth.services} />
      </div>

      {/* Activity Feed */}
      <BaseCard>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <ActivityFeed items={mockData.recentActivity} />
        </div>
      </BaseCard>
    </div>
  );
}