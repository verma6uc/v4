# Designations Search & View User Stories

## Use Case Information
Use Case: Designations Search & View
Identifier: USPM.DSVW
Uniqueness Check: 1

## User Story: USPM.DSVW.US1
Title: Admin views Designation List
Identifier: USPM.DSVW.US1
Uniqueness Check: 1

Description:
The Admin accesses the designation management section where the system displays a paginated list of all designations. For each designation, the system shows key information including designation name, status (active, inactive, archived), number of users currently assigned this designation, and creation date. The list defaults to showing active designations first, ordered by creation date with most recent designations at the top. The system indicates the total number of designations and how many are currently displayed on the current page. The list provides clear visual indicators for designation status and user count for quick reference.

## User Story: USPM.DSVW.US2
Title: Admin searches Designations
Identifier: USPM.DSVW.US2
Uniqueness Check: 1

Description:
The Admin enters search terms into the search field, and the system performs a real-time search across designation names and descriptions. The system dynamically displays matching designations as the Admin types, prioritizing exact matches first followed by partial matches. If multiple search terms are entered, the system finds designations matching any of the terms and indicates which terms matched. The system maintains the standard designation list view format for the search results, ensuring consistent information display and interaction capabilities. The search results update automatically as the Admin modifies the search terms, with clear indication when no matches are found.

## User Story: USPM.DSVW.US3
Title: Admin filters Designation List
Identifier: USPM.DSVW.US3
Uniqueness Check: 1

Description:
The Admin applies one or multiple filters to the designation list, selecting from available filter criteria including status (active, inactive, archived), creation date range, and user assignment status (assigned/unassigned). The system updates the list in real-time to show only designations matching all selected filter conditions. The system displays the active filters above the list and shows the count of filtered results, allowing Admin to remove individual filters or clear all filters to return to the complete list. The system maintains all other list functionalities (sorting, pagination) while filters are applied.

## User Story: USPM.DSVW.US4
Title: Admin applies Advanced Designation Filters
Identifier: USPM.DSVW.US4
Uniqueness Check: 1

Description:
The Admin expands the advanced filtering section to access granular filter criteria. The system allows combining multiple criteria using AND/OR conditions to filter based on creation dates, modification dates, user counts, and status changes. The Admin can save frequently used filter combinations for future use. The system applies these complex filter rules to the designation list, showing only designations that satisfy the complete filter logic, while displaying a summary of all applied advanced filters for clarity. The system allows the Admin to modify or remove individual conditions within the advanced filter set.

## User Story: USPM.DSVW.US5
Title: Admin views Designation Details
Identifier: USPM.DSVW.US5
Uniqueness Check: 1

Description:
The Admin selects a designation to view its complete information. The system presents comprehensive details including designation name, description, current status, creation information (date, creator), and last modification details (date, modifier). The system displays a list of all users currently assigned this designation, with their status and space assignments. The system shows a chronological audit trail of all modifications made to this designation, including status changes, name updates, and description modifications. Each audit entry includes the timestamp, actor, and specific changes made. The Admin can navigate to related users directly from the user list section.

## User Story: USPM.DSVW.US6
Title: Admin sorts Designation List
Identifier: USPM.DSVW.US6
Uniqueness Check: 1

Description:
The Admin selects a column header from the designation list to sort by that attribute. The system reorders the list based on the selected attribute, toggling between ascending and descending order with each click. When a sort is applied, the system indicates the current sort attribute and direction through a visual indicator on the column header. The Admin can add secondary sort criteria by holding the shift key while selecting another column, enabling multi-level sorting. The system maintains the sort order during pagination and when applying filters or search criteria.

## User Story: USPM.DSVW.US7
Title: Admin exports Designation List
Identifier: USPM.DSVW.US7
Uniqueness Check: 1

Description:
The Admin initiates designation list export, and the system prepares a download based on the current view (including any active filters, searches, or sorts). The system generates a formatted file containing designation information including names, descriptions, status, user counts, and relevant timestamps. The Admin can choose the export format (CSV or Excel) and select which columns to include in the export. The system notifies the Admin when the export is ready and automatically starts the download. For larger exports, the system shows a progress indicator and notifies the Admin upon completion.