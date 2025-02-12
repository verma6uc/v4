import React from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search, Download } from 'lucide-react'

interface AdvancedTableProps {
  title: string
  description?: string
}

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  lastActive: string
}

const mockData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2 hours ago' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', lastActive: '1 day ago' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Active', lastActive: '5 minutes ago' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active', lastActive: '1 hour ago' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Inactive', lastActive: '3 days ago' },
  { id: 6, name: 'Eva Davis', email: 'eva@example.com', role: 'Admin', status: 'Active', lastActive: '30 minutes ago' },
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastActive', label: 'Last Active', sortable: true }
]

export function AdvancedTable({ title, description }: AdvancedTableProps) {
  const [sortField, setSortField] = React.useState<keyof User>('name')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchValue, setSearchValue] = React.useState('')
  const itemsPerPage = 5

  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setCurrentPage(1)
  }

  const exportData = () => {
    const csvContent = [
      columns.map(col => col.label),
      ...filteredData.map(row => 
        columns.map(col => row[col.key as keyof User])
      )
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'table-data.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredData = mockData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1
    }
    return a[sortField] < b[sortField] ? 1 : -1
  })

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <button
          onClick={exportData}
          className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-600"
                >
                  <button
                    className="flex items-center gap-1 hover:text-gray-900"
                    onClick={() => column.sortable && handleSort(column.key as keyof User)}
                  >
                    {column.label}
                    {sortField === column.key && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-white/50">
                <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${item.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} entries
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
    </div>
  )
}