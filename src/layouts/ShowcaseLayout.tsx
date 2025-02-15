import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { menuItems } from './showcase.data';
import { ShowcaseHeader } from '../components/layout/ShowcaseHeader';

export function ShowcaseLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-200 to-blue-200">
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
        <ShowcaseHeader />
        <Outlet />
      </main>
    </div>
  );
}
