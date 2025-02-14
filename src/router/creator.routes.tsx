import React from 'react';
import { RouteObject } from 'react-router-dom';
import { CreatorLayout } from '../layouts/CreatorLayout';
import { DashboardPage } from '../pages/creator/DashboardPage';
import { AppStorePage } from '../pages/creator/AppStorePage';
import { NewApplicationPage } from '../pages/creator/NewApplicationPage';
import { ProductBacklogPage } from '../pages/creator/application/ProductBacklogPage';
import { BlueprintPage } from '../pages/creator/application/BlueprintPage';
import { ProjectPlanPage } from '../pages/creator/application/ProjectPlanPage';
import { PrototypePage } from '../pages/creator/application/PrototypePage';
import { ApplicationDetailPage } from '../pages/creator/application/ApplicationDetailPage';

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
      },
      {
        path: 'applications/:applicationId/detail',
        element: <ApplicationDetailPage />
      },
      {
        path: 'applications/:applicationId/backlog',
        element: <ProductBacklogPage />
      },
      {
        path: 'applications/:applicationId/blueprint',
        element: <BlueprintPage />
      },
      {
        path: 'applications/:applicationId/plan',
        element: <ProjectPlanPage />
      },
      {
        path: 'applications/:applicationId/prototype',
        element: <PrototypePage />
      }
    ]
  }
];