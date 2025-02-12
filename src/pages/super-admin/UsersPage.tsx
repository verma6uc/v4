import React from 'react';
import { AdvancedTable, Column } from '../../components/AdvancedTable';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { MetricCard } from '../../components/MetricCard';
import { Users, UserPlus, Clock, ArrowUpRight } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'admin' | 'user' | 'owner';
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
};

type StatusColor = {
  active: 'success';
  inactive: 'error';
  pending: 'warning';
};

type RoleColor = {
  admin: 'error';
  owner: 'primary';
  user: 'success';
};

export function UsersPage() {
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@acme.com',
      company: 'Acme Corp',
      role: 'admin',
      status: 'active',
      lastActive: '2 mins ago'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@techstart.io',
      company: 'TechStart Inc',
      role: 'owner',
      status: 'active',
      lastActive: '5 mins ago'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@globalsys.com',
      company: 'Global Systems',
      role: 'user',
      status: 'inactive',
      lastActive: '1 hour ago'
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@techstart.io',
      company: 'TechStart Inc',
      role: 'user',
      status: 'pending',
      lastActive: '2 days ago'
    }
  ];

  const statusColors: StatusColor = {
    active: 'success',
    inactive: 'error',
    pending: 'warning'
  };

  const roleColors: RoleColor = {
    admin: 'error',
    owner: 'primary',
    user: 'success'
  };

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      cell: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item.name}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      )
    },
    {
      key: 'company',
      label: 'Company',
      sortable: true
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      cell: (item) => (
        <Badge variant={roleColors[item.role]}>
          {item.role}
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
          onClick={() => console.log('View user:', item.id)}
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
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor all users across companies
            </p>
          </div>
          <Button>Add User</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Total Users"
            value="2,847"
            change={5}
            icon={Users}
            status="success"
          />
          <MetricCard
            title="New Users"
            value="156"
            change={12}
            icon={UserPlus}
            status="success"
          />
          <MetricCard
            title="Active Now"
            value="847"
            change={3}
            icon={Clock}
            status="success"
          />
        </div>
      </div>

      <AdvancedTable<User>
        items={users}
        columns={columns}
        itemsPerPage={10}
      />
    </>
  );
}