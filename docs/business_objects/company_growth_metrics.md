# Company Growth Metrics Business Object

## Properties
- id: UUID (primary key)
- company_id: UUID (required, references Company)
- timestamp: DateTime (required)
- period_type: Enum ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'] (required)

### User Growth Metrics
- total_users: Integer
- new_users: Integer
- churned_users: Integer
- reactivated_users: Integer
- user_growth_rate: Decimal
- user_churn_rate: Decimal

### Application Growth Metrics
- total_applications: Integer
- new_applications: Integer
- archived_applications: Integer
- active_applications: Integer
- application_growth_rate: Decimal
- application_archive_rate: Decimal

### Storage Growth Metrics
- total_storage_bytes: Decimal
- used_storage_bytes: Decimal
- available_storage_bytes: Decimal
- storage_growth_rate: Decimal
- storage_utilization_rate: Decimal

### API Usage Growth Metrics
- total_api_calls: Integer
- successful_calls: Integer
- failed_calls: Integer
- api_growth_rate: Decimal
- api_error_rate: Decimal

## States
1. DECLINING
   - Negative growth rates
   - Can transition to: STABLE, GROWING

2. STABLE
   - Steady state, minimal growth
   - Can transition to: DECLINING, GROWING

3. GROWING
   - Positive growth rates
   - Can transition to: STABLE, RAPID_GROWTH

4. RAPID_GROWTH
   - High growth rates
   - Can transition to: GROWING

## Relationships
- Belongs to one Company
- Has many GrowthTrends
- Has many GrowthAlerts
- Has many GrowthForecasts

## Validations
- All count values must be non-negative
- All rate values must be valid percentages
- Timestamps must be valid and not in future
- Growth rates can be negative (for decline)
- Total values must be consistent with components

## Audit Requirements
- Track all state transitions
- Log significant growth changes
- Record trend inflection points
- Maintain historical snapshots

## Retention Rules
- Daily metrics retained for 90 days
- Weekly metrics retained for 1 year
- Monthly metrics retained for 3 years
- Quarterly and yearly metrics retained indefinitely

## Analysis Rules
- Calculate period-over-period changes
- Identify growth trends
- Generate growth forecasts
- Track seasonal patterns
- Monitor growth acceleration/deceleration