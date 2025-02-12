import CompanyProvisioningPage from '../../pages/docs/features/company-provisioning';
import CompanyManagementPage from '../../pages/docs/features/company-management';
import CompanyConfigurationPage from '../../pages/docs/features/company-configuration';
import OrganizationHierarchyPage from '../../pages/docs/features/organization-hierarchy';
import SelfSignupPage from '../../pages/docs/features/self-signup';
import ApplicationCreationPage from '../../pages/docs/features/application-creation';
import CompanyMonitoringPage from '../../pages/docs/features/company-management/monitoring';
import CompanyStatusPage from '../../pages/docs/features/company-management/status';
import CompanySearchViewPage from '../../pages/docs/features/company-management/search-view';

export const companyFeatureRoutes = [
  {
    path: '/docs/features/company-provisioning',
    element: <CompanyProvisioningPage />,
  },
  {
    path: '/docs/features/company-management',
    element: <CompanyManagementPage />,
  },
  {
    path: '/docs/features/company-management/monitoring',
    element: <CompanyMonitoringPage />,
  },
  {
    path: '/docs/features/company-management/status',
    element: <CompanyStatusPage />,
  },
  {
    path: '/docs/features/company-management/search-view',
    element: <CompanySearchViewPage />,
  },
  {
    path: '/docs/features/company-configuration',
    element: <CompanyConfigurationPage />,
  },
  {
    path: '/docs/features/organization-hierarchy',
    element: <OrganizationHierarchyPage />,
  },
  {
    path: '/docs/features/self-signup',
    element: <SelfSignupPage />,
  },
  {
    path: '/docs/features/application-creation',
    element: <ApplicationCreationPage />,
  },
];