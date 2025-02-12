import IntroductionPage from '../pages/docs/introduction';
import InstallationPage from '../pages/docs/installation';
import QuickstartPage from '../pages/docs/quickstart';
import { companyFeatureRoutes } from './features/company.routes';
import { billingFeatureRoutes } from './features/billing.routes';
import { spaceFeatureRoutes } from './features/space.routes';
import { userFeatureRoutes } from './features/user.routes';

export const docsRoutes = [
  {
    path: '/docs',
    element: <IntroductionPage />,
  },
  {
    path: '/docs/introduction',
    element: <IntroductionPage />,
  },
  {
    path: '/docs/installation',
    element: <InstallationPage />,
  },
  {
    path: '/docs/quickstart',
    element: <QuickstartPage />,
  },
  ...companyFeatureRoutes,
  ...billingFeatureRoutes,
  ...spaceFeatureRoutes,
  ...userFeatureRoutes,
];