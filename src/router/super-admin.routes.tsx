import React from 'react';
import { RouteObject } from 'react-router-dom';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';
import { SuperAdminDashboardPage } from '../pages/super-admin/DashboardPage';

export const superAdminRoutes: RouteObject[] = [
  {
    path: '/super-admin',
    element: <SuperAdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <SuperAdminDashboardPage />
      },
      // Add more routes as we create them:
      // {
      //   path: 'companies',
      //   element: <CompaniesPage />
      // },
      // {
      //   path: 'billing',
      //   element: <BillingPage />
      // },
      // {
      //   path: 'audit',
      //   element: <AuditPage />
      // }
    ]
  }
];