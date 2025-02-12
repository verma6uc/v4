import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { superAdminRoutes } from './super-admin.routes';
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

export const router = createBrowserRouter([
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
      }
    ]
  },
  ...superAdminRoutes
]);