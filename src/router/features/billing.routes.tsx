import BillingSubscriptionPage from '../../pages/docs/features/billing-subscription';
import SubscriptionDetailsPage from '../../pages/docs/features/billing-subscription/subscription-details';
import PlanComparisonPage from '../../pages/docs/features/billing-subscription/plan-comparison';
import SubscriptionManagementPage from '../../pages/docs/features/billing-subscription/subscription-management';

export const billingFeatureRoutes = [
  {
    path: '/docs/features/billing-subscription',
    element: <BillingSubscriptionPage />,
  },
  {
    path: '/docs/features/billing-subscription/subscription-details',
    element: <SubscriptionDetailsPage />,
  },
  {
    path: '/docs/features/billing-subscription/plan-comparison',
    element: <PlanComparisonPage />,
  },
  {
    path: '/docs/features/billing-subscription/subscription-management',
    element: <SubscriptionManagementPage />,
  },
];