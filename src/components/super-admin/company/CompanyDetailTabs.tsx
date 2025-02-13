import React from 'react'
import { Company } from '../../../types/schema'
import { CompanyMacroCard } from '../../cards/CompanyMacroCard'
import { AdminInvitationManager } from './AdminInvitationManager'

interface CompanyDetailTabsProps {
  company: Company
  activeTab?: string
  onTabChange?: (tab: string) => void
  onInviteAdmin: () => void
  onResendInvitation: (id: string) => void
  onCancelInvitation: (id: string) => void
}

export function CompanyDetailTabs({
  company,
  activeTab = 'overview',
  onTabChange,
  onInviteAdmin,
  onResendInvitation,
  onCancelInvitation
}: CompanyDetailTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'invitations', label: 'Admin Invitations' }
  ]

  // Mock data for the macro card
  const mockData = {
    userCount: 156,
    spaceCount: 12
  }

  const handleTabChange = (tabId: string) => {
    onTabChange?.(tabId)
  }

  return (
    <div className="-mt-px">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === 'overview' && (
          <div className="max-w-none">
            <CompanyMacroCard 
              company={company} 
              userCount={mockData.userCount}
              spaceCount={mockData.spaceCount}
            />
          </div>
        )}

        {activeTab === 'invitations' && (
          <div className="max-w-none">
            <AdminInvitationManager
              companyId={company.id}
              onInviteNew={onInviteAdmin}
              onResend={onResendInvitation}
              onCancel={onCancelInvitation}
            />
          </div>
        )}
      </div>
    </div>
  )
}