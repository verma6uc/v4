import React from 'react'
import { Search } from 'lucide-react'

interface CompanySearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function CompanySearch({ 
  value, 
  onChange, 
  placeholder = 'Search companies...' 
}: CompanySearchProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                 bg-white/70 backdrop-blur-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 placeholder-gray-400 text-sm"
        placeholder={placeholder}
      />
    </div>
  )
}