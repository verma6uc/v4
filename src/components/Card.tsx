import React from 'react'

interface CardProps {
  title: string
  description: string
}

export function Card({ title, description }: CardProps) {
  return (
    <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg overflow-hidden border border-white/20">
      <div className="p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">{title}</h2>
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      </div>
      <div className="px-8 py-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex justify-end">
          <button className="text-lg font-medium text-blue-500 hover:text-blue-600 transition-colors">
            Learn More <span className="font-light">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}