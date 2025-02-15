import React from 'react';
import { Outlet } from 'react-router-dom';
import { CreatorHeader } from '../components/layout/CreatorHeader';
import { CreatorSidebar } from '../components/layout/CreatorSidebar';

export function CreatorLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-blue-200">
      <CreatorHeader />
      <CreatorSidebar />
      
      <main className="pl-64 pt-16">
        <div style={{ maxWidth: 'calc(97vw - 16rem)' }} className="mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
