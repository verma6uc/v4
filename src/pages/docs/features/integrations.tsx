import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';

export default function IntegrationsPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Integrations Management</h1>
        <p className="text-gray-600 text-lg mb-8">
          The Integration Management feature enables companies to establish and manage secure connections between the YuVi 
          platform and their external enterprise systems. Currently focused on Single Sign-On (SSO) integration, this feature 
          provides capabilities for companies to leverage their existing identity providers for user authentication and access 
          management. Through SSO integration, companies can configure their chosen identity provider (such as Azure AD or 
          Okta) to handle user authentication, maintaining security standards while simplifying user access. The feature 
          supports industry-standard protocols like SAML 2.0 and OpenID Connect, ensuring compatibility with major identity 
          providers. The feature manages the complete lifecycle of integrations, from initial setup through ongoing 
          maintenance. This includes handling technical configurations like endpoint URLs and certificates, managing security 
          aspects such as encryption and signature validation, and maintaining role mappings between identity provider groups 
          and YuVi platform roles. Security is paramount in this feature, with robust validation of all configuration 
          elements, proper certificate management including expiry monitoring, and comprehensive audit logging of all 
          integration-related activities. The feature ensures that integrations remain secure and functional through proper 
          monitoring and timely alerts for any required maintenance actions. While currently focused on SSO, the feature's 
          architecture is designed to accommodate future integration types that may be needed for enterprise system 
          connectivity, maintaining consistent security and management principles across all integration types.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">SSO Integration</h3>
              <p className="text-gray-600">
                This use case handles setup and management of external system integrations for the company. It includes 
                configuration of Single Sign-On (SSO) for user authentication, management of API keys for external system 
                access, and setup of other integration points. Company Admins can configure integration parameters according 
                to their technical requirements while ensuring security and proper access control. The use case manages both 
                inbound integrations (like SSO) and outbound integrations (like API access). It includes validation of 
                integration configurations and monitoring of integration health. All integration setups are properly 
                documented and logged for security and audit purposes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}