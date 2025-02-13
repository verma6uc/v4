// Enum Types from Schema
export enum UserStatus {
  INVITED = 'INVITED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED',
  ARCHIVED = 'ARCHIVED'
}

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED'
}

export enum DateFormat {
  DD_MM_YYYY = 'DD_MM_YYYY',
  MM_DD_YYYY = 'MM_DD_YYYY'
}

export enum TimeFormat {
  TWENTY_FOUR_HOUR = 'TWENTY_FOUR_HOUR',
  TWELVE_HOUR = 'TWELVE_HOUR'
}

export enum NumberFormat {
  US = 'US',
  EU = 'EU'
}

export enum WeekStart {
  MONDAY = 'MONDAY',
  SUNDAY = 'SUNDAY'
}

export enum MfaEnforcementLevel {
  OPTIONAL = 'OPTIONAL',
  REQUIRED_FOR_ALL = 'REQUIRED_FOR_ALL'
}

export enum MfaDefaultMethod {
  EMAIL = 'EMAIL',
  AUTHENTICATOR_APP = 'AUTHENTICATOR_APP'
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  ISSUED = 'ISSUED',
  PAID = 'PAID',
  VOID = 'VOID',
  CANCELLED = 'CANCELLED'
}

export enum InvoiceType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  USAGE = 'USAGE',
  ADJUSTMENT = 'ADJUSTMENT',
  CREDIT_NOTE = 'CREDIT_NOTE'
}

export enum PaymentStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export enum SubscriptionPlanStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  GRANDFATHERED = 'GRANDFATHERED',
  DISCONTINUED = 'DISCONTINUED'
}

export enum SubscriptionPlanVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  HIDDEN = 'HIDDEN'
}

export enum BillingFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL'
}

export enum UsageResourceType {
  USER_COUNT = 'USER_COUNT',
  STORAGE = 'STORAGE',
  API_CALLS = 'API_CALLS',
  DATA_TRANSFER = 'DATA_TRANSFER'
}

// Interface Types based on Schema Tables
export interface Company {
  id: string
  name: string
  identifier: string
  status: CompanyStatus
  primaryEmail?: string
  primaryPhone?: string
  website?: string
  addressStreet?: string
  addressCity?: string
  addressState?: string
  addressCountry?: string
  addressPostalCode?: string
  logoUrl?: string
  createdAt: string
  activatedAt?: string
  suspendedAt?: string
  suspendedReason?: string
  archivedAt?: string
  archivedReason?: string
}

export interface CompanyConfiguration {
  id: string
  companyId: string
  defaultLanguage: string
  defaultTimezone: string
  dateFormat: DateFormat
  timeFormat: TimeFormat
  numberFormat: NumberFormat
  firstDayOfWeek: WeekStart
  currencyCode: string
  mfaEnabled: boolean
  mfaEnforcementLevel: MfaEnforcementLevel
  mfaDefaultMethod?: MfaDefaultMethod
  sessionTimeout: number
  maxConcurrentSessions: number
  enforceIpRestrictions: boolean
  allowedIpRanges?: string[]
  blocklistedIpRanges?: string[]
  maxLoginAttempts: number
  lockoutDuration: number
  passwordResetTimeout: number
  invitationValidityPeriod: number
  passwordPolicyMinLength: number
  passwordPolicyRequireSpecialChar: boolean
  passwordPolicyRequireNumber: boolean
  passwordPolicyRequireUppercase: boolean
  passwordPolicyExpiryDays: number
  passwordExpiryEnabled: boolean
  passwordHistoryCount: number
  createdAt: string
}

export interface User {
  id: string
  companyId: string
  email: string
  firstName: string
  lastName: string
  designationId?: string
  status: UserStatus
  platformRoleId?: string
  phone?: string
  profilePictureUrl?: string
  createdAt: string
  updatedAt: string
  activatedAt?: string
  suspendedAt?: string
  suspendedReason?: string
  blockedAt?: string
  blockedReason?: string
  archivedAt?: string
  archivedReason?: string
}

export interface Invoice {
  id: string
  companyId: string
  invoiceNumber: string
  status: InvoiceStatus
  type: InvoiceType
  billingPeriodStart: string
  billingPeriodEnd: string
  dueDate: string
  currency: string
  billingContactName?: string
  billingContactEmail?: string
  billingContactPhone?: string
  billingContactAddress?: string
  subtotal: number
  taxTotal: number
  discountTotal: number
  total: number
  balance: number
  paymentTerms?: string
  paymentDue?: string
  paymentMethodType?: string
  paymentMethodLastFour?: string
  paymentMethodExpiryDate?: string
  createdAt: string
  updatedAt: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  code: string
  description?: string
  status: SubscriptionPlanStatus
  visibility: SubscriptionPlanVisibility
  billingFrequency: BillingFrequency
  basePriceAmount: number
  basePriceCurrency: string
  basePriceBillingTerm: string
  userLimitIncluded?: number
  userLimitMax?: number
  additionalUserPrice?: number
  storageLimitIncluded?: number
  storageLimitMax?: number
  additionalStoragePrice?: number
  apiLimitMonthly?: number
  additionalApiPrice?: number
  minimumTerm?: number
  contractRequired: boolean
  autoRenew: boolean
  cancellationNoticePeriod?: number
  cancellationFee?: number
  createdAt: string
  updatedAt: string
}