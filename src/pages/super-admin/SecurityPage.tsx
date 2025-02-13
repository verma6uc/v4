import React from 'react'
import { Shield, AlertTriangle, Users, Globe, Lock } from 'lucide-react'
import { Tabs } from '../../components/Tabs'
import {
  SecurityMetricCard,
  SecurityPolicyCard,
  SecurityEventCard,
  RoleManagementCard,
  SessionManagementCard,
  FailedLoginCard,
  SecurityEventSeverity,
  PlatformRole,
  ApplicationRole,
  UserSession,
  FailedLoginAttempt
} from '../../components/super-admin/security'

const demoSecurityPolicies = [
  {
    id: '1',
    name: 'Two-Factor Authentication',
    description: 'Require 2FA for all admin accounts',
    status: 'enabled' as const
  },
  {
    id: '2',
    name: 'Password Policy',
    description: 'Minimum 12 characters with special chars',
    status: 'enabled' as const
  },
  {
    id: '3',
    name: 'Session Timeout',
    description: 'Auto-logout after 30 minutes of inactivity',
    status: 'partial' as const
  }
]

const demoSecurityEvents = [
  {
    id: '1',
    title: 'Multiple Failed Login Attempts',
    description: '10 failed login attempts detected',
    severity: 'high' as SecurityEventSeverity,
    timestamp: '2 hours ago',
    metadata: {
      ip_address: '192.168.1.100',
      user: 'john.doe@example.com'
    }
  },
  {
    id: '2',
    title: 'Unusual Access Pattern',
    description: 'Unusual access pattern detected',
    severity: 'medium' as SecurityEventSeverity,
    timestamp: '5 hours ago',
    metadata: {
      location: 'Unknown location',
      device: 'New device'
    }
  }
]

const demoSessions: UserSession[] = [
  {
    id: '1',
    userId: 'user1',
    userEmail: 'john.doe@example.com',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0.0.0',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600000).toISOString()
  },
  {
    id: '2',
    userId: 'user2',
    userEmail: 'jane.smith@example.com',
    ipAddress: '192.168.1.101',
    userAgent: 'Firefox/121.0',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600000).toISOString()
  }
]

const demoFailedLogins: FailedLoginAttempt[] = [
  {
    id: '1',
    userId: 'user1',
    userEmail: 'john.doe@example.com',
    attemptAt: new Date().toISOString(),
    ipAddress: '192.168.1.200',
    userAgent: 'Chrome/120.0.0.0',
    failedReason: 'Incorrect password'
  },
  {
    id: '2',
    userId: 'user1',
    userEmail: 'john.doe@example.com',
    attemptAt: new Date(Date.now() - 300000).toISOString(),
    ipAddress: '192.168.1.200',
    userAgent: 'Chrome/120.0.0.0',
    failedReason: 'Incorrect password'
  }
]

const demoPlatformRoles: PlatformRole[] = [
  {
    id: '1',
    name: 'SUPER_ADMIN',
    displayName: 'Super Admin',
    description: 'Full system access with all permissions',
    type: 'SYSTEM',
    assignments: [
      {
        id: '1',
        userId: 'user1',
        roleId: '1',
        assignedAt: '2024-01-01T00:00:00Z',
        status: 'ACTIVE',
        type: 'PLATFORM'
      }
    ]
  },
  {
    id: '2',
    name: 'COMPANY_ADMIN',
    displayName: 'Company Admin',
    description: 'Company-wide access with limited system settings',
    type: 'COMPANY',
    assignments: [
      {
        id: '2',
        userId: 'user2',
        roleId: '2',
        assignedAt: '2024-01-01T00:00:00Z',
        status: 'ACTIVE',
        type: 'PLATFORM'
      }
    ]
  }
]

const demoApplicationRoles: ApplicationRole[] = [
  {
    id: '1',
    applicationId: 'app1',
    name: 'APP_ADMIN',
    displayName: 'Application Admin',
    description: 'Full access to application settings and data',
    autoAssignable: false,
    requiresApproval: true,
    assignments: [
      {
        id: '3',
        userId: 'user3',
        roleId: '3',
        assignedAt: '2024-01-01T00:00:00Z',
        status: 'ACTIVE',
        type: 'APPLICATION'
      }
    ]
  }
]

const networkPolicies = [
  {
    id: '1',
    name: 'SSL/TLS Encryption',
    description: 'All connections are encrypted with TLS 1.3',
    status: 'enabled' as const
  },
  {
    id: '2',
    name: 'DDoS Protection',
    description: 'Advanced DDoS mitigation is active',
    status: 'enabled' as const
  },
  {
    id: '3',
    name: 'IP Filtering',
    description: 'Whitelist-based IP access control',
    status: 'partial' as const
  }
]

export function SecurityPage() {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SecurityMetricCard
              title="Security Score"
              value={85}
              suffix="/100"
              icon={Shield}
              iconColor="text-green-600"
              description="Overall system security rating"
            />
            <SecurityMetricCard
              title="Active Threats"
              value={2}
              icon={AlertTriangle}
              iconColor="text-red-600"
              description="Current security threats"
            />
            <SecurityMetricCard
              title="Protected Users"
              value="1,234"
              icon={Users}
              iconColor="text-blue-600"
              description="Users with active security measures"
            />
          </div>

          <SecurityPolicyCard policies={demoSecurityPolicies} />
        </div>
      )
    },
    {
      id: 'events',
      label: 'Security Events',
      icon: AlertTriangle,
      badge: {
        text: '2',
        variant: 'error' as const
      },
      content: (
        <div className="space-y-6">
          <SecurityEventCard events={demoSecurityEvents} />
          <SessionManagementCard 
            sessions={demoSessions}
            onTerminateSession={(session) => console.log('Terminate session:', session)}
            onTerminateAll={() => console.log('Terminate all sessions')}
          />
          <FailedLoginCard 
            attempts={demoFailedLogins}
            maxAttempts={3}
          />
        </div>
      )
    },
    {
      id: 'roles',
      label: 'Role Management',
      icon: Lock,
      content: (
        <RoleManagementCard
          platformRoles={demoPlatformRoles}
          applicationRoles={demoApplicationRoles}
          onAddRole={() => console.log('Add role')}
          onEditRole={(role) => console.log('Edit role:', role)}
          onManageAssignments={(role) => console.log('Manage assignments:', role)}
        />
      )
    },
    {
      id: 'network',
      label: 'Network',
      icon: Globe,
      content: (
        <div className="space-y-6">
          <SecurityPolicyCard
            title="Network Security Measures"
            policies={networkPolicies}
          />
        </div>
      )
    }
  ]

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Security</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage security settings and monitor security events
        </p>
      </div>

      <Tabs 
        tabs={tabs}
        variant="underline"
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      />
    </>
  )
}