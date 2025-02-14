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
      /* ... Previous CSS ... */
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
    "recharts": "^2.12.0",
    "react-router-dom": "^6.22.0",
    "date-fns": "^3.3.1"
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
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
          `
        }
      },
      'App.jsx': {
        file: {
          contents: `
import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  LayoutDashboard, 
  Building2, 
  ClipboardList,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  Shield,
  UserPlus,
  FileText,
  Key,
  Database,
  Lock,
  Globe,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Sample data for charts
const chartData = [
  { name: 'Jan', users: 4000, revenue: 2400 },
  { name: 'Feb', users: 3000, revenue: 1398 },
  { name: 'Mar', users: 2000, revenue: 9800 },
  { name: 'Apr', users: 2780, revenue: 3908 },
  { name: 'May', users: 1890, revenue: 4800 },
  { name: 'Jun', users: 2390, revenue: 3800 },
  { name: 'Jul', users: 3490, revenue: 4300 },
];

// Sample companies data
const companies = [
  { 
    id: 1, 
    name: 'TechCorp Solutions', 
    status: 'Active',
    employees: 1250,
    industry: 'Technology',
    location: 'San Francisco, CA',
    revenue: '$25M - $50M',
    subscription: 'Enterprise',
    website: 'techcorp.com',
    contact: {
      name: 'Sarah Chen',
      email: 'sarah@techcorp.com',
      phone: '+1 (415) 555-0123'
    },
    lastActive: '2024-02-14T08:30:00Z'
  },
  { 
    id: 2, 
    name: 'GlobalManufacturing Inc', 
    status: 'Active',
    employees: 5000,
    industry: 'Manufacturing',
    location: 'Detroit, MI',
    revenue: '$100M - $500M',
    subscription: 'Enterprise Plus',
    website: 'globalmanufacturing.com',
    contact: {
      name: 'Michael Johnson',
      email: 'mjohnson@globalmanufacturing.com',
      phone: '+1 (313) 555-0456'
    },
    lastActive: '2024-02-14T07:45:00Z'
  },
  { 
    id: 3, 
    name: 'CloudServe Systems', 
    status: 'Inactive',
    employees: 180,
    industry: 'Technology',
    location: 'Austin, TX',
    revenue: '$5M - $10M',
    subscription: 'Professional',
    website: 'cloudserve.io',
    contact: {
      name: 'Alex Rivera',
      email: 'alex@cloudserve.io',
      phone: '+1 (512) 555-0789'
    },
    lastActive: '2024-02-13T15:20:00Z'
  },
  { 
    id: 4, 
    name: 'HealthPlus Medical', 
    status: 'Active',
    employees: 3200,
    industry: 'Healthcare',
    location: 'Boston, MA',
    revenue: '$50M - $100M',
    subscription: 'Enterprise',
    website: 'healthplus.org',
    contact: {
      name: 'Dr. Emily Wong',
      email: 'ewong@healthplus.org',
      phone: '+1 (617) 555-0321'
    },
    lastActive: '2024-02-14T09:15:00Z'
  },
  { 
    id: 5, 
    name: 'EcoEnergy Solutions', 
    status: 'Active',
    employees: 750,
    industry: 'Energy',
    location: 'Portland, OR',
    revenue: '$10M - $25M',
    subscription: 'Professional',
    website: 'ecoenergy.com',
    contact: {
      name: 'David Miller',
      email: 'david@ecoenergy.com',
      phone: '+1 (503) 555-0654'
    },
    lastActive: '2024-02-14T08:00:00Z'
  }
];

// Sample audit logs data
const auditLogs = [
  {
    id: 1,
    event: 'User Authentication',
    action: 'Login Success',
    user: 'john.doe@company.com',
    userType: 'Employee',
    severity: 'info',
    category: 'Authentication',
    timestamp: '2024-02-14T08:30:00Z',
    ipAddress: '192.168.1.100',
    device: 'Chrome on MacOS',
    location: 'San Francisco, US',
    details: 'Successful login via SSO'
  },
  {
    id: 2,
    event: 'Permission Change',
    action: 'Role Modified',
    user: 'admin@company.com',
    userType: 'Administrator',
    severity: 'warning',
    category: 'Security',
    timestamp: '2024-02-14T09:15:00Z',
    ipAddress: '192.168.1.101',
    device: 'Firefox on Windows',
    location: 'New York, US',
    details: 'Modified permissions for Marketing group'
  },
  {
    id: 3,
    event: 'Security Alert',
    action: 'Failed Login',
    user: 'unknown',
    userType: 'Unknown',
    severity: 'error',
    category: 'Security',
    timestamp: '2024-02-14T09:45:00Z',
    ipAddress: '192.168.1.102',
    device: 'Unknown',
    location: 'Beijing, CN',
    details: 'Multiple failed login attempts detected'
  },
  {
    id: 4,
    event: 'Data Access',
    action: 'File Download',
    user: 'jane.smith@company.com',
    userType: 'Manager',
    severity: 'info',
    category: 'Data',
    timestamp: '2024-02-14T10:00:00Z',
    ipAddress: '192.168.1.103',
    device: 'Safari on iOS',
    location: 'London, UK',
    details: 'Downloaded Q4 financial report'
  },
  {
    id: 5,
    event: 'System Change',
    action: 'Configuration Update',
    user: 'system.admin@company.com',
    userType: 'System Admin',
    severity: 'warning',
    category: 'System',
    timestamp: '2024-02-14T10:30:00Z',
    ipAddress: '192.168.1.104',
    device: 'Chrome on Windows',
    location: 'Toronto, CA',
    details: 'Updated firewall rules'
  },
  {
    id: 6,
    event: 'API Access',
    action: 'Rate Limit Exceeded',
    user: 'api.user@partner.com',
    userType: 'API User',
    severity: 'error',
    category: 'API',
    timestamp: '2024-02-14T11:00:00Z',
    ipAddress: '192.168.1.105',
    device: 'API Client',
    location: 'Singapore, SG',
    details: 'API rate limit exceeded for /users endpoint'
  }
];

