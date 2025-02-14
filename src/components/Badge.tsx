import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default'
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'full' | 'lg'
  dot?: boolean
  outline?: boolean
  className?: string
  onClick?: () => void
}

export function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  rounded = 'full',
  dot = false,
  outline = false,
  className = '',
  onClick
}: BadgeProps) {
  const variants = {
    primary: outline 
      ? 'border-blue-200 text-blue-700 bg-blue-50/50' 
      : 'bg-blue-50 text-blue-700',
    success: outline 
      ? 'border-green-200 text-green-700 bg-green-50/50' 
      : 'bg-green-50 text-green-700',
    warning: outline 
      ? 'border-amber-200 text-amber-700 bg-amber-50/50' 
      : 'bg-amber-50 text-amber-700',
    error: outline 
      ? 'border-red-200 text-red-700 bg-red-50/50' 
      : 'bg-red-50 text-red-700',
    info: outline 
      ? 'border-sky-200 text-sky-700 bg-sky-50/50' 
      : 'bg-sky-50 text-sky-700',
    default: outline 
      ? 'border-gray-200 text-gray-700 bg-gray-50/50' 
      : 'bg-gray-50 text-gray-700'
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  }

  const roundedStyles = {
    full: 'rounded-full',
    lg: 'rounded-lg'
  }

  const dotColors = {
    default: 'bg-gray-500',
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-sky-500'
  }

  return (
    <span 
      onClick={onClick}
      className={`
      inline-flex items-center font-medium
      ${sizes[size]}
      ${roundedStyles[rounded]}
      ${variants[variant]}
      ${outline ? 'border' : ''}
      transition-colors duration-200
      ${className}
    `}>
      {dot && (
        <span className={`
          w-1.5 h-1.5 rounded-full mr-1.5
          ${dotColors[variant]}
        `} />
      )}
      {children}
    </span>
  )
}