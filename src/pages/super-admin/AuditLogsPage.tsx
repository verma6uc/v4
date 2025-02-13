import React from 'react';
import { AdvancedTable, Column } from '../../components/AdvancedTable';
import { Badge } from '../../components/Badge';
import { MetricCard } from '../../components/MetricCard';
import { ScrollText, Shield, AlertTriangle, Activity } from 'lucide-react';
import { DateRangeFilter } from '../../components/DateRangeFilter';

type AuditLog = {
  id: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'export' | 'import' | 'approve' | 'reject';
  category: 'user' | 'company' | 'billing' | 'security' | 'system' | 'data';
  actor: string;
  target: string;
  entity: string;
  entityId: string;
  timestamp: string;
  ip: string;
  severity: 'info' | 'warning' | 'critical';
  details?: string;
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
  data: 'primary';
};

export function AuditLogsPage() {
  const [dateRange, setDateRange] = React.useState({
    start: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
    end: new Date()
  });

  // Generate 15 audit logs for testing pagination
  const generateAuditLogs = (): AuditLog[] => {
    const logs: AuditLog[] = [];
    const actions = ['login', 'update', 'delete', 'export', 'approve', 'import'] as const;
    const categories = ['security', 'billing', 'company', 'data'] as const;
    const severities = ['info', 'warning', 'critical'] as const;

    for (let i = 1; i <= 15; i++) {
      const action = actions[i % actions.length];
      const category = categories[i % categories.length];
      const severity = severities[i % severities.length];
      
      logs.push({
        id: `LOG-${String(i).padStart(3, '0')}`,
        action,
        category,
        actor: `user${i}@example.com`,
        target: `Target ${i}`,
        entity: category === 'security' ? 'User' : 
               category === 'billing' ? 'Subscription' :
               category === 'company' ? 'Company' : 'Report',
        entityId: `${category.toUpperCase()}-${i}`,
        timestamp: new Date(Date.now() - i * 5 * 60000).toISOString(), // 5 minutes apart
        ip: `192.168.1.${i}`,
        severity,
        details: `Test audit log entry ${i}`
      });
    }

    return logs;
  };

  const allLogs = React.useMemo(() => generateAuditLogs(), []);

  const filteredLogs = React.useMemo(() => {
    return allLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= dateRange.start && logDate <= dateRange.end;
    });
  }, [allLogs, dateRange]);

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
    system: 'warning',
    data: 'primary'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const columns: Column<AuditLog>[] = [
    {
      key: 'timestamp',
      label: 'Time',
      sortable: true,
      cell: (item) => (
        <div className="whitespace-nowrap">{formatDate(item.timestamp)}</div>
      )
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
      key: 'entity',
      label: 'Entity',
      sortable: true,
      cell: (item) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{item.entity}</span>
          <span className="text-sm text-gray-500">{item.entityId}</span>
        </div>
      )
    },
    {
      key: 'actor',
      label: 'Actor',
      sortable: true,
      cell: (item) => (
        <div className="font-medium text-gray-900">{item.actor}</div>
      )
    },
    {
      key: 'target',
      label: 'Target',
      sortable: true,
      cell: (item) => (
        <div className="font-medium text-gray-900">{item.target}</div>
      )
    },
    {
      key: 'details',
      label: 'Details',
      cell: (item) => (
        <div className="text-sm text-gray-500">{item.details}</div>
      )
    },
    {
      key: 'ip',
      label: 'IP Address',
      sortable: true,
      cell: (item) => (
        <div className="font-mono text-sm">{item.ip}</div>
      )
    }
  ];

  const getMetrics = () => {
    const total = filteredLogs.length;
    const security = filteredLogs.filter(log => log.category === 'security').length;
    const critical = filteredLogs.filter(log => log.severity === 'critical').length;
    const warning = filteredLogs.filter(log => log.severity === 'warning').length;

    return {
      total,
      security,
      critical,
      warning
    };
  };

  const metrics = getMetrics();

  return (
    <>
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor and track all system activities and events
            </p>
          </div>
          <DateRangeFilter
            onChange={setDateRange}
            className="w-[250px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Events"
            value={metrics.total.toString()}
            change={8}
            icon={ScrollText}
            status="info"
          />
          <MetricCard
            title="Security Events"
            value={metrics.security.toString()}
            change={-12}
            icon={Shield}
            status="error"
          />
          <MetricCard
            title="Critical Events"
            value={metrics.critical.toString()}
            change={5}
            icon={AlertTriangle}
            status="warning"
          />
          <MetricCard
            title="Warning Events"
            value={metrics.warning.toString()}
            change={2}
            icon={Activity}
            status="warning"
          />
        </div>
      </div>

      <AdvancedTable<AuditLog>
        items={filteredLogs}
        columns={columns}
        enableSearch
        enableExport
      />
    </>
  );
}