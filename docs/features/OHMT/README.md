# Organization Hierarchy Management (OHMT)

## Description
This feature enables companies to define and manage their organizational hierarchy within the YuVi platform. It starts with the creation and configuration of space types, which serve as templates for different organizational units (like regions, departments, divisions). Each space type can have specific fields and validation rules configured. The feature then allows for defining hierarchy rules between these types, establishing valid parent-child relationships.

Once the structural framework is defined, actual spaces can be created following these types and rules. The feature includes comprehensive management capabilities for both types and spaces, including state management, search and view functionalities, and hierarchy visualization. This organizational structure becomes the foundation for application deployment scoping and access control within the company. The feature ensures that the digital representation of the company's structure accurately reflects its real-world organization while maintaining flexibility for changes and growth.

## Use Cases

### [STMT - Space Type Creation](./STMT/README.md)
Handles the creation and management of space type definitions.
- [User Stories](./STMT/user-stories.md)
  - OHMT.STMT.US1: Company Admin creates Space Type
  - OHMT.STMT.US2: Company Admin modifies Space Type

### [STCF - Space Type Configuration](./STCF/README.md)
Manages the configuration of fields and properties for space types.
- [User Stories](./STCF/user-stories.md)
  - OHMT.STCF.US1: Company Admin creates Space Type Field
  - OHMT.STCF.US2: Company Admin modifies Space Type Field
  - OHMT.STCF.US3: Company Admin deactivates Space Type Field
  - OHMT.STCF.US4: Company Admin reorders Space Type Fields
  - OHMT.STCF.US5: Company Admin defines Space Type Field Validation
  - OHMT.STCF.US6: Company Admin configures Space Type Field Format

### [STSM - Space Type State Management](./STSM/README.md)
Handles the lifecycle states of space types.

### [STHY - Space Type Hierarchy](./STHY/README.md)
Manages relationships between different space types.

### [STSV - Space Type Search & View](./STSV/README.md)
Provides search and view capabilities for space types.

### [SPCR - Space Creation](./SPCR/README.md)
Handles the creation of actual spaces based on space types.

### [SPSV - Space Search & View](./SPSV/README.md)
Provides search and view capabilities for spaces.

### [SPSM - Space State Management](./SPSM/README.md)
Handles the lifecycle states of spaces.

## Identifier
- ID: OHMT
- Uniqueness Check: 8