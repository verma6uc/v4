import React from 'react'
import { BaseCard } from '../../base/BaseCard'
import { Badge } from '../../Badge'
import { Activity, Globe, Monitor, Clock } from 'lucide-react'

interface ActivityLog {
  id: string
  userId?: string
  userEmail?: string
  sessionId?: string
  timestamp: string
  category: string
  action: string
  label?: string
  value?: number
  duration?: number
  
  // Device info
  deviceType?: string
  deviceOs?: string
  deviceBrowser?: string
  deviceVersion?: string
  
  // Location info
  geoCountry?: string
  geoRegion?: string
  geoCity?: string
  
  // API info
  apiEndpoint?: string
  apiMethod?: string
  apiStatusCode?: number
  apiResponseTime?: number
  
  // Error info
  errorCode?: string
  errorMessage?: string
  errorDetails?: Record<string, any>
  
  // Context
  companyId?: string
  companyName?: string
  spaceId?: string
  spaceName?: string
  applicationId?: string
  applicationName?: string
}

interface ActivityLogCardProps {
  logs: ActivityLog[]
  title?: string
  onViewDetails?: (log: ActivityLog) => void
}

const getDeviceIcon = (deviceType?: string) => {
  switch (deviceType?.toLowerCase()) {
    case 'mobile':
      return '📱'
    case 'tablet':
      return '📱'
    case 'desktop':
      return '💻'
    default:
      return '🖥️'
  }
}

const getStatusBadgeVariant = (statusCode?: number) => {
  if (!statusCode) return 'default'
  if (statusCode < 300) return 'success'
  if (statusCode < 400) return 'warning'
  return 'error'
}

export function ActivityLogCard({
  logs,
  title = 'Activity Logs',
  onViewDetails
}: ActivityLogCardProps) {
  return (
    <BaseCard>
      <h3 className="text-sm font-medium text-gray-900 mb-4">{title}</h3>
      <div className="divide-y">
        {logs.map(log => (
          <div 
            key={log.id} 
            className="py-4 first:pt-0 last:pb-0 hover:bg-gray-50 cursor-pointer"
            onClick={() => onViewDetails?.(log)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-1 rounded bg-blue-50">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {log.userEmail && (
                    <span className="text-sm font-medium text-gray-900">
                      {log.userEmail}
                    </span>
                  )}
                  <Badge variant="primary" size="sm">
                    {log.category}
                  </Badge>
                  <Badge variant="default" size="sm">
                    {log.action}
                  </Badge>
                </div>

                {log.label && (
                  <p className="mt-1 text-sm text-gray-500">
                    {log.label}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(log.timestamp).toLocaleString()}
                  </span>

                  {(log.geoCity || log.geoRegion || log.geoCountry) && (
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {[log.geoCity, log.geoRegion, log.geoCountry]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  )}

                  {(log.deviceType || log.deviceBrowser) && (
                    <span className="flex items-center gap-1">
                      <Monitor className="w-3 h-3" />
                      {getDeviceIcon(log.deviceType)}{' '}
                      {[log.deviceBrowser, log.deviceOs]
                        .filter(Boolean)
                        .join(' • ')}
                    </span>
                  )}

                  {log.apiEndpoint && (
                    <span className="flex items-center gap-1">
                      <Badge 
                        variant={getStatusBadgeVariant(log.apiStatusCode)}
                        size="sm"
                      >
                        {log.apiMethod} {log.apiStatusCode}
                      </Badge>
                      {log.apiEndpoint}
                      {log.apiResponseTime && (
                        <span className="text-gray-400">
                          ({log.apiResponseTime}ms)
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {log.errorMessage && (
                  <div className="mt-2 text-sm text-red-600">
                    {log.errorCode && (
                      <span className="font-medium">{log.errorCode}: </span>
                    )}
                    {log.errorMessage}
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