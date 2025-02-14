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
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
    </div>
  )
}