import React from 'react'
import { X } from 'lucide-react'
import { Company, InvitationType, InvitationStatus } from '../../../types/schema'

interface InviteAdminModalProps {
  isOpen: boolean
  company: Company
  onClose: () => void
  onSubmit: (data: { 
    email: string,
    type: InvitationType,
    status: InvitationStatus
  }) => void
}

export function InviteAdminModal({ 
  isOpen, 
  company, 
  onClose, 
  onSubmit 
}: InviteAdminModalProps) {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format')
      return false
    }

    // Additional validations from business rules
    if (email.length > 255) {
      setError('Email is too long')
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit({
        email: email.trim().toLowerCase(),
        type: InvitationType.COMPANY_ADMIN,
        status: InvitationStatus.PENDING
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError('')
  }

  // Reset form when modal is opened
  React.useEffect(() => {
    if (isOpen) {
      setEmail('')
      setError('')
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Invite Company Admin</h2>
            <p className="text-sm text-gray-500 mt-1">
              Send an invitation to set up company admin account
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter admin email"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              The invitation will be sent to this email address
            </p>
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
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}