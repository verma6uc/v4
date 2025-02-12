import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';

export default function BillingSubscriptionPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Billing and Subscription Management</h1>
        <p className="text-gray-600 text-lg mb-8">
          The Billing and Subscription Management feature handles all financial and usage aspects of a company's relationship 
          with the YuVi platform. This feature enables companies to manage their subscription plans, monitor resource usage, 
          and handle billing operations. Through this feature, companies can configure their billing infrastructure including 
          payment methods, billing contacts, and tax information. Companies can view and manage their subscription plans, 
          understanding their allocated resources and usage limits. The feature provides clear visibility into current resource 
          consumption across various platform aspects, helping companies track their usage against plan limits. The feature 
          maintains comprehensive billing history, including invoice generation, payment tracking, and usage reports. It 
          provides capabilities for downloading invoices and detailed usage breakdowns. Companies can configure usage 
          notifications to receive alerts when approaching resource limits, helping prevent service interruptions. For 
          operational efficiency, the feature automates billing cycles, payment processing, and usage tracking. It handles 
          payment failures gracefully with proper notifications and retry mechanisms. The feature maintains detailed audit 
          trails of all billing and subscription changes for compliance and record-keeping. Critical to business continuity, 
          this feature ensures transparent tracking of platform utilization while maintaining proper financial records. It 
          supports various payment methods and billing cycles, accommodating different business needs. The feature also 
          facilitates smooth transitions between subscription plans as company needs evolve.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Subscription Management</h3>
              <p className="text-gray-600">
                This use case enables companies to manage their YuVi platform subscriptions effectively. Company Admins can 
                view detailed information about their current subscription plan, including resource limits, costs, and validity 
                periods. The use case provides plan comparison capabilities, allowing admins to evaluate different subscription 
                options against their current usage patterns and needs. When changing plans, the system ensures smooth 
                transitions by validating resource requirements and managing effective dates. The use case includes 
                comprehensive usage monitoring against plan limits, with proactive notifications for renewal dates and limit 
                breaches. All subscription-related activities are properly tracked and logged for audit purposes.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Billing Management</h3>
              <p className="text-gray-600">
                This use case handles the financial aspects of platform usage, managing payment methods, billing contacts, and 
                tax information. Companies can configure multiple payment methods with proper backup options and set up billing 
                contacts with specific notification preferences. The use case handles tax configuration including registration 
                numbers and exemption certificates. It manages the complete payment lifecycle, from payment scheduling through 
                processing to handling failures. The system provides configurable billing notifications for various events 
                including payment dues and failures. All billing information is securely stored with proper encryption for 
                sensitive data, and changes are tracked in the audit log.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Invoice Management</h3>
              <p className="text-gray-600">
                This use case manages the generation, delivery, and tracking of platform usage invoices. Company Admins can 
                view their complete invoice history, access detailed breakdowns of each invoice, and download invoices in 
                various formats. The use case provides comprehensive invoice information including itemized charges, applied 
                taxes, and payment status. Companies can share invoices securely with designated recipients through 
                time-limited links. The system maintains a complete history of invoice-related activities including downloads 
                and shares. The use case ensures proper formatting and branding of invoices while maintaining all required 
                legal and tax information.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Usage Monitoring</h3>
              <p className="text-gray-600">
                This use case provides comprehensive visibility into platform resource utilization. Company Admins can track 
                real-time usage across all subscription resources, analyze usage trends, and forecast future needs. The system 
                provides detailed analytics showing usage patterns, peak periods, and growth trends. Companies can configure 
                usage alerts with multiple threshold levels and notification rules. The use case includes detailed reporting 
                capabilities with scheduled report generation and various export options. Usage monitoring helps companies 
                optimize their resource utilization and plan for future needs while avoiding service disruptions from limit 
                breaches.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}