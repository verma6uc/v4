import { AuditLog } from '../types/audit';

export function generateMockAuditLogs(count: number = 15): AuditLog[] {
  const logs: AuditLog[] = [];
  const actions: AuditLog['action'][] = ['login', 'update', 'delete', 'export', 'approve', 'import'];
  const categories = ['security', 'billing', 'company', 'data'] as const;
  const severities = ['info', 'warning', 'critical'] as const;

  for (let i = 1; i <= count; i++) {
    const action = actions[i % actions.length];
    const category = categories[i % categories.length];
    const severity = severities[i % severities.length];
    
    logs.push({
      id: `LOG-${String(i).padStart(3, '0')}`,
      action,
      category,
      actor: `user${i}@example.com`,
      target: `Target ${i}`,
      entity: category === 'security' ? 'User' : 
             category === 'billing' ? 'Subscription' :
             category === 'company' ? 'Company' : 'Report',
      entityId: `${category.toUpperCase()}-${i}`,
      timestamp: new Date(Date.now() - i * 5 * 60000).toISOString(), // 5 minutes apart
      ip: `192.168.1.${i}`,
      severity,
      details: `Test audit log entry ${i}`
    });
    
    // Add company info for all logs
    logs[i-1].company = {
      id: `COMP-${i}`,
      name: `Company ${i}`
    };
    
    // Add application info for every third log
    if (i % 3 === 0) {
      logs[i-1].application = {
        id: `APP-${i}`,
        name: `Application ${i}`
      };
      logs[i-1].space = {
        id: `SPACE-${i}`,
        name: `Space ${i}`
      };
    }
  }

  return logs;
}