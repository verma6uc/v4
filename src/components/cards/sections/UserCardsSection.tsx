import React from 'react';
import { UserMiniCard } from '../UserMiniCard';
import { UserMacroCard } from '../UserMacroCard';
import { exampleUser } from '../examples/user.data';
import { createHandler } from '../examples/helpers';

export function UserCardsSection() {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-medium text-gray-900 mb-4">User Cards</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Mini Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <UserMiniCard 
              {...exampleUser}
              onSuspend={createHandler('Suspend User')}
              onArchive={createHandler('Archive User')}
            />
            <UserMiniCard 
              {...exampleUser}
              status="SUSPENDED"
              onReactivate={createHandler('Reactivate User')}
            />
            <UserMiniCard 
              {...exampleUser}
              status="INVITED"
              onSendInvitation={createHandler('Send Invitation')}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Macro Card</h3>
          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <UserMacroCard 
              {...exampleUser}
              onSuspend={createHandler('Suspend User')}
              onArchive={createHandler('Archive User')}
              onUpdateProfile={createHandler('Update Profile')}
              onChangeEmail={createHandler('Change Email')}
              onResetPassword={createHandler('Reset Password')}
              onConfigureMfa={createHandler('Configure MFA')}
            />
            <UserMacroCard 
              {...exampleUser}
              status="SUSPENDED"
              onReactivate={createHandler('Reactivate User')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}