import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';
import { Building2, UserPlus, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompanyProvisioningPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Company Provisioning</h1>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Feature Identifier: COPV</h2>
          <p className="text-blue-800">Uniqueness Level: 3</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Feature Identifier: COPV</h2>
          <p className="text-blue-800">Uniqueness Level: 3</p>
        </div>

        <p className="text-gray-600 text-lg mb-8">
          This feature enables the YuVi platform to onboard new companies through a secure and structured process. Through 
          this feature, Super Admins can create new company instances and establish their initial administrative access. 
          The process begins with creating a company record with basic identification information. Following this, a Company 
          Admin account is created and invited to access the platform. The feature handles the secure invitation process, 
          allowing the Company Admin to set up their credentials and verify their access.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Building2 className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Company Creation</h3>
                  <div className="prose prose-blue max-w-none">
                    <h4>User Story</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.COCR.US1</div>
                      As a Super Admin, I want to create a new Company so that I can establish their presence on the platform.
                    </blockquote>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Super Admin provides the company's name and a logo. The system verifies this identifier's uniqueness 
                      across all existing companies. Upon validation, the system creates the company's record and generates a 
                      unique internal reference. This reference will link all company-specific configurations, user data, and 
                      organizational structures to this company. Once created, the company record is ready for Company Admin 
                      invitation and subsequent organizational setup.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Default settings are applied automatically for the new company (e.g., password policy)</li>
                      <li>Super Admin should be able to view and modify these defaults during company creation</li>
                      <li>System must ensure company identifier uniqueness</li>
                      <li>All actions must be logged for audit purposes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <UserPlus className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Company Details Modification</h3>
                  <div className="prose prose-blue max-w-none">
                    <h4>User Story</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.COCR.US2</div>
                      As a Super Admin, I want to modify Company details so that I can update their information when needed.
                    </blockquote>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Super Admin accesses the company details from the companies list. The system shows the company's 
                      current identifier and base information. The Super Admin updates required details, and the system 
                      validates changes, particularly ensuring company identifier uniqueness if modified. Upon validation, 
                      the system updates the company record. If the Company Admin hasn't yet activated their account, they 
                      will see these updated details when they access their invitation link.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Changes must be validated for uniqueness and format requirements</li>
                      <li>System must maintain history of all modifications</li>
                      <li>Updates should be reflected immediately across the platform</li>
                      <li>Proper notifications should be sent to relevant stakeholders</li>
                    </ul>
                    
                    <h4>Phase</h4>
                    <p className="text-gray-600">Immediate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <UserPlus className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Company Admin Invitation</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: CPOV.CADI</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Create Admin Account</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.CADI.US1</div>
                      As a Super Admin, I want to create a Company Admin Account for a company so that I can establish their primary administrator.
                    </blockquote>
                    <p className="text-gray-600">
                      For a selected company, the Super Admin specifies the email address and name for the designated Company Admin. 
                      The system verifies the email is not associated with any existing account across companies. Upon validation, 
                      the system creates an admin account record and associates it with the company. The system assigns Company Admin 
                      permissions to this account, making it the primary administrator for the company.
                    </p>

                    <h4>Send Invitation Email</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.CADI.US2</div>
                      As a System, I want to send an Admin Invitation Email so that the Company Admin can securely access their account.
                    </blockquote>
                    <p className="text-gray-600">
                      The system generates a secure, time-limited invitation link for the Company Admin account. Using the provided 
                      email address, the system sends an invitation email containing this link along with initial access instructions. 
                      This invitation allows the Company Admin to set up their credentials and access the system for the first time.
                    </p>

                    <h4>View Invitation Status</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.CADI.US3</div>
                      As a Super Admin, I want to view the Invitation Status of Company Admins so that I can monitor the onboarding progress.
                    </blockquote>

                    <h4>Resend Invitation</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.CADI.US4</div>
                      As a Super Admin, I want to resend Admin Invitations so that I can ensure Company Admins receive their access information.
                    </blockquote>
                    <p className="text-gray-600">
                      The Super Admin selects the unactivated company admin account and triggers a new invitation. The system 
                      invalidates any previously sent invitation links for security. The system then generates a new secure 
                      invitation link with a fresh expiration period. Using the Company Admin's email address, the system sends 
                      a new invitation email containing this link. The system records this resend action in the audit log, 
                      tracking both the timestamp and the Super Admin who initiated it.
                    </p>

                    <h4>Cancel Activation</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.CADI.US5</div>
                      As a Super Admin, I want to cancel Admin Activation so that I can revoke pending invitations when needed.
                    </blockquote>
                    <p className="text-gray-600">
                      The Super Admin selects the unactivated admin account and initiates cancellation. The system immediately 
                      invalidates any existing invitation links sent to this admin. The system reverts the admin account to an 
                      inactive state, removing any association with the company while preserving the company record itself. The 
                      system adds this cancellation to the audit log. This allows the Super Admin to assign a different admin 
                      to the company through a new admin account creation.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>All invitation links must be secure and time-limited</li>
                      <li>Previous invitations must be invalidated when resending</li>
                      <li>Comprehensive audit logging for all actions</li>
                      <li>Email uniqueness must be verified across all companies</li>
                      <li>Proper error handling for all scenarios</li>
                    </ul>
                    
                    <h4>Phase</h4>
                    <p className="text-gray-600">Immediate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <FileCheck className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Company Admin Account Activation</h3>
                  <div className="prose prose-blue max-w-none">
                    <h4>User Story</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.COCR.US3</div>
                      As a Company Admin, I want to activate my account through the invitation link so that I can begin 
                      managing my company's platform presence.
                    </blockquote>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      When accessing the invitation link, the Company Admin verifies and updates basic company information 
                      while creating their secure password. The system validates the invitation link's validity and guides 
                      the admin through the activation process. Upon successful activation, the Company Admin gains access 
                      to manage their company's platform presence.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Invitation links must have proper expiration handling</li>
                      <li>Password creation must follow security policy requirements</li>
                      <li>System should provide clear guidance through the activation process</li>
                      <li>Proper error handling for expired or invalid invitations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <FileCheck className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Company Admin Account Activation</h3>
                  <div className="prose prose-blue max-w-none">
                    <h4>User Story</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.COCR.US3</div>
                      As a Company Admin, I want to activate my account through the invitation link so that I can begin 
                      managing my company's platform presence.
                    </blockquote>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      When accessing the invitation link, the Company Admin verifies and updates basic company information 
                      while creating their secure password. The system validates the invitation link's validity and guides 
                      the admin through the activation process. Upon successful activation, the Company Admin gains access 
                      to manage their company's platform presence.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Invitation links must have proper expiration handling</li>
                      <li>Password creation must follow security policy requirements</li>
                      <li>System should provide clear guidance through the activation process</li>
                      <li>Proper error handling for expired or invalid invitations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes & Questions</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900">Default Settings</h3>
              <p>What default settings should be applied by the system for each new company? For example:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Password policy configuration</li>
                <li>Security settings</li>
                <li>Communication preferences</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Default Configuration UI</h3>
              <p>Consider showing default settings to the Super Admin during company creation to allow customization before finalizing the setup.</p>
            </div>
          </div>
        </section>

      </div>
    </DocsLayout>
  );
}