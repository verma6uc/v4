import React from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  preventClose?: boolean
  className?: string
  contentClassName?: string
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  preventClose = false,
  className = '',
  contentClassName = ''
}: ModalProps) {
  const [isClosing, setIsClosing] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    if (preventClose) return
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 200)
  }

  if (!isOpen) return null

  const sizes = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    'full': 'max-w-full mx-4'
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-50
          transition-opacity duration-200
          ${isClosing ? 'opacity-0' : 'opacity-100'}
        `}
        onClick={() => closeOnOverlayClick && handleClose()}
      />

      {/* Modal */}
      <div className={`
        fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
        w-full ${sizes[size]} bg-white rounded-xl shadow-xl
        transition-all duration-200
        ${isClosing 
          ? 'opacity-0 scale-95' 
          : 'opacity-100 scale-100'
        }
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {showCloseButton && (
            <button 
              onClick={handleClose}
              className={`
                p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100
                transition-colors duration-200
                ${preventClose ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={preventClose}
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className={`
          px-6 py-4 max-h-[calc(100vh-16rem)] overflow-y-auto
          ${contentClassName}
        `}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50/80 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

// Preset Modal Components
interface ConfirmModalProps extends Omit<ModalProps, 'children' | 'footer'> {
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  variant?: 'danger' | 'primary'
}

export function ConfirmModal({
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'primary',
  ...props
}: ConfirmModalProps) {
  return (
    <Modal
      {...props}
      size="sm"
      footer={
        <>
          <Button
            variant="ghost"
            onClick={props.onClose}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary-dark'}
            onClick={() => {
              onConfirm()
              props.onClose()
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-gray-600">{message}</p>
    </Modal>
  )
}

interface AlertModalProps extends Omit<ModalProps, 'children' | 'footer'> {
  message: string
  buttonLabel?: string
  variant?: 'success' | 'error' | 'info' | 'warning'
}

export function AlertModal({
  message,
  buttonLabel = 'OK',
  variant = 'info',
  ...props
}: AlertModalProps) {
  const variantStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-800',
      button: 'primary-dark'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-800',
      button: 'danger'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-800',
      button: 'primary-dark'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-100',
      text: 'text-yellow-800',
      button: 'primary-dark'
    }
  }

  const styles = variantStyles[variant]

  return (
    <Modal
      {...props}
      size="sm"
      className={`${styles.bg} ${styles.border}`}
      contentClassName="py-6"
      footer={
        <Button
          variant={styles.button as any}
          onClick={props.onClose}
        >
          {buttonLabel}
        </Button>
      }
    >
      <p className={`${styles.text} text-center`}>{message}</p>
    </Modal>
  )
}