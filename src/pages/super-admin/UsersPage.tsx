import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdvancedTable, Column } from '../../components/AdvancedTable';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { MetricCard } from '../../components/MetricCard';
import { Users, UserPlus, Clock, ArrowUpRight, Shield } from 'lucide-react';
import { User, UserStatus } from '../../types/schema';
import { AddSuperAdminModal } from '../../components/super-admin/user/AddSuperAdminModal';
import { Toast, ToastContainer, useToasts } from '../../components/Toast';

// Mock data for super admin users
const superAdminUsers: User[] = [
  {
    id: '1',
    email: 'john@platform.com',
    firstName: 'John',
    lastName: 'Doe',
    status: UserStatus.ACTIVE,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    activatedAt: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - 2 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    email: 'sarah@platform.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    status: UserStatus.ACTIVE,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    activatedAt: new Date(Date.now() - 179 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    email: 'michael@platform.com',
    firstName: 'Michael',
    lastName: 'Brown',
    status: UserStatus.ARCHIVED,
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    activatedAt: new Date(Date.now() - 364 * 24 * 60 * 60 * 1000).toISOString(),
    archivedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const statusColors: Record<UserStatus, 'success' | 'error' | 'warning'> = {
  [UserStatus.ACTIVE]: 'success',
  [UserStatus.SUSPENDED]: 'error',
  [UserStatus.BLOCKED]: 'error',
  [UserStatus.ARCHIVED]: 'error',
  [UserStatus.INVITED]: 'warning'
};

export function UsersPage() {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const { toasts, addToast, removeToast } = useToasts();

  const handleAddSuperAdmin = async (data: { 
    email: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      // TODO: API call to create super admin
      console.log('Add super admin:', data);
      setIsAddModalOpen(false);
      addToast('success', 'Super admin invitation sent successfully');
    } catch (error) {
      console.error('Error adding super admin:', error);
      addToast('error', 'Failed to add super admin. Please try again.');
    }
  };

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      searchable: true,
      cell: (item) => (
        <div>
          <div className="font-medium text-gray-900">
            {item.firstName} {item.lastName}
          </div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      searchable: true,
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
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      searchable: true,
      cell: (item) => (
        <div className="text-sm text-gray-600">
          {new Date(item.createdAt).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'lastLoginAt',
      label: 'Last Active',
      sortable: true,
      searchable: true,
      cell: (item) => (
        <div className="text-sm text-gray-600">
          {item.lastLoginAt 
            ? new Date(item.lastLoginAt).toLocaleDateString()
            : 'Never'
          }
        </div>
      )
    },
    {
      key: 'actions',
      label: '',
      cell: (item) => (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(`/super-admin/users/${item.id}`)}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      )
    }
  ];

  const activeUsers = superAdminUsers.filter(u => u.status === UserStatus.ACTIVE);
  const recentlyActive = activeUsers.filter(u => 
    u.lastLoginAt && new Date(u.lastLoginAt).getTime() > Date.now() - 30 * 60 * 1000 // active in last 30 mins
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Super Admins</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage super administrators with full system access
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Shield className="w-4 h-4 mr-1" />
          Add Platform Admin
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Admins"
          value={superAdminUsers.length.toString()}
          icon={Users}
          status="info"
        />
        <MetricCard
          title="Active Super Admins"
          value={activeUsers.length.toString()}
          icon={UserPlus}
          status="success"
        />
        <MetricCard
          title="Online Super Admins"
          value={recentlyActive.length.toString()}
          icon={Clock}
          status="success"
        />
      </div>

      <AdvancedTable<User>
        items={superAdminUsers}
        columns={columns}
        itemsPerPage={10}
        enableSearch={true}
        enableExport={true}
        exportFilename="platform-admins"
      />

      <AddSuperAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSuperAdmin}
      />

      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
    </div>
  );
}