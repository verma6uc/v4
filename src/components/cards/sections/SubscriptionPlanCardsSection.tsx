import React from 'react';
import { SubscriptionPlanMiniCard } from '../SubscriptionPlanMiniCard';
import { SubscriptionPlanMacroCard } from '../SubscriptionPlanMacroCard';
import { exampleSubscriptionPlan } from '../examples/subscription-plan.data';
import { createHandler } from '../examples/helpers';

export function SubscriptionPlanCardsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Subscription Plan Cards</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mini Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <SubscriptionPlanMiniCard 
              {...exampleSubscriptionPlan}
              limits={{
                users: exampleSubscriptionPlan.userLimits.maxUsers,
                storage: exampleSubscriptionPlan.storageLimits.included,
                apiCalls: exampleSubscriptionPlan.apiLimits.monthlyRequests
              }}
              onUpdate={createHandler('Update Plan')}
              onGrandfather={createHandler('Grandfather Plan')}
            />
            <SubscriptionPlanMiniCard 
              {...exampleSubscriptionPlan}
              status="DRAFT"
              limits={{
                users: exampleSubscriptionPlan.userLimits.maxUsers,
                storage: exampleSubscriptionPlan.storageLimits.included,
                apiCalls: exampleSubscriptionPlan.apiLimits.monthlyRequests
              }}
              onActivate={createHandler('Activate Plan')}
            />
            <SubscriptionPlanMiniCard 
              {...exampleSubscriptionPlan}
              status="GRANDFATHERED"
              limits={{
                users: exampleSubscriptionPlan.userLimits.maxUsers,
                storage: exampleSubscriptionPlan.storageLimits.included,
                apiCalls: exampleSubscriptionPlan.apiLimits.monthlyRequests
              }}
              onDiscontinue={createHandler('Discontinue Plan')}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Macro Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <SubscriptionPlanMacroCard 
              {...exampleSubscriptionPlan}
              onUpdate={createHandler('Update Plan')}
              onGrandfather={createHandler('Grandfather Plan')}
              onViewUsage={createHandler('View Usage')}
              onConfigureFeatures={createHandler('Configure Features')}
              onManagePricing={createHandler('Manage Pricing')}
              onViewSubscriptions={createHandler('View Subscriptions')}
            />
            <SubscriptionPlanMacroCard 
              {...exampleSubscriptionPlan}
              status="DRAFT"
              onActivate={createHandler('Activate Plan')}
              onConfigureFeatures={createHandler('Configure Features')}
              onManagePricing={createHandler('Manage Pricing')}
            />
            <SubscriptionPlanMacroCard 
              {...exampleSubscriptionPlan}
              status="GRANDFATHERED"
              onDiscontinue={createHandler('Discontinue Plan')}
              onViewUsage={createHandler('View Usage')}
              onViewSubscriptions={createHandler('View Subscriptions')}
            />
            <SubscriptionPlanMacroCard 
              {...exampleSubscriptionPlan}
              status="DISCONTINUED"
              onViewUsage={createHandler('View Usage')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}