import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { superAdminRoutes } from './super-admin.routes';
import { ComponentShowcase } from '../pages/ComponentShowcase';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/showcase/metrics" replace />
  },
  {
    path: '/showcase',
    children: [
      {
        path: '',
        element: <Navigate to="/showcase/metrics" replace />
      },
      {
        path: ':section',
        element: <ComponentShowcase />
      }
    ]
  },
  ...superAdminRoutes,
  {
    path: '*',
    element: <div>404 Not Found</div>
  }
]);