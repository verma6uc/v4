import React from 'react'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastProps {
  type: ToastType
  message: string
  onClose: () => void
}

const toastStyles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
}

const ToastIcon = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle
}

export function Toast({ type, message, onClose }: ToastProps) {
  const Icon = ToastIcon[type]

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-sm ${toastStyles[type]}`}
      role="alert"
    >
      <Icon className="w-5 h-5" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  )
}

export function useToasts() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, type, message }])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return {
    toasts,
    addToast,
    removeToast
  }
}