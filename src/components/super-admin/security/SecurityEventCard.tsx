import React from 'react'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { BaseCard } from '../../base/BaseCard'
import { SecurityEvent, SecurityEventSeverity } from './types'

interface SecurityEventCardProps {
  events: SecurityEvent[]
  title?: string
}

const severityConfig: Record<SecurityEventSeverity, {
  icon: React.ElementType
  color: string
  bgColor: string
}> = {
  critical: {
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  high: {
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  medium: {
    icon: AlertCircle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  low: {
    icon: AlertCircle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  info: {
    icon: Info,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  }
}

export function SecurityEventCard({ events, title = 'Security Events' }: SecurityEventCardProps) {
  return (
    <BaseCard>
      <h3 className="text-sm font-medium text-gray-900 mb-4">{title}</h3>
      <div className="divide-y">
        {events.map(event => {
          const { icon: Icon, color, bgColor } = severityConfig[event.severity]

          return (
            <div key={event.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start">
                <div className={`flex-shrink-0 p-1 rounded ${bgColor}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                  {event.metadata && Object.entries(event.metadata).map(([key, value]) => (
                    value && (
                      <div key={key} className="mt-2 text-xs text-gray-500">
                        <span className="font-medium">{key.replace(/_/g, ' ')}:</span>
                        <span className="ml-1">{value}</span>
                      </div>
                    )
                  ))}
                  <div className="mt-2 text-xs text-gray-500">{event.timestamp}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </BaseCard>
  )
}