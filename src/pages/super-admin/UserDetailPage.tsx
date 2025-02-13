import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  User, 
  UserStatus 
} from '../../types/schema'
import {
  Clock,
  AlertTriangle,
  Archive,
  Shield,
  Key
} from 'lucide-react'
import { Button } from '../../components/Button'
import { Badge } from '../../components/Badge'
import { Tabs } from '../../components/Tabs'
import { Toast, ToastContainer, useToasts } from '../../components/Toast'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'

// Mock data for super admin user
const mockUser: User = {
  id: '1',
  email: 'admin@platform.com',
  firstName: 'John',
  lastName: 'Doe',
  status: UserStatus.ACTIVE,
  phone: '+1 (555) 123-4567',
  profilePictureUrl: 'https://ui-avatars.com/api/?name=John+Doe',
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  activatedAt: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000).toISOString(),
  lastLoginAt: new Date(Date.now() - 2 * 60 * 1000).toISOString()
}

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = React.useState<User | null>(mockUser)
  const [activeTab, setActiveTab] = React.useState('overview')
  const [confirmDialog, setConfirmDialog] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => void;
    variant: 'warning' | 'danger';
  } | null>(null)
  const { toasts, addToast, removeToast } = useToasts()

  const handleArchive = async () => {
    try {
      // TODO: API call to archive user
      console.log('Archive user:', user?.id)
      setUser(prev => prev ? {
        ...prev,
        status: UserStatus.ARCHIVED,
        archivedAt: new Date().toISOString()
      } : null)
      setConfirmDialog(null)
      addToast('success', 'User archived successfully')
    } catch (error) {
      console.error('Error archiving user:', error)
      addToast('error', 'Failed to archive user. Please try again.')
    }
  }

  const confirmArchive = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Archive Platform Admin',
      message: 'Are you sure you want to archive this platform administrator? This action cannot be undone.',
      action: handleArchive,
      variant: 'danger'
    })
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">User not found</div>
      </div>
    )
  }

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <div className={`
            backdrop-blur-xl 
            bg-gradient-to-br from-white/90 via-white/80 to-white/70 
            rounded-xl shadow-lg border border-white/30 
            hover:from-white/95 hover:via-white/85 hover:to-white/75
            transition-all duration-300
            p-6
          `}>
            <div className="flex items-start gap-6">
              <img
                src={user.profilePictureUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20 rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h2>
                  <Badge variant="primary" dot>
                    Platform Admin
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
                {user.phone && (
                  <div className="text-sm text-gray-500 mt-1">{user.phone}</div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`
              backdrop-blur-xl 
              bg-gradient-to-br from-white/90 via-white/80 to-white/70 
              rounded-xl shadow-lg border border-white/30 
              hover:from-white/95 hover:via-white/85 hover:to-white/75
              transition-all duration-300
              p-6
            `}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Access</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Created</div>
                  <div className="text-sm text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {user.activatedAt && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Activated</div>
                    <div className="text-sm text-gray-900">
                      {new Date(user.activatedAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
                {user.lastLoginAt && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Last Login</div>
                    <div className="text-sm text-gray-900">
                      {new Date(user.lastLoginAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
                {user.archivedAt && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Archived</div>
                    <div className="text-sm text-gray-900">
                      {new Date(user.archivedAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={`
              backdrop-blur-xl 
              bg-gradient-to-br from-white/90 via-white/80 to-white/70 
              rounded-xl shadow-lg border border-white/30 
              hover:from-white/95 hover:via-white/85 hover:to-white/75
              transition-all duration-300
              p-6
            `}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Multi-Factor Authentication</div>
                  <Badge variant="primary">Required</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Password Last Changed</div>
                  <div className="text-sm text-gray-900">30 days ago</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Session Timeout</div>
                  <div className="text-sm text-gray-900">60 minutes</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Failed Login Attempts</div>
                  <div className="text-sm text-gray-900">0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'activity',
      label: 'Activity',
      content: (
        <div className={`
          backdrop-blur-xl 
          bg-gradient-to-br from-white/90 via-white/80 to-white/70 
          rounded-xl shadow-lg border border-white/30 
          hover:from-white/95 hover:via-white/85 hover:to-white/75
          transition-all duration-300
          p-6
        `}>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                action: 'Platform login',
                timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
                ip: '192.168.1.1'
              },
              {
                action: 'Changed password',
                timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                ip: '192.168.1.1'
              },
              {
                action: 'MFA configuration updated',
                timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                ip: '192.168.1.1'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </div>
                  <div className="text-xs text-gray-500">
                    IP: {activity.ip}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-6">
              <Link
                to="/super-admin/users"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                ← Back to Users
              </Link>
              <div className="flex items-center space-x-3">
                <h1 className="text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <Badge variant="primary" dot>
                  Platform Admin
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {user.status !== UserStatus.ARCHIVED && (
                <Button 
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={confirmArchive}
                >
                  <Archive className="w-4 h-4 mr-1" />
                  Archive
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs
          tabs={tabs}
          defaultTab={activeTab}
          onChange={(tabId) => setActiveTab(tabId)}
        />
      </div>

      {confirmDialog && (
        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={confirmDialog.action}
          onCancel={() => setConfirmDialog(null)}
          variant={confirmDialog.variant}
        />
      )}

      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
    </div>
  )
}