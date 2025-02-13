import React from 'react';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';
import { DashboardPage } from '../pages/super-admin/DashboardPage';
import { CompaniesPage } from '../pages/super-admin/CompaniesPage';
import { UsersPage } from '../pages/super-admin/UsersPage';
import { AuditLogsPage } from '../pages/super-admin/AuditLogsPage';
import { SecurityPage } from '../pages/super-admin/SecurityPage';
import { BillingPage } from '../pages/super-admin/BillingPage';
import { CompanyDetailPage } from '../pages/super-admin/CompanyDetailPage';
import { UserDetailPage } from '../pages/super-admin/UserDetailPage';
import { SourceDetailsPage } from '../pages/super-admin/SourceDetailsPage';
import { ServiceDetailsPage } from '../pages/super-admin/ServiceDetailsPage';

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
        path: 'companies/:id',
        element: <CompanyDetailPage />
      },
      {
        path: 'users',
        element: <UsersPage />
      },
      {
        path: 'users/:id',
        element: <UserDetailPage />
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
      },
      {
        path: 'sources/:sourceId',
        element: <SourceDetailsPage />
      },
      {
        path: 'services/:serviceId',
        element: <ServiceDetailsPage />
      }
    ]
  }
];