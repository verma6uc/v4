import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface FormSelectProps {
  label: string
  name: string
  options: Option[]
  value?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
}

export function FormSelect({
  label,
  name,
  options,
  value,
  placeholder,
  required = false,
  disabled = false,
  error,
  onChange,
  onFocus,
  onBlur
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const uniqueId = `${name}-${Math.random().toString(36).substr(2, 9)}`

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div>
      <label 
        htmlFor={uniqueId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative" ref={selectRef}>
        <div
          id={uniqueId}
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`
            block w-full
            rounded-md
            py-2 pl-3 pr-10
            text-sm
            border
            bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
            cursor-pointer
            ${error ? 'border-red-300' : 'border-gray-300'}
            ${disabled ? 'bg-gray-50' : ''}
          `}
        >
          {selectedOption ? (
            <span className="text-gray-900">{selectedOption.label}</span>
          ) : (
            <span className="text-gray-500">
              {placeholder || 'Select an option...'}
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
                onClick={() => {
                  onChange?.(option.value)
                  setIsOpen(false)
                }}
                className={`
                  px-3 py-2
                  cursor-pointer
                  text-sm
                  hover:bg-gray-50
                  ${option.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}
                `}
              >
                {option.label}
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