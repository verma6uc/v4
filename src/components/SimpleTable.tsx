import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface SimpleTableProps {
  title: string
  description?: string
  columns: Column[]
  data: any[]
}

export function SimpleTable({ title, description, columns, data }: SimpleTableProps) {
  const [sortField, setSortField] = React.useState<string>(columns[0]?.key || '')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1
      }
      return a[sortField] < b[sortField] ? 1 : -1
    })
  }, [data, sortField, sortDirection])

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
                    onClick={() => column.sortable && handleSort(column.key)}
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
            {sortedData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-white/50">
                {columns.map(column => (
                  <td key={column.key} className="px-4 py-3 text-sm text-gray-600">
                    {item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}