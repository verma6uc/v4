# Company Search & View User Stories

## Use Case Information
Use Case: Company Search & View
Identifier: COMM.CSAV
Uniqueness Check: 1

## User Story: COMM.CSAV.US1
Title: Super Admin views the list of Companies
Identifier: COMM.CSAV.US1
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Superadmin accesses the company management section where the system displays a paginated list of all companies. For each company, the system shows key information including company name, status (active, suspended, archived), creation date, and the Company Admin email. The list defaults to showing active companies first, ordered by creation date with most recent companies at the top. The system indicates the total number of companies and how many are currently displayed on the page.

## User Story: COMM.CSAV.US2
Title: Super Admin views the details of a selected Company
Identifier: COMM.CSAV.US2
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Superadmin selects a company from the list, and the system presents comprehensive company information organized in sections. The system shows company details (name, business address, contact information), key metrics (active users, space count, resource usage), current status, and important dates (creation, last activity). The system also displays the Company Admin information and a chronological activity log showing significant events in the company's lifecycle.

## User Story: COMM.CSAV.US3
Title: Super Admin searches Companies
Identifier: COMM.CSAV.US3
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Superadmin enters search terms into the search field, and the system performs a real-time search across company names, company identifiers, and Company Admin emails. The system dynamically displays matching companies as the Super Admin types, prioritizing exact matches first followed by partial matches. If multiple search terms are entered, the system finds companies matching any of the terms and indicates which terms matched. The system maintains the standard company list view format for the search results, allowing the Super Admin to interact with found companies as normal.

## User Story: COMM.CSAV.US4
Title: Super Admin filters the list of Companies
Identifier: COMM.CSAV.US4
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Super Admin applies one or multiple filters to the company list, selecting from available filter criteria including company status (active, suspended, archived), creation date range, and Company Admin status (activated, pending). The system updates the list in real-time to show only companies matching all selected filter conditions. The system displays the active filters above the list and shows the count of filtered results, allowing Superadmin to remove individual filters or clear all filters to return to the complete list.

## User Story: COMM.CSAV.US5
Title: Superadmin applies Advanced Company Filters
Identifier: COMM.CSAV.US5
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Super Admin expands the advanced filtering section, accessing granular filter criteria. The system allows combining multiple advanced criteria using AND/OR conditions. The system applies these complex filter rules to the company list, showing only companies that satisfy the complete filter logic, while displaying a summary of all applied advanced filters for clarity.

## User Story: COMM.CSAV.US6
Title: Superadmin sorts Company List
Identifier: COMM.CSAV.US6
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Super Admin selects a column header from the company list to sort by that attribute. The system reorders the list based on the selected attribute, toggling between ascending and descending order with each click. When a sort is applied, the system indicates the current sort attribute and direction through a visual indicator on the column header. The Super Admin can add secondary sort criteria by holding the shift key while selecting another column.

## User Story: COMM.CSAV.US7
Title: Superadmin exports Company List
Identifier: COMM.CSAV.US7
Uniqueness Check: 1
Phase: Immediate
Spec Link: LINK

Description:
The Super Admin initiates company list export, and the system prepares a download based on the current view (including any active filters, searches, or sorts). The system generates a formatted file containing company information visible in the current list view. The system notifies the Super Admin when the export is ready and automatically starts the download. For larger exports, the system shows a progress indicator and notifies the Super Admin upon completion.