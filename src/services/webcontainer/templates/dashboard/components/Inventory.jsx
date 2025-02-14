import React, { useState } from 'react';
import { Search, Filter, PackagePlus, Edit, QrCode, MoreVertical, ChevronLeft, ChevronRight, Box } from 'lucide-react';
import { AddItemModal } from './AddItemModal';

export function Inventory({ initialItems }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState(initialItems);
  const itemsPerPage = 5;

  const handleAddItem = (newItem) => {
    setItems(prev => [...prev, newItem]);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'In Stock': return 'badge-success';
      case 'Low Stock': return 'badge-warning';
      default: return 'badge-danger';
    }
  };

  const getQCStatusBadgeClass = (status) => {
    switch (status) {
      case 'Passed': return 'badge-success';
      case 'Pending': return 'badge-warning';
      default: return 'badge-gray';
    }
  };

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

          <button 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
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
                  <span className={`badge ${getStatusBadgeClass(item.status)}`}>
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
                  <span className={`badge ${getQCStatusBadgeClass(item.qcStatus)}`}>
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

      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddItem}
      />
    </main>
  );
}