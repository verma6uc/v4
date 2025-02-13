import React from 'react'
import { Building2, Users, Clock, FileCheck, AlertTriangle, Archive, Trash2 } from 'lucide-react'
import { MetricCard } from '../../MetricCard'
import { Company, CompanyStatus } from '../../../types/schema'

interface CompanyMetricsProps {
  companies: Company[]
}

export function CompanyMetrics({ companies }: CompanyMetricsProps) {
  const metrics = [
    {
      title: 'Total Companies',
      value: companies.length.toString(),
      change: 12,
      icon: Building2,
      status: 'info' as const
    },
    {
      title: 'Draft Companies',
      value: companies.filter(c => c.status === CompanyStatus.DRAFT).length.toString(),
      icon: FileCheck,
      status: 'info' as const
    },
    {
      title: 'Active Companies',
      value: companies.filter(c => c.status === CompanyStatus.ACTIVE).length.toString(),
      change: 5,
      icon: Users,
      status: 'success' as const
    },
    {
      title: 'Suspended Companies',
      value: companies.filter(c => c.status === CompanyStatus.SUSPENDED).length.toString(),
      icon: AlertTriangle,
      status: 'warning' as const
    },
    {
      title: 'Archived Companies',
      value: companies.filter(c => c.status === CompanyStatus.ARCHIVED).length.toString(),
      icon: Archive,
      status: 'error' as const
    },
    {
      title: 'Deleted Companies',
      value: companies.filter(c => c.status === CompanyStatus.DELETED).length.toString(),
      icon: Trash2,
      status: 'error' as const
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map(metric => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          status={metric.status}
          variant="compact"
        />
      ))}
    </div>
  )
}