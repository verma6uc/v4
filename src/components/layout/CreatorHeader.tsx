import React from 'react';
import { Logo } from '../Logo';
import { UserMenu } from '../UserMenu';
import { Search } from 'lucide-react';

export function CreatorHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-xl border-b border-indigo-100 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="relative">
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-2 rounded-lg bg-indigo-50/50 border-0 focus:ring-2 focus:ring-indigo-500 w-64 placeholder-indigo-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}