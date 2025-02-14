export const inventoryComponents = {
  'src/components/inventory/AddItemModal.tsx': {
    file: {
      contents: `
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FormData {
  name: string;
  category: string;
  quantity: string;
  location: string;
  sku: string;
  reorderPoint: string;
  supplier: {
    name: string;
    contact: string;
    phone: string;
  };
}

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
}

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    quantity: '',
    location: '',
    sku: '',
    reorderPoint: '',
    supplier: {
      name: '',
      contact: '',
      phone: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Date.now(),
      status: 'In Stock',
      value: '$' + (parseFloat(formData.quantity) * 100).toFixed(2),
      lastUpdated: new Date().toISOString(),
      qcStatus: 'Pending'
    });
    setFormData({
      name: '',
      category: '',
      quantity: '',
      location: '',
      sku: '',
      reorderPoint: '',
      supplier: {
        name: '',
        contact: '',
        phone: ''
      }
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('supplier.')) {
      const supplierField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        supplier: {
          ...prev.supplier,
          [supplierField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Add New Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Networking">Networking</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
                placeholder="e.g., Warehouse A-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
                placeholder="e.g., ELEC-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reorder Point
              </label>
              <input
                type="number"
                name="reorderPoint"
                value={formData.reorderPoint}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
                min="0"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium mb-2">Supplier Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier Name
                </label>
                <input
                  type="text"
                  name="supplier.name"
                  value={formData.supplier.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="supplier.contact"
                  value={formData.supplier.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="supplier.phone"
                  value={formData.supplier.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                  placeholder="+1 (123) 456-7890"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
      `
    }
  },
  'src/components/inventory/Inventory.tsx': {
    file: {
      contents: `
import React, { useState } from 'react';
import { Search, Filter, PackagePlus, Edit, QrCode, MoreVertical, ChevronLeft, ChevronRight, Box } from 'lucide-react';
import { AddItemModal } from './AddItemModal';

interface InventoryItem {
  id: string | number;
  name: string;
  sku: string;
  category: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  location: string;
  value: string;
  quantity: number;
  reorderPoint: number;
  qcStatus: 'Passed' | 'Pending' | 'Failed';
}

interface InventoryProps {
  initialItems: InventoryItem[];
}

export function Inventory({ initialItems }: InventoryProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState(initialItems);
  const itemsPerPage = 5;

  const handleAddItem = (newItem: InventoryItem) => {
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

  const getStatusBadgeClass = (status: InventoryItem['status']): string => {
    switch (status) {
      case 'In Stock': return 'badge-success';
      case 'Low Stock': return 'badge-warning';
      default: return 'badge-danger';
    }
  };

  const getQCStatusBadgeClass = (status: InventoryItem['qcStatus']): string => {
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
                  <span className={\`badge \${getStatusBadgeClass(item.status)}\`}>
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
                  <span className={\`badge \${getQCStatusBadgeClass(item.qcStatus)}\`}>
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

      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddItem}
      />
    </main>
  );
}
      `
    }
  }
};