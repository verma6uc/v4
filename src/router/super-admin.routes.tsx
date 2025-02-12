import React from 'react';
import { RouteObject } from 'react-router-dom';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';
import { SuperAdminDashboardPage } from '../pages/super-admin/DashboardPage';
import { CompaniesPage } from '../pages/super-admin/CompaniesPage';
import { UsersPage } from '../pages/super-admin/UsersPage';
import { BillingPage } from '../pages/super-admin/BillingPage';
import { AuditLogsPage } from '../pages/super-admin/AuditLogsPage';
import { SecurityPage } from '../pages/super-admin/SecurityPage';
import { SettingsPage } from '../pages/super-admin/SettingsPage';

export const superAdminRoutes: RouteObject[] = [
  {
    path: '/super-admin',
    element: <SuperAdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <SuperAdminDashboardPage />
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
        path: 'billing',
        element: <BillingPage />
      },
      {
        path: 'audit',
        element: <AuditLogsPage />
      },
      {
        path: 'security',
        element: <SecurityPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      }
    ]
  }
];