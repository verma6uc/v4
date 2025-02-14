export type AuditLog = {
  id: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'export' | 'import' | 'approve' | 'reject';
  category: 'user' | 'company' | 'billing' | 'security' | 'system' | 'data';
  actor: string;
  target: string;
  entity: string;
  company?: {
    id: string;
    name: string;
  };
  application?: {
    id: string;
    name: string;
  };
  space?: {
    id: string;
    name: string;
  };
  entityId: string;
  timestamp: string;
  ip: string;
  severity: 'info' | 'warning' | 'critical';
  details?: string;
};

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

export type SeverityColors = {
  info: BadgeVariant;
  warning: BadgeVariant;
  critical: BadgeVariant;
};

export type CategoryColors = {
  user: BadgeVariant;
  company: BadgeVariant;
  billing: BadgeVariant;
  security: BadgeVariant;
  system: BadgeVariant;
  data: BadgeVariant;
};

export interface FilterGroup {
  operator: 'AND' | 'OR';
  conditions: FilterCondition[];
}

export interface FilterCondition {
  field: string;
  operator: string;
  value: string;
}

export interface DateRange {
  start: Date;
  end: Date;
}