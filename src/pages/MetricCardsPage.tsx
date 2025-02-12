import React from 'react'
import { MetricCard } from '../components/MetricCard'
import { Users, DollarSign, Activity, Clock, Zap, ShieldCheck, AlertTriangle, Server } from 'lucide-react'

export function MetricCardsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-16 pb-16">
      {/* Default Metrics */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Default Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '0ms' }}>
            <MetricCard 
              title="Total Users"
              value="24,421"
              change={12}
              icon={Users}
              description="Active users in the last 30 days"
              status="success"
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '100ms' }}>
            <MetricCard 
              title="Revenue"
              value="$45,241"
              change={8.2}
              icon={DollarSign}
              description="Monthly recurring revenue"
              status="info"
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '200ms' }}>
            <MetricCard 
              title="Active Sessions"
              value="1,234"
              change={-3.1}
              icon={Activity}
              description="Current active users on platform"
              status="warning"
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '300ms' }}>
            <MetricCard 
              title="Avg. Session Time"
              value="24m 13s"
              change={14.2}
              icon={Clock}
              description="Average session duration"
              status="success"
            />
          </div>
        </div>
      </section>

      {/* Compact Metrics */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Compact Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '400ms' }}>
            <MetricCard 
              title="CPU Usage"
              value="78%"
              icon={Zap}
              variant="compact"
              status="warning"
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '500ms' }}>
            <MetricCard 
              title="Memory Usage"
              value="4.2GB"
              icon={Server}
              variant="compact"
              status="success"
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '600ms' }}>
            <MetricCard 
              title="Security Score"
              value="A+"
              icon={ShieldCheck}
              variant="compact"
              status="success"
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '700ms' }}>
            <MetricCard 
              title="Error Rate"
              value="0.03%"
              icon={AlertTriangle}
              variant="compact"
              status="error"
            />
          </div>
        </div>
      </section>

      {/* Detailed Metrics */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Detailed Metrics with Sparkline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '800ms' }}>
            <MetricCard 
              title="Weekly Revenue"
              value="$128,432"
              change={24.5}
              icon={DollarSign}
              description="Total revenue across all products"
              variant="detailed"
              status="success"
              sparkline
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '900ms' }}>
            <MetricCard 
              title="Active Users"
              value="12,234"
              change={-8.1}
              icon={Users}
              description="Unique users in the past week"
              variant="detailed"
              status="warning"
              sparkline
            />
          </div>
        </div>
      </section>

      {/* Gradient Metrics */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Gradient Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <MetricCard 
              title="System Health"
              value="98%"
              change={2.4}
              icon={Activity}
              variant="gradient"
              status="success"
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '1100ms' }}>
            <MetricCard 
              title="Disk Space"
              value="85%"
              change={-5.2}
              icon={Server}
              variant="gradient"
              status="warning"
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '1200ms' }}>
            <MetricCard 
              title="Failed Jobs"
              value="3"
              change={50}
              icon={AlertTriangle}
              variant="gradient"
              status="error"
            />
          </div>
          <div className="motion-safe:animate-fade-in" style={{ animationDelay: '1300ms' }}>
            <MetricCard 
              title="Uptime"
              value="99.9%"
              change={0.1}
              icon={Clock}
              variant="gradient"
              status="info"
            />
          </div>
        </div>
      </section>
    </div>
  )
}