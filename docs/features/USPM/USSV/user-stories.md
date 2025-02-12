# Users Search & View User Stories

## Use Case Information
Use Case: Users Search & View
Identifier: USPM.USSV
Uniqueness Check: 1

## User Story: USPM.USSV.US1
Title: Admin views User List
Identifier: USPM.USSV.US1
Uniqueness Check: 1
Phase: Immediate

Description:
The Admin accesses the user management section where the system displays a paginated list of users within their scope (company-wide for Company Admin, space-specific for Space Admin). For each user, the system shows essential information in columns: name, email, designation, status (active, suspended, archived), primary space assignment, last access timestamp, and invitation/activation status. The default view shows active users first, ordered by last access time, with recently active users at the top. The system indicates total user count and current page count (e.g., "Showing 1-50 of 500 users"). The pagination controls allow customizing users per page (25, 50, 100) while maintaining current filters and sort order. Each user entry includes quick-action buttons for common operations (view details, manage roles, modify state) based on Admin's permissions. The system visually distinguishes different user states: pending invitations appear with an invitation status indicator, suspended users are visually muted, and archived users are clearly marked. For performance, the system lazy-loads user data as the Admin scrolls or changes pages. The list maintains its state (page number, sort order, selected users) when the Admin navigates away and returns. The system provides a select-all capability that works across all filtered results, not just the current page, enabling bulk operations.

## User Story: USPM.USSV.US2
Title: Admin views User Details
Identifier: USPM.USSV.US2
Uniqueness Check: 1
Phase: Immediate

Description:
The Admin selects a user from the list to access their comprehensive profile. The system organizes the user's information in logical sections, displaying core identity details prominently: full name, email, designation, profile picture, account status, and activation date. The system shows current spaces and role assignments across applications, clearly indicating inherited access through space hierarchy. The system presents key indicators about the user's platform engagement: last access timestamp, active sessions, login history, and recent activity patterns. For account management context, the system displays account state history, including any suspensions or reactivations with their timestamps and reasons. The system shows role assignment history across applications, including who made the assignments, when they were made, and any provided justifications. For invitation-pending users, the system displays invitation status, send date, and expiry information. For active users, the system shows security settings like MFA status and IP access patterns. All displayed information respects the Admin's scope - Company Admins see company-wide context while Space Admins see space-specific information. The system provides quick action buttons for common operations (role modification, state changes, space assignments) based on Admin's permissions. The system maintains this detailed view context when the Admin navigates between users through previous/next user navigation.

## User Story: USPM.USSV.US4
Title: Admin searches Users
Identifier: USPM.USSV.US4
Uniqueness Check: 1
Phase: Immediate

Description:
The Admin initiates a search by entering terms in the global search field that's prominently available in the user list view. The system performs real-time searching as the Admin types, looking across key user attributes: name (first, last, full name variations), email address, and designation. The system highlights the matching terms in the results to show why each user was included. The search handles various input patterns intelligently - partial names, email fragments, designation keywords. For email searches, the system matches both complete addresses and domain parts. The system maintains the current list view configuration (columns, sorting) while displaying search results, ensuring context consistency. The system prioritizes results based on match relevance: exact matches appear first, followed by partial matches. When multiple terms are entered, the system finds users matching any of the terms and indicates which terms matched. For no results, the system suggests search term corrections or alternatives. The search operates within the Admin's scope - Company Admins search across all users while Space Admins only search users within their spaces. The system maintains search history per Admin for quick access to recent searches. Search performance is optimized for large user bases, with results loading progressively as needed.

## User Story: USPM.USSV.US5
Title: Admin filters User List
Identifier: USPM.USSV.US5
Uniqueness Check: 1
Phase: Immediate

Description:
The Admin accesses filter controls available in the user list header or column headers. The system provides standard filters for key user attributes: status (active, suspended, archived), space assignment, designation, invitation status, and account creation date. Column-specific filter options appear as dropdown menus in each column header. For each filter type, the system shows appropriate controls: dropdown lists for status and designation, space hierarchy browser for space assignments, and date range pickers for temporal filters. When applying multiple filters, the system uses AND logic between different attributes (e.g., status AND space) and OR logic within the same attribute (e.g., multiple designations). The system shows active filters above the list with clear visual indicators, displaying the current filter criteria and allowing individual filter removal. A filter count indicator shows how many filters are currently applied. The system maintains filter state during list navigation and allows clearing all filters with a single action. Filter changes apply immediately, updating the user list and result count in real-time. The system preserves other list characteristics (column configuration, sort order) while applying filters.

