import React from 'react'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'

interface ShowcaseLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function ShowcaseLayout({ children, title, description }: ShowcaseLayoutProps) {
  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      <Sidebar />
      
      <main className="pl-48 pt-16">
        <div style={{ maxWidth: 'calc(97vw - 12rem)' }} className="mx-auto py-6 px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            <p className="mt-1 text-gray-500">{description}</p>
          </div>

          {children}
        </div>
      </main>
    </div>
  )
}