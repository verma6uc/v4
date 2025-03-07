import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Store,
  PlusCircle,
  History,
  Settings
} from 'lucide-react';

const menuItems = [
  {
    section: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/creator/dashboard' },
      { icon: Store, label: 'App Store', path: '/creator/app-store' },
      { icon: PlusCircle, label: 'New Application', path: '/creator/applications/new' }
    ]
  },
  {
    section: 'Management',
    items: [
      { icon: History, label: 'Audit Logs', path: '/creator/applications/audit' },
      { icon: Settings, label: 'Settings', path: '/creator/settings' }
    ]
  }
];

export function CreatorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white/70 backdrop-blur-xl border-r border-indigo-100 pt-16">
      <nav className="p-4">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="px-3 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
              {section.section}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item, itemIdx) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={itemIdx}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-indigo-50/50'
                        }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : ''}`} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}