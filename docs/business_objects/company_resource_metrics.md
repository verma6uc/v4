# Company Resource Metrics Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- timestamp: DateTime (required)
- period_type: Enum ['daily', 'weekly', 'monthly'] (required)

### CPU Metrics
- cpu_usage_percentage: Decimal
- cpu_allocated: Decimal
- cpu_peak_usage: Decimal
- cpu_throttling_events: Integer

### Memory Metrics
- memory_usage_bytes: Decimal
- memory_allocated_bytes: Decimal
- memory_peak_usage_bytes: Decimal
- memory_swap_usage_bytes: Decimal

### Storage Metrics
- storage_usage_bytes: Decimal
- storage_allocated_bytes: Decimal
- storage_peak_usage_bytes: Decimal
- storage_write_ops: Integer
- storage_read_ops: Integer

### Network Metrics
- network_ingress_bytes: Decimal
- network_egress_bytes: Decimal
- network_packets_in: Integer
- network_packets_out: Integer
- network_errors: Integer

## States
1. UNDER_UTILIZED
   - Resource usage below optimal thresholds
   - Can transition to: OPTIMAL, OVER_UTILIZED

2. OPTIMAL
   - Resource usage within optimal ranges
   - Can transition to: UNDER_UTILIZED, OVER_UTILIZED

3. OVER_UTILIZED
   - Resource usage exceeding optimal thresholds
   - Can transition to: OPTIMAL, CRITICAL

4. CRITICAL
   - Resource usage at critical levels
   - Can transition to: OVER_UTILIZED

## Relationships
- Belongs to one Company
- Has many ResourceThresholds
- Has many ResourceAlerts
- Has many MetricSnapshots (historical data)

## Validations
- All percentage values must be between 0 and 100
- All byte values must be non-negative
- All operation counts must be non-negative
- Timestamps must be valid and not in future
- Allocated resources must be greater than or equal to usage

## Audit Requirements
- Track all state transitions
- Log threshold breaches
- Record resource allocation changes
- Maintain historical snapshots

## Retention Rules
- Daily metrics retained for 90 days
- Weekly metrics retained for 1 year
- Monthly metrics retained indefinitely
- Critical events retained indefinitely

## Monitoring Rules
- Alert on state transitions to OVER_UTILIZED or CRITICAL
- Alert on sustained high usage patterns
- Track resource utilization trends
- Monitor allocation vs usage ratios