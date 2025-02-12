import React from 'react';
import { Tabs } from '../components/Tabs';
import { 
  Home,
  Settings,
  Bell,
  User,
  Mail,
  FileText,
  BarChart3,
  Lock
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

export function TabsPage() {
  const sampleTabs: TabItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium">Home Content</h3>
          <p className="mt-2 text-gray-600">This is the home tab content.</p>
        </div>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium">Profile Content</h3>
          <p className="mt-2 text-gray-600">This is the profile tab content.</p>
        </div>
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: {
        text: '5',
        variant: 'error'
      },
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium">Notifications Content</h3>
          <p className="mt-2 text-gray-600">This is the notifications tab content.</p>
        </div>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium">Settings Content</h3>
          <p className="mt-2 text-gray-600">This is the settings tab content.</p>
        </div>
      )
    }
  ];

  const dashboardTabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium">Overview Content</h3>
          <p className="mt-2 text-gray-600">Dashboard overview content.</p>
        </div>
      )
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: Mail,
      badge: {
        text: 'New',
        variant: 'success'
      },
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium">Messages Content</h3>
          <p className="mt-2 text-gray-600">Dashboard messages content.</p>
        </div>
      )
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium">Documents Content</h3>
          <p className="mt-2 text-gray-600">Dashboard documents content.</p>
        </div>
      )
    },
    {
      id: 'security',
      label: 'Security',
      icon: Lock,
      badge: {
        text: '2',
        variant: 'warning'
      },
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium">Security Content</h3>
          <p className="mt-2 text-gray-600">Dashboard security content.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Tabs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Different styles and variants of tabs
          </p>
        </div>

        <div className="space-y-8">
          {/* Default Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Default Tabs</h2>
            <Tabs 
              tabs={sampleTabs}
              variant="default"
            />
          </div>

          {/* Pills Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Pills Tabs</h2>
            <Tabs 
              tabs={dashboardTabs}
              variant="pills"
            />
          </div>

          {/* Underline Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Underline Tabs</h2>
            <Tabs 
              tabs={sampleTabs}
              variant="underline"
            />
          </div>

          {/* Contained Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Contained Tabs</h2>
            <Tabs 
              tabs={dashboardTabs}
              variant="contained"
            />
          </div>

          {/* Full Width Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Full Width Tabs</h2>
            <Tabs 
              tabs={sampleTabs.slice(0, 3)}
              variant="pills"
              fullWidth
            />
          </div>

          {/* Different Sizes */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Different Sizes</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Small</h3>
                <Tabs 
                  tabs={sampleTabs}
                  variant="pills"
                  size="sm"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Medium (Default)</h3>
                <Tabs 
                  tabs={sampleTabs}
                  variant="pills"
                  size="md"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Large</h3>
                <Tabs 
                  tabs={sampleTabs}
                  variant="pills"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}