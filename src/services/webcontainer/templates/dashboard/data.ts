export const chartData = [
  { name: 'Jan', users: 4000, revenue: 2400 },
  { name: 'Feb', users: 3000, revenue: 1398 },
  { name: 'Mar', users: 2000, revenue: 9800 },
  { name: 'Apr', users: 2780, revenue: 3908 },
  { name: 'May', users: 1890, revenue: 4800 },
  { name: 'Jun', users: 2390, revenue: 3800 },
  { name: 'Jul', users: 3490, revenue: 4300 },
];

export const companies = [
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

export const auditLogs = [
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