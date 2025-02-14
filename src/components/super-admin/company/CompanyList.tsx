import React from 'react'
import { MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'
import { AdvancedTable, Column } from '../../AdvancedTable'
import { CompanyMiniCard } from './CompanyMiniCard'
import { CompanyStatusBadge } from './CompanyStatusBadge'
import { Button } from '../../Button'
import { Company, CompanyStatus } from '../../../types/schema'

interface CompanyListProps {
  companies: Company[]
  viewMode: 'grid' | 'table'
  searchQuery: string
  onCompanyClick: (company: Company) => void
  onActivate: (company: Company) => void
  onSuspend: (company: Company) => void
  onArchive: (company: Company) => void
  onDelete?: (company: Company) => void
}

export function CompanyList({
  companies,
  viewMode,
  searchQuery,
  onCompanyClick,
  onActivate,
  onSuspend,
  onArchive,
  onDelete
}: CompanyListProps) {
  const [currentPage, setCurrentPage] = React.useState(1)

  const filteredCompanies = React.useMemo(() => {
    if (!searchQuery) return companies
    
    const query = searchQuery.toLowerCase()
    return companies.filter(company => 
      company.name.toLowerCase().includes(query) ||
      company.identifier.toLowerCase().includes(query) ||
      company.primaryEmail?.toLowerCase().includes(query) ||
      company.website?.toLowerCase().includes(query)
    )
  }, [companies, searchQuery])

  const totalPages = Math.ceil(filteredCompanies.length / 8)
  const startIndex = (currentPage - 1) * 8
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + 8)

  const ActionMenu = ({ company }: { company: Company }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const menuRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className="p-1 rounded-lg hover:bg-gray-100"
        >
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
            {company.status === CompanyStatus.DRAFT && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  onActivate(company)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
              >
                Activate
              </button>
            )}

            {company.status === CompanyStatus.SUSPENDED && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  onActivate(company)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
              >
                Activate
              </button>
            )}
            
            {company.status === CompanyStatus.ACTIVE && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  onSuspend(company)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
              >
                Suspend
              </button>
            )}

            {(company.status === CompanyStatus.ACTIVE || 
              company.status === CompanyStatus.SUSPENDED) && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  onArchive(company)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
              >
                Archive
              </button>
            )}

            {company.status === CompanyStatus.ARCHIVED && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  onDelete?.(company)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

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
      sortable: true,
      cell: (company) => (
        <CompanyStatusBadge status={company.status} />
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      cell: (company) => new Date(company.createdAt).toLocaleDateString()
    },
    {
      key: 'actions',
      label: '',
      cell: (company) => <ActionMenu company={company} />
    }
  ]

  const PaginationControls = () => (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Showing {startIndex + 1} to {Math.min(startIndex + 8, filteredCompanies.length)} of {filteredCompanies.length} entries
      </p>
      <div className="flex items-center gap-2">
        <button
          className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )

  if (viewMode === 'grid') {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedCompanies.map(company => (
            <CompanyMiniCard
              key={company.id}
              company={company}
              userCount={156} // This would come from API
              spaceCount={12} // This would come from API
              onClick={() => onCompanyClick(company)}
              onActivate={company.status === CompanyStatus.SUSPENDED || company.status === CompanyStatus.DRAFT ? () => onActivate(company) : undefined}
              onSuspend={company.status === CompanyStatus.ACTIVE ? () => onSuspend(company) : undefined}
              onArchive={
                (company.status === CompanyStatus.ACTIVE || 
                 company.status === CompanyStatus.SUSPENDED) ? () => onArchive(company) : undefined
              }
              onDelete={company.status === CompanyStatus.ARCHIVED ? () => onDelete?.(company) : undefined}
            />
          ))}
        </div>
        <PaginationControls />
      </div>
    )
  }

  return (
    <AdvancedTable<Company>
      items={filteredCompanies}
      columns={columns}
      itemsPerPage={8}
      enableSearch={false}
      exportFilename="companies"
      onRowClick={onCompanyClick}
    />
  )
}