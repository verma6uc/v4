import React from 'react';
import { Outlet } from 'react-router-dom';
import { SuperAdminHeader } from '../components/layout/SuperAdminHeader';
import { SuperAdminSidebar } from '../components/layout/SuperAdminSidebar';

export function SuperAdminLayout() {
  return (
    <div className="min-h-screen bg-grid-pattern">
      <SuperAdminHeader />
      <SuperAdminSidebar />
      
      <main className="pl-64 pt-16">
        <div style={{ maxWidth: 'calc(97vw - 16rem)' }} className="mx-auto py-6 px-4">
          <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}