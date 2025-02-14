export const dashboardTemplate = {
  'index.html': {
    file: {
      contents: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Prototype</title>
    <style>
      :root {
        --primary-color: #4f46e5;
        --secondary-color: #6366f1;
        --success-color: #22c55e;
        --warning-color: #eab308;
        --danger-color: #ef4444;
      }
      
      body {
        margin: 0;
        padding: 0;
        font-family: system-ui, -apple-system, sans-serif;
        background-color: #f3f4f6;
      }

      /* Layout */
      .layout {
        display: grid;
        grid-template-columns: 250px 1fr;
        min-height: 100vh;
      }

      /* Sidebar */
      .sidebar {
        background-color: white;
        border-right: 1px solid #e5e7eb;
        padding: 1.5rem;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 2rem;
      }

      .nav-group {
        margin-bottom: 1.5rem;
      }

      .nav-title {
        color: #6b7280;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem;
        color: #374151;
        text-decoration: none;
        border-radius: 0.375rem;
        margin-bottom: 0.25rem;
      }

      .nav-link:hover {
        background-color: #f3f4f6;
      }

      .nav-link.active {
        background-color: #f3f4f6;
        color: var(--primary-color);
      }

      /* Header */
      .header {
        background-color: white;
        border-bottom: 1px solid #e5e7eb;
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1rem;
      }

      /* Notifications */
      .notifications {
        position: relative;
        padding: 0.5rem;
        border-radius: 0.375rem;
        cursor: pointer;
      }

      .notifications:hover {
        background-color: #f3f4f6;
      }

      .notifications-badge {
        position: absolute;
        top: 0;
        right: 0;
        background-color: var(--danger-color);
        color: white;
        font-size: 0.75rem;
        padding: 0.125rem 0.375rem;
        border-radius: 9999px;
      }

      .notifications-panel {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        width: 380px;
        background-color: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        margin-top: 0.5rem;
        z-index: 50;
      }

      .notifications-panel.show {
        display: block;
      }

      .notifications-header {
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        font-weight: 600;
      }

      .notification-item {
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        gap: 1rem;
        cursor: pointer;
      }

      .notification-item:hover {
        background-color: #f9fafb;
      }

      .notification-icon {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 9999px;
        background-color: #f3f4f6;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .notification-content {
        flex: 1;
      }

      .notification-title {
        font-weight: 500;
        margin-bottom: 0.25rem;
      }

      .notification-time {
        font-size: 0.875rem;
        color: #6b7280;
      }

      /* User Menu */
      .user-menu {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.375rem;
        cursor: pointer;
      }

      .user-menu:hover {
        background-color: #f3f4f6;
      }

      .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 9999px;
        background-color: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 500;
        font-size: 0.875rem;
      }

      .user-menu-dropdown {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        width: 200px;
        background-color: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        margin-top: 0.5rem;
        z-index: 50;
      }

      .user-menu-dropdown.show {
        display: block;
      }

      .menu-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: #374151;
        text-decoration: none;
      }

      .menu-item:hover {
        background-color: #f9fafb;
      }

      .menu-divider {
        height: 1px;
        background-color: #e5e7eb;
        margin: 0.5rem 0;
      }

      /* Main Content */
      .main {
        padding: 2rem;
      }

      .grid-cols-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }
      
      .metric-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
      }
      
      .metric-card:hover {
        transform: translateY(-2px);
      }
      
      .metric-title {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
      
      .metric-value {
        color: #111827;
        font-size: 1.875rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      .metric-change {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
      }
      
      .metric-change.positive { color: var(--success-color); }
      .metric-change.negative { color: var(--danger-color); }

      .chart-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .chart-title {
        font-weight: 600;
        color: #111827;
      }

      .chart-legend {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: #6b7280;
      }

      .legend-dot {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 9999px;
      }

      h1 {
        color: #111827;
        font-size: 1.875rem;
        font-weight: bold;
        margin-bottom: 2rem;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
      `
    }
  },
  'package.json': {
    file: {
      contents: `
{
  "name": "prototype",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "lucide-react": "^0.344.0",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "4.0.0",
    "vite": "4.3.9"
  }
}
      `
    }
  },
  'vite.config.js': {
    file: {
      contents: `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173
    }
  }
});
      `
    }
  },
  'src': {
    directory: {
      'main.jsx': {
        file: {
          contents: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
          `
        }
      },
      'App.jsx': {
        file: {
          contents: `
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  Building2, 
  ClipboardList,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  MessageSquare,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', users: 4000, revenue: 2400 },
  { name: 'Feb', users: 3000, revenue: 1398 },
  { name: 'Mar', users: 2000, revenue: 9800 },
  { name: 'Apr', users: 2780, revenue: 3908 },
  { name: 'May', users: 1890, revenue: 4800 },
  { name: 'Jun', users: 2390, revenue: 3800 },
  { name: 'Jul', users: 3490, revenue: 4300 },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">YUVI</div>
      
      <nav>
        <div className="nav-group">
          <div className="nav-title">Menu</div>
          <a href="#" className="nav-link active">
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a href="#" className="nav-link">
            <BarChart2 size={20} />
            Analytics
          </a>
          <a href="#" className="nav-link">
            <Building2 size={20} />
            Companies
          </a>
          <a href="#" className="nav-link">
            <ClipboardList size={20} />
            Audit Log
          </a>
        </div>
      </nav>
    </div>
  );
}

function NotificationsPanel({ show }) {
  return (
    <div className={\`notifications-panel \${show ? 'show' : ''}\`}>
      <div className="notifications-header">
        Notifications
      </div>
      <div className="notification-item">
        <div className="notification-icon">
          <MessageSquare size={20} className="text-primary" />
        </div>
        <div className="notification-content">
          <div className="notification-title">New message from John Doe</div>
          <div className="notification-time">2 minutes ago</div>
        </div>
      </div>
      <div className="notification-item">
        <div className="notification-icon">
          <AlertCircle size={20} className="text-warning" />
        </div>
        <div className="notification-content">
          <div className="notification-title">System alert: High CPU usage</div>
          <div className="notification-time">15 minutes ago</div>
        </div>
      </div>
      <div className="notification-item">
        <div className="notification-icon">
          <CheckCircle2 size={20} className="text-success" />
        </div>
        <div className="notification-content">
          <div className="notification-title">Task completed: Database backup</div>
          <div className="notification-time">1 hour ago</div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="header">
      <div className="notifications" onClick={() => setShowNotifications(!showNotifications)}>
        <Bell size={20} />
        <span className="notifications-badge">3</span>
        <NotificationsPanel show={showNotifications} />
      </div>
      
      <div className="user-menu" onClick={() => setShowUserMenu(!showUserMenu)}>
        <div className="avatar">JD</div>
        <span>John Doe</span>
        <ChevronDown size={16} />
        
        <div className={\`user-menu-dropdown \${showUserMenu ? 'show' : ''}\`}>
          <a href="#" className="menu-item">
            <User size={16} />
            Profile
          </a>
          <a href="#" className="menu-item">
            <Settings size={16} />
            Settings
          </a>
          <div className="menu-divider"></div>
          <a href="#" className="menu-item">
            <LogOut size={16} />
            Logout
          </a>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      
      <div>
        <Header />
        
        <main className="main">
          <h1>Dashboard Overview</h1>
          
          <div className="metric-grid">
            <div className="metric-card">
              <div className="metric-title">Total Revenue</div>
              <div className="metric-value">$48,574</div>
              <div className="metric-change positive">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 4L14 10L2 10L8 4Z" fill="currentColor"/>
                </svg>
                12.5% vs last month
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-title">Active Users</div>
              <div className="metric-value">2,420</div>
              <div className="metric-change positive">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 4L14 10L2 10L8 4Z" fill="currentColor"/>
                </svg>
                8.1% vs last month
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-title">Conversion Rate</div>
              <div className="metric-value">3.6%</div>
              <div className="metric-change negative">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 12L14 6L2 6L8 12Z" fill="currentColor"/>
                </svg>
                1.2% vs last month
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-title">Avg. Session Duration</div>
              <div className="metric-value">4m 12s</div>
              <div className="metric-change positive">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 4L14 10L2 10L8 4Z" fill="currentColor"/>
                </svg>
                15.3% vs last month
              </div>
            </div>
          </div>

          <div className="grid-cols-2">
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">User Growth</div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-dot" style={{ backgroundColor: '#4f46e5' }}></div>
                    <span>Users</span>
                  </div>
                </div>
              </div>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">Revenue Trends</div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-dot" style={{ backgroundColor: '#22c55e' }}></div>
                    <span>Revenue</span>
                  </div>
                </div>
              </div>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
          `
        }
      }
    }
  }
};