import React from 'react';
import { AdvancedTable, Column } from '../../components/AdvancedTable';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { MetricCard } from '../../components/MetricCard';
import { CreditCard, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';

type Invoice = {
  id: string;
  company: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
  plan: 'enterprise' | 'growth' | 'starter';
};

type StatusColor = {
  paid: 'success';
  pending: 'warning';
  overdue: 'error';
};

type PlanColor = {
  enterprise: 'primary';
  growth: 'success';
  starter: 'info';
};

export function BillingPage() {
  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      company: 'Acme Corp',
      amount: 1999.00,
      status: 'paid',
      date: '2024-02-01',
      dueDate: '2024-02-15',
      plan: 'enterprise'
    },
    {
      id: 'INV-002',
      company: 'TechStart Inc',
      amount: 499.00,
      status: 'pending',
      date: '2024-02-05',
      dueDate: '2024-02-19',
      plan: 'growth'
    },
    {
      id: 'INV-003',
      company: 'Global Systems',
      amount: 1999.00,
      status: 'overdue',
      date: '2024-01-15',
      dueDate: '2024-01-29',
      plan: 'enterprise'
    }
  ];

  const statusColors: StatusColor = {
    paid: 'success',
    pending: 'warning',
    overdue: 'error'
  };

  const planColors: PlanColor = {
    enterprise: 'primary',
    growth: 'success',
    starter: 'info'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const columns: Column<Invoice>[] = [
    {
      key: 'id',
      label: 'Invoice',
      sortable: true,
      cell: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item.id}</div>
          <div className="text-sm text-gray-500">{item.company}</div>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      cell: (item) => (
        <div className="font-medium">{formatCurrency(item.amount)}</div>
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
      key: 'date',
      label: 'Issue Date',
      sortable: true,
      cell: (item) => formatDate(item.date)
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true,
      cell: (item) => formatDate(item.dueDate)
    },
    {
      key: 'actions',
      label: '',
      cell: (item) => (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => console.log('View invoice:', item.id)}
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
            <h1 className="text-2xl font-semibold text-gray-900">Billing</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor revenue, subscriptions, and invoices
            </p>
          </div>
          <Button>Create Invoice</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Monthly Revenue"
            value="$45,231"
            change={8}
            icon={DollarSign}
            status="success"
          />
          <MetricCard
            title="Active Subscriptions"
            value="156"
            change={12}
            icon={CreditCard}
            status="success"
          />
          <MetricCard
            title="Revenue Growth"
            value="23%"
            change={5}
            icon={TrendingUp}
            status="success"
          />
        </div>
      </div>

      <AdvancedTable<Invoice>
        items={invoices}
        columns={columns}
        itemsPerPage={10}
      />
    </>
  );
}