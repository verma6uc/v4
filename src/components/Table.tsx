import React from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Download, Eye, EyeOff, MoreHorizontal, Trash } from 'lucide-react'
import { TableFilters } from './TableFilters'

interface TableProps {
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
  { id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'Active', lastActive: '1 week ago' },
  { id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active', lastActive: '2 days ago' },
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastActive', label: 'Last Active', sortable: true }
]

export function Table({ title, description }: TableProps) {
  const [sortField, setSortField] = React.useState<keyof User>('name')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [filteredData, setFilteredData] = React.useState(mockData)
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])
  const [visibleColumns, setVisibleColumns] = React.useState(columns.map(col => col.key))
  const [showColumnSelector, setShowColumnSelector] = React.useState(false)
  const itemsPerPage = 5

  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSearch = (searchValue: string) => {
    const filtered = mockData.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    )
    setFilteredData(filtered)
    setCurrentPage(1)
  }

  const handleFilter = (filters: Array<{ field: string; operator: string; value: string }>) => {
    const filtered = mockData.filter(item => {
      return filters.every(filter => {
        const itemValue = item[filter.field as keyof User]?.toString().toLowerCase()
        const filterValue = filter.value.toLowerCase()

        switch (filter.operator) {
          case 'contains':
            return itemValue?.includes(filterValue)
          case 'equals':
            return itemValue === filterValue
          case 'startsWith':
            return itemValue?.startsWith(filterValue)
          case 'endsWith':
            return itemValue?.endsWith(filterValue)
          case 'greaterThan':
            return itemValue > filterValue
          case 'lessThan':
            return itemValue < filterValue
          default:
            return true
        }
      })
    })
    setFilteredData(filtered)
    setCurrentPage(1)
  }

  const handleRowSelect = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedData.map(row => row.id))
    }
  }

  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    )
  }

  const exportData = () => {
    const csvContent = [
      visibleColumns.map(key => columns.find(col => col.key === key)?.label),
      ...filteredData.map(row => 
        visibleColumns.map(key => row[key as keyof User])
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

      <TableFilters onSearch={handleSearch} onFilter={handleFilter} />

      <div className="mt-4 flex items-center justify-between">
        {/* Bulk Actions */}
        <div className="flex items-center gap-2">
          {selectedRows.length > 0 && (
            <>
              <span className="text-sm text-gray-600">{selectedRows.length} selected</span>
              <button className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                <Trash className="w-4 h-4" />
                Delete
              </button>
              <div className="h-4 w-px bg-gray-200" />
            </>
          )}
          <button
            onClick={() => setShowColumnSelector(!showColumnSelector)}
            className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
          >
            <Eye className="w-4 h-4" />
            Columns
          </button>
        </div>

        {/* Export */}
        <button
          onClick={exportData}
          className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Column Selector Dropdown */}
      {showColumnSelector && (
        <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
          {columns.map(column => (
            <label
              key={column.key}
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={visibleColumns.includes(column.key)}
                onChange={() => toggleColumnVisibility(column.key)}
                className="mr-2"
              />
              {column.label}
            </label>
          ))}
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === paginatedData.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              {columns.filter(col => visibleColumns.includes(col.key)).map((column) => (
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
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-white/50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleRowSelect(item.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                {visibleColumns.includes('name') && (
                  <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                )}
                {visibleColumns.includes('email') && (
                  <td className="px-4 py-3 text-sm text-gray-600">{item.email}</td>
                )}
                {visibleColumns.includes('role') && (
                  <td className="px-4 py-3 text-sm text-gray-600">{item.role}</td>
                )}
                {visibleColumns.includes('status') && (
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${item.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'}`}>
                      {item.status}
                    </span>
                  </td>
                )}
                {visibleColumns.includes('lastActive') && (
                  <td className="px-4 py-3 text-sm text-gray-600">{item.lastActive}</td>
                )}
                <td className="px-4 py-3">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
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