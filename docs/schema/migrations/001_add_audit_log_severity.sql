/* Add severity enum and field to audit_logs table */

/* Create severity enum */
DROP TYPE IF EXISTS audit_severity_enum;
CREATE TYPE audit_severity_enum AS ENUM (
    'info',
    'warning',
    'critical'
);

/* Add severity column to audit_logs */
ALTER TABLE audit_logs
ADD COLUMN severity audit_severity_enum NOT NULL DEFAULT 'info';

/* Add indexes for better performance */
CREATE INDEX idx_audit_logs_timestamp ON audit_logs (timestamp);
CREATE INDEX idx_audit_logs_category ON audit_logs (category);
CREATE INDEX idx_audit_logs_severity ON audit_logs (severity);
CREATE INDEX idx_audit_logs_timestamp_category ON audit_logs (timestamp, category);
CREATE INDEX idx_audit_logs_timestamp_severity ON audit_logs (timestamp, severity);

/* Add IP address tracking */
ALTER TABLE audit_logs
ADD COLUMN ip_address VARCHAR(50);

/* Add partitioning by month */
CREATE TABLE audit_logs_partitioned (
    LIKE audit_logs INCLUDING ALL
) PARTITION BY RANGE (timestamp);

/* Create partitions for the last 12 months and next 3 months */
DO $$
DECLARE
    start_date timestamp;
    end_date timestamp;
    partition_name text;
BEGIN
    -- Start from 12 months ago
    start_date := date_trunc('month', current_date - interval '12 months');
    
    -- Create partitions up to 3 months in the future
    FOR i IN 0..15 LOOP
        end_date := start_date + interval '1 month';
        partition_name := 'audit_logs_' || to_char(start_date, 'YYYY_MM');
        
        EXECUTE format(
            'CREATE TABLE %I PARTITION OF audit_logs_partitioned 
             FOR VALUES FROM (%L) TO (%L)',
            partition_name,
            start_date,
            end_date
        );
        
        start_date := end_date;
    END LOOP;
END $$;

/* Create materialized view for common metric calculations */
CREATE MATERIALIZED VIEW audit_metrics_daily AS
SELECT 
    date_trunc('day', timestamp) as day,
    category,
    severity,
    COUNT(*) as event_count
FROM audit_logs
GROUP BY 
    date_trunc('day', timestamp),
    category,
    severity
WITH DATA;

CREATE UNIQUE INDEX idx_audit_metrics_daily 
ON audit_metrics_daily (day, category, severity);

/* Create function to refresh materialized view */
CREATE OR REPLACE FUNCTION refresh_audit_metrics_daily()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY audit_metrics_daily;
END;
$$ LANGUAGE plpgsql;

/* Create trigger to refresh materialized view */
CREATE OR REPLACE FUNCTION trigger_refresh_audit_metrics_daily()
RETURNS trigger AS $$
BEGIN
    PERFORM pg_notify('refresh_audit_metrics', '');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER refresh_audit_metrics_daily_trigger
AFTER INSERT OR UPDATE OR DELETE ON audit_logs
FOR EACH STATEMENT
EXECUTE FUNCTION trigger_refresh_audit_metrics_daily();

/* Comments */
COMMENT ON COLUMN audit_logs.severity IS 'Indicates the severity level of the audit event';
COMMENT ON COLUMN audit_logs.ip_address IS 'IP address of the actor when the event occurred';
COMMENT ON MATERIALIZED VIEW audit_metrics_daily IS 'Daily aggregated metrics for audit logs';