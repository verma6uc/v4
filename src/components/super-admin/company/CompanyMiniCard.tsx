import React from 'react'
import { Building2, Users, Layout } from 'lucide-react'
import { BaseCard } from '../../base/BaseCard'
import { CompanyStatusBadge } from './CompanyStatusBadge'
import { Button } from '../../Button'
import { Company } from '../../../types/schema'

interface CompanyMiniCardProps {
  company: Company
  userCount: number
  spaceCount: number
  onClick?: (company: Company) => void
  onActivate?: (company: Company) => void
  onSuspend?: (company: Company) => void
  onArchive?: (company: Company) => void
}

export function CompanyMiniCard({
  company,
  userCount,
  spaceCount,
  onClick,
  onActivate,
  onSuspend,
  onArchive
}: CompanyMiniCardProps) {
  const handleAction = (
    e: React.MouseEvent,
    action: (company: Company) => void
  ) => {
    e.stopPropagation()
    action(company)
  }

  return (
    <BaseCard 
      className="p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(company)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {company.name}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {company.identifier}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <CompanyStatusBadge status={company.status} />
        </div>

        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>{userCount}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Layout className="w-4 h-4 mr-1" />
            <span>{spaceCount}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end space-x-2">
        {company.status === 'ACTIVE' && onSuspend && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleAction(e, onSuspend)}
          >
            Suspend
          </Button>
        )}
        
        {company.status === 'SUSPENDED' && onActivate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleAction(e, onActivate)}
          >
            Activate
          </Button>
        )}
        
        {(company.status === 'ACTIVE' || company.status === 'SUSPENDED') && 
         onArchive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleAction(e, onArchive)}
          >
            Archive
          </Button>
        )}
      </div>
    </BaseCard>
  )
}