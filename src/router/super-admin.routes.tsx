import React from 'react';
import { RouteObject } from 'react-router-dom';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';
import { SuperAdminDashboardPage } from '../pages/super-admin/DashboardPage';
import { CompaniesPage } from '../pages/super-admin/CompaniesPage';
import { UsersPage } from '../pages/super-admin/UsersPage';
import { BillingPage } from '../pages/super-admin/BillingPage';

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
      }
      // Add more routes as we create them:
      // {
      //   path: 'audit',
      //   element: <AuditPage />
      // }
    ]
  }
];