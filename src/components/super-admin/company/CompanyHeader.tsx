import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../../Button'

interface CompanyHeaderProps {
  onCreateClick: () => void
}

export function CompanyHeader({
  onCreateClick
}: CompanyHeaderProps) {

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and monitor all companies in the system
        </p>
      </div>
      <div>
        <Button onClick={onCreateClick}>
          <Plus className="w-4 h-4 mr-1" />
          Add Company
        </Button>
      </div>
    </div>
  )
}