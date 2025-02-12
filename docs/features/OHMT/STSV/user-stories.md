# Space Type Search & View User Stories

## Use Case Information
Use Case: Space Type Search & View
Identifier: OHMT.STSV
Uniqueness Check: 1

## User Story: OHMT.STSV.US1
Title: Company Admin views Space Type List
Identifier: OHMT.STSV.US1
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin accesses the space type management section where the system displays a list of all space types. For each space type, the system shows key information including name, description, status (active, archived), and creation date. The list defaults to showing active space types first, ordered by creation date with most recent types at the top. The system indicates the total number of space types and how many are currently displayed.

## User Story: OHMT.STSV.US2
Title: Company Admin views Space Type Details
Identifier: OHMT.STSV.US2
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects a space type from the list and the system displays its comprehensive information. The system shows the space type's basic details (name, identifier, description), its configured fields with their types and validations, its position in the type hierarchy (allowed parents and children), and its current status. The system also displays usage statistics showing how many active spaces use this type. The Company Admin can navigate to related configurations from this detailed view.

## User Story: OHMT.STSV.US3
Title: Company Admin views Space Type Hierarchy
Identifier: OHMT.STSV.US3
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin accesses the space type hierarchy view where the system presents a visual representation of all parent-child relationships between space types. The system displays the hierarchy as an organizational chart, showing which types can contain which other types. For each space type in the visualization, the system indicates its status and shows the allowed relationships with other types through connecting lines. The Company Admin can expand or collapse sections of the hierarchy for better visualization of specific relationships.

## User Story: OHMT.STSV.US4
Title: Company Admin searches Space Types
Identifier: OHMT.STSV.US4
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin enters search terms into the search field, and the system performs a real-time search across space type names, identifiers, and descriptions. The system dynamically displays matching space types as the Company Admin types, prioritizing exact matches first followed by partial matches. If multiple search terms are entered, the system finds space types matching any of the terms and indicates which terms matched. The system maintains the standard space type list view format for the search results.

## User Story: OHMT.STSV.US5
Title: Company Admin filters Space Type List
Identifier: OHMT.STSV.US5
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin applies one or multiple filters to the space type list, selecting from available filter criteria including status (active, archived) and creation date range. The system updates the list in real-time to show only space types matching all selected filter conditions. The system displays the active filters above the list and shows the count of filtered results, allowing Company Admin to remove individual filters or clear all filters to return to the complete list.

## User Story: OHMT.STSV.US6
Title: Company Admin applies Advanced Space Type Filters
Identifier: OHMT.STSV.US6
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin expands the advanced filtering section to access granular filter criteria. The system allows combining multiple criteria using AND/OR conditions to filter based on field configurations, hierarchy positions, and usage patterns. The system applies these complex filter rules to the space type list, showing only types that satisfy the complete filter logic, while displaying a summary of all applied advanced filters for clarity.

## User Story: OHMT.STSV.US7
Title: Company Admin sorts Space Type List
Identifier: OHMT.STSV.US7
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects a column header from the space type list to sort by that attribute. The system reorders the list based on the selected attribute, toggling between ascending and descending order with each click. When a sort is applied, the system indicates the current sort attribute and direction through a visual indicator on the column header. The Company Admin can add secondary sort criteria by holding the shift key while selecting another column.

## User Story: OHMT.STSV.US8
Title: Company Admin exports Space Type List
Identifier: OHMT.STSV.US8
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin initiates space type list export, and the system prepares a download based on the current view (including any active filters, searches, or sorts). The system generates a formatted file containing space type information visible in the current list view. The system notifies the Company Admin when the export is ready and automatically starts the download. For larger exports, the system shows a progress indicator and notifies the Company Admin upon completion.