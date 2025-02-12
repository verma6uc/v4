import React from 'react';
import { RouteObject, Outlet } from 'react-router-dom';
import { SuperAdminDashboardPage } from '../pages/super-admin/DashboardPage';
import { ShowcaseLayout } from '../layouts/ShowcaseLayout';

export const superAdminRoutes: RouteObject[] = [
  {
    path: '/super-admin',
    element: (
      <ShowcaseLayout 
        title="Super Admin" 
        description="System administration and monitoring"
      >
        <Outlet />
      </ShowcaseLayout>
    ),
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