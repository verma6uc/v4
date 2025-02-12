import React from 'react'
import { LucideIcon } from 'lucide-react'

interface FormInputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'search' | 'url' | 
         'number' | 'date' | 'time' | 'datetime-local' | 'month' | 
         'file' | 'color' | 'range'
  placeholder?: string
  icon?: LucideIcon
  name: string
  id?: string
  required?: boolean
  autoComplete?: string
  min?: string | number
  max?: string | number
  disabled?: boolean
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function FormInput({ 
  label, 
  type = 'text', 
  placeholder, 
  icon: Icon,
  name,
  id,
  required = false,
  autoComplete,
  min,
  max,
  disabled = false,
  value,
  onChange,
  onFocus,
  onBlur
}: FormInputProps) {
  const uniqueId = id || `${name}-${Math.random().toString(36).substr(2, 9)}`
  const isRangeOrColor = type === 'range' || type === 'color'
  const showIcon = Icon && !isRangeOrColor

  return (
    <div>
      <label 
        htmlFor={uniqueId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative group">
        {showIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 
            transition-colors duration-200 group-hover:text-gray-900
            text-gray-700 pointer-events-none">
            <Icon 
              className="w-[18px] h-[18px]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </div>
        )}
        <input
          type={type}
          id={uniqueId}
          name={name}
          required={required}
          autoComplete={autoComplete}
          min={min}
          max={max}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`
            w-full rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            bg-white
            transition-all duration-200
            hover:bg-white hover:border-gray-400
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
            text-gray-900 placeholder-gray-400
            ${showIcon ? 'pl-11' : 'pl-4'} pr-4 py-2.5
            ${type === 'color' ? 'h-11 p-1' : ''}
            ${type === 'range' ? 'h-11' : ''}
          `}
          placeholder={placeholder}
          aria-label={label}
        />
      </div>
    </div>
  )
}