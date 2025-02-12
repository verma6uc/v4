import React from 'react';
import { AdvancedTable, Column } from '../../components/AdvancedTable';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { MetricCard } from '../../components/MetricCard';
import { Shield, Lock, UserCheck, AlertTriangle } from 'lucide-react';

type SecurityEvent = {
  id: string;
  type: 'login_attempt' | 'password_change' | 'mfa_enabled' | 'api_key_created' | 'permission_change';
  status: 'success' | 'failed' | 'blocked';
  user: string;
  location: string;
  device: string;
  timestamp: string;
  ip: string;
};

type StatusColor = {
  success: 'success';
  failed: 'warning';
  blocked: 'error';
};

export function SecurityPage() {
  const securityEvents: SecurityEvent[] = [
    {
      id: 'SEC-001',
      type: 'login_attempt',
      status: 'blocked',
      user: 'john@acme.com',
      location: 'New York, US',
      device: 'Chrome / macOS',
      timestamp: '2024-02-12T14:23:45',
      ip: '192.168.1.100'
    },
    {
      id: 'SEC-002',
      type: 'password_change',
      status: 'success',
      user: 'admin@system.com',
      location: 'London, UK',
      device: 'Firefox / Windows',
      timestamp: '2024-02-12T14:20:30',
      ip: '192.168.1.101'
    },
    {
      id: 'SEC-003',
      type: 'mfa_enabled',
      status: 'success',
      user: 'jane@techstart.io',
      location: 'San Francisco, US',
      device: 'Safari / iOS',
      timestamp: '2024-02-12T14:15:00',
      ip: '192.168.1.102'
    },
    {
      id: 'SEC-004',
      type: 'login_attempt',
      status: 'failed',
      user: 'unknown',
      location: 'Beijing, CN',
      device: 'Unknown',
      timestamp: '2024-02-12T14:10:15',
      ip: '192.168.1.103'
    }
  ];

  const statusColors: StatusColor = {
    success: 'success',
    failed: 'warning',
    blocked: 'error'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatEventType = (type: SecurityEvent['type']) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const columns: Column<SecurityEvent>[] = [
    {
      key: 'timestamp',
      label: 'Time',
      sortable: true,
      cell: (item) => formatDate(item.timestamp)
    },
    {
      key: 'type',
      label: 'Event Type',
      sortable: true,
      cell: (item) => (
        <div className="font-medium">{formatEventType(item.type)}</div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      cell: (item) => (
        <Badge 
          variant={statusColors[item.status]}
          dot
        >
          {item.status}
        </Badge>
      )
    },
    {
      key: 'user',
      label: 'User',
      sortable: true
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true
    },
    {
      key: 'device',
      label: 'Device / Browser',
      sortable: true
    },
    {
      key: 'ip',
      label: 'IP Address',
      sortable: true
    }
  ];

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Security</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor security events and manage system security settings
            </p>
          </div>
          <Button>Security Settings</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Security Score"
            value="85%"
            change={5}
            icon={Shield}
            status="success"
          />
          <MetricCard
            title="Active Sessions"
            value="156"
            change={-3}
            icon={UserCheck}
            status="info"
          />
          <MetricCard
            title="Failed Attempts"
            value="23"
            change={12}
            icon={AlertTriangle}
            status="warning"
          />
          <MetricCard
            title="MFA Enabled"
            value="92%"
            change={8}
            icon={Lock}
            status="success"
          />
        </div>
      </div>

      <div className="space-y-6">
        <AdvancedTable<SecurityEvent>
          items={securityEvents}
          columns={columns}
          itemsPerPage={10}
          enableSearch
          enableExport
        />
      </div>
    </>
  );
}