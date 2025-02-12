import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';
import { Bot, Lightbulb, RefreshCw, ListTree, Save, Play, MessageSquare, FileCheck } from 'lucide-react';

export default function ApplicationCreationPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Application Creation</h1>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Feature Identifier: ACRE</h2>
          <p className="text-blue-800">Uniqueness Level: 3</p>
        </div>

        <p className="text-gray-600 text-lg mb-8">
          The Application Creation feature provides an intelligent, guided process for creating new applications within the 
          YuVi platform. Through an interactive concierge bot interface, creators are guided step-by-step through the 
          application creation journey, ensuring comprehensive and structured development.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Bot className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Initiate Application Creation</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: ACRE.CRT.US1</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The creator clicks the "Create Application" button on the Dashboard page, initiating a new application 
                      creation session. The system validates the creator's authentication status and redirects them to the 
                      New Application page, where a concierge bot guides them through the creation process.
                    </p>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Verify user authentication before redirection</li>
                      <li>Initialize creation session with unique identifier</li>
                      <li>Prepare concierge bot with context</li>
                      <li>Log creation initiation for audit purposes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Enter Application Details</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: ACRE.CRT.US2</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The concierge bot prompts the creator to enter essential application information through a 
                      conversational interface. The creator provides:
                    </p>
                    <ul className="text-gray-600">
                      <li>Application title (single-line, required)</li>
                      <li>Detailed description (multi-line, up to 300 characters)</li>
                      <li>Target audience and user personas</li>
                      <li>Industry context and requirements</li>
                      <li>Initial configuration preferences</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Real-time validation of inputs</li>
                      <li>Contextual help and suggestions</li>
                      <li>Auto-save functionality</li>
                      <li>Progress indication</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Generate Concept Options</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: ACRE.CRT.US3</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 2</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      Based on the provided details, the system generates three distinct application concept options. Each 
                      concept is presented as a card containing:
                    </p>
                    <ul className="text-gray-600">
                      <li>Core functionality summary</li>
                      <li>Key features and capabilities</li>
                      <li>Target user interactions</li>
                      <li>Technical approach overview</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>AI-powered concept generation</li>
                      <li>Ensure concept diversity</li>
                      <li>Clear visual differentiation</li>
                      <li>Interactive concept cards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <RefreshCw className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Refine Application Concept</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: ACRE.CRT.US4</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 2</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The creator selects a concept and provides structured feedback through a three-part form:
                    </p>
                    <ul className="text-gray-600">
                      <li>User intent understanding assessment</li>
                      <li>Required modifications or enhancements</li>
                      <li>Impact analysis on related components</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Structured feedback collection</li>
                      <li>Real-time concept updates</li>
                      <li>Version history tracking</li>
                      <li>Feedback validation rules</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <ListTree className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Generate Product Backlog</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: ACRE.CRT.US5</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 2</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The system automatically generates a comprehensive product backlog based on the refined concept:
                    </p>
                    <pre className="text-sm bg-gray-50 p-4 rounded-lg">
{`Features
├── Core Feature 1
│   ├── Use Case 1.1
│   │   ├── User Story 1.1.1
│   │   └── User Story 1.1.2
│   └── Use Case 1.2
│       └── User Story 1.2.1
└── Core Feature 2
    └── Use Case 2.1
        ├── User Story 2.1.1
        └── User Story 2.1.2`}
                    </pre>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>AI-powered backlog generation</li>
                      <li>Hierarchical structure validation</li>
                      <li>Story point estimation</li>
                      <li>Priority assignment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Play className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Preview Application Prototype</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: ACRE.CRT.US6</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 3</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The system generates an interactive prototype that simulates the application's core functionality:
                    </p>
                    <ul className="text-gray-600">
                      <li>Interactive UI components</li>
                      <li>Role-based view switching</li>
                      <li>Simulated data interactions</li>
                      <li>Core workflow demonstrations</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Dynamic prototype generation</li>
                      <li>Role-based access control</li>
                      <li>Realistic data simulation</li>
                      <li>Performance optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <FileCheck className="w-6 h-6 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Finalize and Publish</h3>
                  <div className="prose prose-blue max-w-none">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Identifier: ACRE.CRT.US7</p>
                      <p className="text-sm text-blue-800">Uniqueness Level: 1</p>
                    </div>

                    <h4>Description</h4>
                    <p className="text-gray-600">
                      The creator reviews the complete application package and publishes it to the company's app store:
                    </p>
                    <ul className="text-gray-600">
                      <li>Final review of all components</li>
                      <li>Deployment configuration</li>
                      <li>Access control setup</li>
                      <li>Publication to app store</li>
                    </ul>

                    <h4>Implementation Notes</h4>
                    <ul className="text-gray-600">
                      <li>Pre-publication validation</li>
                      <li>Deployment automation</li>
                      <li>Access control verification</li>
                      <li>Audit trail creation</li>
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
              <h3 className="font-medium text-gray-900">State Management</h3>
              <p>How should we handle persistent state across the creation process?</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Session storage strategy</li>
                <li>Auto-save frequency</li>
                <li>State recovery mechanisms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">AI Integration</h3>
              <p>Consider the following aspects for AI-powered features:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Model selection for different tasks</li>
                <li>Response time optimization</li>
                <li>Fallback mechanisms</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}