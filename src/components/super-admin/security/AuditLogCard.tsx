import React from 'react'
import { BaseCard } from '../../base/BaseCard'
import { Badge } from '../../Badge'
import { History, User, Building2, Layout, Box } from 'lucide-react'

export type AuditAction = 
  | 'LOGIN' | 'LOGOUT' | 'FAILED_LOGIN' | 'PASSWORD_RESET' | 'PASSWORD_CHANGE'
  | 'CREATE_USER' | 'UPDATE_USER' | 'DELETE_USER' | 'ACTIVATE_USER' | 'SUSPEND_USER' | 'REACTIVATE_USER' | 'ARCHIVE_USER'
  | 'CREATE_APPLICATION' | 'UPDATE_APPLICATION' | 'DELETE_APPLICATION' | 'SUBMIT_APPLICATION' | 'APPROVE_APPLICATION' | 'REJECT_APPLICATION' | 'PUBLISH_APPLICATION' | 'DEPLOY_APPLICATION' | 'REMOVE_APPLICATION'
  | 'CREATE_SPACE' | 'UPDATE_SPACE' | 'DELETE_SPACE' | 'SUSPEND_SPACE' | 'REACTIVATE_SPACE' | 'ARCHIVE_SPACE'
  | 'CREATE_COMPANY' | 'UPDATE_COMPANY' | 'SUSPEND_COMPANY' | 'REACTIVATE_COMPANY' | 'ARCHIVE_COMPANY'
  | 'ASSIGN_ROLE' | 'REVOKE_ROLE' | 'UPDATE_ROLE'
  | 'CONFIGURE_MFA' | 'UPDATE_SECURITY_SETTINGS' | 'CONFIGURE_PASSWORD_POLICY' | 'RESET_PASSWORD'
  | 'GENERATE_INVOICE' | 'PROCESS_PAYMENT' | 'APPLY_CREDIT' | 'UPDATE_SUBSCRIPTION'
  | 'SEND_NOTIFICATION' | 'UPDATE_NOTIFICATION' | 'EXPORT_DATA' | 'IMPORT_DATA'
  | 'UPDATE_CONFIGURATION' | 'SYSTEM_ERROR' | 'OTHER'

export type AuditCategory = 
  | 'AUTH' | 'USER_MANAGEMENT' | 'APPLICATION_MANAGEMENT' | 'SPACE_MANAGEMENT' 
  | 'COMPANY_MANAGEMENT' | 'ROLE_MANAGEMENT' | 'SECURITY' | 'BILLING' 
  | 'NOTIFICATION' | 'CONFIGURATION' | 'DATA_EXPORT' | 'DATA_IMPORT' 
  | 'SYSTEM' | 'OTHER'

interface AuditLog {
  id: string
  actorId: string
  actorEmail: string
  timestamp: string
  action: AuditAction
  category: AuditCategory
  description: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  companyId?: string
  companyName?: string
  spaceId?: string
  spaceName?: string
  applicationId?: string
  applicationName?: string
}

interface AuditLogCardProps {
  logs: AuditLog[]
  title?: string
  onViewDetails?: (log: AuditLog) => void
}

const categoryConfig: Record<AuditCategory, { 
  icon: React.ElementType
  variant: 'primary' | 'success' | 'warning' | 'error' | 'default'
}> = {
  AUTH: { icon: User, variant: 'primary' },
  USER_MANAGEMENT: { icon: User, variant: 'primary' },
  APPLICATION_MANAGEMENT: { icon: Box, variant: 'success' },
  SPACE_MANAGEMENT: { icon: Layout, variant: 'success' },
  COMPANY_MANAGEMENT: { icon: Building2, variant: 'success' },
  ROLE_MANAGEMENT: { icon: User, variant: 'warning' },
  SECURITY: { icon: History, variant: 'error' },
  BILLING: { icon: Building2, variant: 'primary' },
  NOTIFICATION: { icon: History, variant: 'default' },
  CONFIGURATION: { icon: History, variant: 'warning' },
  DATA_EXPORT: { icon: Box, variant: 'default' },
  DATA_IMPORT: { icon: Box, variant: 'default' },
  SYSTEM: { icon: History, variant: 'error' },
  OTHER: { icon: History, variant: 'default' }
}

export function AuditLogCard({ 
  logs, 
  title = 'Audit Logs',
  onViewDetails
}: AuditLogCardProps) {
  return (
    <BaseCard>
      <h3 className="text-sm font-medium text-gray-900 mb-4">{title}</h3>
      <div className="divide-y">
        {logs.map(log => {
          const { icon: Icon, variant } = categoryConfig[log.category]

          return (
            <div 
              key={log.id} 
              className="py-4 first:pt-0 last:pb-0 hover:bg-gray-50 cursor-pointer"
              onClick={() => onViewDetails?.(log)}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 p-1 rounded bg-${variant}-50`}>
                  <Icon className={`w-4 h-4 text-${variant}-600`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {log.actorEmail}
                    </span>
                    <Badge variant={variant} size="sm">
                      {log.category}
                    </Badge>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {log.description}
                  </p>

                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                    {log.companyName && (
                      <>
                        <span>•</span>
                        <span>{log.companyName}</span>
                      </>
                    )}
                    {log.spaceName && (
                      <>
                        <span>•</span>
                        <span>{log.spaceName}</span>
                      </>
                    )}
                    {log.applicationName && (
                      <>
                        <span>•</span>
                        <span>{log.applicationName}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </BaseCard>
  )
}