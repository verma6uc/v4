import React from 'react'

interface BaseCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function BaseCard({ children, className = '', onClick }: BaseCardProps) {
  return (
    <div 
      className={`
        backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-white/70 
        rounded-xl shadow-lg border border-white/30
        hover:from-white/95 hover:via-white/85 hover:to-white/75
        transition-all duration-300 ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}