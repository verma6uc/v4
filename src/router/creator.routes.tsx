import React from 'react';
import { RouteObject } from 'react-router-dom';
import { CreatorLayout } from '../layouts/CreatorLayout';
import { ApplicationsPage } from '../pages/creator/ApplicationsPage';

export const creatorRoutes: RouteObject[] = [
  {
    path: '/creator',
    element: <CreatorLayout />,
    children: [
      {
        path: 'applications',
        element: <ApplicationsPage />
      }
    ]
  }
];