# Subscription Plan Business Object Specification

## 1. Overview
The Subscription Plan defines available service tiers, including pricing, resource limits, feature access, and billing rules. Referenced in company subscriptions and billing calculations.

## 2. Core Attributes

### Basic Information
- **id**: UUID (Primary Key)
- **name**: String [Required]
- **code**: String [Required, Unique]
  - System identifier
- **description**: String
- **status**: PlanStatus [Required]
  - Values: DRAFT, ACTIVE, GRANDFATHERED, DISCONTINUED
- **visibility**: PlanVisibility
  - Values: PUBLIC, PRIVATE, HIDDEN
- Used in: BSUB.SUBM.US1

### Pricing Information
- **billingFrequency**: Enum [Required]
  - Values: MONTHLY, QUARTERLY, ANNUAL
- **basePrice**: {
  - amount: Decimal,
  - currency: String,
  - billingTerm: String
}
- **discounts**: Array of {
  - type: DiscountType,
  - value: Decimal,
  - condition: String
}
- Used in: BSUB.SUBM.US2

### Resource Limits
- **userLimits**: {
  - minUsers: Integer,
  - maxUsers: Integer,
  - includedUsers: Integer,
  - additionalUserPrice: Decimal
}
- **storageLimits**: {
  - included: Integer (GB),
  - maxStorage: Integer,
  - additionalStoragePrice: Decimal
}
- **apiLimits**: {
  - monthlyRequests: Integer,
  - additionalRequestsPrice: Decimal
}
- Used in: BSUB.SUBM.US1, BSUB.SUBM.US4

### Feature Access
- **features**: Array of {
  - featureId: String,
  - included: Boolean,
  - limits: Object,
  - overage: {
    - allowed: Boolean,
    - price: Decimal,
    - unit: String
  }
}
- Used in: BSUB.SUBM.US2

### Usage Rules
- **usageCalculation**: {
  - metric: String,
  - aggregation: String,
  - frequency: String
}
- **overage**: {
  - allowOverage: Boolean,
  - overagePrice: Decimal,
  - overageUnit: String,
  - billingThreshold: Decimal
}
- Used in: BSUB.SUBM.US4

### Validity Rules
- **minimumTerm**: Integer (months)
- **contractRequired**: Boolean
- **autoRenew**: Boolean
- **cancellationTerms**: {
  - noticePeriod: Integer,
  - earlyTerminationFee: Decimal
}
- Used in: BSUB.SUBM.US5

## 3. Methods/Operations

### Plan Management
1. **createPlan(details)**
   - Actor: System Admin
   - User Story: BSUB.SUBM.US1
   - Validation:
     - Unique code
     - Valid pricing
     - Feature consistency
   - Creates new plan

2. **updatePlan(planId, updates)**
   - Actor: System Admin
   - User Story: BSUB.SUBM.US2
   - Validation:
     - Plan exists
     - Valid changes
     - Impact analysis
   - Updates plan version

### Subscription Operations
1. **validateSubscription(planId, companyId)**
   - Actor: System
   - User Story: BSUB.SUBM.US3
   - Checks:
     - Company eligibility
     - Resource requirements
     - Usage patterns
   - Returns validation result

2. **calculateCharges(planId, usage)**
   - Actor: System
   - User Story: BSUB.SUBM.US4
   - Calculates:
     - Base charges
     - Usage charges
     - Discounts
   - Returns billing details

## 4. Plan Templates

### Standard Plan
```json
{
  "name": "Standard",
  "code": "STD",
  "basePrice": {
    "amount": 499.00,
    "currency": "USD",
    "billingTerm": "MONTHLY"
  },
  "limits": {
    "users": 50,
    "storage": 500,
    "apiCalls": 100000
  }
}
```

### Enterprise Plan
```json
{
  "name": "Enterprise",
  "code": "ENT",
  "basePrice": {
    "amount": 999.00,
    "currency": "USD",
    "billingTerm": "MONTHLY"
  },
  "limits": {
    "users": "UNLIMITED",
    "storage": 2000,
    "apiCalls": 1000000
  }
}
```

## 5. Usage Calculation

### Metric Types
1. **Count-based**
   - User count
   - Storage usage
   - API calls

2. **Time-based**
   - Active hours
   - Processing time
   - Connection duration

### Calculation Rules
```json
{
  "metric": "API_CALLS",
  "rules": {
    "aggregation": "SUM",
    "window": "MONTHLY",
    "minimum": 0,
    "rounding": "UP",
    "unit": 1000
  }
}
```

## 6. Feature Management

### Feature Categories
1. **Core Features**
   - Always included
   - No limits
   - Basic functionality

2. **Tiered Features**
   - Plan dependent
   - Usage limits
   - Additional costs

### Feature Configuration
```json
{
  "featureId": "ADVANCED_ANALYTICS",
  "config": {
    "included": true,
    "limits": {
      "reports": 100,
      "history": 90
    },
    "overage": {
      "allowed": true,
      "price": 0.50,
      "unit": "REPORT"
    }
  }
}
```

## 7. Validation Rules

### Plan Validation
1. **Pricing Rules**
   - Valid amounts
   - Currency consistency
   - Discount logic

2. **Resource Limits**
   - Minimum values
   - Maximum thresholds
   - Upgrade paths

### Subscription Validation
1. **Company Eligibility**
   - Size requirements
   - Usage patterns
   - Compliance needs

2. **Resource Requirements**
   - Current usage
   - Growth projections
   - Limit adequacy

## 8. Audit Requirements

### Plan Changes
```
Actor: {adminName} ({email})
Action: UPDATE_SUBSCRIPTION_PLAN
Context: Plan: {planName}
Details: Updated plan configuration
Changes: [List of changes]
```

### Subscription Events
```
Actor: System
Action: VALIDATE_SUBSCRIPTION
Context: Company: {companyName}
Details: Validated subscription requirements
Result: {status}
```

## 9. Integration Points

### Billing System
- Price calculation
- Invoice generation
- Payment processing

### Usage Monitoring
- Resource tracking
- Limit monitoring
- Alert generation

### Company Management
- Plan assignment
- Upgrade handling
- Renewal processing