import React from 'react'
import { BaseCard } from '../../base/BaseCard'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Monitor, X } from 'lucide-react'

export type SessionStatus = 'ACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'EXPIRED'

interface UserSession {
  id: string
  userId: string
  userEmail: string
  ipAddress: string
  userAgent: string
  status: SessionStatus
  createdAt: string
  expiresAt: string
}

interface SessionManagementCardProps {
  sessions: UserSession[]
  title?: string
  onTerminateSession?: (session: UserSession) => void
  onTerminateAll?: () => void
}

const statusConfig: Record<SessionStatus, { variant: 'success' | 'warning' | 'error' | 'default' }> = {
  ACTIVE: { variant: 'success' },
  SUSPENDED: { variant: 'warning' },
  TERMINATED: { variant: 'error' },
  EXPIRED: { variant: 'default' }
}

export function SessionManagementCard({
  sessions,
  title = 'Active Sessions',
  onTerminateSession,
  onTerminateAll
}: SessionManagementCardProps) {
  const activeSessions = sessions.filter(s => s.status === 'ACTIVE')

  return (
    <BaseCard>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeSessions.length} active sessions
          </p>
        </div>
        {onTerminateAll && activeSessions.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onTerminateAll}
          >
            Terminate All
          </Button>
        )}
      </div>

      <div className="divide-y">
        {sessions.map(session => (
          <div key={session.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {session.userEmail}
                      </span>
                      <Badge variant={statusConfig[session.status].variant} size="sm">
                        {session.status.toLowerCase()}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {session.ipAddress} • {session.userAgent}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                  <span>Created: {new Date(session.createdAt).toLocaleString()}</span>
                  <span>Expires: {new Date(session.expiresAt).toLocaleString()}</span>
                </div>
              </div>

              {session.status === 'ACTIVE' && onTerminateSession && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTerminateSession(session)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  )
}