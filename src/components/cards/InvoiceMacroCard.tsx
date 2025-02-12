import React from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  FileText,
  ClipboardCheck,
  Send,
  DollarSign,
  Download,
  Share2,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  List,
  History,
  Bell,
  Plus
} from 'lucide-react';

interface InvoiceMacroCardProps {
  id: string;
  invoiceNumber: string;
  status: 'DRAFT' | 'PENDING' | 'ISSUED' | 'PAID' | 'VOID' | 'CANCELLED';
  type: 'SUBSCRIPTION' | 'USAGE' | 'ADJUSTMENT' | 'CREDIT_NOTE';
  billingPeriod: {
    startDate: string;
    endDate: string;
  };
  dueDate?: string;
  currency: string;
  billingContact: {
    name: string;
    email: string;
    phone?: string;
    address?: {
      city: string;
      country: string;
    };
  };
  items: Array<{
    type: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  financial: {
    subtotal: number;
    taxTotal: number;
    discountTotal: number;
    total: number;
    balance: number;
  };
  payments?: Array<{
    amount: number;
    date: string;
    method: string;
    status: string;
  }>;
  companyName: string;
  onClick?: () => void;
  onMoveToPending?: () => void;
  onIssue?: () => void;
  onRecordPayment?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onViewLineItems?: () => void;
  onViewPayments?: () => void;
  onSendReminder?: () => void;
  onApplyCredit?: () => void;
}

const statusConfig = {
  DRAFT: { color: 'warning' as const },
  PENDING: { color: 'info' as const },
  ISSUED: { color: 'primary' as const },
  PAID: { color: 'success' as const },
  VOID: { color: 'default' as const },
  CANCELLED: { color: 'error' as const }
};

const typeConfig = {
  SUBSCRIPTION: { color: 'primary' as const },
  USAGE: { color: 'info' as const },
  ADJUSTMENT: { color: 'warning' as const },
  CREDIT_NOTE: { color: 'error' as const }
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

export function InvoiceMacroCard({
  invoiceNumber,
  status,
  type,
  billingPeriod,
  dueDate,
  currency,
  billingContact,
  items,
  financial,
  payments,
  companyName,
  onClick,
  onMoveToPending,
  onIssue,
  onRecordPayment,
  onDownload,
  onShare,
  onViewLineItems,
  onViewPayments,
  onSendReminder,
  onApplyCredit
}: InvoiceMacroCardProps) {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <FileText className="w-12 h-12 text-gray-400" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{invoiceNumber}</h3>
            <p className="text-sm text-gray-500">{companyName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={statusConfig[status].color}
            dot
          >
            {status.toLowerCase()}
          </Badge>
          <Badge variant={typeConfig[type].color}>
            {type.toLowerCase().replace('_', ' ')}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <div>
              <div className="font-medium">Billing Period</div>
              <div className="text-xs">
                {billingPeriod.startDate} to {billingPeriod.endDate}
              </div>
              {dueDate && (
                <div className="text-xs text-red-500">Due: {dueDate}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 mt-0.5" />
            <div>
              <div className="font-medium">Billing Contact</div>
              <div className="text-xs">{billingContact.name}</div>
              <div className="text-xs">{billingContact.email}</div>
              {billingContact.phone && (
                <div className="flex items-center text-xs">
                  <Phone className="w-3 h-3 mr-1" />
                  {billingContact.phone}
                </div>
              )}
              {billingContact.address && (
                <div className="flex items-center text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {billingContact.address.city}, {billingContact.address.country}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="text-sm">
            <div className="font-medium text-gray-900">Financial Summary</div>
            <div className="mt-1 space-y-1">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(financial.subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatCurrency(financial.taxTotal, currency)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discounts</span>
                <span>-{formatCurrency(financial.discountTotal, currency)}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-900 pt-1 border-t">
                <span>Total</span>
                <span>{formatCurrency(financial.total, currency)}</span>
              </div>
              {financial.balance > 0 && (
                <div className="flex justify-between text-red-500 pt-1">
                  <span>Balance Due</span>
                  <span>{formatCurrency(financial.balance, currency)}</span>
                </div>
              )}
            </div>
          </div>

          {payments && payments.length > 0 && (
            <div className="text-sm">
              <div className="font-medium text-gray-900">Recent Payments</div>
              <div className="mt-1 space-y-1">
                {payments.slice(0, 2).map((payment, index) => (
                  <div key={index} className="flex justify-between text-gray-600 text-xs">
                    <span>{payment.date} via {payment.method}</span>
                    <span>{formatCurrency(payment.amount, currency)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {/* State Management Actions */}
          {status === 'DRAFT' && onMoveToPending && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMoveToPending();
              }}
            >
              <ClipboardCheck className="w-4 h-4 mr-1" />
              Move to Pending
            </Button>
          )}
          
          {status === 'PENDING' && onIssue && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onIssue();
              }}
            >
              <Send className="w-4 h-4 mr-1" />
              Issue Invoice
            </Button>
          )}
          
          {status === 'ISSUED' && onRecordPayment && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRecordPayment();
              }}
            >
              <DollarSign className="w-4 h-4 mr-1" />
              Record Payment
            </Button>
          )}

          {/* Document Actions */}
          {status !== 'DRAFT' && (
            <>
              {onDownload && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload();
                  }}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              )}
              
              {onShare && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare();
                  }}
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              )}
            </>
          )}

          {/* Additional Actions */}
          {onViewLineItems && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewLineItems();
              }}
            >
              <List className="w-4 h-4 mr-1" />
              View Items
            </Button>
          )}
          
          {payments && payments.length > 0 && onViewPayments && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewPayments();
              }}
            >
              <History className="w-4 h-4 mr-1" />
              Payment History
            </Button>
          )}
          
          {status === 'ISSUED' && onSendReminder && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSendReminder();
              }}
            >
              <Bell className="w-4 h-4 mr-1" />
              Send Reminder
            </Button>
          )}
          
          {(status === 'ISSUED' || status === 'PAID') && onApplyCredit && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onApplyCredit();
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Apply Credit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}