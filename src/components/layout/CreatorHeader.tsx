import React from 'react';
import { Logo } from '../Logo';
import { UserMenu } from '../UserMenu';
import { Bell, Search, Code2 } from 'lucide-react';

export function CreatorHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-xl border-b border-indigo-100 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 rounded-lg bg-indigo-50/50 border-0 focus:ring-2 focus:ring-indigo-500 w-64 placeholder-indigo-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-indigo-50 relative group">
            <Code2 className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700" />
          </button>
          <button className="p-2 rounded-lg hover:bg-indigo-50 relative">
            <Bell className="w-5 h-5 text-indigo-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}