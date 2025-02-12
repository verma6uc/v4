import React from 'react'
import { Modal, ConfirmModal, AlertModal } from '../components/Modal'
import { Toast, ToastContainer } from '../components/Toast'
import { Button } from '../components/Button'
import { FormInput } from '../components/form/FormInput'
import { FormSelect } from '../components/form/FormSelect'
import { User, Mail, Bell } from 'lucide-react'

export function ModalsPage() {
  const [isBasicOpen, setIsBasicOpen] = React.useState(false)
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)
  const [isAlertOpen, setIsAlertOpen] = React.useState(false)
  const [isLongOpen, setIsLongOpen] = React.useState(false)
  const [isPreventCloseOpen, setIsPreventCloseOpen] = React.useState(false)
  const [selectedSize, setSelectedSize] = React.useState('md')
  const [toasts, setToasts] = React.useState<Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message?: string;
  }>>([])

  const addToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, type, title, message }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const sizes = [
    { value: 'xs', label: 'Extra Small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
    { value: '2xl', label: '2X Large' },
    { value: '3xl', label: '3X Large' },
    { value: '4xl', label: '4X Large' },
    { value: '5xl', label: '5X Large' },
    { value: 'full', label: 'Full Width' }
  ]

  return (
    <div className="max-w-[1600px] mx-auto space-y-16 pb-16">
      {/* Basic Modal */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Modal Sizes</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <FormSelect
              label="Size"
              name="size"
              value={selectedSize}
              options={sizes}
              onChange={(value) => setSelectedSize(value as string)}
            />
            <Button 
              variant="primary-dark"
              onClick={() => setIsBasicOpen(true)}
            >
              Open Modal
            </Button>
          </div>
        </div>

        <Modal
          isOpen={isBasicOpen}
          onClose={() => setIsBasicOpen(false)}
          title="Basic Modal"
          size={selectedSize as any}
          footer={
            <>
              <Button
                variant="ghost"
                onClick={() => setIsBasicOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary-dark"
                onClick={() => {
                  addToast('success', 'Success!', 'Modal action completed successfully.')
                  setIsBasicOpen(false)
                }}
              >
                Save Changes
              </Button>
            </>
          }
        >
          <p className="text-gray-600">
            This is a basic modal with customizable size. You can use it to display any content.
          </p>
        </Modal>
      </section>

      {/* Form Modal */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Form Modal</h2>
        <Button 
          variant="primary-dark"
          onClick={() => setIsFormOpen(true)}
        >
          Open Form Modal
        </Button>

        <Modal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="Edit Profile"
          size="md"
          footer={
            <>
              <Button
                variant="ghost"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary-dark"
                onClick={() => {
                  addToast('success', 'Profile Updated', 'Your profile has been updated successfully.')
                  setIsFormOpen(false)
                }}
              >
                Save Changes
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <FormInput
              label="Full Name"
              name="name"
              icon={User}
              placeholder="John Doe"
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              icon={Mail}
              placeholder="john@example.com"
            />
            <FormInput
              label="Notification Email"
              name="notificationEmail"
              type="email"
              icon={Bell}
              placeholder="notifications@example.com"
            />
          </div>
        </Modal>
      </section>

      {/* Confirm Modal */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Confirm Modal</h2>
        <div className="flex gap-4">
          <Button 
            variant="primary-dark"
            onClick={() => setIsConfirmOpen(true)}
          >
            Open Confirm Modal
          </Button>
        </div>

        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          title="Confirm Action"
          message="Are you sure you want to perform this action? This cannot be undone."
          onConfirm={() => {
            addToast('info', 'Action Confirmed', 'You confirmed the action.')
          }}
        />
      </section>

      {/* Alert Modal */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Alert Modal</h2>
        <div className="flex gap-4">
          <Button 
            variant="primary-dark"
            onClick={() => setIsAlertOpen(true)}
          >
            Open Alert Modal
          </Button>
        </div>

        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          title="Success"
          message="Your action was completed successfully!"
          variant="success"
        />
      </section>

      {/* Long Content Modal */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Long Content Modal</h2>
        <Button 
          variant="primary-dark"
          onClick={() => setIsLongOpen(true)}
        >
          Open Long Content Modal
        </Button>

        <Modal
          isOpen={isLongOpen}
          onClose={() => setIsLongOpen(false)}
          title="Terms of Service"
          size="2xl"
          footer={
            <Button
              variant="primary-dark"
              onClick={() => setIsLongOpen(false)}
            >
              Close
            </Button>
          }
        >
          <div className="prose prose-sm">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Section {i + 1}</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </div>
        </Modal>
      </section>

      {/* Prevent Close Modal */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Prevent Close Modal</h2>
        <Button 
          variant="primary-dark"
          onClick={() => setIsPreventCloseOpen(true)}
        >
          Open Prevent Close Modal
        </Button>

        <Modal
          isOpen={isPreventCloseOpen}
          onClose={() => setIsPreventCloseOpen(false)}
          title="Processing"
          size="sm"
          preventClose
          closeOnOverlayClick={false}
          showCloseButton={false}
        >
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Please wait while we process your request...</p>
          </div>
        </Modal>
      </section>

      {/* Toast Container */}
      <ToastContainer position="top-right">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </div>
  )
}