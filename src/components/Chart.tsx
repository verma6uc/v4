import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

interface ChartDataPoint {
  label: string
  value: number
}

interface ChartProps {
  title: string
  description?: string
  data?: ChartDataPoint[]
  type?: 'bar' | 'line' | 'area'
  color?: 'blue' | 'green' | 'purple' | 'orange'
  height?: 'sm' | 'md' | 'lg'
  formatValue?: (value: number) => string
}

const colorVariants = {
  blue: {
    main: '#3B82F6',
    light: '#93C5FD',
    gradient: ['#3B82F6', '#60A5FA']
  },
  green: {
    main: '#10B981',
    light: '#6EE7B7',
    gradient: ['#10B981', '#34D399']
  },
  purple: {
    main: '#8B5CF6',
    light: '#C4B5FD',
    gradient: ['#8B5CF6', '#A78BFA']
  },
  orange: {
    main: '#F97316',
    light: '#FDBA74',
    gradient: ['#F97316', '#FB923C']
  }
}

const chartHeights = {
  sm: 200,
  md: 300,
  lg: 400
}

const CustomTooltip = ({ active, payload, label, formatValue }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-gray-300">
          {formatValue ? formatValue(payload[0].value) : payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

export function Chart({ 
  title, 
  description, 
  data = [], 
  type = 'bar',
  color = 'blue',
  height = 'lg',
  formatValue = (value: number) => value.toLocaleString()
}: ChartProps) {
  const colors = colorVariants[color]
  const chartHeight = chartHeights[height]

  // Transform data for Recharts
  const chartData = data.map(point => ({
    name: point.label,
    value: point.value
  }))

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      children: (
        <>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
        </>
      )
    }

    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {commonProps.children}
            <Bar 
              dataKey="value" 
              fill={colors.main}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )

      case 'line':
        return (
          <LineChart {...commonProps}>
            {commonProps.children}
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors.main}
              strokeWidth={3}
              dot={{ fill: colors.main, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: colors.main }}
            />
          </LineChart>
        )

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.gradient[0]} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.gradient[1]} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            {commonProps.children}
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.main}
              strokeWidth={3}
              fill={`url(#gradient-${color})`}
              dot={{ fill: colors.main, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: colors.main }}
            />
          </AreaChart>
        )

      default:
        return (
          <BarChart {...commonProps}>
            {commonProps.children}
            <Bar 
              dataKey="value" 
              fill={colors.main}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )
    }
  }

  return (
    <div className="backdrop-blur-xl bg-white/70 rounded-xl shadow-lg border border-white/20 p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-2">{description}</p>
        )}
      </div>
      
      <div className="w-full" style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}