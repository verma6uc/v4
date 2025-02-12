import React, { useRef, useState } from 'react'
import { Upload, X, FileText, Image as ImageIcon, File } from 'lucide-react'

interface FormFileProps {
  label: string
  name: string
  accept?: string
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  maxSize?: number // in bytes
  onChange?: (files: FileList | null) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function FormFile({
  label,
  name,
  accept,
  multiple = false,
  required = false,
  disabled = false,
  maxSize,
  onChange,
  onFocus,
  onBlur
}: FormFileProps) {
  const [files, setFiles] = useState<FileList | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (newFiles: FileList | null) => {
    if (!newFiles?.length) return

    // Check file size if maxSize is specified
    if (maxSize) {
      const isValidSize = Array.from(newFiles).every(file => file.size <= maxSize)
      if (!isValidSize) {
        alert(`File size should not exceed ${formatBytes(maxSize)}`)
        return
      }
    }

    setFiles(newFiles)
    onChange?.(newFiles)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileChange(e.dataTransfer.files)
  }

  const handleRemoveFile = (index: number) => {
    if (!files) return

    const dt = new DataTransfer()
    Array.from(files).forEach((file, i) => {
      if (i !== index) dt.items.add(file)
    })
    
    handleFileChange(dt.files)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return ImageIcon
    return FileText
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-4
          transition-all duration-200
          ${isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          id={name}
          name={name}
          accept={accept}
          multiple={multiple}
          required={required}
          disabled={disabled}
          onChange={(e) => handleFileChange(e.target.files)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="hidden"
        />

        {!files?.length ? (
          <div className="text-center">
            <Upload 
              className="mx-auto h-12 w-12 text-gray-400" 
              strokeWidth={1.5}
            />
            <div className="mt-4 flex text-sm text-gray-600">
              <span className="relative cursor-pointer rounded-md font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                Upload a file
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {accept ? `${accept.split(',').join(', ')} files` : 'Any file'} up to {maxSize ? formatBytes(maxSize) : 'any size'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {Array.from(files).map((file, index) => {
              const FileIcon = getFileIcon(file)
              return (
                <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <FileIcon className="h-5 w-5 flex-shrink-0 text-gray-400" strokeWidth={1.5} />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">{file.name}</span>
                      <span className="flex-shrink-0 text-gray-400">{formatBytes(file.size)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile(index)
                    }}
                  >
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}