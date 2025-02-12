import React from 'react';
import { CompanyMiniCard } from '../CompanyMiniCard';
import { CompanyMacroCard } from '../CompanyMacroCard';
import { exampleCompany } from '../examples/company.data';
import { createHandler } from '../examples/helpers';

export function CompanyCardsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Company Cards</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mini Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <CompanyMiniCard 
              {...exampleCompany}
              onSuspend={createHandler('Suspend Company')}
              onArchive={createHandler('Archive Company')}
            />
            <CompanyMiniCard 
              {...exampleCompany}
              status="DRAFT"
              onActivate={createHandler('Activate Company')}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Macro Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <CompanyMacroCard 
              {...exampleCompany}
              onSuspend={createHandler('Suspend Company')}
              onArchive={createHandler('Archive Company')}
              onUpdateDetails={createHandler('Update Details')}
              onUpdateSecurity={createHandler('Update Security')}
              onUpdateLocalization={createHandler('Update Localization')}
            />
            <CompanyMacroCard 
              {...exampleCompany}
              status="SUSPENDED"
              onReactivate={createHandler('Reactivate Company')}
            />
            <CompanyMacroCard 
              {...exampleCompany}
              status="ARCHIVED"
              onDelete={createHandler('Delete Company')}
            />
            <CompanyMacroCard 
              {...exampleCompany}
              status="DRAFT"
              onActivate={createHandler('Activate Company')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}