import React from 'react'
import { CompanyStatus } from '../../../types/schema'

interface CompanyStatusBadgeProps {
  status: CompanyStatus
}

export function CompanyStatusBadge({ status }: CompanyStatusBadgeProps) {
  const styles = {
    [CompanyStatus.DRAFT]: 'bg-gray-100 text-gray-700',
    [CompanyStatus.ACTIVE]: 'bg-green-100 text-green-700',
    [CompanyStatus.SUSPENDED]: 'bg-yellow-100 text-yellow-700',
    [CompanyStatus.ARCHIVED]: 'bg-red-100 text-red-700',
    [CompanyStatus.DELETED]: 'bg-gray-100 text-gray-700'
  }

  const labels = {
    [CompanyStatus.DRAFT]: 'Draft',
    [CompanyStatus.ACTIVE]: 'Active',
    [CompanyStatus.SUSPENDED]: 'Suspended',
    [CompanyStatus.ARCHIVED]: 'Archived',
    [CompanyStatus.DELETED]: 'Deleted'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}