import React from 'react';
import { Logo } from '../Logo';
import { UserMenu } from '../UserMenu';

export function CreatorHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-xl border-b border-indigo-100 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-8">
          <Logo />
        </div>

        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}