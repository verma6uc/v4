import { Company, CompanyStatus } from '../../../types/schema';

export const exampleCompany: Company = {
  id: '1',
  name: 'Acme Corporation',
  identifier: 'acme-corp',
  status: CompanyStatus.ACTIVE,
  primaryEmail: 'contact@acme.com',
  primaryPhone: '+1 (555) 123-4567',
  website: 'https://acme.com',
  addressStreet: '123 Market Street',
  addressCity: 'San Francisco',
  addressState: 'CA',
  addressCountry: 'USA',
  addressPostalCode: '94105',
  logoUrl: 'https://example.com/logo.png',
  createdAt: '2025-01-15T10:30:00Z',
  activatedAt: '2025-01-15T11:00:00Z'
};