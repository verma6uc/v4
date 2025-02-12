# Usage Record Business Object Specification

## 1. Overview
Usage Record tracks and measures resource consumption across different metrics (users, storage, API calls, etc.) for billing and monitoring purposes. It provides real-time tracking and aggregation capabilities.

## 2. Core Attributes

### Basic Information
- **id**: UUID (Primary Key)
- **companyId**: UUID [Required]
- **resourceType**: ResourceType [Required]
  - Values: USER_COUNT, STORAGE, API_CALLS, DATA_TRANSFER
- **metricCode**: String [Required]
  - Unique identifier for the metric
- **timestamp**: DateTime [Required]
- Used in: BSUB.USGM.US1

### Measurement Details
- **value**: Decimal [Required]
- **unit**: String [Required]
- **measurementType**: MeasurementType
  - Values: COUNTER, GAUGE, TIMER
- **interval**: String
  - For periodic measurements
- Used in: BSUB.USGM.US2

### Context Information
- **spaceId**: UUID
  - For space-specific usage
- **applicationId**: UUID
  - For application-specific usage
- **userId**: UUID
  - For user-triggered events
- **source**: String
  - System component name

### Billing Context
- **subscriptionId**: UUID
- **billingPeriod**: {
  - startDate: DateTime,
  - endDate: DateTime
}
- **billable**: Boolean
- **billingCategory**: String
- Used in: BSUB.USGM.US1

## 3. Usage Types

### User-Based Usage
```json
{
  "resourceType": "USER_COUNT",
  "metricCode": "ACTIVE_USERS",
  "measurementType": "GAUGE",
  "interval": "DAILY",
  "aggregation": "MAX"
}
```

### Storage Usage
```json
{
  "resourceType": "STORAGE",
  "metricCode": "DATA_STORAGE",
  "measurementType": "GAUGE",
  "unit": "GB",
  "aggregation": "AVERAGE"
}
```

### API Usage
```json
{
  "resourceType": "API_CALLS",
  "metricCode": "API_REQUESTS",
  "measurementType": "COUNTER",
  "interval": "HOURLY",
  "aggregation": "SUM"
}
```

## 4. Methods/Operations

### Recording Operations
1. **recordUsage(details)**
   - Actor: System
   - User Story: BSUB.USGM.US1
   - Validation:
     - Valid metric
     - Valid values
     - Timestamp check
   - Creates usage record

2. **batchRecordUsage(records)**
   - Actor: System
   - Batch processing
   - Validation checks
   - Error handling

### Aggregation Operations
1. **aggregateUsage(criteria)**
   - Actor: System
   - User Story: BSUB.USGM.US2
   - Aggregates:
     - By time period
     - By resource type
     - By context
   - Returns summaries

2. **generateReport(criteria)**
   - Actor: Company Admin
   - User Story: BSUB.USGM.US4
   - Formats:
     - CSV, PDF, JSON
   - Contains analysis

## 5. Monitoring & Alerts

### Threshold Configuration
```json
{
  "metric": "API_CALLS",
  "thresholds": [
    {
      "level": "WARNING",
      "value": 80,
      "type": "PERCENTAGE",
      "notifyAt": ["EMAIL", "PLATFORM"]
    },
    {
      "level": "CRITICAL",
      "value": 95,
      "type": "PERCENTAGE",
      "notifyAt": ["EMAIL", "PLATFORM", "SMS"]
    }
  ]
}
```

### Alert Generation
1. **Monitor Rules**
   - Real-time checking
   - Threshold comparison
   - Trend analysis

2. **Notification Rules**
   - Channel selection
   - Message formatting
   - Recipient determination

## 6. Aggregation Rules

### Time-Based Aggregation
```json
{
  "timeframes": [
    {
      "period": "HOURLY",
      "retention": "7_DAYS",
      "aggregates": ["SUM", "AVG", "MAX"]
    },
    {
      "period": "DAILY",
      "retention": "90_DAYS",
      "aggregates": ["SUM", "AVG", "MAX"]
    },
    {
      "period": "MONTHLY",
      "retention": "UNLIMITED",
      "aggregates": ["SUM", "AVG", "MAX"]
    }
  ]
}
```

### Space Aggregation
```json
{
  "levels": [
    {
      "level": "SPACE",
      "aggregates": ["SUM", "COUNT"],
      "breakdown": true
    },
    {
      "level": "COMPANY",
      "aggregates": ["SUM", "COUNT"],
      "breakdown": false
    }
  ]
}
```

## 7. Data Management

### Storage Strategy
1. **Raw Data**
   - Short-term retention
   - Full granularity
   - Quick access

2. **Aggregated Data**
   - Long-term retention
   - Reduced granularity
   - Efficient storage

### Cleanup Rules
```json
{
  "retentionRules": [
    {
      "dataType": "RAW",
      "retention": "30_DAYS",
      "aggregateBefore": true
    },
    {
      "dataType": "HOURLY",
      "retention": "90_DAYS",
      "aggregateBefore": true
    }
  ]
}
```

## 8. Integration Points

### Billing System
- Usage calculation
- Invoice generation
- Threshold monitoring

### Monitoring System
- Alert generation
- Trend analysis
- Health checking

### Analytics System
- Report generation
- Usage patterns
- Trend analysis

## 9. Special Considerations

### Performance
1. **Write Optimization**
   - Batch processing
   - Async recording
   - Buffer management

2. **Read Optimization**
   - Aggregation caching
   - Query optimization
   - Data partitioning

### Accuracy
1. **Data Quality**
   - Validation rules
   - Duplicate detection
   - Gap detection

2. **Consistency**
   - Transaction handling
   - Retry logic
   - Error correction

### Compliance
1. **Data Retention**
   - Regulatory requirements
   - Audit support
   - Data cleanup

2. **Privacy**
   - Data anonymization
   - Access control
   - Usage tracking