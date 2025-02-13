import React from 'react';
import { CompanyMiniCard } from '../CompanyMiniCard';
import { CompanyMacroCard } from '../CompanyMacroCard';
import { exampleCompany } from '../examples/company.data';
import { createHandler } from '../examples/helpers';
import { CompanyStatus } from '../../../types/schema';

export function CompanyCardsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Company Cards</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mini Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <CompanyMiniCard 
              company={exampleCompany}
              onSuspend={createHandler('Suspend Company')}
              onArchive={createHandler('Archive Company')}
            />
            <CompanyMiniCard 
              company={{
                ...exampleCompany,
                status: CompanyStatus.DRAFT
              }}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Company Cards</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mini Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <CompanyMiniCard 
              company={exampleCompany}
              onSuspend={createHandler('Suspend Company')}
              onArchive={createHandler('Archive Company')}
            />
            <CompanyMiniCard 
              company={{
                ...exampleCompany,
                status: CompanyStatus.DRAFT
              }}
              onActivate={createHandler('Activate Company')}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Macro Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <CompanyMacroCard 
              company={exampleCompany}
              userCount={150}
              spaceCount={12}
            />
            <CompanyMacroCard 
              company={{
                ...exampleCompany,
                status: CompanyStatus.SUSPENDED,
                suspendedAt: '2025-02-01T10:00:00Z',
                suspendedReason: 'Payment overdue'
              }}
              userCount={150}
              spaceCount={12}
            />
            <CompanyMacroCard 
              company={{
                ...exampleCompany,
                status: CompanyStatus.ARCHIVED,
                archivedAt: '2025-02-01T10:00:00Z',
                archivedReason: 'Company closed'
              }}
              userCount={150}
              spaceCount={12}
            />
            <CompanyMacroCard 
              company={{
                ...exampleCompany,
                status: CompanyStatus.DRAFT,
                activatedAt: undefined
              }}
              userCount={0}
              spaceCount={0}
            />
          </div>
        </div>
      </div>
    </section>
  );
}