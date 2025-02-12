import React from 'react'
import { User, Mail, Bell, Globe, Shield, Moon } from 'lucide-react'
import { Button } from '../Button'
import { FormInput } from './FormInput'
import { FormCheckbox } from './FormCheckbox'

interface SettingsFormProps {
  title?: string
  description?: string
  onSubmit?: (e: React.FormEvent) => void
}

export function SettingsForm({ 
  title = "Account Settings", 
  description = "Manage your account preferences and settings.",
  onSubmit 
}: SettingsFormProps) {
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Section */}
        <section>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Profile Information</h4>
          <div className="space-y-4">
            <FormInput
              label="Display Name"
              type="text"
              name="displayName"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                  bg-white/90 backdrop-blur-sm
                  transition-all duration-200
                  hover:bg-white hover:border-gray-400
                  disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
                  text-gray-900 placeholder-gray-400
                  resize-none"
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Preferences</h4>
          <div className="space-y-4">
            <FormInput
              label="Language"
              type="text"
              name="language"
              icon={Globe}
              placeholder="English (US)"
            />

            <div className="space-y-3">
              <FormCheckbox
                label="Enable dark mode"
                name="darkMode"
              />

              <FormCheckbox
                label="Enable desktop notifications"
                name="notifications"
              />

              <FormCheckbox
                label="Show online status"
                name="onlineStatus"
              />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Security</h4>
          <div className="space-y-4">
            <FormCheckbox
              label="Enable two-factor authentication"
              name="twoFactor"
            />

            <FormCheckbox
              label="Require password on startup"
              name="passwordStartup"
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4">
          <Button
            type="submit"
            variant="primary-dark"
          >
            Save Changes
          </Button>

          <Button
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}