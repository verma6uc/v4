export const exampleInvoice = {
  id: '1',
  invoiceNumber: 'INV-202402-001',
  status: 'ISSUED' as const,
  type: 'SUBSCRIPTION' as const,
  billingPeriod: {
    startDate: '2024-02-01',
    endDate: '2024-02-29'
  },
  dueDate: '2024-02-15',
  currency: 'USD',
  billingContact: {
    name: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    address: {
      city: 'San Francisco',
      country: 'USA'
    }
  },
  items: [
    {
      type: 'SUBSCRIPTION',
      description: 'Enterprise Plan - Monthly',
      quantity: 1,
      unitPrice: 999.00,
      totalPrice: 999.00
    },
    {
      type: 'USAGE',
      description: 'API Calls Overage',
      quantity: 50000,
      unitPrice: 0.001,
      totalPrice: 50.00
    }
  ],
  financial: {
    subtotal: 1049.00,
    taxTotal: 209.80,
    discountTotal: 0,
    total: 1258.80,
    balance: 1258.80
  },
  companyName: 'Acme Corp',
  total: 1258.80
};