# Audit Log Metrics Strategy

## Overview
This document outlines the strategy for calculating and displaying audit log metrics in the super admin dashboard.

## Metric Types

### 1. Total Events
- **Definition**: Total number of audit log entries within the selected time period
- **Calculation**:
```sql
SELECT COUNT(*) 
FROM audit_logs 
WHERE created_at >= NOW() - INTERVAL '1 month';
```
- **Month-over-Month Change**:
```sql
WITH current_month AS (
  SELECT COUNT(*) as count
  FROM audit_logs 
  WHERE created_at >= NOW() - INTERVAL '1 month'
),
previous_month AS (
  SELECT COUNT(*) as count
  FROM audit_logs 
  WHERE created_at >= NOW() - INTERVAL '2 months'
    AND created_at < NOW() - INTERVAL '1 month'
)
SELECT 
  ((current_month.count - previous_month.count)::float / 
   NULLIF(previous_month.count, 0) * 100) as percentage_change
FROM current_month, previous_month;
```

### 2. Security Events
- **Definition**: Events related to security operations (login attempts, permission changes, etc.)
- **Calculation**:
```sql
SELECT COUNT(*) 
FROM audit_logs 
WHERE category = 'security'
  AND created_at >= NOW() - INTERVAL '1 month';
```
- **Month-over-Month Change**: Similar to total events but filtered by security category

### 3. Critical Events
- **Definition**: Events marked with critical severity
- **Calculation**:
```sql
SELECT COUNT(*) 
FROM audit_logs 
WHERE severity = 'critical'
  AND created_at >= NOW() - INTERVAL '1 month';
```
- **Month-over-Month Change**: Similar calculation filtered by critical severity

### 4. Warning Events
- **Definition**: Events marked with warning severity
- **Calculation**:
```sql
SELECT COUNT(*) 
FROM audit_logs 
WHERE severity = 'warning'
  AND created_at >= NOW() - INTERVAL '1 month';
```
- **Month-over-Month Change**: Similar calculation filtered by warning severity

## Implementation Details

### Database Functions
Create the following functions to encapsulate the logic:

```sql
CREATE OR REPLACE FUNCTION get_audit_metric(
  p_category text DEFAULT NULL,
  p_severity text DEFAULT NULL,
  p_start_date timestamp,
  p_end_date timestamp
) RETURNS TABLE (
  count bigint,
  change_percentage numeric
) AS $$
BEGIN
  RETURN QUERY
  WITH current_period AS (
    SELECT COUNT(*) as count
    FROM audit_logs 
    WHERE created_at >= p_start_date
      AND created_at < p_end_date
      AND (p_category IS NULL OR category = p_category)
      AND (p_severity IS NULL OR severity = p_severity)
  ),
  previous_period AS (
    SELECT COUNT(*) as count
    FROM audit_logs 
    WHERE created_at >= p_start_date - (p_end_date - p_start_date)
      AND created_at < p_start_date
      AND (p_category IS NULL OR category = p_category)
      AND (p_severity IS NULL OR severity = p_severity)
  )
  SELECT 
    current_period.count,
    ROUND(((current_period.count - previous_period.count)::float / 
     NULLIF(previous_period.count, 0) * 100)::numeric, 1)
  FROM current_period, previous_period;
END;
$$ LANGUAGE plpgsql;
```

### Caching Strategy
1. Cache metric results with a 5-minute TTL
2. Implement real-time updates for critical events
3. Use Redis for caching with the following structure:
```typescript
interface AuditMetricCache {
  key: string;  // e.g., "audit:total:1month"
  value: {
    count: number;
    changePercentage: number;
    lastUpdated: string;
  };
  ttl: 300;  // 5 minutes
}
```

### Frontend Implementation
1. Fetch initial metrics on page load
2. Subscribe to real-time updates for critical events
3. Implement auto-refresh every 5 minutes
4. Show loading states during metric updates

### API Endpoints
Create the following RPC endpoints:
```typescript
interface GetAuditMetricsResponse {
  total: {
    count: number;
    changePercentage: number;
  };
  security: {
    count: number;
    changePercentage: number;
  };
  critical: {
    count: number;
    changePercentage: number;
  };
  warning: {
    count: number;
    changePercentage: number;
  };
}

// Supabase RPC function
const getAuditMetrics = async (timeRange: string): Promise<GetAuditMetricsResponse> => {
  const { data, error } = await supabase
    .rpc('get_audit_metrics', { p_time_range: timeRange });
  
  if (error) throw error;
  return data;
};
```

## Performance Considerations
1. Use materialized views for common metric calculations
2. Implement partitioning on the audit_logs table by month
3. Create appropriate indexes:
```sql
CREATE INDEX idx_audit_logs_created_at ON audit_logs (created_at);
CREATE INDEX idx_audit_logs_category ON audit_logs (category);
CREATE INDEX idx_audit_logs_severity ON audit_logs (severity);
```

## Error Handling
1. Handle division by zero in percentage calculations
2. Provide fallback values when metrics are unavailable
3. Implement retry logic for failed API calls
4. Log metric calculation errors for monitoring

## Monitoring
1. Track metric calculation performance
2. Monitor cache hit rates
3. Alert on unusual metric changes
4. Track real-time update latency