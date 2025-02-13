import React from 'react'
import { Shield, AlertTriangle, Users, Globe } from 'lucide-react'
import { Tabs } from '../../components/Tabs'
import {
  SecurityMetricCard,
  SecurityPolicyCard,
  SecurityEventCard,
  SecurityRoleCard,
  SecurityEventSeverity
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

const demoSecurityRoles = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    type: 'system' as const,
    permissions: [
      {
        id: '1',
        name: 'Manage Users',
        description: 'Create, update, and delete users',
        category: 'User Management'
      },
      {
        id: '2',
        name: 'Manage Roles',
        description: 'Create and assign roles',
        category: 'User Management'
      },
      {
        id: '3',
        name: 'View Audit Logs',
        description: 'Access system audit logs',
        category: 'Security'
      }
    ]
  },
  {
    id: '2',
    name: 'Company Admin',
    description: 'Company-wide access with limited system settings',
    type: 'company' as const,
    permissions: [
      {
        id: '4',
        name: 'Manage Company Users',
        description: 'Manage users within company',
        category: 'User Management'
      },
      {
        id: '5',
        name: 'View Company Logs',
        description: 'Access company audit logs',
        category: 'Security'
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
        <SecurityEventCard events={demoSecurityEvents} />
      )
    },
    {
      id: 'access',
      label: 'Access Control',
      icon: Users,
      content: (
        <SecurityRoleCard roles={demoSecurityRoles} />
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