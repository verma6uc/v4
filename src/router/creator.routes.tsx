import React from 'react';
import { RouteObject } from 'react-router-dom';
import { CreatorLayout } from '../layouts/CreatorLayout';
import { DashboardPage } from '../pages/creator/DashboardPage';
import { AppStorePage } from '../pages/creator/AppStorePage';
import { NewApplicationPage } from '../pages/creator/NewApplicationPage';

export const creatorRoutes: RouteObject[] = [
  {
    path: '/creator',
    element: <CreatorLayout />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'app-store',
        element: <AppStorePage />
      },
      {
        path: 'applications/new',
        element: <NewApplicationPage />
      }
    ]
  }
];