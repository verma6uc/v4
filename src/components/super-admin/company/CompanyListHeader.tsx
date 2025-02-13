import React from 'react'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { CompanySearch } from './CompanySearch'

interface CompanyListHeaderProps {
  viewMode: 'grid' | 'table'
  onViewModeChange: (mode: 'grid' | 'table') => void
  searchValue: string
  onSearchChange: (value: string) => void
}

export function CompanyListHeader({
  viewMode,
  onViewModeChange,
  searchValue,
  onSearchChange
}: CompanyListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="w-64">
        <CompanySearch
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>

      <div className="flex items-center bg-gray-100 rounded-lg p-1">
        <button
          className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
          onClick={() => onViewModeChange('grid')}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          className={`p-2 rounded ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
          onClick={() => onViewModeChange('table')}
        >
          <LayoutList className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}