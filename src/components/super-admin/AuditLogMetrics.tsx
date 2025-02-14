import React from 'react';
import { MetricCard } from '../MetricCard';
import { ScrollText, Shield, AlertTriangle, Activity } from 'lucide-react';
import { AuditLog } from '../../types/audit';

interface AuditLogMetricsProps {
  logs: AuditLog[];
}

export function AuditLogMetrics({ logs }: AuditLogMetricsProps) {
  const getMetrics = () => {
    const total = logs.length;
    const security = logs.filter(log => log.category === 'security').length;
    const critical = logs.filter(log => log.severity === 'critical').length;
    const warning = logs.filter(log => log.severity === 'warning').length;

    return {
      total,
      security,
      critical,
      warning
    };
  };

  const metrics = getMetrics();

  return (
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
  );
}