import React from 'react'
import { SimpleTable } from '../components/SimpleTable'
import { AdvancedTable } from '../components/AdvancedTable'
import { ComplexTable } from '../components/ComplexTable'

export function TablesPage() {
  return (
    <div className="space-y-8">
      {/* Simple Table */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Simple Table</h3>
        <SimpleTable 
          title="Basic Users Table" 
          description="A simple table with basic sorting functionality."
        />
      </div>

      {/* Advanced Table */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Table</h3>
        <AdvancedTable 
          title="Users with Search & Export" 
          description="Enhanced table with search, pagination, and export capabilities."
        />
      </div>

      {/* Complex Table */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Complex Table</h3>
        <ComplexTable 
          title="Full-Featured Users Table" 
          description="Complete table solution with advanced filtering, column management, bulk actions, and more."
        />
      </div>
    </div>
  )
}