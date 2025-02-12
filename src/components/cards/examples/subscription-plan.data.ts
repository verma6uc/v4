export const exampleSubscriptionPlan = {
  id: '1',
  name: 'Enterprise Plan',
  code: 'ENT',
  description: 'Full-featured plan for large organizations',
  status: 'ACTIVE' as const,
  visibility: 'PUBLIC' as const,
  basePrice: {
    amount: 999.00,
    currency: 'USD',
    billingTerm: 'MONTHLY' as const
  },
  discounts: [
    {
      type: 'ANNUAL',
      value: 20,
      condition: 'Annual billing'
    }
  ],
  userLimits: {
    minUsers: 10,
    maxUsers: 1000,
    includedUsers: 50,
    additionalUserPrice: 10
  },
  storageLimits: {
    included: 1000,
    maxStorage: 5000,
    additionalStoragePrice: 0.10
  },
  apiLimits: {
    monthlyRequests: 1000000,
    additionalRequestsPrice: 0.001
  },
  features: [
    {
      featureId: 'f1',
      name: 'Advanced Analytics',
      included: true,
      limits: {
        reports: 100,
        history: 90
      }
    },
    {
      featureId: 'f2',
      name: 'Custom Branding',
      included: true
    },
    {
      featureId: 'f3',
      name: 'Priority Support',
      included: true
    }
  ],
  contractTerms: {
    minimumTerm: 12,
    contractRequired: true,
    autoRenew: true,
    cancellationTerms: {
      noticePeriod: 30,
      earlyTerminationFee: 1000
    }
  }
};