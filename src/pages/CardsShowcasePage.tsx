import React from 'react';
import {
  UserCardsSection,
  CompanyCardsSection,
  SpaceCardsSection,
  ApplicationCardsSection,
  InvoiceCardsSection,
  SubscriptionPlanCardsSection
} from '../components/cards/sections';

export function CardsShowcasePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Card Components</h1>
          <p className="mt-1 text-sm text-gray-500">
            Showcase of mini and macro card components for various business objects
          </p>
        </div>

        <UserCardsSection />
        <CompanyCardsSection />
        <SpaceCardsSection />
        <ApplicationCardsSection />
        <InvoiceCardsSection />
        <SubscriptionPlanCardsSection />
      </div>
    </div>
  );
}