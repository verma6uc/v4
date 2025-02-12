import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';
import { ShieldCheck, Mail, CheckCircle, UserPlus } from 'lucide-react';

export default function SelfSignupPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Self Signup</h1>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Feature Identifier: SSUP</h2>
          <p className="text-blue-800">Uniqueness Level: 2</p>
        </div>

        <p className="text-gray-600 text-lg mb-8">
          The Self Signup feature enables prospective companies to onboard themselves to the YuVi platform through a 
          streamlined, self-service process. This approach mirrors the established flow used in Company Provisioning and 
          Company Admin Account Activation. When a user initiates self signup, they provide essential company and personal 
          details, and the system automatically creates a new company record along with a Company Admin account. The user 
          is then guided through a secure activation process—including credential setup and email verification—to complete 
          onboarding.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <UserPlus className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Self Signup and Account Activation</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: SSUP.SSAA.US1</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The self-service onboarding workflow consists of several key steps:
                    </p>

                    <div className="mt-6 space-y-6">
                      <div className="flex items-start gap-4">
                        <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                        <div>
                          <h5 className="font-medium text-gray-900">Input Validation</h5>
                          <p className="text-gray-600">
                            The system validates all provided information:
                          </p>
                          <ul className="mt-2">
                            <li>Checks for duplicate entries</li>
                            <li>Ensures required fields meet validation rules</li>
                            <li>Verifies email format and uniqueness</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                        <div>
                          <h5 className="font-medium text-gray-900">Company Record Creation</h5>
                          <p className="text-gray-600">
                            Upon validation, the system:
                          </p>
                          <ul className="mt-2">
                            <li>Creates new company instance</li>
                            <li>Generates unique identifier</li>
                            <li>Establishes initial configuration</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                        <div>
                          <h5 className="font-medium text-gray-900">Account Activation</h5>
                          <p className="text-gray-600">
                            The system guides the user through:
                          </p>
                          <ul className="mt-2">
                            <li>Secure password creation</li>
                            <li>Email verification</li>
                            <li>Initial profile setup</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <h4 className="mt-8">Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Implement comprehensive validation rules</li>
                      <li>Ensure secure password requirements</li>
                      <li>Track signup progress for analytics</li>
                      <li>Handle error cases gracefully</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Implementation Considerations</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900">Security</h3>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Implement rate limiting for signup attempts</li>
                <li>Validate email ownership through verification</li>
                <li>Enforce strong password requirements</li>
                <li>Monitor for suspicious signup patterns</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">User Experience</h3>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Provide clear progress indication</li>
                <li>Show helpful validation messages</li>
                <li>Allow saving progress for later completion</li>
                <li>Offer contextual help throughout the process</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}