## User Story: USPM.USSV.US6
Title: Admin applies Advanced User Filters
Identifier: USPM.USSV.US6
Uniqueness Check: 1
Phase: Immediate

Description:
The Admin accesses the advanced filtering interface where the system provides comprehensive filtering capabilities beyond standard filters. The system allows creation of complex filter conditions using AND/OR logic combinations. For each condition, the Admin can select attributes (last access time, role assignments, login attempts, security settings like MFA status), operators (equals, contains, greater than, less than, between), and values. The system enables building multi-level filter groups, where conditions can be grouped and nested (e.g., (Condition1 AND Condition2) OR (Condition3 AND Condition4)). For each attribute type, the system provides context-appropriate operators and value selectors - date pickers for temporal filters, role browsers for role-based filters, numeric inputs for count-based filters. As the Admin builds the filter, the system shows a visual representation of the logic structure and provides real-time validation of filter combinations. The system displays the current user count matching the filter criteria, updating it as conditions are modified. For complex filters, the system shows an estimated performance impact. When applying advanced filters, the system combines them with any active standard filters using AND logic. The system displays advanced filters separately in the active filter area, allowing modification of individual conditions while maintaining the overall structure.

## User Story: USPM.USSV.US7
Title: Admin customizes User List View
Identifier: USPM.USSV.US7
Uniqueness Check: 1
Phase: Later

Description:
The Admin accesses the column configuration for the user list. The system displays available columns categorized by type (basic information, space assignments, role details, status information, activity data). For each column, the system shows a descriptive name and sample data for clarity. The Admin can select columns for display and arrange their order through drag-and-drop or numeric ordering. The Admin can also configure column-specific settings where applicable - date formats for timestamp columns, display format for long text columns (truncate/wrap), and grouping preferences. The system validates that required columns (like user name and email) cannot be removed. The system allows setting column widths and provides options for column pinning (left/right). For performance optimization, the system indicates columns that might impact loading speed (like role details or space assignments that require additional data loading). The Admin can create multiple list configurations for different purposes and switch between them. The system preserves these customizations per Admin, maintaining separate configurations for company-level and space-level views. The system applies customizations immediately, showing a live preview of the list with the new configuration. All customization changes are logged in the audit trail, and the system maintains a history of configuration changes.

## User Story: USPM.USSV.US8
Title: Admin saves Custom User List View
Identifier: USPM.USSV.US8
Uniqueness Check: 1
Phase: Later

Description:
The Admin initiates saving the current list view configuration which includes: selected columns, column order and widths, active filters (both standard and advanced), and sort order. The system prompts for a view name and optional description. For filters containing specific values (like date ranges), the system allows the Admin to choose whether to save absolute values or relative ones (e.g., "last 30 days" instead of specific dates). The system validates that the view name is unique within the Admin's saved views. The Admin can choose to make this view their default, automatically applied when accessing the user list. For Company Admins, the system provides an option to share the view with other admins, making it available as a template while maintaining individual instances. The system saves complete view context including any advanced filter logic structures. For shared views, the system automatically adjusts space-specific filters based on each admin's scope. The system maintains a list of saved views, allowing the Admin to manage them (rename, update, delete, reorder). When a saved view becomes invalid (e.g., due to removed columns), the system notifies the Admin and helps adjust the configuration.

## User Story: USPM.USSV.US9
Title: Admin exports User List
Identifier: USPM.USSV.US9
Uniqueness Check: 1
Phase: Immediate

Description:
The Admin initiates data export from the user list while the system maintains all current context (applied filters, search results, column configuration). The system presents export configuration options: file format (CSV, Excel), column selection (allowing additional columns not in current view), and data format preferences (date formats, number formats, boolean representations). For large user lists, the system provides options for either complete export or paginated batches. The Admin can choose to schedule the export for off-peak hours if the data size is substantial. The system validates export permissions, ensuring the Admin can only export data within their scope and following data security policies. The system estimates export size and processing time before initiation. For Excel exports, the system adds appropriate formatting (headers, column widths, cell formats) and basic filtering capabilities. The export includes metadata like generation timestamp, applied filters, and generating Admin's details. If specific columns contain sensitive data, the system requires additional confirmation before including them in the export. During export generation, the system shows progress indicators and allows the Admin to continue other tasks. Upon completion, the system notifies the Admin through platform notification and email (for large exports). The system maintains an audit trail of exports, recording what data was exported, by whom, and when.