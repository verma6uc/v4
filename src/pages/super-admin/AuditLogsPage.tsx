import React from 'react';
import { AdvancedTable, Column } from '../../components/AdvancedTable';
import { Badge } from '../../components/Badge';
import { MetricCard } from '../../components/MetricCard';
import { ScrollText, Shield, AlertTriangle, Activity } from 'lucide-react';

type AuditLog = {
  id: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'export';
  category: 'user' | 'company' | 'billing' | 'security' | 'system';
  actor: string;
  target: string;
  timestamp: string;
  ip: string;
  severity: 'info' | 'warning' | 'critical';
};

type SeverityColor = {
  info: 'info';
  warning: 'warning';
  critical: 'error';
};

type CategoryColor = {
  user: 'primary';
  company: 'success';
  billing: 'info';
  security: 'error';
  system: 'warning';
};

export function AuditLogsPage() {
  const auditLogs: AuditLog[] = [
    {
      id: 'LOG-001',
      action: 'login',
      category: 'security',
      actor: 'john@acme.com',
      target: 'System',
      timestamp: '2024-02-12T14:23:45',
      ip: '192.168.1.100',
      severity: 'info'
    },
    {
      id: 'LOG-002',
      action: 'update',
      category: 'billing',
      actor: 'admin@system.com',
      target: 'Subscription Plan',
      timestamp: '2024-02-12T14:20:30',
      ip: '192.168.1.101',
      severity: 'warning'
    },
    {
      id: 'LOG-003',
      action: 'delete',
      category: 'company',
      actor: 'admin@system.com',
      target: 'TechCorp Inc',
      timestamp: '2024-02-12T14:15:00',
      ip: '192.168.1.101',
      severity: 'critical'
    },
    {
      id: 'LOG-004',
      action: 'export',
      category: 'user',
      actor: 'jane@techstart.io',
      target: 'User Data',
      timestamp: '2024-02-12T14:10:15',
      ip: '192.168.1.102',
      severity: 'warning'
    }
  ];

  const severityColors: SeverityColor = {
    info: 'info',
    warning: 'warning',
    critical: 'error'
  };

  const categoryColors: CategoryColor = {
    user: 'primary',
    company: 'success',
    billing: 'info',
    security: 'error',
    system: 'warning'
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

  const columns: Column<AuditLog>[] = [
    {
      key: 'timestamp',
      label: 'Time',
      sortable: true,
      cell: (item) => formatDate(item.timestamp)
    },
    {
      key: 'action',
      label: 'Action',
      sortable: true,
      cell: (item) => (
        <div className="capitalize font-medium">{item.action}</div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      cell: (item) => (
        <Badge variant={categoryColors[item.category]}>
          {item.category}
        </Badge>
      )
    },
    {
      key: 'severity',
      label: 'Severity',
      sortable: true,
      cell: (item) => (
        <Badge 
          variant={severityColors[item.severity]}
          dot
        >
          {item.severity}
        </Badge>
      )
    },
    {
      key: 'actor',
      label: 'Actor',
      sortable: true
    },
    {
      key: 'target',
      label: 'Target',
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
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and track all system activities and events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Events"
            value="15,847"
            change={8}
            icon={ScrollText}
            status="info"
          />
          <MetricCard
            title="Security Events"
            value="245"
            change={-12}
            icon={Shield}
            status="error"
          />
          <MetricCard
            title="Critical Events"
            value="12"
            change={5}
            icon={AlertTriangle}
            status="warning"
          />
          <MetricCard
            title="System Health"
            value="98%"
            change={2}
            icon={Activity}
            status="success"
          />
        </div>
      </div>

      <AdvancedTable<AuditLog>
        items={auditLogs}
        columns={columns}
        itemsPerPage={10}
        enableSearch
        enableExport
      />
    </>
  );
}