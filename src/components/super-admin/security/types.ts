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