# Company Usage Metrics Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- timestamp: DateTime (required)
- period_type: Enum ['daily', 'weekly', 'monthly'] (required)

### User Activity Metrics
- total_users: Integer
- active_users: Integer
- concurrent_users_peak: Integer
- new_user_logins: Integer
- average_session_duration: Integer (in seconds)
- total_sessions: Integer

### Feature Usage Metrics
- feature_id: UUID (references Feature)
- usage_count: Integer
- unique_users: Integer
- average_duration: Integer (in seconds)
- error_count: Integer
- last_used: DateTime

### Environment Usage Metrics
- environment_id: UUID (references Environment)
- active_sessions: Integer
- resource_usage_percentage: Decimal
- peak_concurrent_users: Integer
- total_operations: Integer

## States
1. INACTIVE
   - No usage detected
   - Can transition to: LOW_ACTIVITY

2. LOW_ACTIVITY
   - Usage below expected thresholds
   - Can transition to: INACTIVE, NORMAL_ACTIVITY

3. NORMAL_ACTIVITY
   - Usage within expected ranges
   - Can transition to: LOW_ACTIVITY, HIGH_ACTIVITY

4. HIGH_ACTIVITY
   - Usage above expected thresholds
   - Can transition to: NORMAL_ACTIVITY, PEAK_ACTIVITY

5. PEAK_ACTIVITY
   - Usage at peak levels
   - Can transition to: HIGH_ACTIVITY

## Relationships
- Belongs to one Company
- Has many FeatureUsageRecords
- Has many EnvironmentUsageRecords
- Has many UserActivityRecords
- Has many UsageAlerts

## Validations
- All count values must be non-negative
- All percentage values must be between 0 and 100
- Timestamps must be valid and not in future
- Active users must not exceed total users
- Concurrent users must not exceed active users

## Audit Requirements
- Track all state transitions
- Log usage pattern changes
- Record feature adoption trends
- Maintain historical snapshots

## Retention Rules
- Daily metrics retained for 90 days
- Weekly metrics retained for 1 year
- Monthly metrics retained indefinitely
- Peak activity records retained indefinitely

## Monitoring Rules
- Alert on unusual usage patterns
- Track feature adoption rates
- Monitor environment utilization
- Alert on sustained high activity