import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users,
  CreditCard, 
  ScrollText,
  Shield
} from 'lucide-react';

const menuItems = [
  {
    section: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/super-admin/dashboard' },
      { icon: Building2, label: 'Companies', path: '/super-admin/companies' },
      { icon: Users, label: 'Users', path: '/super-admin/users' }
    ]
  },
  {
    section: 'Management',
    items: [
      { icon: CreditCard, label: 'Billing', path: '/super-admin/billing' }
    ]
  },
  {
    section: 'System',
    items: [
      { icon: Shield, label: 'Security', path: '/super-admin/security' },
      { icon: ScrollText, label: 'Audit Logs', path: '/super-admin/audit' }
    ]
  }
];

export function SuperAdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white/70 backdrop-blur-xl border-r border-white/20 pt-16">
      <nav className="p-4">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
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
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
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