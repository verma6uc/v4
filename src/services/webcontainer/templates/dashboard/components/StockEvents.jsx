import React, { useState } from 'react';
import { Search, Filter, Package, Shield, Truck } from 'lucide-react';
import { format } from 'date-fns';

export function StockEvents({ events }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('');
  const [date, setDate] = useState('');
  const itemsPerPage = 5;

  const filteredEvents = events.filter(event => {
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

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'error': return 'badge-danger';
      case 'warning': return 'badge-warning';
      default: return 'badge-success';
    }
  };

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
                  <span className={`badge ${getSeverityBadgeClass(event.severity)}`}>
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
                className={`pagination-button ${page === i + 1 ? 'active' : ''}`}
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