import React from 'react';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';
import { DashboardPage } from '../pages/super-admin/DashboardPage';
import { CompaniesPage } from '../pages/super-admin/CompaniesPage';
import { UsersPage } from '../pages/super-admin/UsersPage';
import { AuditLogsPage } from '../pages/super-admin/AuditLogsPage';
import { SecurityPage } from '../pages/super-admin/SecurityPage';
import { BillingPage } from '../pages/super-admin/BillingPage';

export const superAdminRoutes = [
  {
    path: '/super-admin',
    element: <SuperAdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'companies',
        element: <CompaniesPage />
      },
      {
        path: 'users',
        element: <UsersPage />
      },
      {
        path: 'audit-logs',
        element: <AuditLogsPage />
      },
      {
        path: 'security',
        element: <SecurityPage />
      },
      {
        path: 'billing',
        element: <BillingPage />
      }
    ]
  }
];