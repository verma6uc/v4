export const styles = `
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
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
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
  position: sticky;
  top: 0;
  z-index: 40;
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

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
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

/* Table Styles */
.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background-color: #f9fafb;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 500;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #6b7280;
}

.table tr:hover td {
  background-color: #f9fafb;
}

.table-filters {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-input {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success {
  background-color: #dcfce7;
  color: #166534;
}

.badge-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-danger {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-info {
  background-color: #dbeafe;
  color: #1e40af;
}

.badge-purple {
  background-color: #f3e8ff;
  color: #6b21a8;
}

.badge-gray {
  background-color: #f3f4f6;
  color: #374151;
}

.table-pagination {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-info {
  font-size: 0.875rem;
  color: #6b7280;
}

.pagination-buttons {
  display: flex;
  gap: 0.5rem;
}

.pagination-button {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  cursor: pointer;
}

.pagination-button:hover {
  background-color: #f9fafb;
}

.pagination-button.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-secondary {
  background-color: white;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background-color: #f9fafb;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.company-logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-weight: 600;
  font-size: 1rem;
}

.company-details h3 {
  margin: 0;
  color: #111827;
  font-size: 0.875rem;
  font-weight: 500;
}

.company-details p {
  margin: 0;
  color: #6b7280;
  font-size: 0.75rem;
}

h1 {
  color: #111827;
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2rem;
}`;