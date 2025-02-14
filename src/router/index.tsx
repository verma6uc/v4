import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { superAdminRoutes } from './super-admin.routes';
import { creatorRoutes } from './creator.routes';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';
import { CreatorLayout } from '../layouts/CreatorLayout';
import { ShowcaseLayout } from '../layouts/ShowcaseLayout';
import { ComponentShowcase } from '../pages/ComponentShowcase';
import { ButtonsPage } from '../pages/ButtonsPage';
import { TablesPage } from '../pages/TablesPage';
import { FormsPage } from '../pages/FormsPage';
import { ChartsPage } from '../pages/ChartsPage';
import { BadgesPage } from '../pages/BadgesPage';
import { MetricCardsPage } from '../pages/MetricCardsPage';
import { ModalsPage } from '../pages/ModalsPage';
import { ActivityComponentsPage } from '../pages/ActivityComponentsPage';
import { TabsPage } from '../pages/TabsPage';
import { CardsShowcasePage } from '../pages/CardsShowcasePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/showcase',
    element: <ShowcaseLayout />,
    children: [
      {
        path: '',
        element: <ComponentShowcase />
      },
      {
        path: 'buttons',
        element: <ButtonsPage />
      },
      {
        path: 'tables',
        element: <TablesPage />
      },
      {
        path: 'forms',
        element: <FormsPage />
      },
      {
        path: 'charts',
        element: <ChartsPage />
      },
      {
        path: 'badges',
        element: <BadgesPage />
      },
      {
        path: 'metric-cards',
        element: <MetricCardsPage />
      },
      {
        path: 'modals',
        element: <ModalsPage />
      },
      {
        path: 'activity',
        element: <ActivityComponentsPage />
      },
      {
        path: 'tabs',
        element: <TabsPage />
      },
      {
        path: 'cards',
        element: <CardsShowcasePage />
      }
    ]
  },
  {
    path: '/super-admin',
    element: <ProtectedRoute requiredRole="SUPER_ADMIN">
      <SuperAdminLayout />
    </ProtectedRoute>,
    children: superAdminRoutes[0].children
  },
  {
    path: '/creator',
    element: <ProtectedRoute requiredRole="CREATOR">
      <CreatorLayout />
    </ProtectedRoute>,
    children: creatorRoutes[0].children
  },
  {
    // Catch-all route - redirect to login for any unmatched paths except showcase
    path: '*',
    element: <Navigate to="/login" replace />
  }
]);