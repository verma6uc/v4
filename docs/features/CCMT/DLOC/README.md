# Company Default Localization (DLOC)

## Description
The Company Default Localization use case enables companies to establish standardized regional settings that serve as defaults across their YuVi platform instance. Through this use case, Company Admins can configure fundamental localization parameters that affect how users across the company interact with the platform.

The use case manages configuration of core regional settings including default language, time zone, and various format preferences. Companies can set their preferred formats for dates (e.g., DD/MM/YYYY), times (12/24 hour), numbers (decimal/thousand separators), and currency (symbol position, decimal places). Additional settings include first day of week preference and measurement units (metric/imperial), ensuring consistency with regional business practices.

These settings serve as the company-wide defaults, automatically applying to all new spaces and users created in the platform. Existing spaces retain their current settings, maintaining operational continuity while allowing for space-specific customization when needed. The use case includes proper validation of all localization settings, ensuring they meet regional standards and maintain compatibility.

The use case also handles notification of localization changes to relevant stakeholders. When company defaults are modified, Space Admins are notified, allowing them to review their space-specific settings against new company defaults. All changes to localization settings are properly tracked in the audit log, maintaining a clear record of configuration changes.

## Identifier
- ID: CCMT.DLOC
- Parent Feature: Company Configuration Management (CCMT)