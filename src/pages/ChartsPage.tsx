import React from 'react'
import { Chart } from '../components/Chart'

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)

const formatPercent = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100)

const weeklyRevenue = [
  { label: 'Mon', value: 145200 },
  { label: 'Tue', value: 182400 },
  { label: 'Wed', value: 158600 },
  { label: 'Thu', value: 224800 },
  { label: 'Fri', value: 196500 },
  { label: 'Sat', value: 241000 },
  { label: 'Sun', value: 213700 }
]

const userActivity = [
  { label: '6am', value: 1250 },
  { label: '9am', value: 4580 },
  { label: '12pm', value: 6850 },
  { label: '3pm', value: 7820 },
  { label: '6pm', value: 5240 },
  { label: '9pm', value: 3860 },
  { label: '12am', value: 1890 }
]

const conversionRate = [
  { label: 'Jan', value: 2.8 },
  { label: 'Feb', value: 3.2 },
  { label: 'Mar', value: 3.9 },
  { label: 'Apr', value: 3.5 },
  { label: 'May', value: 4.2 },
  { label: 'Jun', value: 4.8 },
  { label: 'Jul', value: 4.5 }
]

const platformUsage = [
  { label: 'Mon', value: 85 },
  { label: 'Tue', value: 92 },
  { label: 'Wed', value: 89 },
  { label: 'Thu', value: 95 },
  { label: 'Fri', value: 90 },
  { label: 'Sat', value: 82 },
  { label: 'Sun', value: 78 }
]

const growthMetrics = [
  { label: 'Q1', value: 15600 },
  { label: 'Q2', value: 28400 },
  { label: 'Q3', value: 42300 },
  { label: 'Q4', value: 63800 },
  { label: 'Q5', value: 85200 },
  { label: 'Q6', value: 120400 },
  { label: 'Q7', value: 156800 }
]

const customerSatisfaction = [
  { label: 'Jan', value: 85 },
  { label: 'Feb', value: 88 },
  { label: 'Mar', value: 87 },
  { label: 'Apr', value: 91 },
  { label: 'May', value: 89 },
  { label: 'Jun', value: 93 },
  { label: 'Jul', value: 94 }
]

export function ChartsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-16 pb-16">
      {/* Main Metrics */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Chart 
            title="Weekly Revenue" 
            description="Revenue trends over the past week"
            data={weeklyRevenue}
            type="bar"
            color="blue"
            height="lg"
            formatValue={formatCurrency}
          />
          <Chart 
            title="User Activity" 
            description="Daily active users by hour"
            data={userActivity}
            type="line"
            color="green"
            height="lg"
            formatValue={formatNumber}
          />
        </div>
      </section>

      {/* Growth & Engagement */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Growth & Engagement</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Chart 
            title="Growth Metrics" 
            description="Quarter over quarter user growth"
            data={growthMetrics}
            type="area"
            color="purple"
            height="lg"
            formatValue={formatNumber}
          />
          <Chart 
            title="Customer Satisfaction" 
            description="Monthly satisfaction scores"
            data={customerSatisfaction}
            type="line"
            color="orange"
            height="lg"
            formatValue={formatPercent}
          />
        </div>
      </section>

      {/* Performance Metrics */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Performance Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Chart 
            title="Conversion Rate" 
            description="Monthly signup conversion rate"
            data={conversionRate}
            type="area"
            color="blue"
            height="lg"
            formatValue={formatPercent}
          />
          <Chart 
            title="Platform Usage" 
            description="Daily platform utilization"
            data={platformUsage}
            type="bar"
            color="green"
            height="lg"
            formatValue={formatPercent}
          />
        </div>
      </section>

      {/* Chart Types */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Chart Types</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Chart 
            title="Bar Chart" 
            description="Standard bar chart visualization"
            type="bar"
            color="purple"
            height="lg"
            data={[
              { label: 'A', value: 35 },
              { label: 'B', value: 68 },
              { label: 'C', value: 45 },
              { label: 'D', value: 85 },
              { label: 'E', value: 58 },
              { label: 'F', value: 72 },
              { label: 'G', value: 92 }
            ]}
            formatValue={formatPercent}
          />
          <Chart 
            title="Line Chart" 
            description="Continuous line chart visualization"
            type="line"
            color="orange"
            height="lg"
            data={[
              { label: 'A', value: 25 },
              { label: 'B', value: 45 },
              { label: 'C', value: 35 },
              { label: 'D', value: 65 },
              { label: 'E', value: 48 },
              { label: 'F', value: 58 },
              { label: 'G', value: 75 }
            ]}
            formatValue={formatPercent}
          />
          <Chart 
            title="Area Chart" 
            description="Area chart with gradient fill"
            type="area"
            color="blue"
            height="lg"
            data={[
              { label: 'A', value: 15 },
              { label: 'B', value: 38 },
              { label: 'C', value: 25 },
              { label: 'D', value: 45 },
              { label: 'E', value: 32 },
              { label: 'F', value: 48 },
              { label: 'G', value: 55 }
            ]}
            formatValue={formatPercent}
          />
          <Chart 
            title="Mixed Data" 
            description="Various data point visualization"
            type="bar"
            color="green"
            height="lg"
            data={[
              { label: 'A', value: 42 },
              { label: 'B', value: 78 },
              { label: 'C', value: 55 },
              { label: 'D', value: 95 },
              { label: 'E', value: 68 },
              { label: 'F', value: 88 },
              { label: 'G', value: 98 }
            ]}
            formatValue={formatPercent}
          />
        </div>
      </section>
    </div>
  )
}