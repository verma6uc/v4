import { styles } from './styles';
import { chartData, inventoryItems, stockEvents } from './data';

export const dashboardTemplate = {
  'index.html': {
    file: {
      contents: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Inventory Manager</title>
    <style>
${styles}
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
  "name": "inventory-manager",
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
  Package,
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
  PackagePlus,
  FileText,
  Barcode,
  Database,
  Lock,
  Globe,
  Mail,
  Phone,
  MapPin,
  QrCode,
  AlertTriangle,
  Truck,
  Box
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Sample data
const chartData = ${JSON.stringify(chartData, null, 2)};
const inventoryItems = ${JSON.stringify(inventoryItems, null, 2)};
const stockEvents = ${JSON.stringify(stockEvents, null, 2)};

function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="logo">INVENTORY</div>
      
      <nav>
        <div className="nav-group">
          <div className="nav-title">Menu</div>
          <NavLink to="/" className={\`nav-link \${location.pathname === '/' ? 'active' : ''}\`}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/inventory" className={\`nav-link \${location.pathname === '/inventory' ? 'active' : ''}\`}>
            <Package size={20} />
            Inventory
          </NavLink>
          <NavLink to="/stock-events" className={\`nav-link \${location.pathname === '/stock-events' ? 'active' : ''}\`}>
            <ClipboardList size={20} />
            Stock Events
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
        Stock Alerts
      </div>
      <div className="notification-item">
        <div className="notification-icon">
          <AlertTriangle size={20} className="text-warning" />
        </div>
        <div className="notification-content">
          <div className="notification-title">Low Stock: Office Chair Pro</div>
          <div className="notification-time">2 minutes ago</div>
        </div>
      </div>
      <div className="notification-item">
        <div className="notification-icon">
          <AlertCircle size={20} className="text-danger" />
        </div>
        <div className="notification-content">
          <div className="notification-title">Out of Stock: Network Switch</div>
          <div className="notification-time">15 minutes ago</div>
        </div>
      </div>
      <div className="notification-item">
        <div className="notification-icon">
          <CheckCircle2 size={20} className="text-success" />
        </div>
        <div className="notification-content">
          <div className="notification-title">Stock Received: USB Cables</div>
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
        <div className="avatar">IM</div>
        <span>Inventory Manager</span>
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

function Inventory() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const itemsPerPage = 5;

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="main">
      <h1>Inventory Items</h1>
      
      <div className="table-container">
        <div className="table-filters">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1 }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search items or SKU..."
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Networking">Networking</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <button className="btn btn-primary">
            <PackagePlus size={16} />
            Add Item
          </button>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Item Details</th>
              <th>Status</th>
              <th>Location</th>
              <th>Value</th>
              <th>Stock Level</th>
              <th>QC Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="company-info">
                    <div className="company-logo">
                      <Box size={20} />
                    </div>
                    <div className="company-details">
                      <h3>{item.name}</h3>
                      <p>{item.sku} • {item.category}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={\`badge \${
                    item.status === 'In Stock' ? 'badge-success' :
                    item.status === 'Low Stock' ? 'badge-warning' :
                    'badge-danger'
                  }\`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.location}</td>
                <td>{item.value}</td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{item.quantity} units</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Reorder at {item.reorderPoint}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={\`badge \${
                    item.qcStatus === 'Passed' ? 'badge-success' :
                    item.qcStatus === 'Pending' ? 'badge-warning' :
                    'badge-gray'
                  }\`}>
                    {item.qcStatus}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-secondary" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="btn btn-secondary" title="Scan">
                      <QrCode size={16} />
                    </button>
                    <button className="btn btn-secondary" title="More">
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} items
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

function StockEvents() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('');
  const [date, setDate] = useState('');
  const itemsPerPage = 5;

  const filteredEvents = stockEvents.filter(event => {
    const matchesSearch = event.event.toLowerCase().includes(search.toLowerCase()) ||
                         event.item.toLowerCase().includes(search.toLowerCase()) ||
                         event.details.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = !severity || event.severity === severity;
    const matchesDate = !date || event.timestamp.startsWith(date);
    return matchesSearch && matchesSeverity && matchesDate;
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="main">
      <h1>Stock Events</h1>
      
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
              <th>Item</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Location</th>
              <th>Timestamp</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {displayedEvents.map(event => (
              <tr key={event.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {event.category === 'Stock Level' && <Package size={16} />}
                    {event.category === 'Quality Control' && <Shield size={16} />}
                    {event.category === 'Stock Movement' && <Truck size={16} />}
                    {event.event}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{event.item}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{event.sku}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-gray">
                    {event.category}
                  </span>
                </td>
                <td>
                  <span className={\`badge \${
                    event.severity === 'error' ? 'badge-danger' :
                    event.severity === 'warning' ? 'badge-warning' :
                    'badge-success'
                  }\`}>
                    {event.severity}
                  </span>
                </td>
                <td>{event.location}</td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{format(new Date(event.timestamp), 'MMM d, yyyy')}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {format(new Date(event.timestamp), 'HH:mm:ss')}
                    </span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{event.details}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{event.action}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-pagination">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEvents.length)} of {filteredEvents.length} events
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
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/stock-events" element={<StockEvents />} />
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
