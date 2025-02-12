import React from 'react'
import { LucideIcon, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  description?: string
  variant?: 'default' | 'compact' | 'detailed' | 'gradient'
  status?: 'success' | 'warning' | 'error' | 'info'
  sparkline?: boolean
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  description,
  variant = 'default',
  status = 'info',
  sparkline = false
}: MetricCardProps) {
  const isPositive = change && change > 0
  const ChangeIcon = isPositive ? TrendingUp : TrendingDown

  const statusColors = {
    success: 'text-green-600 bg-green-50/80',
    warning: 'text-yellow-600 bg-yellow-50/80',
    error: 'text-red-600 bg-red-50/80',
    info: 'text-blue-600 bg-blue-50/80'
  }

  const variants = {
    default: `
      backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-white/70 
      rounded-xl shadow-lg border border-white/30 p-6
      hover:from-white/95 hover:via-white/85 hover:to-white/75
      transition-all duration-300
    `,
    compact: `
      backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-white/70
      rounded-lg shadow-lg border border-white/30 p-4
      hover:from-white/95 hover:via-white/85 hover:to-white/75
      transition-all duration-300
    `,
    detailed: `
      backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-white/70
      rounded-xl shadow-lg border border-white/30 p-6 space-y-4
      hover:from-white/95 hover:via-white/85 hover:to-white/75
      transition-all duration-300
    `,
    gradient: `
      backdrop-blur-xl rounded-xl shadow-lg border border-white/30 p-6
      transition-all duration-300
      ${
        status === 'success' ? 'bg-gradient-to-br from-green-50/95 via-green-50/90 to-green-100/80' :
        status === 'warning' ? 'bg-gradient-to-br from-yellow-50/95 via-yellow-50/90 to-yellow-100/80' :
        status === 'error' ? 'bg-gradient-to-br from-red-50/95 via-red-50/90 to-red-100/80' :
        'bg-gradient-to-br from-blue-50/95 via-blue-50/90 to-blue-100/80'
      }
      hover:from-opacity-100 hover:via-opacity-95 hover:to-opacity-85
    `
  }

  const renderSparkline = () => (
    <div className="h-10 flex items-end gap-1">
      {[4, 2, 5, 3, 4, 6, 5].map((height, i) => (
        <div
          key={i}
          style={{ height: `${height * 10}%` }}
          className={`w-1 rounded-t transition-all duration-300 ${
            status === 'success' ? 'bg-green-200 group-hover:bg-green-300' :
            status === 'warning' ? 'bg-yellow-200 group-hover:bg-yellow-300' :
            status === 'error' ? 'bg-red-200 group-hover:bg-red-300' :
            'bg-blue-200 group-hover:bg-blue-300'
          }`}
        />
      ))}
    </div>
  )

  if (variant === 'compact') {
    return (
      <div className={variants.compact}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-xl font-semibold text-gray-900 mt-1">{value}</h3>
          </div>
          <div className={`p-2 rounded-lg ${statusColors[status]} backdrop-blur-sm shadow-sm`}>
            <Icon className={`w-5 h-5`} />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={`group ${variants.detailed}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Icon className={`w-5 h-5 ${statusColors[status].split(' ')[0]}`} />
              <p className="text-sm font-medium text-gray-600">{title}</p>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mt-2">{value}</h3>
          </div>
          {sparkline && renderSparkline()}
        </div>
        
        {(change || description) && (
          <div className="pt-4 border-t border-gray-100/50">
            {change && (
              <div className="flex items-center gap-1">
                <ChangeIcon className={`w-4 h-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(change)}%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`group ${variants[variant]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${statusColors[status]} backdrop-blur-sm shadow-sm transition-colors duration-300`}>
          <Icon className={`w-6 h-6`} />
        </div>
      </div>
      
      {(change || description) && (
        <div className="mt-4 space-y-2">
          {change && (
            <div className="flex items-center gap-1">
              <ChangeIcon className={`w-4 h-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
    </div>
  )
}