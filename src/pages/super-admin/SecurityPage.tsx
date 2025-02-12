import React from 'react';
import { AdvancedTable, Column } from '../../components/AdvancedTable';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { MetricCard } from '../../components/MetricCard';
import { Tabs } from '../../components/Tabs';
import { Accordion } from '../../components/Accordion';
import { 
  Shield, 
  Lock, 
  UserCheck, 
  AlertTriangle,
  Key,
  UserCog,
  Network,
  History
} from 'lucide-react';

type SecurityEvent = {
  id: string;
  type: 'login_attempt' | 'password_change' | 'mfa_enabled' | 'api_key_created' | 'permission_change';
  status: 'success' | 'failed' | 'blocked';
  user: string;
  location: string;
  device: string;
  timestamp: string;
  ip: string;
};

type StatusColor = {
  success: 'success';
  failed: 'warning';
  blocked: 'error';
};

export function SecurityPage() {
  const securityEvents: SecurityEvent[] = [
    {
      id: 'SEC-001',
      type: 'login_attempt',
      status: 'blocked',
      user: 'john@acme.com',
      location: 'New York, US',
      device: 'Chrome / macOS',
      timestamp: '2024-02-12T14:23:45',
      ip: '192.168.1.100'
    },
    {
      id: 'SEC-002',
      type: 'password_change',
      status: 'success',
      user: 'admin@system.com',
      location: 'London, UK',
      device: 'Firefox / Windows',
      timestamp: '2024-02-12T14:20:30',
      ip: '192.168.1.101'
    },
    {
      id: 'SEC-003',
      type: 'mfa_enabled',
      status: 'success',
      user: 'jane@techstart.io',
      location: 'San Francisco, US',
      device: 'Safari / iOS',
      timestamp: '2024-02-12T14:15:00',
      ip: '192.168.1.102'
    },
    {
      id: 'SEC-004',
      type: 'login_attempt',
      status: 'failed',
      user: 'unknown',
      location: 'Beijing, CN',
      device: 'Unknown',
      timestamp: '2024-02-12T14:10:15',
      ip: '192.168.1.103'
    }
  ];

  const statusColors: StatusColor = {
    success: 'success',
    failed: 'warning',
    blocked: 'error'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatEventType = (type: SecurityEvent['type']) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const columns: Column<SecurityEvent>[] = [
    {
      key: 'timestamp',
      label: 'Time',
      sortable: true,
      cell: (item) => formatDate(item.timestamp)
    },
    {
      key: 'type',
      label: 'Event Type',
      sortable: true,
      cell: (item) => (
        <div className="font-medium">{formatEventType(item.type)}</div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      cell: (item) => (
        <Badge 
          variant={statusColors[item.status]}
          dot
        >
          {item.status}
        </Badge>
      )
    },
    {
      key: 'user',
      label: 'User',
      sortable: true
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true
    },
    {
      key: 'device',
      label: 'Device / Browser',
      sortable: true
    },
    {
      key: 'ip',
      label: 'IP Address',
      sortable: true
    }
  ];

  const securityPolicies = [
    {
      id: 'password',
      title: 'Password Policy',
      icon: Lock,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Minimum Requirements:</h4>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>At least 8 characters long</li>
              <li>Must contain uppercase and lowercase letters</li>
              <li>Must contain at least one number</li>
              <li>Must contain at least one special character</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Additional Settings:</h4>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Password expires every 90 days</li>
              <li>Cannot reuse last 5 passwords</li>
              <li>Account locks after 5 failed attempts</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'mfa',
      title: 'Multi-Factor Authentication',
      icon: UserCheck,
      content: (
        <div className="space-y-4">
          <p>MFA is required for all users. Supported methods:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Authenticator apps (Google Authenticator, Microsoft Authenticator)</li>
            <li>SMS verification</li>
            <li>Email verification</li>
            <li>Security keys (YubiKey)</li>
          </ul>
        </div>
      )
    },
    {
      id: 'api',
      title: 'API Security',
      icon: Key,
      content: (
        <div className="space-y-4">
          <p>API access is secured through:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>JWT-based authentication</li>
            <li>Rate limiting: 1000 requests per minute</li>
            <li>IP whitelisting available</li>
            <li>Automatic key rotation every 30 days</li>
          </ul>
        </div>
      )
    }
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Security Score"
              value="85%"
              change={5}
              icon={Shield}
              status="success"
            />
            <MetricCard
              title="Active Sessions"
              value="156"
              change={-3}
              icon={UserCheck}
              status="info"
            />
            <MetricCard
              title="Failed Attempts"
              value="23"
              change={12}
              icon={AlertTriangle}
              status="warning"
            />
            <MetricCard
              title="MFA Enabled"
              value="92%"
              change={8}
              icon={Lock}
              status="success"
            />
          </div>

          <Accordion
            items={securityPolicies}
            variant="bordered"
            className="mt-6"
          />
        </div>
      )
    },
    {
      id: 'events',
      label: 'Security Events',
      icon: History,
      content: (
        <AdvancedTable<SecurityEvent>
          items={securityEvents}
          columns={columns}
          itemsPerPage={10}
          enableSearch
          enableExport
        />
      )
    },
    {
      id: 'access',
      label: 'Access Control',
      icon: UserCog,
      content: (
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Role-Based Access Control</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Access control is managed through a hierarchical role system:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Super Admin: Full system access</li>
                <li>Company Admin: Company-wide access</li>
                <li>Space Admin: Space-level access</li>
                <li>User: Basic access</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'network',
      label: 'Network',
      icon: Network,
      content: (
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Network Security</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Network security measures in place:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>SSL/TLS encryption for all traffic</li>
                <li>DDoS protection</li>
                <li>Web Application Firewall (WAF)</li>
                <li>Regular security scans</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Security</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor security events and manage system security settings
            </p>
          </div>
          <Button>Security Settings</Button>
        </div>
      </div>

      <Tabs 
        tabs={tabs}
        variant="pills"
        className="mt-6"
      />
    </>
  );
}