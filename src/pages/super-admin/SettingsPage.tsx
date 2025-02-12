import React from 'react';
import { Button } from '../../components/Button';
import { Settings, Mail, Bell, Shield, Database, Globe } from 'lucide-react';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  items: {
    id: string;
    label: string;
    description: string;
    type: 'toggle' | 'input' | 'select';
    value: any;
    options?: { label: string; value: any }[];
  }[];
}

export function SettingsPage() {
  const settingSections: SettingSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      description: 'Configure basic system settings and defaults',
      icon: Settings,
      items: [
        {
          id: 'system_name',
          label: 'System Name',
          description: 'The name of your system as it appears to users',
          type: 'input',
          value: 'YUVI Platform'
        },
        {
          id: 'default_timezone',
          label: 'Default Timezone',
          description: 'System-wide default timezone for new accounts',
          type: 'select',
          value: 'UTC',
          options: [
            { label: 'UTC', value: 'UTC' },
            { label: 'EST (UTC-5)', value: 'America/New_York' },
            { label: 'PST (UTC-8)', value: 'America/Los_Angeles' }
          ]
        }
      ]
    },
    {
      id: 'email',
      title: 'Email Settings',
      description: 'Configure email notifications and templates',
      icon: Mail,
      items: [
        {
          id: 'email_notifications',
          label: 'Email Notifications',
          description: 'Enable or disable system-wide email notifications',
          type: 'toggle',
          value: true
        },
        {
          id: 'sender_email',
          label: 'Sender Email',
          description: 'Default email address for system notifications',
          type: 'input',
          value: 'notifications@yuvi.com'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notification Settings',
      description: 'Configure in-app notifications and alerts',
      icon: Bell,
      items: [
        {
          id: 'push_notifications',
          label: 'Push Notifications',
          description: 'Enable or disable system-wide push notifications',
          type: 'toggle',
          value: true
        },
        {
          id: 'notification_retention',
          label: 'Retention Period',
          description: 'How long to keep notification history',
          type: 'select',
          value: '30',
          options: [
            { label: '7 days', value: '7' },
            { label: '30 days', value: '30' },
            { label: '90 days', value: '90' }
          ]
        }
      ]
    },
    {
      id: 'security',
      title: 'Security Settings',
      description: 'Configure system-wide security policies',
      icon: Shield,
      items: [
        {
          id: 'require_mfa',
          label: 'Require MFA',
          description: 'Require multi-factor authentication for all users',
          type: 'toggle',
          value: true
        },
        {
          id: 'session_timeout',
          label: 'Session Timeout',
          description: 'Automatically log out users after inactivity',
          type: 'select',
          value: '30',
          options: [
            { label: '15 minutes', value: '15' },
            { label: '30 minutes', value: '30' },
            { label: '1 hour', value: '60' }
          ]
        }
      ]
    },
    {
      id: 'database',
      title: 'Database Settings',
      description: 'Configure database and backup settings',
      icon: Database,
      items: [
        {
          id: 'auto_backup',
          label: 'Automatic Backups',
          description: 'Enable automatic database backups',
          type: 'toggle',
          value: true
        },
        {
          id: 'backup_frequency',
          label: 'Backup Frequency',
          description: 'How often to create database backups',
          type: 'select',
          value: 'daily',
          options: [
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' }
          ]
        }
      ]
    },
    {
      id: 'localization',
      title: 'Localization',
      description: 'Configure language and regional settings',
      icon: Globe,
      items: [
        {
          id: 'default_language',
          label: 'Default Language',
          description: 'System-wide default language',
          type: 'select',
          value: 'en',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' }
          ]
        },
        {
          id: 'date_format',
          label: 'Date Format',
          description: 'Default date format for the system',
          type: 'select',
          value: 'MM/DD/YYYY',
          options: [
            { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
            { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
            { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
          ]
        }
      ]
    }
  ];

  const handleSave = () => {
    console.log('Saving settings...');
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Configure system-wide settings and preferences
            </p>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <div className="space-y-6">
        {settingSections.map((section) => (
          <div 
            key={section.id}
            className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-6"
          >
            <div className="flex items-start gap-3 mb-6">
              <div className="flex-shrink-0">
                <section.icon className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                <p className="mt-1 text-sm text-gray-500">{section.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900">
                    {item.label}
                  </label>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  
                  {item.type === 'toggle' && (
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200"
                         role="switch"
                         aria-checked={item.value}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          item.value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  )}

                  {item.type === 'input' && (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => console.log(e.target.value)}
                      className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  )}

                  {item.type === 'select' && (
                    <select
                      value={item.value}
                      onChange={(e) => console.log(e.target.value)}
                      className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      {item.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}