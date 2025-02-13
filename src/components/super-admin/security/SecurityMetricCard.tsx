import React from 'react'
import { LucideIcon } from 'lucide-react'
import { BaseCard } from '../../base/BaseCard'

interface SecurityMetricCardProps {
  title: string
  value: string | number
  suffix?: string
  icon: LucideIcon
  iconColor?: string
  description?: string
}

export function SecurityMetricCard({
  title,
  value,
  suffix,
  icon: Icon,
  iconColor = 'text-blue-600',
  description
}: SecurityMetricCardProps) {
  return (
    <BaseCard>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <div className="text-3xl font-bold">{value}</div>
            {suffix && (
              <div className="ml-2 text-sm text-gray-500">{suffix}</div>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
        <div className={`p-2 rounded-lg bg-gray-50 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </BaseCard>
  )
}