import React from 'react'
import { X } from 'lucide-react'
import { Company, CompanyStatus } from '../../../types/schema'

interface CreateCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (company: Partial<Company>) => void
}

export function CreateCompanyModal({ isOpen, onClose, onSubmit }: CreateCompanyModalProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    identifier: ''
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required'
    } else if (formData.name.length < 3 || formData.name.length > 100) {
      newErrors.name = 'Company name must be between 3 and 100 characters'
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      newErrors.name = 'Company name can only contain letters, numbers, and spaces'
    }

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Company identifier is required'
    } else if (formData.identifier.length < 3 || formData.identifier.length > 50) {
      newErrors.identifier = 'Identifier must be between 3 and 50 characters'
    } else if (!/^[a-z0-9-]+$/.test(formData.identifier)) {
      newErrors.identifier = 'Identifier can only contain lowercase letters, numbers, and hyphens'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        status: CompanyStatus.DRAFT,
        createdAt: new Date().toISOString()
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Create New Company</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter company name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Identifier *
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.identifier ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter company identifier"
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Used for system identification. Only lowercase letters, numbers, and hyphens.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}