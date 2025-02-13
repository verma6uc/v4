import React from 'react';
import { useParams } from 'react-router-dom';
import { BaseCard } from '../../components/base/BaseCard';
import { MetricCard } from '../../components/MetricCard';
import { ActivityFeed } from '../../components/ActivityFeed';
import { 
  Cpu, 
  CircuitBoard, 
  Database, 
  HardDrive,
  Network,
  AlertTriangle
} from 'lucide-react';

export function SourceDetailsPage() {
  const { sourceId } = useParams<{ sourceId: string }>();
  const [timeRange, setTimeRange] = React.useState('24h');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Source Details</h1>
          <p className="mt-1 text-sm text-gray-500">
            Detailed metrics for source: {sourceId}
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
          title="CPU Usage"
          value="65%"
          change={2.5}
          icon={Cpu}
          status="warning"
        />
        <MetricCard
          title="Memory Usage"
          value="72%"
          change={-1.2}
          icon={CircuitBoard}
          status="warning"
        />
        <MetricCard
          title="Disk Usage"
          value="48%"
          change={0.8}
          icon={HardDrive}
          status="success"
        />
        <MetricCard
          title="Network Usage"
          value="35%"
          change={5.3}
          icon={Network}
          status="success"
        />
      </div>

      {/* Detailed Metrics Table */}
      <BaseCard>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Metrics</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">CPU Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">User Time</span>
                    <span className="text-sm font-medium text-gray-900">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">System Time</span>
                    <span className="text-sm font-medium text-gray-900">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Idle Time</span>
                    <span className="text-sm font-medium text-gray-900">35%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Memory Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Memory</span>
                    <span className="text-sm font-medium text-gray-900">16 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Used Memory</span>
                    <span className="text-sm font-medium text-gray-900">11.5 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Available Memory</span>
                    <span className="text-sm font-medium text-gray-900">4.5 GB</span>
                  </div>
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
                message: 'CPU usage spike detected',
                timestamp: new Date().toISOString(),
                severity: 'warning'
              },
              {
                id: '2',
                type: 'system_event',
                message: 'Memory usage normalized',
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