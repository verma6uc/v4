import React from 'react'
import { LayoutGrid, LayoutList, Building2, Users, Clock, Plus } from 'lucide-react'
import { AdvancedTable, Column } from '../../components/AdvancedTable'
import { Button } from '../../components/Button'
import { MetricCard } from '../../components/MetricCard'
import { CompanyMiniCard } from '../../components/super-admin/company'
import { Company, CompanyStatus } from '../../types/schema'

const demoCompanies: Company[] = [
  {
    id: '1',
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
    id: '2',
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
  {
    id: '3',
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
  }
]

export function CompaniesPage() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid')
  const companies = demoCompanies

  const columns: Column<Company>[] = [
    {
      key: 'name',
      label: 'Company',
      sortable: true,
      cell: (company) => (
        <div>
          <div className="font-medium text-gray-900">{company.name}</div>
          <div className="text-sm text-gray-500">{company.identifier}</div>
        </div>
      )
    },
    {
      key: 'primaryEmail',
      label: 'Email',
      sortable: true
    },
    {
      key: 'website',
      label: 'Website',
      sortable: true,
      cell: (company) => company.website && (
        <a 
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          {company.website.replace(/^https?:\/\//, '')}
        </a>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      cell: (company) => new Date(company.createdAt).toLocaleDateString()
    }
  ]

  const handleActivate = (company: Company) => {
    console.log('Activate company:', company.id)
  }

  const handleSuspend = (company: Company) => {
    console.log('Suspend company:', company.id)
  }

  const handleArchive = (company: Company) => {
    console.log('Archive company:', company.id)
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor all companies in the system
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-1" />
              Add Company
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Total Companies"
            value={companies.length.toString()}
            change={12}
            icon={Building2}
            status="success"
          />
          <MetricCard
            title="Active Companies"
            value={companies.filter(c => c.status === CompanyStatus.ACTIVE).length.toString()}
            change={5}
            icon={Users}
            status="success"
          />
          <MetricCard
            title="Average Activity"
            value="85%"
            change={3}
            icon={Clock}
            status="success"
          />
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map(company => (
            <CompanyMiniCard
              key={company.id}
              company={company}
              userCount={156} // This would come from API
              spaceCount={12} // This would come from API
              onClick={() => console.log('View company:', company.id)}
              onActivate={company.status === CompanyStatus.SUSPENDED ? handleActivate : undefined}
              onSuspend={company.status === CompanyStatus.ACTIVE ? handleSuspend : undefined}
              onArchive={
                (company.status === CompanyStatus.ACTIVE || 
                 company.status === CompanyStatus.SUSPENDED) ? handleArchive : undefined
              }
            />
          ))}
        </div>
      ) : (
        <AdvancedTable<Company>
          items={companies}
          columns={columns}
          itemsPerPage={10}
        />
      )}
    </>
  )
}