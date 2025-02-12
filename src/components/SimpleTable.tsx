import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface SimpleTableProps {
  title: string
  description?: string
}

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
}

const mockData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true }
]

export function SimpleTable({ title, description }: SimpleTableProps) {
  const [sortField, setSortField] = React.useState<keyof User>('name')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')

  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = [...mockData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1
    }
    return a[sortField] < b[sortField] ? 1 : -1
  })

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
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
            {sortedData.map((item) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}