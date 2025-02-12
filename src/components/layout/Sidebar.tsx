import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BarChart3, 
  Table2, 
  FormInput,
  PieChart,
  Gauge,
  Component,
  Settings,
  Tag,
  MousePointer,
  Maximize2,
  Type
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
  { icon: Gauge, label: 'Metric Cards', path: 'metrics' },
  { icon: BarChart3, label: 'Charts', path: 'charts' },
  { icon: FormInput, label: 'Forms', path: 'forms' },
  { icon: Table2, label: 'Tables', path: 'tables' },
  { icon: Type, label: 'Typography', path: 'typography' },
  { icon: Tag, label: 'Badges', path: 'badges' },
  { icon: MousePointer, label: 'Buttons', path: 'buttons' },
  { icon: Maximize2, label: 'Modals', path: 'modals' },
  { icon: Component, label: 'Components', path: 'components' },
  { icon: Settings, label: 'Settings', path: 'settings' },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || 'metrics'

  const handleNavigation = (path: string) => {
    navigate(`/showcase/${path}`)
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 backdrop-blur-xl bg-white/70 border-r border-white/20 pt-16">
      <nav className="p-4">
        <div className="mb-4">
          <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Components
          </h2>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300
                  ${currentPath === item.path
                    ? 'bg-white/80 text-blue-600 shadow-sm border border-white/50' 
                    : 'text-gray-700 hover:bg-white/50'}`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className={`w-5 h-5 ${currentPath === item.path ? 'text-blue-600' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}