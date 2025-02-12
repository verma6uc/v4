import React from 'react'
import { Mail, MessageSquare, User, Phone } from 'lucide-react'
import { Button } from '../Button'
import { FormInput } from './FormInput'

interface ContactFormProps {
  title?: string
  description?: string
  onSubmit?: (e: React.FormEvent) => void
}

export function ContactForm({ 
  title = "Get in Touch", 
  description = "Send us a message and we'll get back to you.",
  onSubmit 
}: ContactFormProps) {
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <div className="relative">
              <MessageSquare 
                className="w-4 h-4 text-gray-500 absolute left-3 top-3"
                strokeWidth={2}
                aria-hidden="true"
              />
              <textarea
                name="message"
                rows={4}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                  bg-white/90 backdrop-blur-sm
                  transition-all duration-200
                  hover:bg-white hover:border-gray-400
                  disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
                  text-gray-900 placeholder-gray-400
                  resize-none"
                placeholder="How can we help you?"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            variant="primary-dark"
            fullWidth
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  )
}