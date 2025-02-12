export const exampleCompany = {
  id: '1',
  name: 'Acme Corporation',
  identifier: 'acme-corp',
  status: 'ACTIVE' as const,
  primaryEmail: 'contact@acme.com',
  primaryPhone: '+1 (555) 123-4567',
  website: 'https://acme.com',
  physicalAddress: {
    city: 'San Francisco',
    country: 'USA'
  },
  userCount: 150,
  spaceCount: 12,
  securitySettings: {
    mfaRequired: true,
    passwordExpiryDays: 90,
    sessionTimeout: 30
  },
  createdAt: '3 months ago',
  logo: 'https://example.com/logo.png'
};