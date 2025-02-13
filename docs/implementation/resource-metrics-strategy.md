# Resource Utilization and Service Health Strategy

## Resource Utilization Metrics

### 1. System Resources
- **CPU Usage**
  ```sql
  SELECT 
    AVG(usage_amount) as avg_cpu_usage,
    MAX(usage_amount) as peak_cpu_usage,
    DATE_TRUNC('hour', timestamp) as hour
  FROM usage_records
  WHERE resource_type = 'cpu'
  GROUP BY DATE_TRUNC('hour', timestamp)
  ```
  - Track per-process CPU usage
  - Monitor CPU queue length
  - Track CPU temperature
  - Monitor context switches

- **Memory Usage**
  ```sql
  SELECT 
    SUM(usage_amount) as total_memory_used,
    AVG(usage_amount) as avg_memory_usage,
    MAX(usage_amount) as peak_memory_usage
  FROM usage_records
  WHERE resource_type = 'memory'
  ```
  - Track available memory
  - Monitor page faults
  - Track swap usage
  - Memory fragmentation metrics

- **Storage Usage**
  ```sql
  SELECT 
    SUM(usage_amount) as total_storage_used,
    COUNT(*) as file_count,
    AVG(io_operations) as avg_io_ops
  FROM usage_records
  WHERE resource_type = 'storage'
  ```
  - Monitor IOPS (Input/Output Operations Per Second)
  - Track disk latency
  - Monitor disk queue length
  - Track read/write ratios

- **Network Usage**
  ```sql
  SELECT 
    SUM(bytes_transferred) as total_transfer,
    AVG(latency) as avg_latency,
    MAX(concurrent_connections) as peak_connections
  FROM usage_records
  WHERE resource_type = 'network'
  ```
  - Monitor bandwidth usage
  - Track packet loss
  - Monitor network latency
  - Track connection states

### 2. Per-Company Resource Usage
```sql
SELECT 
  c.name as company_name,
  r.resource_type,
  SUM(r.usage_amount) as total_usage,
  AVG(r.usage_amount) as avg_usage,
  MAX(r.usage_amount) as peak_usage
FROM usage_records r
JOIN companies c ON c.id = r.company_id
GROUP BY c.name, r.resource_type
```

### 3. Resource Thresholds
```sql
CREATE TABLE resource_thresholds (
  resource_type VARCHAR(50),
  warning_threshold FLOAT,
  critical_threshold FLOAT,
  notification_interval INTEGER,
  last_notification TIMESTAMPTZ
);
```

## Service Health Metrics

### 1. Core Service Metrics
- **Authentication Service**
  ```sql
  SELECT 
    COUNT(*) as total_requests,
    AVG(response_time) as avg_response_time,
    COUNT(CASE WHEN status_code >= 500 THEN 1 END)::float / COUNT(*) * 100 as error_rate,
    COUNT(DISTINCT user_id) as unique_users
  FROM activity_logs
  WHERE api_endpoint LIKE '/auth/%'
  ```
  - Track login success rate
  - Monitor token validation time
  - Track MFA usage
  - Monitor session duration

- **Database Service**
  ```sql
  SELECT 
    AVG(query_time) as avg_query_time,
    MAX(query_time) as max_query_time,
    COUNT(CASE WHEN query_time > 1000 THEN 1 END) as slow_queries,
    COUNT(DISTINCT query_hash) as unique_queries
  FROM query_logs
  ```
  - Monitor query performance
  - Track connection pool usage
  - Monitor deadlocks
  - Track table sizes

- **Storage Service**
  ```sql
  SELECT 
    AVG(response_time) as avg_response_time,
    SUM(bytes_transferred) as total_transfer,
    COUNT(CASE WHEN status_code >= 400 THEN 1 END) as errors,
    COUNT(DISTINCT file_id) as files_accessed
  FROM storage_logs
  ```
  - Monitor upload/download speeds
  - Track file access patterns
  - Monitor storage quotas
  - Track file operations

### 2. Service Dependencies
```sql
CREATE TABLE service_dependencies (
  service_name VARCHAR(100),
  dependent_service VARCHAR(100),
  health_check_endpoint VARCHAR(255),
  check_interval INTEGER,
  timeout INTEGER
);
```

### 3. Service Health Calculation
```sql
CREATE OR REPLACE FUNCTION calculate_service_health(
  p_service_name VARCHAR,
  p_window_minutes INTEGER
) RETURNS FLOAT AS $$
DECLARE
  v_health FLOAT;
BEGIN
  SELECT 
    -- Base health score (40% weight)
    (CASE WHEN uptime >= 99.9 THEN 40
          WHEN uptime >= 99.0 THEN 30
          WHEN uptime >= 98.0 THEN 20
          ELSE 10 END) +
    -- Response time score (30% weight)
    (CASE WHEN avg_response_time <= 100 THEN 30
          WHEN avg_response_time <= 200 THEN 20
          WHEN avg_response_time <= 500 THEN 10
          ELSE 0 END) +
    -- Error rate score (30% weight)
    (CASE WHEN error_rate <= 0.1 THEN 30
          WHEN error_rate <= 0.5 THEN 20
          WHEN error_rate <= 1.0 THEN 10
          ELSE 0 END)
  INTO v_health
  FROM (
    SELECT 
      (COUNT(CASE WHEN status_code < 500 THEN 1 END)::float / COUNT(*) * 100) as uptime,
      AVG(response_time) as avg_response_time,
      (COUNT(CASE WHEN status_code >= 400 THEN 1 END)::float / COUNT(*) * 100) as error_rate
    FROM activity_logs
    WHERE service = p_service_name
    AND timestamp > NOW() - (p_window_minutes || ' minutes')::INTERVAL
  ) metrics;
  
  RETURN v_health;
END;
$$ LANGUAGE plpgsql;