import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';

export default function UserManagementPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Users & Permissions Management</h1>
        <p className="text-gray-600 text-lg mb-8">
          This feature provides comprehensive user management and access control capabilities within the YuVi platform. It 
          enables companies to manage user accounts, designations, and application role assignments effectively. Through this 
          feature, administrators can handle the complete lifecycle of user accounts, from invitation through state changes 
          to archival. The system supports both manual and intelligent role assignments, ensuring proper access control 
          while maintaining security and compliance. With powerful search and view capabilities, administrators can 
          efficiently manage users and their permissions across the organization. The feature maintains detailed audit 
          trails of all user-related activities, supporting both operational needs and compliance requirements.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Designation Creation</h3>
              <p className="text-gray-600">
                This use case enables Company Admins and Company User Managers to create and manage organizational 
                designations within the company. Designations represent organizational roles (like QA Manager, Production 
                Supervisor) that reflect a person's position in the company. The use case handles the creation of new 
                designations with unique names and descriptive details. When creating a designation, the system ensures name 
                uniqueness within the company context. All designations are created at the company level and are visible 
                across all spaces. While spaces define the organizational structure, designations identify roles within that 
                structure. The use case includes capabilities for modifying existing designation details while maintaining 
                data integrity for users already assigned these designations. All creation and modification actions are 
                properly tracked in the audit log.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Designations Search & View</h3>
              <p className="text-gray-600">
                This use case provides comprehensive capabilities for finding and examining designations within the company. 
                It enables viewing the complete list of designations with key information including designation name, status, 
                and the number of assigned users. The use case supports both basic and advanced search capabilities, 
                allowing users to quickly locate specific designations through name or description searches. It includes 
                filtering capabilities based on various criteria including status and creation date. Users can view detailed 
                information about specific designations, including complete configuration details and lists of assigned 
                users. The use case supports sorting capabilities for better list organization and export functionality for 
                reporting needs.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Designation State Management</h3>
              <p className="text-gray-600">
                This use case handles the lifecycle states of designations within the company, managing transitions between 
                Active, Inactive, and Archived states. It ensures proper validation and handling of state transitions, 
                preventing invalid state changes like direct Active to Archived transitions. Before any state change, the 
                system validates the designation's current status and relationships, particularly checking for assigned users 
                during deactivation. The use case includes capabilities for both individual and bulk state changes, 
                requiring proper documentation through reason capture and maintaining comprehensive audit trails.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">User Invitation Management</h3>
              <p className="text-gray-600">
                This use case enables Company Admins to manage the user invitation process effectively. It handles the 
                creation and management of user invitations, including validation of email addresses, setting initial roles 
                and permissions, and tracking invitation status. The system ensures secure delivery of invitations and 
                proper handling of acceptance workflows. It includes capabilities for managing invitation expiration, 
                resending invitations when needed, and canceling pending invitations. The use case maintains comprehensive 
                tracking of all invitation-related activities and ensures proper security throughout the invitation process.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Manual Application Roles Assignment</h3>
              <p className="text-gray-600">
                This use case enables Admins to manage application role assignments through multiple entry points, providing 
                flexibility and context-appropriate role management. It supports both individual and bulk role assignments 
                while maintaining strict validation and security controls. Admins can manage roles through various contexts: 
                the central assignment section offering a comprehensive view of all role assignments, user profiles for 
                individual user focus, user lists for bulk operations, application details for application-specific 
                assignments, and application lists for cross-application role management. Each entry point maintains its 
                specific context while providing full role management capabilities.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Suggested Application Role Assignment</h3>
              <p className="text-gray-600">
                This use case provides an intelligent role suggestion system that helps Admins manage application role 
                assignments efficiently across large-scale deployments. It automatically generates and manages role 
                suggestions triggered by specific events in the platform: user creation, designation changes, application 
                deployments, and space assignment changes. The system analyzes multiple factors to generate appropriate role 
                suggestions: user designations, space contexts, existing role patterns, and historical assignments within 
                the company. Each suggestion includes clear justification of its basis, confidence level, and potential 
                impact.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Users Search & View</h3>
              <p className="text-gray-600">
                This use case enables Admins to efficiently discover, view, and manage user information within their scope 
                through a flexible and powerful interface. It provides comprehensive list views with customizable layouts, 
                advanced search and filtering capabilities, and detailed user information access. The use case supports 
                multiple viewing contexts, from high-level list views to detailed individual user profiles. Admins can 
                customize their list views by selecting relevant columns, applying sorting orders, and saving preferred 
                configurations for quick access.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">User Account Management</h3>
              <p className="text-gray-600">
                User Account Management provides a comprehensive suite of capabilities for admins to manage and update user 
                profiles across the platform, ensuring data consistency, security, and regulatory compliance. This use case 
                enables admins to update user basic information, including full names, designations, departments, and 
                associated spaces, with built-in validations to enforce name formatting rules and approved designations. 
                Changes trigger approval workflows, role suggestion reevaluations, and are meticulously logged for audit 
                purposes, with updates propagated across dependent systems such as email directories and display names.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">User State Management</h3>
              <p className="text-gray-600">
                User State Management empowers administrators to monitor, control, and audit user account statuses across 
                the platform. The system displays each user's current state—active, suspended, blocked, or archived—with 
                visual indicators and detailed metadata such as change reasons, durations, and the responsible admin. 
                Temporary states include countdowns and scheduled transitions to prompt timely interventions. Comprehensive 
                filtering options enable admins to quickly isolate users based on state, while highlighting accounts with 
                pending or automatic state changes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}