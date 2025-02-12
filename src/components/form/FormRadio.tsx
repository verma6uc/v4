import React from 'react'

interface Option {
  value: string
  label: string
}

interface FormRadioProps {
  label: string
  name: string
  options: Option[]
  value?: string
  required?: boolean
  disabled?: boolean
  error?: string
  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function FormRadio({
  label,
  name,
  options,
  value,
  required = false,
  disabled = false,
  error,
  onChange,
  onFocus,
  onBlur
}: FormRadioProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-y-3">
        {options.map((option) => {
          const uniqueId = `${name}-${option.value}-${Math.random().toString(36).substr(2, 9)}`
          const isChecked = value === option.value
          
          return (
            <label 
              key={option.value}
              className={`
                relative flex items-start
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                group
              `}
            >
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  id={uniqueId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  required={required}
                  disabled={disabled}
                  onChange={(e) => onChange?.(e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  className={`
                    w-4 h-4
                    border-2
                    text-blue-600
                    bg-white
                    focus:ring-2 focus:ring-blue-100 focus:ring-offset-1
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                    cursor-pointer
                    ${error ? 'border-red-300' : isChecked ? 'border-blue-500' : 'border-gray-300'}
                    ${!disabled && !isChecked && 'group-hover:border-gray-400'}
                  `}
                />
              </div>
              <div className="ml-3 text-sm">
                <span className={`
                  font-medium
                  ${error ? 'text-red-600' : 'text-gray-700'}
                  ${disabled ? 'opacity-50' : ''}
                  ${isChecked ? 'text-blue-600' : ''}
                `}>
                  {option.label}
                </span>
              </div>
            </label>
          )
        })}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}