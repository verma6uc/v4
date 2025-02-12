import React from 'react';
import { InvoiceMiniCard } from '../InvoiceMiniCard';
import { InvoiceMacroCard } from '../InvoiceMacroCard';
import { exampleInvoice } from '../examples/invoice.data';
import { createHandler } from '../examples/helpers';

export function InvoiceCardsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Invoice Cards</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mini Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <InvoiceMiniCard 
              {...exampleInvoice}
              onRecordPayment={createHandler('Record Payment')}
              onDownload={createHandler('Download Invoice')}
              onShare={createHandler('Share Invoice')}
            />
            <InvoiceMiniCard 
              {...exampleInvoice}
              status="DRAFT"
              onMoveToPending={createHandler('Move to Pending')}
            />
            <InvoiceMiniCard 
              {...exampleInvoice}
              status="PENDING"
              onIssue={createHandler('Issue Invoice')}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Macro Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <InvoiceMacroCard 
              {...exampleInvoice}
              payments={[
                {
                  amount: 500.00,
                  date: '2024-02-10',
                  method: 'Credit Card',
                  status: 'Completed'
                }
              ]}
              onRecordPayment={createHandler('Record Payment')}
              onDownload={createHandler('Download Invoice')}
              onShare={createHandler('Share Invoice')}
              onViewLineItems={createHandler('View Line Items')}
              onViewPayments={createHandler('View Payments')}
              onSendReminder={createHandler('Send Reminder')}
              onApplyCredit={createHandler('Apply Credit')}
            />
            <InvoiceMacroCard 
              {...exampleInvoice}
              status="DRAFT"
              onMoveToPending={createHandler('Move to Pending')}
              onViewLineItems={createHandler('View Line Items')}
            />
            <InvoiceMacroCard 
              {...exampleInvoice}
              status="PAID"
              payments={[
                {
                  amount: 1258.80,
                  date: '2024-02-10',
                  method: 'Bank Transfer',
                  status: 'Completed'
                }
              ]}
              financial={{
                ...exampleInvoice.financial,
                balance: 0
              }}
              onDownload={createHandler('Download Invoice')}
              onShare={createHandler('Share Invoice')}
              onViewLineItems={createHandler('View Line Items')}
              onViewPayments={createHandler('View Payments')}
              onApplyCredit={createHandler('Apply Credit')}
            />
            <InvoiceMacroCard 
              {...exampleInvoice}
              status="VOID"
              type="CREDIT_NOTE"
              onDownload={createHandler('Download Invoice')}
              onShare={createHandler('Share Invoice')}
              onViewLineItems={createHandler('View Line Items')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}