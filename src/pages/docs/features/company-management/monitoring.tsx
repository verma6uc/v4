import React from 'react';
import { DocsLayout } from '../../../../layouts/DocsLayout';

export default function CompanyMonitoringPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Company Monitoring</h1>
        <p className="text-gray-600 text-lg mb-8">
          This use case provides Super Admins with tools to oversee company health and usage on the platform.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Monitor Company Health</h3>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600">
                  It enables monitoring of key metrics including overall company health indicators, usage patterns, and 
                  growth trends. Super Admins can track active user patterns, feature adoption rates, and resource 
                  utilization across different aspects of the platform. The use case supports generating comprehensive 
                  reports about company operations and performance. This monitoring capability helps identify potential 
                  issues early, understand usage patterns, and ensure companies are operating effectively on the platform. 
                  It provides both real-time insights and historical trend analysis for informed platform management.
                </p>

                <h4>Key Metrics</h4>
                <ul className="text-gray-600">
                  <li>Active user engagement</li>
                  <li>Resource utilization</li>
                  <li>Feature adoption rates</li>
                  <li>System performance</li>
                  <li>Growth trends</li>
                </ul>

                <h4>Monitoring Features</h4>
                <ul className="text-gray-600">
                  <li>Real-time monitoring dashboards</li>
                  <li>Historical trend analysis</li>
                  <li>Automated alerts and notifications</li>
                  <li>Custom report generation</li>
                  <li>Performance benchmarking</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}