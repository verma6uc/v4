import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  Company, 
  CompanyStatus,
  InvitationType, 
  InvitationStatus 
} from '../../types/schema'
import { CompanyStatusBadge } from '../../components/super-admin/company/CompanyStatusBadge'
import { Toast, ToastContainer, useToasts } from '../../components/Toast'
import { Button } from '../../components/Button'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'
import { EditCompanyModal } from '../../components/super-admin/company/EditCompanyModal'
import { InviteAdminModal } from '../../components/super-admin/company/InviteAdminModal'
import { CompanyDetailTabs } from '../../components/super-admin/company/CompanyDetailTabs'
import { demoCompanies } from '../../components/super-admin/company/demo-data'

export function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [company, setCompany] = React.useState<Company | null>(null)
  const [activeTab, setActiveTab] = React.useState('overview')
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false)
  const [confirmDialog, setConfirmDialog] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => void;
    variant: 'warning' | 'danger';
  } | null>(null)
  const { toasts, addToast, removeToast } = useToasts()

  React.useEffect(() => {
    // TODO: Replace with API call
    const foundCompany = demoCompanies.find(c => c.id === id)
    setCompany(foundCompany || null)
  }, [id])

  const handleEdit = async (companyId: string, updates: Partial<Company>) => {
    try {
      // TODO: API call to update company
      console.log('Edit company:', companyId, updates)
      setCompany(prev => prev ? { ...prev, ...updates } : null)
      setIsEditModalOpen(false)
      addToast('success', 'Company updated successfully')
    } catch (error) {
      console.error('Error updating company:', error)
      addToast('error', 'Failed to update company. Please try again.')
    }
  }

  const handleActivate = async () => {
    try {
      // TODO: API call to activate company
      console.log('Activate company:', company?.id)
      setCompany(prev => prev ? { ...prev, status: CompanyStatus.ACTIVE } : null)
      addToast('success', 'Company activated successfully')
    } catch (error) {
      console.error('Error activating company:', error)
      addToast('error', 'Failed to activate company. Please try again.')
    }
  }

  const confirmSuspend = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Suspend Company',
      message: 'Are you sure you want to suspend this company? All users will lose access until the company is reactivated.',
      action: handleSuspend,
      variant: 'warning'
    })
  }

  const handleSuspend = async () => {
    try {
      // TODO: API call to suspend company
      console.log('Suspend company:', company?.id)
      setCompany(prev => prev ? { ...prev, status: CompanyStatus.SUSPENDED } : null)
      setConfirmDialog(null)
      addToast('success', 'Company suspended successfully')
    } catch (error) {
      console.error('Error suspending company:', error)
      addToast('error', 'Failed to suspend company. Please try again.')
    }
  }

  const confirmArchive = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Archive Company',
      message: 'Are you sure you want to archive this company? This action cannot be undone.',
      action: handleArchive,
      variant: 'danger'
    })
  }

  const handleArchive = async () => {
    try {
      // TODO: API call to archive company
      console.log('Archive company:', company?.id)
      setCompany(prev => prev ? { ...prev, status: CompanyStatus.ARCHIVED } : null)
      setConfirmDialog(null)
      addToast('success', 'Company archived successfully')
    } catch (error) {
      console.error('Error archiving company:', error)
      addToast('error', 'Failed to archive company. Please try again.')
    }
  }

  const confirmDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Company',
      message: 'Are you sure you want to permanently delete this company? This action cannot be undone.',
      action: handleDelete,
      variant: 'danger'
    })
  }

  const handleDelete = async () => {
    try {
      // TODO: API call to delete company
      console.log('Delete company:', company?.id)
      setCompany(prev => prev ? { ...prev, status: CompanyStatus.DELETED } : null)
      setConfirmDialog(null)
      addToast('success', 'Company marked for deletion successfully')
    } catch (error) {
      console.error('Error deleting company:', error)
      addToast('error', 'Failed to delete company. Please try again.')
    }
  }

  const handleInviteAdmin = async (data: { 
    email: string,
    type: InvitationType,
    status: InvitationStatus 
  }) => {
    try {
      // TODO: API call to create invitation
      console.log('Invite admin:', data)
      setIsInviteModalOpen(false)
      // In real implementation, this would be PENDING until the email is sent
      // The system would then update it to SENT after email delivery
      addToast('success', 'Invitation sent successfully')
    } catch (error) {
      console.error('Error inviting admin:', error)
      addToast('error', 'Failed to send invitation. Please try again.')
    }
  }

  const handleResendInvitation = async (invitationId: string) => {
    try {
      // TODO: API calls:
      // 1. Validate resend limits
      // 2. Invalidate previous token
      // 3. Generate new token
      // 4. Send new invitation email
      console.log('Resend invitation:', invitationId)
      // In real implementation, this would update lastResendAt and increment resendCount
      addToast('success', 'Invitation resent successfully')
    } catch (error) {
      console.error('Error resending invitation:', error)
      addToast('error', 'Failed to resend invitation. Please try again.')
    }
  }

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      // TODO: API calls:
      // 1. Update invitation status to CANCELLED
      // 2. Invalidate token
      console.log('Cancel invitation:', invitationId)
      // In real implementation, this would set cancelledAt and cancellationReason
      addToast('success', 'Invitation cancelled successfully')
    } catch (error) {
      console.error('Error cancelling invitation:', error)
      addToast('error', 'Failed to cancel invitation. Please try again.')
    }
  }

  if (!company) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Company not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-50/50 backdrop-blur-xl border-b border-blue-100">
        <div className="flex items-center justify-between py-4 px-6">
          <div>
            <Link
              to="/super-admin/companies"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-lg"
            >
              ←
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {company.status === CompanyStatus.DRAFT && (
              <Button onClick={handleActivate}>Activate</Button>
            )}
            {company.status === CompanyStatus.ACTIVE && (
              <>
                <Button variant="warning" onClick={confirmSuspend}>Suspend</Button>
                <Button variant="danger" onClick={confirmArchive}>Archive</Button>
              </>
            )}
            {company.status === CompanyStatus.SUSPENDED && (
              <>
                <Button onClick={handleActivate}>Activate</Button>
                <Button variant="danger" onClick={confirmArchive}>Archive</Button>
              </>
            )}
            {company.status === CompanyStatus.ARCHIVED && (
              <Button 
                variant="danger"
                size="sm"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            )}
            {(company.status === CompanyStatus.DRAFT || company.status === CompanyStatus.ACTIVE) && (
              <Button onClick={() => setIsEditModalOpen(true)}>Edit</Button>
            )}

          </div>
        </div>
      </div>

      <main className="py-6">
        <CompanyDetailTabs
          company={company}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onInviteAdmin={() => setIsInviteModalOpen(true)}
          onResendInvitation={handleResendInvitation}
          onCancelInvitation={handleCancelInvitation}
        />
      </main>

      <EditCompanyModal
        isOpen={isEditModalOpen}
        company={company}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
      />

      <InviteAdminModal
        isOpen={isInviteModalOpen}
        company={company}
        onClose={() => setIsInviteModalOpen(false)}
        onSubmit={handleInviteAdmin}
      />

      {confirmDialog && (
        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={confirmDialog.action}
          onCancel={() => setConfirmDialog(null)}
          variant={confirmDialog.variant}
        />
      )}

      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
    </div>
  )
}