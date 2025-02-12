import React from 'react'
import { Form } from '../components/form/Form'
import { ContactForm } from '../components/form/ContactForm'
import { SettingsForm } from '../components/form/SettingsForm'
import { FormInput } from '../components/form/FormInput'
import { FormCheckbox } from '../components/form/FormCheckbox'
import { FormRadio } from '../components/form/FormRadio'
import { FormFile } from '../components/form/FormFile'
import { 
  Mail, Lock, User, Phone, Link, Calendar, Clock, Search,
  CreditCard, Hash, Globe, MapPin, AtSign, FileText, Image
} from 'lucide-react'

const themes = [
  { value: 'light', label: 'Light Theme' },
  { value: 'dark', label: 'Dark Theme' },
  { value: 'system', label: 'System Default' }
]

export function FormsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-16 pb-16">
      {/* Form Input Types */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Form Input Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text Inputs */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Text Inputs</h3>
            <div className="space-y-4">
              <FormInput
                label="Text"
                type="text"
                name="text"
                icon={FileText}
                placeholder="Basic text input"
              />

              <FormInput
                label="Email"
                type="email"
                name="email"
                icon={AtSign}
                placeholder="email@example.com"
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                icon={Lock}
                placeholder="••••••••"
              />

              <FormInput
                label="Search"
                type="search"
                name="search"
                icon={Search}
                placeholder="Search..."
              />

              <FormInput
                label="URL"
                type="url"
                name="url"
                icon={Link}
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Number Inputs */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Number Inputs</h3>
            <div className="space-y-4">
              <FormInput
                label="Number"
                type="number"
                name="number"
                icon={Hash}
                placeholder="0"
              />

              <FormInput
                label="Credit Card"
                type="text"
                name="creditCard"
                icon={CreditCard}
                placeholder="4242 4242 4242 4242"
              />

              <FormInput
                label="Phone"
                type="tel"
                name="phone"
                icon={Phone}
                placeholder="+1 (555) 000-0000"
              />

              <FormInput
                label="Postal Code"
                type="text"
                name="postalCode"
                icon={MapPin}
                placeholder="12345"
              />
            </div>
          </div>

          {/* Date & Time Inputs */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Date & Time</h3>
            <div className="space-y-4">
              <FormInput
                label="Date"
                type="date"
                name="date"
                icon={Calendar}
              />

              <FormInput
                label="Time"
                type="time"
                name="time"
                icon={Clock}
              />

              <FormInput
                label="Date and Time"
                type="datetime-local"
                name="datetime"
                icon={Calendar}
              />

              <FormInput
                label="Month"
                type="month"
                name="month"
                icon={Calendar}
              />
            </div>
          </div>

          {/* Radio Options */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Radio Options</h3>
            <div className="space-y-4">
              <FormRadio
                label="Theme Selection"
                name="theme"
                options={themes}
              />
            </div>
          </div>

          {/* File & Other Inputs */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">File & Other</h3>
            <div className="space-y-4">
              <FormFile
                label="File Upload"
                name="file"
                accept=".jpg,.png,.pdf"
                maxSize={5 * 1024 * 1024} // 5MB
              />

              <FormInput
                label="Color"
                type="color"
                name="color"
                icon={Image}
              />

              <FormInput
                label="Range"
                type="range"
                name="range"
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Checkbox Inputs */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Checkbox Inputs</h3>
            <div className="space-y-4">
              <FormCheckbox
                label="Basic Checkbox"
                name="checkbox"
              />

              <FormCheckbox
                label="Checked Checkbox"
                name="checkboxChecked"
                checked
              />

              <FormCheckbox
                label="Disabled Checkbox"
                name="checkboxDisabled"
                disabled
              />

              <FormCheckbox
                label="Checked & Disabled"
                name="checkboxCheckedDisabled"
                checked
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      {/* Basic Forms */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Authentication Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sign Up Form */}
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '0ms' }}>
            <Form 
              title="Create an Account" 
              description="Sign up to get started with our platform."
              onSubmit={(e) => {
                console.log('Form submitted:', e)
              }}
            />
          </div>

          {/* Login Form */}
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '100ms' }}>
            <Form 
              title="Welcome Back" 
              description="Log in to access your account."
              onSubmit={(e) => {
                console.log('Form submitted:', e)
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Contact Form</h2>
        <div className="max-w-2xl motion-safe:animate-fade-in" style={{ animationDelay: '200ms' }}>
          <ContactForm 
            onSubmit={(e) => {
              console.log('Form submitted:', e)
            }}
          />
        </div>
      </section>

      {/* Settings Form */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Settings Form</h2>
        <div className="max-w-3xl motion-safe:animate-fade-in" style={{ animationDelay: '300ms' }}>
          <SettingsForm 
            onSubmit={(e) => {
              console.log('Form submitted:', e)
            }}
          />
        </div>
      </section>

      {/* Form Components */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Form Components</h2>
        <p className="text-gray-500 mb-8">
          All forms are built using reusable components from our design system, including:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>FormInput - Text input fields with icons and labels</li>
          <li>FormRadio - Radio button groups</li>
          <li>FormCheckbox - Customizable checkbox inputs</li>
          <li>FormFile - File upload with drag & drop</li>
          <li>Card containers with frosted glass effect</li>
          <li>Proper form validation and error handling</li>
          <li>Responsive layouts and spacing</li>
          <li>Smooth animations and transitions</li>
          <li>Consistent styling and typography</li>
        </ul>
      </section>
    </div>
  )
}