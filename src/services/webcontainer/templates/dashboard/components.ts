export const components = {
  'src/components/Sidebar.tsx': {
    file: {
      contents: `
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ClipboardList } from 'lucide-react';

export function Sidebar(): JSX.Element {
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
      `
    }
  },
  'src/components/Header.tsx': {
    file: {
      contents: `
import React, { useState } from 'react';
import { Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { NotificationsPanel } from './NotificationsPanel';

export function Header(): JSX.Element {
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
      `
    }
  },
  'src/components/NotificationsPanel.tsx': {
    file: {
      contents: `
import React from 'react';
import { MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

interface NotificationsPanelProps {
  show: boolean;
}

export function NotificationsPanel({ show }: NotificationsPanelProps): JSX.Element {
  return (
    <div className={\`notifications-panel \${show ? 'show' : ''}\`}>
      <div className="notifications-header">
        Stock Alerts
      </div>
      <div className="notification-item">
        <div className="notification-icon">
          <AlertCircle size={20} className="text-warning" />
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
      `
    }
  }
};