import React from 'react';
import { useParams } from 'react-router-dom';
import { BaseCard } from '../../components/base/BaseCard';
import { MetricCard } from '../../components/MetricCard';
import { ActivityFeed } from '../../components/ActivityFeed';
import { 
  Activity,
  Clock,
  AlertTriangle,
  Users
} from 'lucide-react';

export function ServiceDetailsPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [timeRange, setTimeRange] = React.useState('24h');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Service Details</h1>
          <p className="mt-1 text-sm text-gray-500">
            Health metrics for service: {serviceId}
          </p>
        </div>
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
      </div>

      {/* Current Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Response Time"
          value="150ms"
          change={-5.2}
          icon={Clock}
          status="success"
        />
        <MetricCard
          title="Error Rate"
          value="0.5%"
          change={0.1}
          icon={AlertTriangle}
          status="success"
        />
        <MetricCard
          title="Request Count"
          value="1.2k/min"
          change={12.5}
          icon={Activity}
          status="info"
        />
        <MetricCard
          title="Active Users"
          value="125"
          change={8.3}
          icon={Users}
          status="info"
        />
      </div>

      {/* Service Health Details */}
      <BaseCard>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Health Details</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Performance Metrics</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Response Time</span>
                    <span className="text-sm font-medium text-gray-900">150ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">P95 Response Time</span>
                    <span className="text-sm font-medium text-gray-900">250ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">P99 Response Time</span>
                    <span className="text-sm font-medium text-gray-900">450ms</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Error Metrics</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Error Rate</span>
                    <span className="text-sm font-medium text-gray-900">0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">4xx Errors</span>
                    <span className="text-sm font-medium text-gray-900">0.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">5xx Errors</span>
                    <span className="text-sm font-medium text-gray-900">0.2%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Service Dependencies</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Database Service</span>
                      <p className="text-xs text-gray-500">Primary data store</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Cache Service</span>
                      <p className="text-xs text-gray-500">Redis cache layer</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      {/* Recent Events */}
      <BaseCard>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h2>
          <ActivityFeed
            items={[
              {
                id: '1',
                type: 'system_event',
                message: 'Response time spike detected',
                timestamp: new Date().toISOString(),
                severity: 'warning'
              },
              {
                id: '2',
                type: 'system_event',
                message: 'Error rate returned to normal',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                severity: 'info'
              }
            ]}
          />
        </div>
      </BaseCard>
    </div>
  );
}