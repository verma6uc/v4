export interface SystemHealthData {
  score: number;
  change: number;
  services: ServiceHealth[];
}

export interface ServiceHealth {
  name: string;
  uptime: number;
  responseTime: number;
  errorRate: number;
  weight: number;
}

export interface SecurityAlertsData {
  activeAlerts: number;
  change: number;
  recentEvents: SecurityEvent[];
}

export interface SecurityEvent {
  type: string;
  count: number;
  source: string;
  timestamp: string;
}

export interface ResourceUsageData {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
}

export interface GrowthData {
  users: {
    total: number;
    change: number;
  };
  companies: {
    total: number;
    change: number;
  };
  revenue: {
    total: string;
    change: number;
  };
}

export interface ActivityItem {
  id: string;
  type: 'system_event' | 'security_event' | 'user_event';
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
}

// Component Props
export interface SystemHealthProps {
  data: SystemHealthData;
}

export interface SecurityAlertsProps {
  data: SecurityAlertsData;
}

export interface ResourceMetricsProps {
  metrics: ResourceUsageData;
}

export interface ServiceHealthTableProps {
  services: ServiceHealth[];
}

export interface GrowthMetricsProps {
  data: GrowthData;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
}