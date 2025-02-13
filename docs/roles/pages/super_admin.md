# Super Admin Pages

## Dashboard (/super-admin/dashboard)

### Data Sources and Metrics

#### 1. System Health
Calculated from activity_logs table:
```sql
-- Overall API Health
SELECT 
  COUNT(*) as total_requests,
  AVG(api_response_time) as avg_response_time,
  COUNT(CASE WHEN api_status_code >= 500 THEN 1 END)::float / COUNT(*) * 100 as error_rate
FROM activity_logs 
WHERE timestamp > NOW() - INTERVAL '5 minutes'
AND api_endpoint IS NOT NULL;

-- Service-specific Health
SELECT 
  api_endpoint as service,
  COUNT(*) as requests,
  AVG(api_response_time) as latency,
  COUNT(CASE WHEN api_status_code >= 500 THEN 1 END)::float / COUNT(*) * 100 as error_rate
FROM activity_logs
WHERE timestamp > NOW() - INTERVAL '5 minutes'
GROUP BY api_endpoint;
```

#### 2. Security Metrics
From failed_login_attempts and audit_logs:
```sql
-- Failed Login Patterns
SELECT 
  ip_address,
  COUNT(*) as attempt_count,
  MIN(attempt_at) as first_attempt,
  MAX(attempt_at) as last_attempt
FROM failed_login_attempts 
WHERE attempt_at > NOW() - INTERVAL '1 hour'
GROUP BY ip_address, user_id
HAVING COUNT(*) > 5;

-- Security Events
SELECT 
  action,
  COUNT(*) as event_count
FROM audit_logs
WHERE category = 'SECURITY'
AND timestamp > NOW() - INTERVAL '24 hours'
GROUP BY action;
```

#### 3. Growth Metrics
From users and companies tables:
```sql
-- User Growth
WITH monthly_users AS (
  SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as user_count
  FROM users
  GROUP BY DATE_TRUNC('month', created_at)
)
SELECT 
  current.month,
  current.user_count,
  ((current.user_count - prev.user_count)::float / prev.user_count * 100) as growth_rate
FROM monthly_users current
LEFT JOIN monthly_users prev ON prev.month = current.month - INTERVAL '1 month';

-- Company Growth
SELECT 
  COUNT(*) as total_companies,
  COUNT(CASE WHEN status = 'ACTIVE' THEN 1 END) as active_companies,
  COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as new_companies
FROM companies;
```

#### 4. Resource Utilization
From usage_records table:
```sql
-- Overall Resource Usage
SELECT 
  resource_type,
  SUM(usage_amount) as total_usage,
  MAX(usage_amount) as peak_usage,
  AVG(usage_amount) as avg_usage
FROM usage_records
WHERE timestamp > NOW() - INTERVAL '1 hour'
GROUP BY resource_type;

-- Usage by Company
SELECT 
  c.name as company_name,
  ur.resource_type,
  SUM(ur.usage_amount) as total_usage
FROM usage_records ur
JOIN companies c ON c.id = ur.company_id
WHERE ur.timestamp > NOW() - INTERVAL '24 hours'
GROUP BY c.name, ur.resource_type;
```

#### 5. Activity Patterns
From activity_logs table:
```sql
-- Hourly Activity
SELECT 
  DATE_TRUNC('hour', timestamp) as hour,
  COUNT(*) as activity_count,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(api_response_time) as avg_response_time
FROM activity_logs
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', timestamp);

-- Feature Usage
SELECT 
  category,
  action,
  COUNT(*) as usage_count,
  COUNT(DISTINCT user_id) as unique_users
FROM activity_logs
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY category, action;
```

### Dashboard Components

1. System Overview
   - System health score (weighted average of service health)
   - Active security alerts count
   - Current active users
   - Resource utilization summary

2. Growth Metrics
   - Total users with growth rate
   - Total companies with growth rate
   - Monthly revenue (from invoices)

3. Resource Monitoring
   - CPU utilization
   - Memory usage
   - Storage usage
   - Network bandwidth

4. Security Status
   - Active security alerts
   - Recent failed login attempts
   - Suspicious IP activities
   - System configuration changes

5. Activity Feed
   - Recent system events
   - User activities
   - Error occurrences
   - Performance anomalies

### Implementation Notes

1. Real-time Updates:
   - Use Supabase Realtime for live metric updates
   - Subscribe to relevant tables for instant notifications
   - Implement websocket connections for live data

2. Performance Considerations:
   - Cache frequently accessed metrics
   - Use materialized views for complex calculations
   - Implement efficient data aggregation

3. Security Measures:
   - Implement rate limiting for API calls
   - Log all dashboard access attempts
   - Restrict access to super admin role only

4. Error Handling:
   - Graceful degradation when services are down
   - Clear error messages and status indicators
   - Automatic retry mechanisms for failed requests

### Key Actions
- View detailed metrics
- Export reports in various formats
- Configure alert thresholds
- Manage system notifications