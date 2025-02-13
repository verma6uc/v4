import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, ToastType, useToasts } from '../../components/Toast'
import {
  Company,
  CompanyHeader,
  CompanyMetrics,
  CompanyList,
  CreateCompanyModal,
  CompanyListHeader,
  demoCompanies
} from '../../components/super-admin/company'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'

export function CompaniesPage() {
  // State
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [confirmDialog, setConfirmDialog] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => void;
    variant: 'warning' | 'danger';
  } | null>(null)
  const [companies] = React.useState<Company[]>(demoCompanies)
  const { toasts, addToast, removeToast } = useToasts()
  const navigate = useNavigate()

  // Handlers
  const handleCreateCompany = async (newCompany: Partial<Company>) => {
    try {
      // TODO: API call to create company
      console.log('Create company:', newCompany)
      
      setIsCreateModalOpen(false)
      addToast('success', 'Company created successfully')
    } catch (error) {
      console.error('Error creating company:', error)
      addToast('error', 'Failed to create company. Please try again.')
    }
  }

  const handleActivate = async (company: Company) => {
    try {
      // TODO: API call to activate company
      console.log('Activate company:', company.id)
      addToast('success', 'Company activated successfully')
    } catch (error) {
      console.error('Error activating company:', error)
      addToast('error', 'Failed to activate company. Please try again.')
    }
  }

  const confirmSuspend = (company: Company) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Suspend Company',
      message: 'Are you sure you want to suspend this company? All users will lose access until the company is reactivated.',
      action: () => handleSuspend(company),
      variant: 'warning'
    })
  }

  const handleSuspend = async (company: Company) => {
    try {
      // TODO: API call to suspend company
      console.log('Suspend company:', company.id)
      setConfirmDialog(null)
      addToast('success', 'Company suspended successfully')
    } catch (error) {
      console.error('Error suspending company:', error)
      addToast('error', 'Failed to suspend company. Please try again.')
    }
  }

  const confirmArchive = (company: Company) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Archive Company',
      message: 'Are you sure you want to archive this company? This action cannot be undone.',
      action: () => handleArchive(company),
      variant: 'danger'
    })
  }

  const handleArchive = async (company: Company) => {
    try {
      // TODO: API call to archive company
      console.log('Archive company:', company.id)
      setConfirmDialog(null)
      addToast('success', 'Company archived successfully')
    } catch (error) {
      console.error('Error archiving company:', error)
      addToast('error', 'Failed to archive company. Please try again.')
    }
  }

  const confirmDelete = (company: Company) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Company',
      message: 'Are you sure you want to permanently delete this company? This action cannot be undone.',
      action: () => handleDelete(company),
      variant: 'danger'
    })
  }

  const handleDelete = async (company: Company) => {
    try {
      // TODO: API call to delete company
      console.log('Delete company:', company.id)
      setConfirmDialog(null)
      addToast('success', 'Company marked for deletion successfully')
    } catch (error) {
      console.error('Error deleting company:', error)
      addToast('error', 'Failed to delete company. Please try again.')
    }
  }

  const handleCompanyClick = (company: Company) => {
    navigate(`/super-admin/companies/${company.id}`)
  }

  return (
    <>
      <div className="mb-6">
        <CompanyHeader
          onCreateClick={() => setIsCreateModalOpen(true)}
        />

        <CompanyMetrics companies={companies} />
      </div>

      <div>
        <CompanyListHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <CompanyList
          companies={companies}
          viewMode={viewMode}
          searchQuery={searchQuery}
          onCompanyClick={handleCompanyClick}
          onActivate={handleActivate}
          onSuspend={confirmSuspend}
          onArchive={confirmArchive}
          onDelete={confirmDelete}
        />
      </div>

      <CreateCompanyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCompany}
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
    </>
  )
}