import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Square,
  Table2,
  FileText,
  BarChart3,
  Tag,
  LayoutDashboard,
  Activity,
  PanelLeftClose,
  LayoutList
} from 'lucide-react';

const menuItems = [
  { path: '/showcase/buttons', label: 'Buttons', icon: Square },
  { path: '/showcase/tables', label: 'Tables', icon: Table2 },
  { path: '/showcase/forms', label: 'Forms', icon: FileText },
  { path: '/showcase/charts', label: 'Charts', icon: BarChart3 },
  { path: '/showcase/badges', label: 'Badges', icon: Tag },
  { path: '/showcase/metric-cards', label: 'Metric Cards', icon: LayoutDashboard },
  { path: '/showcase/modals', label: 'Modals', icon: PanelLeftClose },
  { path: '/showcase/activity', label: 'Activity', icon: Activity },
  { path: '/showcase/tabs', label: 'Tabs', icon: LayoutList }
];

export function ShowcaseLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/70 backdrop-blur-xl border-r border-white/20 pt-16">
        <nav className="p-4">
          <div className="mb-6">
            <Link to="/showcase" className="block">
              <h1 className="text-xl font-semibold text-gray-900">Components</h1>
              <p className="mt-1 text-sm text-gray-500">
                Explore available components
              </p>
            </Link>
          </div>

          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        <Outlet />
      </main>
    </div>
  );
}