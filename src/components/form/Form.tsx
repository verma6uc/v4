import React from 'react'
import { Mail, Lock, User, Phone } from 'lucide-react'
import { Button } from '../Button'
import { FormInput } from './FormInput'
import { FormCheckbox } from './FormCheckbox'

interface FormProps {
  title: string
  description?: string
  onSubmit?: (e: React.FormEvent) => void
}

export function Form({ title, description, onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormInput
            label="Full Name"
            type="text"
            name="fullName"
            icon={User}
            placeholder="John Doe"
            required
            autoComplete="name"
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            icon={Mail}
            placeholder="john@example.com"
            required
            autoComplete="email"
          />

          <FormInput
            label="Phone"
            type="tel"
            name="phone"
            icon={Phone}
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            icon={Lock}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-center justify-between">
          <FormCheckbox
            label="Remember me"
            name="remember"
          />

          <Button
            variant="ghost"
            size="sm"
            type="button"
          >
            Forgot password?
          </Button>
        </div>

        <Button
          type="submit"
          variant="primary-dark"
          fullWidth
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}