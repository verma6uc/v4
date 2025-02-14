import React from 'react'
import { Bell, ChevronDown, Settings, LogOut, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'New Feature',
    message: 'Check out our new analytics dashboard',
    time: '5m ago',
    read: false
  },
  {
    id: 2,
    title: 'System Update',
    message: 'Successfully deployed v2.1.0',
    time: '1h ago',
    read: false
  },
  {
    id: 3,
    title: 'Welcome!',
    message: 'Welcome to our platform',
    time: '2h ago',
    read: true
  }
]

export function UserMenu() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [notificationsOpen, setNotificationsOpen] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const notificationRef = React.useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length
  const userInitials = user?.user_metadata?.first_name?.[0] + user?.user_metadata?.last_name?.[0] || '??'

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* Notifications */}
      <div className="relative" ref={notificationRef}>
        <button
          className="p-2 hover:bg-gray-100 rounded-lg relative"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {notificationsOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 pr-3"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            {userInitials}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <div className="py-2">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button 
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}