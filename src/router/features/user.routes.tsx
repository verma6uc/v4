import UserManagementPage from '../../pages/docs/features/user-management';
import DesignationCreationPage from '../../pages/docs/features/user-management/designation-creation';
import UserSearchPage from '../../pages/docs/features/user-management/user-search';
import UserStatePage from '../../pages/docs/features/user-management/user-state';
import AccountManagementPage from '../../pages/docs/features/user-management/account-management';
import RoleAssignmentPage from '../../pages/docs/features/user-management/role-assignment';
import SuggestedRolesPage from '../../pages/docs/features/user-management/suggested-roles';
import UserInvitationPage from '../../pages/docs/features/user-management/user-invitation';

export const userFeatureRoutes = [
  {
    path: '/docs/features/user-management',
    element: <UserManagementPage />,
  },
  {
    path: '/docs/features/user-management/designation-creation',
    element: <DesignationCreationPage />,
  },
  {
    path: '/docs/features/user-management/user-search',
    element: <UserSearchPage />,
  },
  {
    path: '/docs/features/user-management/user-state',
    element: <UserStatePage />,
  },
  {
    path: '/docs/features/user-management/account-management',
    element: <AccountManagementPage />,
  },
  {
    path: '/docs/features/user-management/role-assignment',
    element: <RoleAssignmentPage />,
  },
  {
    path: '/docs/features/user-management/suggested-roles',
    element: <SuggestedRolesPage />,
  },
  {
    path: '/docs/features/user-management/user-invitation',
    element: <UserInvitationPage />,
  },
];