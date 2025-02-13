import React from 'react'
import { BaseCard } from '../../base/BaseCard'
import { Badge } from '../../Badge'
import { SecurityPolicy } from './types'

interface SecurityPolicyCardProps {
  policies: SecurityPolicy[]
  title?: string
}

const statusConfig: Record<SecurityPolicy['status'], { variant: 'success' | 'error' | 'warning' }> = {
  enabled: { variant: 'success' },
  disabled: { variant: 'error' },
  partial: { variant: 'warning' }
}

export function SecurityPolicyCard({ policies, title = 'Security Policies' }: SecurityPolicyCardProps) {
  return (
    <BaseCard>
      <h3 className="text-sm font-medium text-gray-900 mb-4">{title}</h3>
      <div className="divide-y">
        {policies.map(policy => (
          <div key={policy.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{policy.name}</h4>
                <p className="mt-1 text-sm text-gray-500">{policy.description}</p>
              </div>
              <div className="ml-4">
                <Badge variant={statusConfig[policy.status].variant}>
                  {policy.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  )
}