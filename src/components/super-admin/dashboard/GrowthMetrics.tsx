import React from 'react';
import { Users, Building2, ArrowUpRight } from 'lucide-react';
import { MetricCard } from '../../MetricCard';
import { GrowthMetricsProps } from '../../../types/dashboard';

export function GrowthMetrics({ data }: GrowthMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Total Users"
        value={data.users.total.toLocaleString()}
        change={data.users.change}
        icon={Users}
        status={data.users.change >= 0 ? 'success' : 'error'}
      />
      <MetricCard
        title="Total Companies"
        value={data.companies.total.toLocaleString()}
        change={data.companies.change}
        icon={Building2}
        status={data.companies.change >= 0 ? 'success' : 'error'}
      />
      <MetricCard
        title="Monthly Revenue"
        value={data.revenue.total}
        change={data.revenue.change}
        icon={ArrowUpRight}
        status={data.revenue.change >= 0 ? 'success' : 'error'}
      />
    </div>
  );
}