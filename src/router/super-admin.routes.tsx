import React from 'react';
import { RouteObject } from 'react-router-dom';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';
import { SuperAdminDashboardPage } from '../pages/super-admin/DashboardPage';
import { CompaniesPage } from '../pages/super-admin/CompaniesPage';

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
      }
      // Add more routes as we create them:
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