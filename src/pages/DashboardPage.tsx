import React from 'react'

export function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-gray-500">Overview of your platform.</p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/20">
        <h3 className="text-lg font-medium text-gray-900">Welcome to your dashboard!</h3>
        <p className="mt-2 text-gray-600">This is where you'll find important metrics and insights.</p>
      </div>
    </div>
  )
}