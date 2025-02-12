export const exampleSpace = {
  id: '1',
  name: 'Engineering',
  identifier: 'eng-dept',
  status: 'ACTIVE' as const,
  spaceType: 'Department',
  parentSpaceName: 'Operations',
  level: 2,
  path: '/operations/engineering',
  adminUsers: [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Carol Williams' },
    { id: '4', name: 'Dave Brown' }
  ],
  applicationCount: 8,
  inheritedSettings: {
    securityPolicies: true,
    accessControl: false,
    dataRetention: true
  },
  createdAt: '6 months ago'
};