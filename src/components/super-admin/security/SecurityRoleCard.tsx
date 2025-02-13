import React from 'react'
import { BaseCard } from '../../base/BaseCard'
import { Badge } from '../../Badge'
import { SecurityRole } from './types'

interface SecurityRoleCardProps {
  roles: SecurityRole[]
  title?: string
}

const typeConfig: Record<SecurityRole['type'], { variant: 'primary' | 'success' | 'info' }> = {
  system: { variant: 'primary' },
  company: { variant: 'success' },
  space: { variant: 'info' }
}

export function SecurityRoleCard({ roles, title = 'Role Information' }: SecurityRoleCardProps) {
  return (
    <BaseCard>
      <h3 className="text-sm font-medium text-gray-900 mb-4">{title}</h3>
      <div className="divide-y">
        {roles.map(role => (
          <div key={role.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900">{role.name}</h4>
                  <Badge variant={typeConfig[role.type].variant} size="sm">
                    {role.type}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-500">{role.description}</p>
                
                {role.permissions.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">
                      Permissions
                    </h5>
                    <div className="space-y-2">
                      {Object.entries(
                        role.permissions.reduce((acc, perm) => {
                          if (!acc[perm.category]) {
                            acc[perm.category] = []
                          }
                          acc[perm.category].push(perm)
                          return acc
                        }, {} as Record<string, SecurityRole['permissions']>)
                      ).map(([category, perms]) => (
                        <div key={category}>
                          <h6 className="text-xs font-medium text-gray-700 mb-1">
                            {category}
                          </h6>
                          <div className="grid grid-cols-2 gap-2">
                            {perms.map(perm => (
                              <div key={perm.id} className="text-xs text-gray-600">
                                {perm.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  )
}