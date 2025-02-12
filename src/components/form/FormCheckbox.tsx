import React from 'react'

interface FormCheckboxProps {
  label: string
  name: string
  id?: string
  checked?: boolean
  disabled?: boolean
  required?: boolean
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
  onChange,
  onFocus,
  onBlur
}: FormCheckboxProps) {
  const uniqueId = id || `${name}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <label>
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
      />
      <span className="ml-2">
        {label}
      </span>
    </label>
  )
}