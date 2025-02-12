# Space Type Configuration User Stories

## Use Case Information
Use Case: Space Type Configuration
Identifier: OHMT.STCF
Uniqueness Check: 1

## User Story: OHMT.STCF.US1
Title: Company Admin creates Space Type Field
Identifier: OHMT.STCF.US1
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects a space type and initiates field creation. The Company Admin provides the field name, selects its data type (text, number, date, dropdown, etc.), and indicates if it's required. The system verifies the field name is unique within this space type. For the selected data type, the system prompts for specific configurations like text length, number range, date format, or dropdown options. Upon validation, the system adds this field to the space type's configuration. The system prepares this field for additional configuration like validation rules and formatting.

## User Story: OHMT.STCF.US2
Title: Company Admin modifies Space Type Field
Identifier: OHMT.STCF.US2
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects an existing field in a space type to update its properties. The system allows modifications to the field name and configuration properties while preserving the data type as changing it could impact existing spaces. For configurable properties like text length, number range, date format, or dropdown options, the system validates that any changes are compatible with existing data. Upon validation, the system updates the field configuration and maintains a history of these changes in the audit log.

## User Story: OHMT.STCF.US3
Title: Company Admin deactivates Space Type Field
Identifier: OHMT.STCF.US3
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects an active field in a space type and initiates deactivation. The system verifies that the field is not required and deactivation won't impact critical operations. Upon validation, the system changes the field status to inactive, making it read-only in existing spaces and hidden in new space creation forms. The system maintains all historical data associated with this field in existing spaces. The system records this deactivation in the audit log.

## User Story: OHMT.STCF.US4
Title: Company Admin reorders Space Type Fields
Identifier: OHMT.STCF.US4
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin accesses the field ordering interface for a space type. The Company Admin moves fields up or down to establish their display sequence in forms and views. The system maintains any logical grouping of related fields during reordering. Upon confirmation, the system saves the new field order which reflects in all forms and views where these space type fields appear. The system records this reorder action in the audit log.

## User Story: OHMT.STCF.US5
Title: Company Admin defines Space Type Field Validation
Identifier: OHMT.STCF.US5
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects a field in a space type to set its validation rules. Based on the field's data type, the system presents applicable validation options such as required/optional, minimum/maximum values, format patterns, or allowed character sets. The Company Admin configures the validation rules and error messages to display when validation fails. Upon saving, the system applies these validations to all future data entries and updates for this field across all spaces of this type. The system records these validation rule changes in the audit log.

## User Story: OHMT.STCF.US6
Title: Company Admin configures Space Type Field Format
Identifier: OHMT.STCF.US6
Uniqueness Check: 1
Spec Link: LINK

Description:
The Company Admin selects a field in a space type to configure its display format. Based on the field's data type, the system presents applicable formatting options such as decimal places for numbers, date patterns, text case styles, or display masks. The Company Admin sets the format rules that determine how the field's data will be displayed in forms and views. Upon saving, the system applies these format configurations to all displays of this field across all spaces of this type. The system records these format changes in the audit log.