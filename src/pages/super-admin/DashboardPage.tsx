import React from 'react';
import { MetricCard } from '../../components/MetricCard';
import { Chart } from '../../components/Chart';
import { SimpleTable } from '../../components/SimpleTable';
import { Badge } from '../../components/Badge';
import { Activity, Users, Building2, AlertTriangle } from 'lucide-react';

export function SuperAdminDashboardPage() {
  const alertsData = [
    { 
      time: '2 mins ago', 
      type: 'Security', 
      status: <Badge variant="error" dot>{`Critical`}</Badge>, 
      message: 'Multiple failed login attempts detected' 
    },
    { 
      time: '15 mins ago', 
      type: 'Performance', 
      status: <Badge variant="warning" dot>{`Warning`}</Badge>, 
      message: 'High memory usage on primary database' 
    },
    { 
      time: '1 hour ago', 
      type: 'System', 
      status: <Badge variant="success" dot>{`Resolved`}</Badge>, 
      message: 'Automated backup completed successfully' 
    }
  ];

  const alertColumns = [
    { key: 'time', label: 'Time', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: false },
    { key: 'message', label: 'Message', sortable: true }
  ];

  return (
    <div>
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
          icon={Activity}
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

      <SimpleTable 
        title="Recent System Alerts"
        description="Latest system events and notifications"
        columns={alertColumns}
        data={alertsData}
      />
    </div>
  );
}