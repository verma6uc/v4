import React from 'react'
import { X } from 'lucide-react'
import { Company } from '../../../types/schema'

interface EditCompanyModalProps {
  isOpen: boolean
  company: Company
  onClose: () => void
  onSubmit: (companyId: string, updates: Partial<Company>) => void
}

export function EditCompanyModal({ 
  isOpen, 
  company, 
  onClose, 
  onSubmit 
}: EditCompanyModalProps) {
  const [formData, setFormData] = React.useState({
    name: company.name,
    primaryEmail: company.primaryEmail || '',
    primaryPhone: company.primaryPhone || '',
    website: company.website || '',
    addressStreet: company.addressStreet || '',
    addressCity: company.addressCity || '',
    addressState: company.addressState || '',
    addressCountry: company.addressCountry || '',
    addressPostalCode: company.addressPostalCode || ''
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Reset form when company changes
  React.useEffect(() => {
    setFormData({
      name: company.name,
      primaryEmail: company.primaryEmail || '',
      primaryPhone: company.primaryPhone || '',
      website: company.website || '',
      addressStreet: company.addressStreet || '',
      addressCity: company.addressCity || '',
      addressState: company.addressState || '',
      addressCountry: company.addressCountry || '',
      addressPostalCode: company.addressPostalCode || ''
    })
  }, [company])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required'
    } else if (formData.name.length < 3 || formData.name.length > 100) {
      newErrors.name = 'Company name must be between 3 and 100 characters'
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      newErrors.name = 'Company name can only contain letters, numbers, and spaces'
    }

    if (formData.primaryEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryEmail)) {
      newErrors.primaryEmail = 'Invalid email format'
    }

    if (formData.website && !/^https?:\/\/.*/.test(formData.website)) {
      newErrors.website = 'Website must start with http:// or https://'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(company.id, formData)
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
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Company</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="col-span-2">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Basic Information</h3>
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
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Identifier
                  </label>
                  <input
                    type="text"
                    value={company.identifier}
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Company identifier cannot be changed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-span-2">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    name="primaryEmail"
                    value={formData.primaryEmail}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      errors.primaryEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.primaryEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.primaryEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Phone
                  </label>
                  <input
                    type="tel"
                    name="primaryPhone"
                    value={formData.primaryPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      errors.website ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="addressStreet"
                    value={formData.addressStreet}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="addressCity"
                    value={formData.addressCity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="addressState"
                    value={formData.addressState}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="addressCountry"
                    value={formData.addressCountry}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="addressPostalCode"
                    value={formData.addressPostalCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}