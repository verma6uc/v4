import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, X, Check } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface FormMultiSelectProps {
  label: string
  name: string
  options: Option[]
  value?: string[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  onChange?: (values: string[]) => void
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
}

export function FormMultiSelect({
  label,
  name,
  options,
  value = [],
  placeholder,
  required = false,
  disabled = false,
  error,
  onChange,
  onFocus,
  onBlur
}: FormMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const uniqueId = `${name}-${Math.random().toString(36).substr(2, 9)}`

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionClick = (optionValue: string) => {
    if (!disabled) {
      const newValue = value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...value, optionValue]
      onChange?.(newValue)
    }
  }

  const removeValue = (optionValue: string) => {
    if (!disabled) {
      const newValue = value.filter(v => v !== optionValue)
      onChange?.(newValue)
    }
  }

  const selectedLabels = options
    .filter(option => value.includes(option.value))
    .map(option => option.label)

  return (
    <div ref={containerRef}>
      <label 
        htmlFor={uniqueId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <div
          id={uniqueId}
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`
            min-h-[38px]
            px-3 py-2
            rounded-md
            border
            bg-white
            text-sm text-gray-900
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200
            ${error ? 'border-red-300' : 'border-gray-300'}
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
          `}
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedLabels.map((label) => (
                <span
                  key={label}
                  className={`
                    inline-flex items-center
                    px-2 py-0.5
                    rounded
                    text-xs font-medium
                    bg-blue-50 text-blue-700
                    ${disabled ? 'opacity-50' : ''}
                  `}
                >
                  {label}
                  {!disabled && (
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation()
                        const optionValue = options.find(opt => opt.label === label)?.value
                        if (optionValue) removeValue(optionValue)
                      }}
                    />
                  )}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">
              {placeholder || 'Select options...'}
            </span>
          )}
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown 
            className={`w-4 h-4 ${error ? 'text-red-400' : 'text-gray-400'}`}
          />
        </div>

        {isOpen && !disabled && (
          <div className="
            absolute z-10 w-full mt-1
            bg-white
            rounded-md
            shadow-lg
            border border-gray-200
            py-1
            max-h-60 overflow-auto
          ">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`
                  flex items-center justify-between
                  px-3 py-2
                  cursor-pointer
                  text-sm
                  hover:bg-gray-50
                `}
              >
                <span className="text-gray-900">
                  {option.label}
                </span>
                {value.includes(option.value) && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}