import React from 'react';
import { AdvancedTable, Column } from '../../components/AdvancedTable';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { MetricCard } from '../../components/MetricCard';
import { Building2, Users, Clock, ArrowUpRight } from 'lucide-react';

type Company = {
  id: string;
  name: string;
  domain: string;
  users: number;
  spaces: number;
  status: 'active' | 'suspended' | 'archived';
  plan: 'enterprise' | 'growth' | 'starter';
  lastActive: string;
};

type StatusColor = {
  active: 'success';
  suspended: 'error';
  archived: 'default';
};

type PlanColor = {
  enterprise: 'primary';
  growth: 'success';
  starter: 'info';
};

export function CompaniesPage() {
  const companies: Company[] = [
    {
      id: '1',
      name: 'Acme Corp',
      domain: 'acme.com',
      users: 156,
      spaces: 12,
      status: 'active',
      plan: 'enterprise',
      lastActive: '2 mins ago'
    },
    {
      id: '2',
      name: 'TechStart Inc',
      domain: 'techstart.io',
      users: 89,
      spaces: 8,
      status: 'active',
      plan: 'growth',
      lastActive: '5 mins ago'
    },
    {
      id: '3',
      name: 'Global Systems',
      domain: 'globalsys.com',
      users: 245,
      spaces: 18,
      status: 'suspended',
      plan: 'enterprise',
      lastActive: '1 hour ago'
    }
  ];

  const statusColors: StatusColor = {
    active: 'success',
    suspended: 'error',
    archived: 'default'
  };

  const planColors: PlanColor = {
    enterprise: 'primary',
    growth: 'success',
    starter: 'info'
  };

  const columns: Column<Company>[] = [
    {
      key: 'name',
      label: 'Company',
      sortable: true,
      cell: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item.name}</div>
          <div className="text-sm text-gray-500">{item.domain}</div>
        </div>
      )
    },
    {
      key: 'users',
      label: 'Users',
      sortable: true,
      cell: (item) => (
        <div className="font-medium">{item.users}</div>
      )
    },
    {
      key: 'spaces',
      label: 'Spaces',
      sortable: true,
      cell: (item) => (
        <div className="font-medium">{item.spaces}</div>
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
      key: 'plan',
      label: 'Plan',
      sortable: true,
      cell: (item) => (
        <Badge variant={planColors[item.plan]}>
          {item.plan}
        </Badge>
      )
    },
    {
      key: 'lastActive',
      label: 'Last Active',
      sortable: true
    },
    {
      key: 'actions',
      label: '',
      cell: (item) => (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => console.log('View company:', item.id)}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      )
    }
  ];

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor all companies in the system
            </p>
          </div>
          <Button>Add Company</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Total Companies"
            value="156"
            change={12}
            icon={Building2}
            status="success"
          />
          <MetricCard
            title="Total Users"
            value="2,847"
            change={5}
            icon={Users}
            status="success"
          />
          <MetricCard
            title="Average Activity"
            value="85%"
            change={3}
            icon={Clock}
            status="success"
          />
        </div>
      </div>

      <AdvancedTable<Company>
        items={companies}
        columns={columns}
        itemsPerPage={10}
      />
    </>
  );
}