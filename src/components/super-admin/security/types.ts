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