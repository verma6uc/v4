import React from 'react';
import { RouteObject } from 'react-router-dom';
import { SuperAdminDashboardPage } from '../pages/super-admin/DashboardPage';

export const superAdminRoutes: RouteObject[] = [
  {
    path: '/super-admin',
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