function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="logo">YUVI</div>
      
      <nav>
        <div className="nav-group">
          <div className="nav-title">Menu</div>
          <NavLink to="/" className={\`nav-link \${location.pathname === '/' ? 'active' : ''}\`}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/companies" className={\`nav-link \${location.pathname === '/companies' ? 'active' : ''}\`}>
            <Building2 size={20} />
            Companies
          </NavLink>
          <NavLink to="/audit-log" className={\`nav-link \${location.pathname === '/audit-log' ? 'active' : ''}\`}>
            <ClipboardList size={20} />
            Audit Log
          </NavLink>
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

function Dashboard() {
  return (
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
              <AreaChart data={chartData}>
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
              <LineChart data={chartData}>
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
  );
}

function Companies() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const itemsPerPage = 5;

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) ||
                         company.location.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = !industry || company.industry === industry;
    return matchesSearch && matchesIndustry;
  });

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="main">
      <h1>Companies</h1>
      
      <div className="table-container">
        <div className="table-filters">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1 }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search companies..."
              className="filter-input"
              style={{ flex: 1 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Filter size={16} />
            <select 
              className="filter-input"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Energy">Energy</option>
            </select>
          </div>

          <button className="btn btn-primary">
            <UserPlus size={16} />
            Add Company
          </button>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Status</th>
              <th>Location</th>
              <th>Revenue</th>
              <th>Subscription</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedCompanies.map(company => (
              <tr key={company.id}>
                <td>
                  <div className="company-info">
                    <div className="company-logo">
                      {company.name.charAt(0)}
                    </div>
                    <div className="company-details">
                      <h3>{company.name}</h3>
                      <p>{company.industry} • {company.employees} employees</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={\`badge \${company.status === 'Active' ? 'badge-success' : 'badge-warning'}\`}>
                    {company.status}
                  </span>
                </td>
                <td>{company.location}</td>
                <td>{company.revenue}</td>
                <td>
                  <span className={\`badge \${
                    company.subscription === 'Enterprise Plus' ? 'badge-purple' :
                    company.subscription === 'Enterprise' ? 'badge-info' :
                    'badge-gray'
                  }\`}>
                    {company.subscription}
                  </span>
                </td>
                <td>{formatDistanceToNow(new Date(company.lastActive), { addSuffix: true })}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-secondary">
                      <Edit size={16} />
                    </button>
                    <button className="btn btn-secondary">
                      <ExternalLink size={16} />
                    </button>
                    <button className="btn btn-secondary">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-pagination">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCompanies.length)} of {filteredCompanies.length} companies
          </div>
          <div className="pagination-buttons">
            <button
              className="pagination-button"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={\`pagination-button \${page === i + 1 ? 'active' : ''}\`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="pagination-button"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function AuditLog() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('');
  const [date, setDate] = useState('');
  const itemsPerPage = 5;

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.event.toLowerCase().includes(search.toLowerCase()) ||
                         log.user.toLowerCase().includes(search.toLowerCase()) ||
                         log.details.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = !severity || log.severity === severity;
    const matchesDate = !date || log.timestamp.startsWith(date);
    return matchesSearch && matchesSeverity && matchesDate;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="main">
      <h1>Audit Log</h1>
      
      <div className="table-container">
        <div className="table-filters">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1 }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search events..."
              className="filter-input"
              style={{ flex: 1 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Filter size={16} />
            <select 
              className="filter-input"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <input
            type="date"
            className="filter-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>User</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Location</th>
              <th>Timestamp</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {displayedLogs.map(log => (
              <tr key={log.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {log.category === 'Authentication' && <Key size={16} />}
                    {log.category === 'Security' && <Shield size={16} />}
                    {log.category === 'Data' && <Database size={16} />}
                    {log.category === 'System' && <Settings size={16} />}
                    {log.category === 'API' && <Globe size={16} />}
                    {log.event}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{log.user}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{log.userType}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-gray">
                    {log.category}
                  </span>
                </td>
                <td>
                  <span className={\`badge \${
                    log.severity === 'error' ? 'badge-danger' :
                    log.severity === 'warning' ? 'badge-warning' :
                    'badge-success'
                  }\`}>
                    {log.severity}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{log.location}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{log.ipAddress}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{format(new Date(log.timestamp), 'MMM d, yyyy')}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {format(new Date(log.timestamp), 'HH:mm:ss')}
                    </span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{log.details}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{log.device}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-pagination">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} events
          </div>
          <div className="pagination-buttons">
            <button
              className="pagination-button"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={\`pagination-button \${page === i + 1 ? 'active' : ''}\`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="pagination-button"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      
      <div>
        <Header />
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/audit-log" element={<AuditLog />} />
        </Routes>
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
