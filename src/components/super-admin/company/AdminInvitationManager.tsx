import React from 'react'
import { Mail, RefreshCw, XCircle, Clock, Check, AlertTriangle } from 'lucide-react'
import { Button } from '../../Button'
import { ConfirmationDialog } from '../../ConfirmationDialog'
import { InvitationStatus, InvitationType, Invitation } from '../../../types/schema'

interface AdminInvitationManagerProps {
  companyId: string
  onInviteNew: () => void
  onResend: (invitationId: string) => void
  onCancel: (invitationId: string) => void
}

interface ConfirmDialogState {
  isOpen: boolean
  title: string
  message: string
  action: () => void
  variant: 'warning' | 'danger'
}

export function AdminInvitationManager({
  companyId,
  onInviteNew,
  onResend,
  onCancel
}: AdminInvitationManagerProps) {
  // TODO: Replace with API call
  const [invitations] = React.useState<Invitation[]>([
    {
      id: 'inv_1',
      companyId,
      email: 'pending@example.com',
      type: InvitationType.COMPANY_ADMIN,
      status: InvitationStatus.PENDING,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      resendCount: 0
    },
    {
      id: 'inv_2',
      companyId,
      email: 'sent@company.com',
      type: InvitationType.COMPANY_ADMIN,
      status: InvitationStatus.SENT,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      resendCount: 0
    },
    {
      id: 'inv_3',
      companyId,
      email: 'expired@tech.com',
      type: InvitationType.COMPANY_ADMIN,
      status: InvitationStatus.EXPIRED,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      resendCount: 2
    },
    {
      id: 'inv_4',
      companyId,
      email: 'accepted@startup.io',
      type: InvitationType.COMPANY_ADMIN,
      status: InvitationStatus.ACCEPTED,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      acceptedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      resendCount: 0
    },
    {
      id: 'inv_5',
      companyId,
      email: 'cancelled@corp.com',
      type: InvitationType.COMPANY_ADMIN,
      status: InvitationStatus.CANCELLED,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      sentAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      cancelledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      resendCount: 1,
      cancellationReason: 'Role reassigned'
    }
  ])

  const [confirmDialog, setConfirmDialog] = React.useState<ConfirmDialogState | null>(null)

  const confirmResend = (invitation: Invitation) => {
    if (invitation.resendCount >= 3) {
      setConfirmDialog({
        isOpen: true,
        title: 'Maximum Resend Limit',
        message: 'This invitation has reached the maximum number of resends allowed.',
        action: () => setConfirmDialog(null),
        variant: 'warning'
      })
      return
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Resend Invitation',
      message: `Are you sure you want to resend the invitation to ${invitation.email}? This will invalidate the previous invitation link.`,
      action: () => {
        onResend(invitation.id)
        setConfirmDialog(null)
      },
      variant: 'warning'
    })
  }

  const confirmCancel = (invitation: Invitation) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cancel Invitation',
      message: `Are you sure you want to cancel the invitation for ${invitation.email}? This action cannot be undone.`,
      action: () => {
        onCancel(invitation.id)
        setConfirmDialog(null)
      },
      variant: 'danger'
    })
  }

  const getStatusIcon = (status: InvitationStatus) => {
    switch (status) {
      case InvitationStatus.PENDING:
        return <Clock className="w-4 h-4 text-gray-400" />
      case InvitationStatus.SENT:
        return <Mail className="w-4 h-4 text-blue-400" />
      case InvitationStatus.EXPIRED:
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case InvitationStatus.ACCEPTED:
        return <Check className="w-4 h-4 text-green-400" />
      case InvitationStatus.CANCELLED:
        return <XCircle className="w-4 h-4 text-red-400" />
    }
  }

  const getStatusText = (invitation: Invitation) => {
    switch (invitation.status) {
      case InvitationStatus.PENDING:
        return 'Pending'
      case InvitationStatus.SENT:
        return `Sent ${new Date(invitation.sentAt!).toLocaleDateString()}`
      case InvitationStatus.EXPIRED:
        return `Expired ${new Date(invitation.expiresAt).toLocaleDateString()}`
      case InvitationStatus.ACCEPTED:
        return `Accepted ${new Date(invitation.acceptedAt!).toLocaleDateString()}`
      case InvitationStatus.CANCELLED:
        return `Cancelled ${new Date(invitation.cancelledAt!).toLocaleDateString()}`
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Admin Invitations</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage company admin access invitations
            </p>
          </div>
          <Button onClick={onInviteNew}>
            <Mail className="w-4 h-4 mr-1" />
            Invite Admin
          </Button>
        </div>

        {invitations.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900">No Invitations</h3>
            <p className="text-sm text-gray-500 mt-1">
              Get started by inviting a company admin
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {invitations.map(invitation => (
              <div
                key={invitation.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  invitation.status === InvitationStatus.EXPIRED || invitation.status === InvitationStatus.CANCELLED
                    ? 'bg-gray-100'
                    : 'bg-gray-50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(invitation.status)}
                    <span className="font-medium text-gray-900">
                      {invitation.email}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getStatusText(invitation)}
                    {invitation.resendCount > 0 && ` • Resent ${invitation.resendCount} times`}
                    {invitation.cancellationReason && ` • ${invitation.cancellationReason}`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(invitation.status === InvitationStatus.PENDING || 
                    invitation.status === InvitationStatus.SENT || 
                    invitation.status === InvitationStatus.EXPIRED) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => confirmResend(invitation)}
                      disabled={invitation.resendCount >= 3}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Resend
                    </Button>
                  )}
                  {(invitation.status === InvitationStatus.PENDING || 
                    invitation.status === InvitationStatus.SENT) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => confirmCancel(invitation)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
    </div>
  )
}