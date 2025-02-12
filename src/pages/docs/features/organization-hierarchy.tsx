import React from 'react';
import { DocsLayout } from '../../../layouts/DocsLayout';

export default function OrganizationHierarchyPage() {
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Organization Hierarchy Management</h1>
        <p className="text-gray-600 text-lg mb-8">
          This feature enables companies to define and manage their organizational hierarchy within the YuVi platform. It 
          starts with the creation and configuration of space types, which serve as templates for different organizational 
          units (like regions, departments, divisions). Each space type can have specific fields and validation rules 
          configured. The feature then allows for defining hierarchy rules between these types, establishing valid 
          parent-child relationships. Once the structural framework is defined, actual spaces can be created following these 
          types and rules. The feature includes comprehensive management capabilities for both types and spaces, including 
          state management, search and view functionalities, and hierarchy visualization. This organizational structure 
          becomes the foundation for application deployment scoping and access control within the company. The feature 
          ensures that the digital representation of the company's structure accurately reflects its real-world organization 
          while maintaining flexibility for changes and growth.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Space Type Creation</h3>
              <p className="text-gray-600">
                This use case enables Company Admins to define the types of organizational units that will form their company 
                structure. It allows creation of space types (like Region, Department, Division) with unique names and 
                descriptions. Each space type serves as a template for creating actual spaces in the organization. The use 
                case includes validation of space type uniqueness and preparation for field configuration. It's foundational 
                to establishing the company's organizational structure as these types define the building blocks of the 
                hierarchy. The use case ensures clear and consistent space type definitions that will guide the entire 
                organizational structure.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Space Type Configuration</h3>
              <p className="text-gray-600">
                This use case manages the detailed configuration of space types through field definitions. It allows Company 
                Admins to create, modify, and manage fields that will capture information for spaces of each type. Fields 
                can be of various data types with specific validation rules and formatting requirements. The use case 
                includes capabilities for reordering fields and managing their display characteristics. It ensures that each 
                space type is properly configured to capture all necessary information while maintaining data quality through 
                validation rules. This configuration determines what information will be captured for each space created from 
                these types.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Space Type State Management</h3>
              <p className="text-gray-600">
                This use case handles the lifecycle states of space types within a company. It enables Company Admins to 
                manage space type states including suspension and archival. When a space type is suspended, it prevents 
                creation of new spaces of that type while maintaining existing spaces in read-only mode. Reactivation 
                restores the ability to create new spaces and modify existing ones. Archival represents a terminal state for 
                space types no longer needed, preserving historical data while preventing any new usage. The use case 
                ensures proper state transitions and maintains audit trails of all state changes, providing controlled 
                management of space type lifecycles.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Space Type Hierarchy</h3>
              <p className="text-gray-600">
                This use case manages the rules governing relationships between different space types. Company Admins define 
                which space types can be parents or children of other types, establishing the allowed hierarchical 
                relationships. The system validates these rules to ensure they create a coherent structure without circular 
                references or invalid relationships. Once validated, these rules are published and govern space creation and 
                organization. This use case is crucial as it establishes the framework within which the actual 
                organizational structure will be built, ensuring spaces can only be created and arranged in ways that match 
                the company's organizational model.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Space Type Search & View</h3>
              <p className="text-gray-600">
                This use case provides comprehensive capabilities for finding and examining space types. It includes viewing 
                lists of space types, accessing detailed type information, and visualizing type hierarchies. Company Admins 
                can search for specific types, filter the type list using various criteria, and sort types based on 
                different attributes. The use case includes advanced filtering capabilities and export functionality. The 
                hierarchy visualization helps understand relationships between different space types. This use case ensures 
                efficient management and understanding of the company's space type framework, supporting both operational and 
                planning needs.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Space Creation</h3>
              <p className="text-gray-600">
                This use case enables the actual creation of organizational spaces based on defined space types. Company 
                Admins can create spaces by selecting a space type and providing required information based on the type's 
                field configuration. The system ensures compliance with hierarchy rules when assigning parent spaces. The use 
                case includes validation of all entered data against configured field rules and hierarchy constraints. Space 
                creation establishes the actual organizational structure within which applications will be deployed and users 
                will operate, making this use case fundamental to platform utilization.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Space Search & View</h3>
              <p className="text-gray-600">
                This use case provides comprehensive capabilities for finding and examining spaces within the organizational 
                structure. It enables viewing the space list with key information about each space, accessing detailed space 
                information, and visualizing the complete space hierarchy. Company Admins can search for specific spaces, 
                apply filters based on various criteria including space type and status, and sort spaces based on different 
                attributes. The hierarchy visualization provides an organizational chart view showing parent-child 
                relationships between spaces. The use case includes advanced filtering options and export capabilities, 
                supporting both operational management and reporting needs.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Space State Management</h3>
              <p className="text-gray-600">
                This use case handles the lifecycle states of spaces within the organization. It enables management of space 
                operational states including suspension and archival. When suspending a space, the system ensures all child 
                spaces are appropriately handled, maintaining hierarchical integrity. The suspended state makes spaces 
                read-only while preserving all data and relationships. Reactivation restores normal operations for a space 
                and its children. Archival represents a terminal state for spaces no longer needed in the active 
                organization. The system notifies affected users about state changes and maintains audit trails of all 
                transitions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}