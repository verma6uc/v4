export const mockGrowthMetrics = {
  users: {
    total: 12847,
    change: 15
  },
  companies: {
    total: 342,
    change: 8
  },
  revenue: {
    total: '$1.2M',
    change: 12
  }
};

export const mockUserGrowthData = [
  { label: 'Jan', value: 1200 },
  { label: 'Feb', value: 1900 },
  { label: 'Mar', value: 3000 },
  { label: 'Apr', value: 5000 },
  { label: 'May', value: 8200 },
  { label: 'Jun', value: 12847 }
];

export const mockServices = [
  {
    name: 'Authentication',
    uptime: 99.99,
    responseTime: 150,
    errorRate: 0.05,
    weight: 0.30
  },
  {
    name: 'Database',
    uptime: 99.95,
    responseTime: 200,
    errorRate: 0.08,
    weight: 0.25
  },
  {
    name: 'Storage',
    uptime: 99.90,
    responseTime: 180,
    errorRate: 0.03,
    weight: 0.20
  },
  {
    name: 'API Gateway',
    uptime: 99.98,
    responseTime: 120,
    errorRate: 0.02,
    weight: 0.15
  },
  {
    name: 'Other Services',
    uptime: 99.95,
    responseTime: 160,
    errorRate: 0.04,
    weight: 0.10
  }
];

export const mockResources = {
  cpu: 65,
  memory: 72,
  storage: 68,
  network: 55
};