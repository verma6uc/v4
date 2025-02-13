export type SecurityEventSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export interface SecurityEvent {
  id: string
  title: string
  description: string
  severity: SecurityEventSeverity
  timestamp: string
  metadata?: {
    [key: string]: string | undefined
  }
}

export interface SecurityPolicy {
  id: string
  name: string
  description: string
  status: 'enabled' | 'disabled' | 'partial'
}

export interface SecurityPermission {
  id: string
  name: string
  description: string
  category: string
}

export interface SecurityRole {
  id: string
  name: string
  description: string
  type: 'system' | 'company' | 'space'
  permissions: SecurityPermission[]
}

export type PlatformRoleName = 'SUPER_ADMIN' | 'COMPANY_ADMIN' | 'SPACE_ADMIN' | 'USER_MANAGER'
export type PlatformRoleType = 'SYSTEM' | 'COMPANY' | 'SPACE'
export type RoleAssignmentType = 'PLATFORM' | 'APPLICATION'
export type RoleAssignmentStatus = 'ACTIVE' | 'ARCHIVED'
export type SessionStatus = 'ACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'EXPIRED'

export interface RoleAssignment {
  id: string
  userId: string
  roleId: string
  assignedAt: string
  status: RoleAssignmentStatus
  type: RoleAssignmentType
}

export interface PlatformRole {
  id: string
  name: PlatformRoleName
  displayName: string
  description: string
  type: PlatformRoleType
  assignments?: RoleAssignment[]
}

export interface ApplicationRole {
  id: string
  applicationId: string
  name: string
  displayName: string
  description: string
  autoAssignable: boolean
  requiresApproval: boolean
  assignments?: RoleAssignment[]
}

export interface UserSession {
  id: string
  userId: string
  userEmail: string
  ipAddress: string
  userAgent: string
  status: SessionStatus
  createdAt: string
  expiresAt: string
}

export interface FailedLoginAttempt {
  id: string
  userId: string
  userEmail: string
  attemptAt: string
  ipAddress: string
  userAgent: string
  failedReason: string
}

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

export interface AuditLog {
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

export interface ActivityLog {
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