import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../../Button';
import { Modal } from '../../Modal';

interface AddSuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    email: string;
    firstName: string;
    lastName: string;
  }) => void;
}

export function AddSuperAdminModal({
  isOpen,
  onClose,
  onSubmit
}: AddSuperAdminModalProps) {
  const [formData, setFormData] = React.useState({
    email: '',
    firstName: '',
    lastName: ''
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        email: formData.email.trim().toLowerCase(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim()
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Reset form when modal is opened
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        email: '',
        firstName: '',
        lastName: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Super Admin"
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Add Super Admin
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Create a new super administrator account
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`
              w-full px-3 py-2 border rounded-lg 
              ${errors.email ? 'border-red-500' : 'border-gray-300'}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`
              w-full px-3 py-2 border rounded-lg 
              ${errors.firstName ? 'border-red-500' : 'border-gray-300'}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`
              w-full px-3 py-2 border rounded-lg 
              ${errors.lastName ? 'border-red-500' : 'border-gray-300'}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}