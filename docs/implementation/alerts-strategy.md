# Alerts and Thresholds Strategy

## Alert Categories

### 1. Resource Alerts

#### CPU Alerts
```sql
CREATE TABLE cpu_alert_thresholds (
  threshold_id UUID PRIMARY KEY,
  warning_threshold FLOAT DEFAULT 70.0,  -- 70% CPU usage
  critical_threshold FLOAT DEFAULT 90.0,  -- 90% CPU usage
  sustained_minutes INTEGER DEFAULT 5,    -- Sustained for 5 minutes
  cooldown_minutes INTEGER DEFAULT 15     -- Wait 15 minutes before re-alerting
);
```

#### Memory Alerts
```sql
CREATE TABLE memory_alert_thresholds (
  threshold_id UUID PRIMARY KEY,
  warning_threshold FLOAT DEFAULT 75.0,   -- 75% memory usage
  critical_threshold FLOAT DEFAULT 90.0,  -- 90% memory usage
  swap_usage_threshold FLOAT DEFAULT 50.0 -- Alert when swap usage exceeds 50%
);
```

#### Storage Alerts
```sql
CREATE TABLE storage_alert_thresholds (
  threshold_id UUID PRIMARY KEY,
  space_warning_threshold FLOAT DEFAULT 80.0,  -- 80% storage used
  space_critical_threshold FLOAT DEFAULT 90.0, -- 90% storage used
  iops_threshold INTEGER DEFAULT 5000,         -- IOPS threshold
  latency_threshold INTEGER DEFAULT 100        -- ms latency threshold
);
```

#### Network Alerts
```sql
CREATE TABLE network_alert_thresholds (
  threshold_id UUID PRIMARY KEY,
  bandwidth_threshold FLOAT DEFAULT 80.0,  -- 80% bandwidth utilization
  latency_threshold INTEGER DEFAULT 100,   -- ms latency threshold
  packet_loss_threshold FLOAT DEFAULT 1.0, -- 1% packet loss threshold
  connection_threshold INTEGER DEFAULT 1000 -- max connections
);
```

### 2. Service Health Alerts

#### Response Time Alerts
```sql
CREATE TABLE service_response_alerts (
  service_name VARCHAR(100),
  warning_threshold INTEGER DEFAULT 200,   -- ms
  critical_threshold INTEGER DEFAULT 500,  -- ms
  sample_size INTEGER DEFAULT 100,        -- minimum samples
  check_interval INTEGER DEFAULT 1         -- minutes
);
```

#### Error Rate Alerts
```sql
CREATE TABLE service_error_alerts (
  service_name VARCHAR(100),
  error_rate_threshold FLOAT DEFAULT 1.0,  -- 1% error rate
  error_count_threshold INTEGER DEFAULT 50, -- or 50 errors
  time_window INTEGER DEFAULT 5            -- minutes
);
```

#### Availability Alerts
```sql
CREATE TABLE service_availability_alerts (
  service_name VARCHAR(100),
  uptime_threshold FLOAT DEFAULT 99.9,     -- 99.9% uptime required
  check_interval INTEGER DEFAULT 1,        -- minutes
  consecutive_failures INTEGER DEFAULT 3    -- failures before alert
);
```

## Alert Aggregation Logic

### 1. Resource Alert Aggregation
```sql
CREATE OR REPLACE FUNCTION check_resource_alerts()
RETURNS TABLE (
  alert_id UUID,
  resource_type VARCHAR,
  severity VARCHAR,
  message TEXT,
  metric_value FLOAT,
  threshold_value FLOAT
) AS $$
BEGIN
  -- CPU Alerts
  INSERT INTO alerts (resource_type, severity, message)
  SELECT 
    'CPU',
    CASE 
      WHEN avg_usage >= critical_threshold THEN 'CRITICAL'
      WHEN avg_usage >= warning_threshold THEN 'WARNING'
    END,
    format('CPU usage at %s%% (threshold: %s%%)', 
           round(avg_usage::numeric, 2), 
           round(CASE WHEN avg_usage >= critical_threshold 
                     THEN critical_threshold 
                     ELSE warning_threshold END::numeric, 2))
  FROM (
    SELECT AVG(usage_amount) as avg_usage
    FROM usage_records
    WHERE resource_type = 'cpu'
    AND timestamp > NOW() - INTERVAL '5 minutes'
  ) metrics
  CROSS JOIN cpu_alert_thresholds
  WHERE avg_usage >= warning_threshold;

  -- Similar logic for memory, storage, and network
END;
$$ LANGUAGE plpgsql;
```

### 2. Service Health Alert Aggregation
```sql
CREATE OR REPLACE FUNCTION check_service_health_alerts()
RETURNS TABLE (
  alert_id UUID,
  service_name VARCHAR,
  severity VARCHAR,
  message TEXT,
  metric_value FLOAT,
  threshold_value FLOAT
) AS $$
BEGIN
  -- Response Time Alerts
  INSERT INTO alerts (service_name, severity, message)
  SELECT 
    service_name,
    CASE 
      WHEN avg_response_time >= critical_threshold THEN 'CRITICAL'
      WHEN avg_response_time >= warning_threshold THEN 'WARNING'
    END,
    format('Service %s response time: %sms (threshold: %sms)',
           service_name,
           round(avg_response_time::numeric, 2),
           round(CASE WHEN avg_response_time >= critical_threshold 
                     THEN critical_threshold 
                     ELSE warning_threshold END::numeric, 2))
  FROM (
    SELECT 
      service_name,
      AVG(response_time) as avg_response_time
    FROM activity_logs
    WHERE timestamp > NOW() - INTERVAL '5 minutes'
    GROUP BY service_name
  ) metrics
  JOIN service_response_alerts sra USING (service_name)
  WHERE avg_response_time >= warning_threshold;

  -- Similar logic for error rates and availability
END;
$$ LANGUAGE plpgsql;
```

## Alert Notification Strategy

### 1. Alert Severity Levels
```sql
CREATE TYPE alert_severity AS ENUM (
  'INFO',      -- Informational, no action needed
  'WARNING',   -- Potential issue, monitor closely
  'ERROR',     -- Issue requires attention
  'CRITICAL'   -- Immediate action required
);
```

### 2. Alert Routing
```sql
CREATE TABLE alert_routing (
  alert_type VARCHAR(100),
  severity alert_severity,
  notification_channel VARCHAR(100),  -- email, slack, pagerduty, etc.
  cooldown_minutes INTEGER,          -- minimum time between alerts
  auto_resolve BOOLEAN,              -- auto-resolve if condition clears
  escalation_minutes INTEGER         -- time before escalating
);
```

### 3. Alert Aggregation Rules
```sql
CREATE TABLE alert_aggregation_rules (
  rule_id UUID PRIMARY KEY,
  alert_type VARCHAR(100),
  group_by VARCHAR[],               -- fields to group by
  window_minutes INTEGER,           -- time window for grouping
  min_occurrences INTEGER,          -- minimum occurrences to alert
  max_alerts_per_window INTEGER     -- rate limiting
);
```

## Implementation Notes

1. All thresholds should be configurable per environment (dev/staging/prod)
2. Alert history should be retained for at least 90 days
3. Implement exponential backoff for repeated alerts
4. Include context data with each alert (graphs, logs, etc.)
5. Support alert acknowledgment and resolution tracking
6. Implement alert correlation to identify related issues
7. Support custom alert rules via configuration