import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';
import { Building2, UserPlus, FileCheck } from 'lucide-react';

export default function CompanyProvisioningPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Company Provisioning</h1>
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

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Account Activation</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <UserPlus className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Company Admin Account Activation</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: CPOV.ACAT</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Activate via Invitation Link</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.ACAT.US1</div>
                      As a Company Admin, I want to activate my account via the invitation link so that I can begin managing my company.
                    </blockquote>
                    <p className="text-gray-600">
                      When the Company Admin opens the invitation link, they are welcomed with their company's name and logo 
                      prominently displayed. They see and can edit their company's foundational information including company 
                      name, primary business address, and contact phone number. The system also displays their own details - 
                      name, title, and email address - which they can verify and update except the email. Below this, they 
                      create a secure password that will protect their administrator account. They can also see the password 
                      policy that was set as a default for the company. The page provides a clear, welcoming experience that 
                      combines account security with the ability to verify and refine their company's core information, 
                      ensuring accuracy before they begin their administrative journey.
                    </p>

                    <h4>Expired Invitation Link</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.ACAT.US2</div>
                      As a Company Admin, I should be notified when trying to use an expired invitation link.
                    </blockquote>
                    <p className="text-gray-600">
                      When the Company Admin clicks an expired invitation link, the system identifies that the link's validity 
                      period has elapsed. The system displays a clear message explaining that the invitation has expired and 
                      cannot be used for activation. The system guides the Company Admin to contact their Super Admin for a 
                      new invitation while maintaining the security of the account setup process. The system logs this expired 
                      link access attempt, enabling Super Admins to track activation issues.
                    </p>

                    <h4>Request New Invitation</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.ACAT.US3</div>
                      As a Company Admin, I want to request a new invitation link when mine has expired.
                    </blockquote>
                    <p className="text-gray-600">
                      When their invitation link has expired, the Company Admin accesses the expired link page and selects 
                      the option to request a new invitation. The system verifies that the requesting email matches the 
                      original invitation email. Upon verification, the system automatically generates a new secure invitation 
                      link, invalidates any previous links, and sends a fresh invitation email to the Company Admin. The 
                      system displays a confirmation message informing the Company Admin to check their email for the new 
                      invitation.
                    </p>

                    <h4>Canceled Invitation</h4>
                    <blockquote className="text-gray-600 border-l-4 border-blue-200 pl-4 my-4">
                      <div className="font-medium text-blue-900 mb-2">CPOV.ACAT.US4</div>
                      As a Company Admin, I should be notified when trying to use a canceled invitation link.
                    </blockquote>
                    <p className="text-gray-600">
                      When the Company Admin clicks a cancelled invitation link, the system identifies that the invitation 
                      has been revoked by the Super Admin. The system displays a message explaining that the invitation is 
                      no longer valid and access has been denied. The system does not provide an option to request a new 
                      link since this was an intentional cancellation by the Super Admin, and guides the Company Admin to 
                      contact their company representative for clarification.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>All invitation links must be time-limited</li>
                      <li>Clear error messages for expired/canceled invitations</li>
                      <li>Secure password creation with policy enforcement</li>
                      <li>Comprehensive audit logging of all activation attempts</li>
                      <li>Proper validation of company information updates</li>
                    </ul>
                    
                    <h4>Phase</h4>
                    <p className="text-gray-600">Immediate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Company Status Management</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Suspend Company Access</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: COMM.COSM.US1</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Super Admin selects a company from the active companies list and initiates suspension. The system 
                      verifies that the company is in an active state and can be suspended. Upon confirmation, the system 
                      changes the company status to suspended, which prevents all company users from accessing the system. 
                      The system sends an automatic notification to the Company Admin informing them of the suspension. The 
                      system maintains a record of this suspension action in the audit log.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Verify company state before suspension</li>
                      <li>Implement immediate access restriction</li>
                      <li>Send high-priority notifications</li>
                      <li>Maintain detailed audit logs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Company Suspended Notification</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: COMM.COSM.US2</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      When the system changes a company's status to suspended, it generates a high-priority notification to 
                      the Company Admin. The system sends this notification via email, informing them that their company 
                      access has been suspended, preventing all company users from accessing the system. The system includes 
                      the suspension timestamp and provides guidance for contacting support regarding the suspension. This 
                      notification is also made available in the system for future reference.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Ensure reliable email delivery</li>
                      <li>Include clear support contact information</li>
                      <li>Store notifications for reference</li>
                      <li>Track notification delivery status</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Reactivate Company</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: COMM.COSM.US3</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Super Admin selects a company from the suspended companies list and initiates reactivation. The 
                      system verifies that the company is in a suspended state and can be reactivated. Upon confirmation, 
                      the system changes the company status to active, restoring system access for all company users. The 
                      system sends an automatic notification to the Company Admin informing them of the reactivation. The 
                      system maintains a record of this reactivation action in the audit log.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Verify company state before reactivation</li>
                      <li>Restore access permissions properly</li>
                      <li>Send reactivation notifications</li>
                      <li>Update audit logs accordingly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Company Reactivated Notification</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: COMM.COSM.US4</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      When the system changes a company's status to active, it generates a notification to the Company 
                      Admin. The system sends this notification via email, informing them that their company access has 
                      been restored and all company users can now access the system. The system includes the reactivation 
                      timestamp. This notification is also made available in the system for future reference.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Send clear reactivation notifications</li>
                      <li>Include access restoration details</li>
                      <li>Maintain notification history</li>
                      <li>Ensure proper timestamp handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Archive Company</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: COMM.COSM.US5</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Super Admin selects a company from the active companies list and initiates archival. The system 
                      verifies that the company is in an active or suspended state and can be archived. Upon confirmation, 
                      the system changes the company status to archived, which makes all company data read-only and 
                      prevents user access to the system. The system sends an automatic notification to the Company Admin 
                      informing them of the archival. The system maintains a record of this archival action in the audit 
                      log.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Implement read-only data access</li>
                      <li>Verify state transitions</li>
                      <li>Send archival notifications</li>
                      <li>Maintain comprehensive audit logs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Delete Company</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: COMM.COSM.US6</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The Super Admin selects a company from the archived companies list and initiates deletion. The system 
                      verifies that the company is in an archived state and can be deleted. Upon confirmation and secondary 
                      verification (due to the permanent nature of deletion), the system permanently removes all company 
                      data and user access from the system. The system sends a final notification to the Company Admin 
                      confirming the company deletion. The system maintains a record of this deletion action in a secure 
                      audit log.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Implement double confirmation</li>
                      <li>Ensure complete data removal</li>
                      <li>Send final notifications</li>
                      <li>Maintain secure deletion logs</li>
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