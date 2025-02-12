# Invoice Business Object Specification

## 1. Overview
The Invoice object represents billing documents generated for companies, including subscription charges, usage-based fees, and other billable items. It supports the complete lifecycle from generation to payment tracking.

## 2. Core Attributes

### Basic Information
- **id**: UUID (Primary Key)
- **companyId**: UUID [Required]
- **invoiceNumber**: String [Required, Unique]
  - Format: INV-{YYYY}{MM}-{SEQUENCE}
- **status**: InvoiceStatus [Required]
  - Values: DRAFT, PENDING, ISSUED, PAID, VOID, CANCELLED
- **type**: InvoiceType
  - Values: SUBSCRIPTION, USAGE, ADJUSTMENT, CREDIT_NOTE
- Used in: BSUB.INVM.US1

### Billing Information
- **billingPeriod**: {
  - startDate: DateTime,
  - endDate: DateTime
}
- **dueDate**: DateTime
- **currency**: String [Required]
- **billingContact**: {
  - name: String,
  - email: String,
  - phone: String,
  - address: Object
}
- Used in: BSUB.INVM.US2

### Line Items
- **items**: Array of {
  - id: UUID,
  - type: ItemType,
  - description: String,
  - quantity: Decimal,
  - unitPrice: Decimal,
  - totalPrice: Decimal,
  - taxRate: Decimal,
  - taxAmount: Decimal,
  - metadata: Object
}
- Used in: BSUB.INVM.US2

### Financial Information
- **subtotal**: Decimal
- **taxTotal**: Decimal
- **discountTotal**: Decimal
- **total**: Decimal
- **balance**: Decimal
- **credits**: Array of {
  - amount: Decimal,
  - reason: String,
  - appliedAt: DateTime
}
- Used in: BSUB.INVM.US2

### Payment Information
- **paymentTerms**: String
- **paymentDue**: DateTime
- **paymentMethod**: {
  - type: String,
  - lastFour: String,
  - expiryDate: String
}
- **payments**: Array of {
  - id: UUID,
  - amount: Decimal,
  - date: DateTime,
  - method: String,
  - status: String,
  - transactionId: String
}

## 3. Methods/Operations

### Invoice Generation
1. **createInvoice(companyId, details)**
   - Actor: System
   - User Story: BSUB.INVM.US1
   - Validation:
     - Company exists
     - Valid billing period
     - Line items valid
   - Creates draft invoice

2. **finalizeInvoice(invoiceId)**
   - Actor: System
   - User Story: BSUB.INVM.US1
   - Validation:
     - All items complete
     - Calculations verified
   - Moves to ISSUED status

### Invoice Management
1. **downloadInvoice(invoiceId, format)**
   - Actor: Company Admin, Billing Admin
   - User Story: BSUB.INVM.US3
   - Formats:
     - PDF (default)
     - CSV
   - Returns formatted invoice

2. **shareInvoice(invoiceId, recipients)**
   - Actor: Company Admin, Billing Admin
   - User Story: BSUB.INVM.US4
   - Validation:
     - Valid recipients
     - Sharing permissions
   - Sends secure link

## 4. Line Item Types

### Subscription Charges
```json
{
  "type": "SUBSCRIPTION",
  "description": "Monthly Subscription - Enterprise Plan",
  "quantity": 1,
  "unitPrice": 999.00,
  "billingPeriod": {
    "start": "2024-02-01",
    "end": "2024-02-29"
  }
}
```

### Usage Charges
```json
{
  "type": "USAGE",
  "description": "API Calls Overage",
  "quantity": 50000,
  "unitPrice": 0.001,
  "metadata": {
    "usageType": "API_CALLS",
    "included": 100000,
    "actual": 150000
  }
}
```

## 5. State Machine

### States
1. **DRAFT**
   - Initial creation
   - Can be modified
   - Not visible to company

2. **PENDING**
   - Ready for review
   - Can be modified
   - Internal only

3. **ISSUED**
   - Sent to company
   - Cannot be modified
   - Payment expected

4. **PAID**
   - Payment received
   - Payment recorded
   - Complete status

5. **VOID**
   - Cancelled after issue
   - Credit note required
   - Historical record

### State Transitions

1. **DRAFT → PENDING**
   - Trigger: Initial review complete
   - Validation: All items complete
   - Audit Log: "Invoice prepared for review"

2. **PENDING → ISSUED**
   - Trigger: Final approval
   - Validation: All calculations verified
   - Notifications:
     - To Company: "New invoice available"
     - To Billing Contact: "Invoice ready for payment"

3. **ISSUED → PAID**
   - Trigger: Payment received
   - Validation: Full amount received
   - Notifications:
     - To Company: "Payment confirmed"
     - Internal: "Invoice payment received"

## 6. Calculation Rules

### Tax Calculation
```json
{
  "rules": {
    "taxRate": 0.20,
    "taxableItems": ["SUBSCRIPTION", "USAGE"],
    "exemptions": {
      "types": ["CREDIT"],
      "reasons": ["ADJUSTMENT"]
    }
  }
}
```

### Discount Application
```json
{
  "rules": {
    "order": ["PERCENTAGE", "FIXED"],
    "stacking": "MULTIPLICATIVE",
    "maxDiscount": 0.50
  }
}
```

## 7. Invoice Templates

### Standard Invoice
```html
<template>
  <header>
    <company_logo/>
    <invoice_details/>
  </header>
  <body>
    <line_items/>
    <summary>
      <subtotal/>
      <tax_summary/>
      <total/>
    </summary>
  </body>
  <footer>
    <payment_instructions/>
    <terms_conditions/>
  </footer>
</template>
```

## 8. Integration Points

### Payment System
- Payment processing
- Transaction recording
- Refund handling

### Accounting System
- GL entries
- Revenue recognition
- Tax reporting

### Notification System
- Invoice alerts
- Payment reminders
- Receipt confirmations

## 9. Special Considerations

### Performance
1. **Calculation Optimization**
   - Batch processing
   - Caching strategies
   - Async operations

2. **Document Generation**
   - Template caching
   - PDF optimization
   - Bulk operations

### Security
1. **Access Control**
   - Role-based access
   - Data encryption
   - Audit logging

2. **Payment Security**
   - PCI compliance
   - Data masking
   - Secure storage

### Compliance
1. **Tax Requirements**
   - Multiple jurisdictions
   - Rate calculations
   - Report generation

2. **Record Keeping**
   - Data retention
   - Audit trail
   - Legal requirements