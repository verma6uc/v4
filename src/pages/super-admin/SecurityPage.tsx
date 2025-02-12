import React from 'react';
import { Tabs } from '../../components/Tabs';
import { 
  Shield,
  AlertTriangle,
  Users,
  Globe
} from 'lucide-react';

type TabBadgeVariant = 'primary' | 'success' | 'warning' | 'error';

interface TabBadge {
  text: string;
  variant: TabBadgeVariant;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  content: React.ReactNode;
  badge?: TabBadge;
}

export function SecurityPage() {
  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Shield,
      content: (
        <div className="p-3">
          <h2 className="text-lg font-medium mb-4">Security Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Security Score */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-900">Security Score</h3>
              <div className="mt-2 flex items-center">
                <div className="text-3xl font-bold text-green-600">85</div>
                <div className="ml-2 text-sm text-gray-500">/100</div>
              </div>
            </div>

            {/* Active Threats */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-900">Active Threats</h3>
              <div className="mt-2 flex items-center text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <span className="ml-2 text-3xl font-bold">2</span>
              </div>
            </div>

            {/* Protected Users */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-900">Protected Users</h3>
              <div className="mt-2 flex items-center text-blue-600">
                <Users className="w-5 h-5" />
                <span className="ml-2 text-3xl font-bold">1,234</span>
              </div>
            </div>
          </div>

          {/* Security Policies */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Security Policies</h3>
            <div className="bg-white rounded-lg shadow-sm divide-y">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="mt-1 text-sm text-gray-500">Require 2FA for all admin accounts</p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Enabled
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Password Policy</h4>
                    <p className="mt-1 text-sm text-gray-500">Minimum 12 characters with special chars</p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Enabled
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                    <p className="mt-1 text-sm text-gray-500">Auto-logout after 30 minutes of inactivity</p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Partial
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <div className="p-3">
          <h2 className="text-lg font-medium mb-4">Security Events</h2>
          <div className="bg-white rounded-lg shadow-sm divide-y">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Multiple Failed Login Attempts</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    10 failed login attempts detected from IP 192.168.1.100
                  </p>
                  <div className="mt-2 text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Unusual Access Pattern</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Unusual access pattern detected for user john.doe@example.com
                  </p>
                  <div className="mt-2 text-xs text-gray-500">5 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'access',
      label: 'Access Control',
      icon: Users,
      content: (
        <div className="p-3">
          <h2 className="text-lg font-medium mb-4">Access Control</h2>
          <div className="bg-white rounded-lg shadow-sm divide-y">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Role Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase">Super Admin</h4>
                  <p className="mt-1 text-sm text-gray-900">Full system access with all permissions</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase">Admin</h4>
                  <p className="mt-1 text-sm text-gray-900">Company-wide access with limited system settings</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase">User</h4>
                  <p className="mt-1 text-sm text-gray-900">Basic access with personal workspace only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'network',
      label: 'Network',
      icon: Globe,
      content: (
        <div className="p-3">
          <h2 className="text-lg font-medium mb-4">Network Security</h2>
          <div className="bg-white rounded-lg shadow-sm divide-y">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Security Measures</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">SSL/TLS Encryption</h4>
                  <p className="mt-1 text-sm text-gray-500">All connections are encrypted with TLS 1.3</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">DDoS Protection</h4>
                  <p className="mt-1 text-sm text-gray-500">Advanced DDoS mitigation is active</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">IP Filtering</h4>
                  <p className="mt-1 text-sm text-gray-500">Whitelist-based IP access control</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

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
  );
}