import React from 'react'

interface FormCheckboxProps {
  label: string
  name: string
  id?: string
  checked?: boolean
  disabled?: boolean
  required?: boolean
  error?: string
  onChange?: (checked: boolean) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function FormCheckbox({ 
  label, 
  name,
  id,
  checked = false,
  disabled = false,
  required = false,
  error,
  onChange,
  onFocus,
  onBlur
}: FormCheckboxProps) {
  const uniqueId = id || `${name}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div>
      <label 
        className={`
          relative flex items-start
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          group
        `}
      >
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id={uniqueId}
            name={name}
            checked={checked}
            disabled={disabled}
            required={required}
            onChange={e => onChange?.(e.target.checked)}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`
              w-4 h-4 rounded
              border-2
              text-blue-600
              bg-white
              focus:ring-2 focus:ring-blue-100 focus:ring-offset-1
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              cursor-pointer
              ${error ? 'border-red-300' : checked ? 'border-blue-500' : 'border-gray-300'}
              ${!disabled && !checked && 'group-hover:border-gray-400'}
            `}
          />
        </div>
        <div className="ml-3 text-sm">
          <span className={`
            font-medium
            ${error ? 'text-red-600' : 'text-gray-700'}
            ${disabled ? 'opacity-50' : ''}
            ${checked ? 'text-blue-600' : ''}
          `}>
            {label}
          </span>
        </div>
      </label>
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}