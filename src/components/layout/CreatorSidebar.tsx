import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Code2,
  Box,
  Layers,
  Settings,
  FileCode,
  Database,
  Activity,
  Users2
} from 'lucide-react';

const menuItems = [
  {
    section: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/creator/dashboard' },
      { icon: Code2, label: 'Applications', path: '/creator/applications' },
      { icon: Box, label: 'Resources', path: '/creator/resources' }
    ]
  },
  {
    section: 'Development',
    items: [
      { icon: FileCode, label: 'Content', path: '/creator/content' },
      { icon: Layers, label: 'Assets', path: '/creator/assets' },
      { icon: Database, label: 'Data', path: '/creator/data' }
    ]
  },
  {
    section: 'Management',
    items: [
      { icon: Settings, label: 'Environment', path: '/creator/environment' },
      { icon: Activity, label: 'Monitoring', path: '/creator/monitoring' },
      { icon: Users2, label: 'Collaboration', path: '/creator/collaboration' }
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