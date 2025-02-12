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
  onChange,
  onFocus,
  onBlur
}: FormRadioProps) {
  return (
    <div>
      <label className="block mb-2">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => {
          const uniqueId = `${name}-${option.value}-${Math.random().toString(36).substr(2, 9)}`
          
          return (
            <label key={option.value}>
              <input
                type="radio"
                id={uniqueId}
                name={name}
                value={option.value}
                checked={value === option.value}
                required={required}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <span className="ml-2">
                {option.label}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}