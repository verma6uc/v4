import React from 'react'
import { BaseCard } from '../../base/BaseCard'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Plus, Settings } from 'lucide-react'
import { PlatformRole, ApplicationRole } from './types'

interface RoleManagementCardProps {
  platformRoles?: PlatformRole[]
  applicationRoles?: ApplicationRole[]
  title?: string
  onAddRole?: () => void
  onEditRole?: (role: PlatformRole | ApplicationRole) => void
  onManageAssignments?: (role: PlatformRole | ApplicationRole) => void
}

const typeConfig: Record<PlatformRole['type'], { variant: 'primary' | 'success' | 'info' }> = {
  SYSTEM: { variant: 'primary' },
  COMPANY: { variant: 'success' },
  SPACE: { variant: 'info' }
}

export function RoleManagementCard({
  platformRoles = [],
  applicationRoles = [],
  title = 'Role Management',
  onAddRole,
  onEditRole,
  onManageAssignments
}: RoleManagementCardProps) {
  return (
    <BaseCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {onAddRole && (
          <Button variant="ghost" size="sm" onClick={onAddRole}>
            <Plus className="w-4 h-4 mr-1" />
            Add Role
          </Button>
        )}
      </div>

      {platformRoles.length > 0 && (
        <>
          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
            Platform Roles
          </h4>
          <div className="divide-y mb-6">
            {platformRoles.map(role => (
              <div key={role.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {role.displayName}
                      </h4>
                      <Badge variant={typeConfig[role.type].variant} size="sm">
                        {role.type.toLowerCase()}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{role.description}</p>
                    
                    {role.assignments && role.assignments.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">
                          {role.assignments.length} active assignments
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {onManageAssignments && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onManageAssignments(role)}
                      >
                        Manage
                      </Button>
                    )}
                    {onEditRole && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditRole(role)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {applicationRoles.length > 0 && (
        <>
          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
            Application Roles
          </h4>
          <div className="divide-y">
            {applicationRoles.map(role => (
              <div key={role.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {role.displayName}
                      </h4>
                      <Badge variant="info" size="sm">
                        application
                      </Badge>
                      {role.autoAssignable && (
                        <Badge variant="success" size="sm">
                          auto-assign
                        </Badge>
                      )}
                      {role.requiresApproval && (
                        <Badge variant="warning" size="sm">
                          approval required
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{role.description}</p>
                    
                    {role.assignments && role.assignments.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">
                          {role.assignments.length} active assignments
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {onManageAssignments && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onManageAssignments(role)}
                      >
                        Manage
                      </Button>
                    )}
                    {onEditRole && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditRole(role)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </BaseCard>
  )
}