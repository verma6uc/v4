import React from 'react'
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  X 
} from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  type?: ToastType
  title: string
  message?: string
  onClose?: () => void
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle
}

const toastStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'text-green-500',
    title: 'text-green-800',
    message: 'text-green-600'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-500',
    title: 'text-red-800',
    message: 'text-red-600'
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    message: 'text-blue-600'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-500',
    title: 'text-yellow-800',
    message: 'text-yellow-600'
  }
}

const positions = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4'
}

export function Toast({ 
  type = 'info',
  title,
  message,
  onClose,
  duration = 5000,
  position = 'top-right'
}: ToastProps) {
  const [isClosing, setIsClosing] = React.useState(false)
  const Icon = toastIcons[type]
  const styles = toastStyles[type]

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose?.()
    }, 200)
  }

  return (
    <div className={`
      fixed ${positions[position]} z-50
      transition-all duration-200 ease-in-out
      ${isClosing ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}
    `}>
      <div className={`
        flex items-start gap-3 p-4 rounded-lg shadow-lg border
        ${styles.bg} ${styles.border}
        min-w-[320px] max-w-md
      `}>
        <Icon className={`w-5 h-5 mt-0.5 ${styles.icon}`} strokeWidth={2} />
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-medium ${styles.title}`}>
            {title}
          </h3>
          {message && (
            <p className={`mt-1 text-sm ${styles.message}`}>
              {message}
            </p>
          )}
        </div>

        <button
          onClick={handleClose}
          className={`
            p-1 rounded-lg opacity-70 hover:opacity-100
            transition-opacity duration-200
          `}
        >
          <X className={`w-4 h-4 ${styles.icon}`} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

interface ToastContainerProps {
  children: React.ReactNode
  position?: ToastProps['position']
}

export function ToastContainer({ 
  children,
  position = 'top-right'
}: ToastContainerProps) {
  return (
    <div className={`
      fixed ${positions[position]} z-50
      flex flex-col gap-3
    `}>
      {children}
    </div>
  )
}