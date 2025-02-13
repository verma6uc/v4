import React from 'react'
import { Badge } from '../../Badge'
import { CompanyStatus } from '../../../types/schema'

interface CompanyStatusBadgeProps {
  status: CompanyStatus
}

export function CompanyStatusBadge({ status }: CompanyStatusBadgeProps) {
  const getStatusVariant = (status: CompanyStatus): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case CompanyStatus.ACTIVE:
        return 'success'
      case CompanyStatus.SUSPENDED:
        return 'warning'
      case CompanyStatus.ARCHIVED:
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Badge variant={getStatusVariant(status)} size="sm">
      {status}
    </Badge>
  )
}