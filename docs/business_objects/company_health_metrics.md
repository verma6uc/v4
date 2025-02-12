# Company Health Metrics Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- timestamp: DateTime (required)
- period_type: Enum ['daily', 'weekly', 'monthly'] (required)
- system_uptime_percentage: Decimal
- error_count: Integer
- error_rate: Decimal
- critical_incidents_count: Integer
- average_response_time: Decimal
- peak_response_time: Decimal
- throughput: Decimal
- latency: Decimal

## States
1. NORMAL
   - All metrics within expected ranges
   - No critical incidents
   - Can transition to: WARNING, CRITICAL

2. WARNING
   - Some metrics approaching thresholds
   - Minor incidents present
   - Can transition to: NORMAL, CRITICAL

3. CRITICAL
   - Metrics exceeding thresholds
   - Critical incidents present
   - Can transition to: WARNING, NORMAL

## Relationships
- Belongs to one Company
- Has many HealthMetricThresholds
- Has many IncidentRecords
- Has many MetricSnapshots (historical data)

## Validations
- All percentage values must be between 0 and 100
- All count values must be non-negative
- Timestamps must be valid and not in future
- Response times must be positive values
- Throughput must be non-negative

## Audit Requirements
- Track all state transitions
- Log threshold breaches
- Record incident creation and resolution
- Maintain historical snapshots

## Retention Rules
- Daily metrics retained for 90 days
- Weekly metrics retained for 1 year
- Monthly metrics retained indefinitely
- Critical incident records retained indefinitely

## Monitoring Rules
- Alert on state transitions to WARNING or CRITICAL
- Alert on threshold breaches
- Track trend changes
- Monitor rate of change