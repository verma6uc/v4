import React from 'react';
import { Logo } from '../Logo';
import { UserMenu } from '../UserMenu';

export function SuperAdminHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-xl border-b border-white/20 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <Logo />
        <UserMenu />
      </div>
    </header>
  );
}