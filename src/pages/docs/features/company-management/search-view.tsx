import React from 'react';
import { DocsLayout } from '../../../../layouts/DocsLayout';

export default function CompanySearchViewPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Company Search & View</h1>
        <p className="text-gray-600 text-lg mb-8">
          These use cases provide Super Admins with comprehensive capabilities to locate and examine companies on the platform.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">View Company List</h3>
              <div className="prose prose-blue max-w-none">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Identifier: COMM.CSAV.US1</p>
                  <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                </div>
                <p className="text-gray-600">
                  The Super Admin accesses the company management section where the system displays a paginated list of all 
                  companies. For each company, the system shows key information including company name, status (active, 
                  suspended, archived), creation date, and the Company Admin email. The list defaults to showing active 
                  companies first, ordered by creation date with most recent companies at the top. The system indicates the 
                  total number of companies and how many are currently displayed on the page.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">View Company Details</h3>
              <div className="prose prose-blue max-w-none">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Identifier: COMM.CSAV.US2</p>
                  <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                </div>
                <p className="text-gray-600">
                  The Super Admin selects a company from the list, and the system presents comprehensive company information 
                  organized in sections. The system shows company details (name, business address, contact information), key 
                  metrics (active users, space count, resource usage), current status, and important dates (creation, last 
                  activity). The system also displays the Company Admin information and a chronological activity log showing 
                  significant events in the company's lifecycle.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Search Companies</h3>
              <div className="prose prose-blue max-w-none">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Identifier: COMM.CSAV.US3</p>
                  <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                </div>
                <p className="text-gray-600">
                  The Super Admin enters search terms into the search field, and the system performs a real-time search 
                  across company names, company identifiers, and Company Admin emails. The system dynamically displays 
                  matching companies as the Super Admin types, prioritizing exact matches first followed by partial matches. 
                  If multiple search terms are entered, the system finds companies matching any of the terms and indicates 
                  which terms matched.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Filter Companies</h3>
              <div className="prose prose-blue max-w-none">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Identifier: COMM.CSAV.US4</p>
                  <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                </div>
                <p className="text-gray-600">
                  The Super Admin applies one or multiple filters to the company list, selecting from available filter 
                  criteria including company status (active, suspended, archived), creation date range, and Company Admin 
                  status (activated, pending). The system updates the list in real-time to show only companies matching all 
                  selected filter conditions.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Advanced Filtering</h3>
              <div className="prose prose-blue max-w-none">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Identifier: COMM.CSAV.US5</p>
                  <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                </div>
                <p className="text-gray-600">
                  The Super Admin expands the advanced filtering section, accessing granular filter criteria. The system 
                  allows combining multiple advanced criteria using AND/OR conditions. The system applies these complex 
                  filter rules to the company list, showing only companies that satisfy the complete filter logic.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Sort Companies</h3>
              <div className="prose prose-blue max-w-none">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Identifier: COMM.CSAV.US6</p>
                  <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                </div>
                <p className="text-gray-600">
                  The Super Admin selects a column header from the company list to sort by that attribute. The system 
                  reorders the list based on the selected attribute, toggling between ascending and descending order with 
                  each click. The Super Admin can add secondary sort criteria by holding the shift key while selecting 
                  another column.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Export Companies</h3>
              <div className="prose prose-blue max-w-none">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Identifier: COMM.CSAV.US7</p>
                  <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                </div>
                <p className="text-gray-600">
                  The Super Admin initiates company list export, and the system prepares a download based on the current 
                  view (including any active filters, searches, or sorts). The system generates a formatted file containing 
                  company information visible in the current list view. For larger exports, the system shows a progress 
                  indicator and notifies the Super Admin upon completion.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}