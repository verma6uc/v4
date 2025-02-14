import React from 'react';
import { AuditLogFilters } from '../../components/AuditLogFilters';
import { AuditLogMetrics } from '../../components/super-admin/AuditLogMetrics';
import { AuditLogTable } from '../../components/super-admin/AuditLogTable';
import { generateMockAuditLogs } from '../../utils/mockAuditLogs';
import { FilterGroup, DateRange, SeverityColors, CategoryColors } from '../../types/audit';

export function AuditLogsPage() {
  const [filterGroups, setFilterGroups] = React.useState<FilterGroup[]>([
    {
      operator: 'AND',
      conditions: [{ field: 'action', operator: 'equals', value: '' }]
    }
  ]);

  const [dateRange, setDateRange] = React.useState<DateRange>({
    start: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
    end: new Date()
  });

  const allLogs = React.useMemo(() => generateMockAuditLogs(), []);

  const filteredLogs = React.useMemo(() => {
    return allLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      
      // Apply filter groups
      // Skip filtering if no active conditions
      const hasActiveConditions = filterGroups.some(group => 
        group.conditions.some(condition => condition.value !== '')
      );
      
      if (!hasActiveConditions) return true;
      
      const matchesFilters = filterGroups.some(group => {
        // Each group is connected by OR
        return group.conditions.every(condition => {
          // Each condition within a group is connected by AND/OR based on group.operator
          let value: any;
          
          // Handle nested properties (e.g., company.name)
          if (condition.field.includes('.')) {
            const [obj, prop] = condition.field.split('.');
            value = log[obj as keyof typeof log]?.[prop];
          } else {
            value = log[condition.field as keyof typeof log];
          }
          
          // Skip if value is undefined (null fields)
          if (value === undefined) return false;
          
          switch (condition.operator) {
            case 'equals':
              return value === condition.value;
            case 'notEquals':
              return value !== condition.value;
            case 'contains':
              return typeof value === 'string' && value.toLowerCase().includes(condition.value.toLowerCase());
            case 'startsWith':
              return typeof value === 'string' && value.toLowerCase().startsWith(condition.value.toLowerCase());
            case 'endsWith':
              return typeof value === 'string' && value.toLowerCase().endsWith(condition.value.toLowerCase());
            default:
              return true;
          }
        });
      });
      
      return matchesFilters;
    }).filter(log => {
      // Apply date range filter
      const logDate = new Date(log.timestamp);
      return logDate >= dateRange.start && logDate <= dateRange.end;
    });
  }, [allLogs, dateRange, filterGroups]);

  const severityColors: SeverityColors = {
    info: 'info',
    warning: 'warning',
    critical: 'error'
  };

  const categoryColors: CategoryColors = {
    user: 'primary',
    company: 'primary',
    billing: 'info',
    security: 'error',
    system: 'warning',
    data: 'primary'
  };

  const handleFilterChange = (newFilterGroups: FilterGroup[], newDateRange: DateRange) => {
    setFilterGroups(newFilterGroups);
    setDateRange(newDateRange);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and monitor system activities and changes
        </p>
      </div>
      <AuditLogMetrics logs={filteredLogs} />
      
      <AuditLogFilters onFilterChange={handleFilterChange} />
      <AuditLogTable 
        logs={filteredLogs} 
        severityColors={severityColors} 
        categoryColors={categoryColors} 
      />
    </div>
  );
}