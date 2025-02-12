import React from 'react';
import { Logo } from '../Logo';
import { UserMenu } from '../UserMenu';
import { Bell, Search } from 'lucide-react';

export function SuperAdminHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-xl border-b border-white/20 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500 w-64"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}