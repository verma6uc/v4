import React from 'react';
import { Outlet } from 'react-router-dom';
import { SuperAdminHeader } from '../components/layout/SuperAdminHeader';
import { SuperAdminSidebar } from '../components/layout/SuperAdminSidebar';

export function SuperAdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminHeader />
      <SuperAdminSidebar />
      
      <main className="pl-64 pt-16">
        <div className="max-w-7xl mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}