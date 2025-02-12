import React from 'react'
import { X } from 'lucide-react'

interface OffCanvasProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  position?: 'left' | 'right'
}

export function OffCanvas({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right' 
}: OffCanvasProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`
        fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full w-96 
        bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 h-[calc(100vh-73px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  )
}