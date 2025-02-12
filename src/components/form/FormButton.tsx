import React from 'react'
import { LucideIcon } from 'lucide-react'

interface FormButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'text'
  fullWidth?: boolean
  icon?: LucideIcon
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export function FormButton({ 
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  icon: Icon,
  onClick,
  disabled = false,
  loading = false
}: FormButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200"
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-500 to-blue-600 
      hover:from-blue-600 hover:to-blue-700 
      text-white shadow-sm hover:shadow
      disabled:from-blue-400 disabled:to-blue-500 disabled:cursor-not-allowed
      py-2 px-4
    `,
    secondary: `
      bg-white/50 backdrop-blur-sm border border-gray-200
      hover:bg-white/60 hover:border-gray-300 
      text-gray-700 hover:text-gray-800
      disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
      py-2 px-4
    `,
    text: `
      text-blue-600 hover:text-blue-700 
      disabled:text-blue-400 disabled:cursor-not-allowed
      py-1 px-2
    `
  }

  const widthClass = fullWidth ? 'w-full' : ''
  const loadingClass = loading ? 'opacity-80 cursor-wait' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${widthClass}
        ${loadingClass}
      `}
    >
      {Icon && <Icon className="w-4 h-4" strokeWidth={2} />}
      {loading ? (
        <span className="inline-flex items-center gap-1">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  )
}