import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';
import { Store, Box, Activity, FileText, Bell } from 'lucide-react';

export default function SpaceAdminPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Space Administration</h1>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Feature Identifier: SPA</h2>
          <p className="text-blue-800">Uniqueness Level: 2</p>
        </div>

        <p className="text-gray-600 text-lg mb-8">
          The Space Administration feature enables Space Admins to manage applications within their designated spaces. 
          Through this feature, admins can browse available applications in the App Store, deploy them to their spaces, 
          and monitor their operation. The feature includes comprehensive audit logging capabilities to track all 
          administrative actions.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Store className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Browse App Store</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: SPA.DEP.US1</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      Space Admins can browse the App Store to view available applications for deployment. The store displays 
                      only published applications with their summaries, requirements, and deployment options. Admins can:
                    </p>
                    <ul className="text-gray-600">
                      <li>Filter applications by category, status, and requirements</li>
                      <li>Sort applications by various criteria</li>
                      <li>View detailed application information</li>
                      <li>Compare multiple applications</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Show only published applications</li>
                      <li>Implement efficient search and filtering</li>
                      <li>Display clear deployment requirements</li>
                      <li>Track browsing activity for analytics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Box className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Deploy Application</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: SPA.DEP.US2</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      Space Admins can deploy selected applications to their authorized spaces. The deployment process includes:
                    </p>
                    <ul className="text-gray-600">
                      <li>Selecting target space from authorized spaces</li>
                      <li>Configuring deployment parameters</li>
                      <li>Validating space requirements</li>
                      <li>Confirming deployment settings</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Verify admin rights before deployment</li>
                      <li>Validate space compatibility</li>
                      <li>Handle deployment state transitions</li>
                      <li>Log all deployment actions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Activity className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Manage Deployed Applications</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: SPA.DEP.US3</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      Space Admins can monitor and manage applications deployed in their spaces through a comprehensive 
                      dashboard that shows:
                    </p>
                    <ul className="text-gray-600">
                      <li>Application status and health metrics</li>
                      <li>Usage statistics and trends</li>
                      <li>Configuration settings</li>
                      <li>Update availability</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Real-time status monitoring</li>
                      <li>Efficient update management</li>
                      <li>Configuration validation</li>
                      <li>Performance tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Download Audit Logs</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: SPA.AUD.US2</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      Space Admins can export audit logs for their spaces in CSV format. The export process includes:
                    </p>
                    <ul className="text-gray-600">
                      <li>Setting date range for export</li>
                      <li>Selecting log categories</li>
                      <li>Choosing export format options</li>
                      <li>Downloading secure log files</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Secure file generation</li>
                      <li>Efficient large file handling</li>
                      <li>Clear progress indication</li>
                      <li>Download verification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Bell className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Audit Log Management</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: SPA.AUD.US3-5</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      Space Admins can manage and analyze audit logs through various tools:
                    </p>
                    <ul className="text-gray-600">
                      <li>Filter logs by date, user, or action type</li>
                      <li>Search logs with keyword queries</li>
                      <li>Sort logs by different columns</li>
                      <li>View detailed log entries</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Efficient log indexing</li>
                      <li>Real-time search updates</li>
                      <li>Persistent sort preferences</li>
                      <li>Clear data presentation</li>
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
              <h3 className="font-medium text-gray-900">Performance</h3>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Optimize app store browsing for large catalogs</li>
                <li>Efficient handling of deployment operations</li>
                <li>Fast audit log search and retrieval</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Security</h3>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Strict permission validation</li>
                <li>Secure audit log handling</li>
                <li>Protected deployment operations</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}