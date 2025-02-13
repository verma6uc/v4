import React from 'react'

interface BaseCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function BaseCard({ children, className = '', onClick }: BaseCardProps) {
  return (
    <div 
      className={`bg-white p-6 rounded-lg shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}