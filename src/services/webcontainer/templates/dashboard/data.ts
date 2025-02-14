export const chartData = [
  { name: 'Jan', stockLevel: 4000, stockValue: 240000 },
  { name: 'Feb', stockLevel: 3000, stockValue: 139800 },
  { name: 'Mar', stockLevel: 2000, stockValue: 980000 },
  { name: 'Apr', stockLevel: 2780, stockValue: 390800 },
  { name: 'May', stockLevel: 1890, stockValue: 480000 },
  { name: 'Jun', stockLevel: 2390, stockValue: 380000 },
  { name: 'Jul', stockLevel: 3490, stockValue: 430000 },
];

export const inventoryItems = [
  { 
    id: 1, 
    name: 'Laptop Model X15', 
    status: 'In Stock',
    quantity: 125,
    category: 'Electronics',
    location: 'Warehouse A-12',
    value: '$125,000',
    sku: 'LAP-X15-001',
    supplier: {
      name: 'TechSupply Corp',
      contact: 'sarah@techsupply.com',
      phone: '+1 (415) 555-0123'
    },
    lastUpdated: '2024-02-14T08:30:00Z',
    reorderPoint: 50,
    qcStatus: 'Passed'
  },
  { 
    id: 2, 
    name: 'Office Chair Pro', 
    status: 'Low Stock',
    quantity: 25,
    category: 'Furniture',
    location: 'Warehouse B-03',
    value: '$12,500',
    sku: 'FRN-CHR-002',
    supplier: {
      name: 'Ergonomics Plus',
      contact: 'mike@ergonomics.com',
      phone: '+1 (313) 555-0456'
    },
    lastUpdated: '2024-02-14T07:45:00Z',
    reorderPoint: 30,
    qcStatus: 'Pending'
  },
  { 
    id: 3, 
    name: 'Network Switch 24-Port', 
    status: 'Out of Stock',
    quantity: 0,
    category: 'Networking',
    location: 'Warehouse A-05',
    value: '$0',
    sku: 'NET-SW24-003',
    supplier: {
      name: 'NetworkPro Systems',
      contact: 'alex@networkpro.com',
      phone: '+1 (512) 555-0789'
    },
    lastUpdated: '2024-02-13T15:20:00Z',
    reorderPoint: 10,
    qcStatus: 'N/A'
  },
  { 
    id: 4, 
    name: 'Printer LaserJet P4', 
    status: 'In Stock',
    quantity: 75,
    category: 'Electronics',
    location: 'Warehouse A-08',
    value: '$37,500',
    sku: 'PRN-LJ4-004',
    supplier: {
      name: 'PrintTech Solutions',
      contact: 'emily@printtech.com',
      phone: '+1 (617) 555-0321'
    },
    lastUpdated: '2024-02-14T09:15:00Z',
    reorderPoint: 25,
    qcStatus: 'Passed'
  },
  { 
    id: 5, 
    name: 'USB-C Cables 2m', 
    status: 'In Stock',
    quantity: 500,
    category: 'Accessories',
    location: 'Warehouse C-15',
    value: '$5,000',
    sku: 'ACC-USB-005',
    supplier: {
      name: 'Cable Solutions Inc',
      contact: 'david@cablesol.com',
      phone: '+1 (503) 555-0654'
    },
    lastUpdated: '2024-02-14T08:00:00Z',
    reorderPoint: 200,
    qcStatus: 'Passed'
  }
];

export const stockEvents = [
  {
    id: 1,
    event: 'Low Stock Alert',
    action: 'Reorder Required',
    item: 'Office Chair Pro',
    sku: 'FRN-CHR-002',
    severity: 'warning',
    category: 'Stock Level',
    timestamp: '2024-02-14T08:30:00Z',
    location: 'Warehouse B-03',
    details: 'Stock level below reorder point (25 < 30)'
  },
  {
    id: 2,
    event: 'Quality Check',
    action: 'Inspection Complete',
    item: 'Laptop Model X15',
    sku: 'LAP-X15-001',
    severity: 'info',
    category: 'Quality Control',
    timestamp: '2024-02-14T09:15:00Z',
    location: 'QC Station 2',
    details: 'Batch inspection passed - 50 units verified'
  },
  {
    id: 3,
    event: 'Stock Out',
    action: 'Emergency Order Required',
    item: 'Network Switch 24-Port',
    sku: 'NET-SW24-003',
    severity: 'error',
    category: 'Stock Level',
    timestamp: '2024-02-14T09:45:00Z',
    location: 'Warehouse A-05',
    details: 'Item completely out of stock - 3 pending orders affected'
  },
  {
    id: 4,
    event: 'Stock Receipt',
    action: 'Inventory Updated',
    item: 'USB-C Cables 2m',
    sku: 'ACC-USB-005',
    severity: 'info',
    category: 'Stock Movement',
    timestamp: '2024-02-14T10:00:00Z',
    location: 'Receiving Dock 1',
    details: 'Received 200 units from Cable Solutions Inc'
  },
  {
    id: 5,
    event: 'Damaged Stock',
    action: 'QC Review Required',
    item: 'Printer LaserJet P4',
    sku: 'PRN-LJ4-004',
    severity: 'warning',
    category: 'Quality Control',
    timestamp: '2024-02-14T10:30:00Z',
    location: 'Warehouse A-08',
    details: '5 units reported damaged during handling'
  },
  {
    id: 6,
    event: 'Stock Movement',
    action: 'Location Update',
    item: 'Laptop Model X15',
    sku: 'LAP-X15-001',
    severity: 'info',
    category: 'Stock Movement',
    timestamp: '2024-02-14T11:00:00Z',
    location: 'Warehouse A-12',
    details: 'Relocated 30 units from overflow storage'
  }
];