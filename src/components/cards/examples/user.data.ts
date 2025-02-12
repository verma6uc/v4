export const exampleUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  status: 'ACTIVE' as const,
  designation: 'Senior Developer',
  companyName: 'Acme Corp',
  lastLoginAt: '2 hours ago',
  mfaEnabled: true,
  roles: ['Developer', 'Project Lead']
};