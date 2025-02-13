import { Company, CompanyStatus } from '../../../types/schema'

export const demoCompanies: Company[] = [
  // DRAFT Companies
  {
    id: '1',
    name: 'New Startup Draft',
    identifier: 'new-startup-draft',
    status: CompanyStatus.DRAFT,
    primaryEmail: 'setup@newstartup.com',
    website: 'https://newstartup.com',
    addressCity: 'Austin',
    addressState: 'TX',
    addressCountry: 'USA',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Tech Draft Co',
    identifier: 'tech-draft',
    status: CompanyStatus.DRAFT,
    primaryEmail: 'setup@techdraft.com',
    addressCity: 'Seattle',
    addressState: 'WA',
    addressCountry: 'USA',
    createdAt: new Date().toISOString()
  },

  // ACTIVE Companies
  {
    id: '3',
    name: 'Acme Corp',
    identifier: 'acme',
    status: CompanyStatus.ACTIVE,
    primaryEmail: 'contact@acme.com',
    primaryPhone: '+1 (555) 123-4567',
    website: 'https://acme.com',
    addressStreet: '123 Main St',
    addressCity: 'San Francisco',
    addressState: 'CA',
    addressCountry: 'USA',
    addressPostalCode: '94105',
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'TechStart Inc',
    identifier: 'techstart',
    status: CompanyStatus.ACTIVE,
    primaryEmail: 'hello@techstart.io',
    primaryPhone: '+1 (555) 987-6543',
    website: 'https://techstart.io',
    addressCity: 'New York',
    addressState: 'NY',
    addressCountry: 'USA',
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString()
  },

  // SUSPENDED Companies
  {
    id: '5',
    name: 'Global Systems',
    identifier: 'globalsys',
    status: CompanyStatus.SUSPENDED,
    primaryEmail: 'info@globalsys.com',
    website: 'https://globalsys.com',
    addressCity: 'London',
    addressCountry: 'UK',
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString(),
    suspendedAt: new Date().toISOString(),
    suspendedReason: 'Payment overdue'
  },
  {
    id: '6',
    name: 'Suspended Tech',
    identifier: 'suspended-tech',
    status: CompanyStatus.SUSPENDED,
    primaryEmail: 'info@suspended.tech',
    addressCity: 'Toronto',
    addressCountry: 'Canada',
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString(),
    suspendedAt: new Date().toISOString(),
    suspendedReason: 'Security violation'
  },

  // ARCHIVED Companies
  {
    id: '7',
    name: 'Archived Solutions',
    identifier: 'archived-solutions',
    status: CompanyStatus.ARCHIVED,
    primaryEmail: 'contact@archived.com',
    website: 'https://archived.com',
    addressCity: 'Berlin',
    addressCountry: 'Germany',
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString(),
    archivedAt: new Date().toISOString(),
    archivedReason: 'Company request'
  },
  {
    id: '8',
    name: 'Legacy Corp',
    identifier: 'legacy-corp',
    status: CompanyStatus.ARCHIVED,
    primaryEmail: 'contact@legacy.com',
    addressCity: 'Paris',
    addressCountry: 'France',
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString(),
    archivedAt: new Date().toISOString(),
    archivedReason: 'Business closure'
  },

  // DELETED Companies
  {
    id: '9',
    name: 'Deleted Corp',
    identifier: 'deleted-corp',
    status: CompanyStatus.DELETED,
    primaryEmail: 'former@deleted.com',
    addressCity: 'Chicago',
    addressState: 'IL',
    addressCountry: 'USA',
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString(),
    archivedAt: new Date().toISOString(),
    archivedReason: 'Company closure',
    deletedAt: new Date().toISOString(),
    deletedReason: 'Company requested permanent deletion'
  },
  {
    id: '10',
    name: 'Removed Systems',
    identifier: 'removed-systems',
    status: CompanyStatus.DELETED,
    primaryEmail: 'former@removed.com',
    addressCity: 'Miami',
    addressState: 'FL',
    addressCountry: 'USA',
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString(),
    archivedAt: new Date().toISOString(),
    archivedReason: 'Regulatory compliance',
    deletedAt: new Date().toISOString(),
    deletedReason: 'Regulatory requirements'
  }
]