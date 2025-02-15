import React from 'react';
import { Outlet } from 'react-router-dom';
import { SuperAdminHeader } from '../components/layout/SuperAdminHeader';
import { SuperAdminSidebar } from '../components/layout/SuperAdminSidebar';

export function SuperAdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-blue-200">
      <SuperAdminHeader />
      <SuperAdminSidebar />
      
      <main className="pl-64 pt-16">
        <div style={{ maxWidth: 'calc(97vw - 16rem)' }} className="mx-auto p-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
