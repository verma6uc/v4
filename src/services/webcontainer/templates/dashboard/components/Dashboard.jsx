import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function Dashboard({ chartData }) {
  return (
    <main className="main">
      <h1>Inventory Overview</h1>
      
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-title">Total Stock Value</div>
          <div className="metric-value">$180,000</div>
          <div className="metric-change positive">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 4L14 10L2 10L8 4Z" fill="currentColor"/>
            </svg>
            12.5% vs last month
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">Total Items</div>
          <div className="metric-value">725</div>
          <div className="metric-change positive">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 4L14 10L2 10L8 4Z" fill="currentColor"/>
            </svg>
            8.1% vs last month
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">Low Stock Items</div>
          <div className="metric-value">12</div>
          <div className="metric-change negative">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12L14 6L2 6L8 12Z" fill="currentColor"/>
            </svg>
            3 more than last month
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">QC Pass Rate</div>
          <div className="metric-value">98.5%</div>
          <div className="metric-change positive">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 4L14 10L2 10L8 4Z" fill="currentColor"/>
            </svg>
            2.3% vs last month
          </div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Stock Level Trends</div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: '#4f46e5' }}></div>
                <span>Stock Level</span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="stockLevel" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Stock Value Trends</div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: '#22c55e' }}></div>
                <span>Stock Value</span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="stockValue" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}