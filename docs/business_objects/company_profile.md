# Company Profile Business Object

## Properties
- id: UUID (primary key)
- created_at: DateTime
- updated_at: DateTime

### Basic Information
- name: String (required)
- display_name: String (required)
- legal_name: String (required)
- tax_id: String
- registration_number: String
- industry_type: String (required)
- company_size: Enum ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
- founded_date: Date

### Contact Information
- primary_email: String (required)
- support_email: String
- phone_number: String (required)
- fax_number: String
- website_url: String

### Address Information
- street_address: String (required)
- address_line2: String
- city: String (required)
- state_province: String (required)
- postal_code: String (required)
- country: String (required, ISO country code)
- timezone: String (required)

### Branding Settings
- primary_color: String (hex color code)
- secondary_color: String (hex color code)
- accent_color: String (hex color code)
- logo_url: String
- favicon_url: String
- brand_guidelines_url: String

### Description
- short_description: String (max 200 chars)
- long_description: String (max 1000 chars)
- mission_statement: String
- vision_statement: String

## States
1. INCOMPLETE
   - Missing required information
   - Can transition to: ACTIVE

2. ACTIVE
   - All required information provided
   - Can transition to: VERIFIED, SUSPENDED

3. VERIFIED
   - Information verified by platform
   - Can transition to: SUSPENDED

4. SUSPENDED
   - Profile access restricted
   - Can transition to: ACTIVE

## Relationships
- Has many BrandingAssets
- Has many CompanyDocuments
- Has many ContactPersons
- Has many AddressHistories
- Has many ProfileChangeLogs

## Validations
- Company name must be unique
- Email addresses must be valid format
- Phone numbers must be valid format
- Country codes must be valid ISO codes
- Colors must be valid hex codes
- URLs must be valid format
- Required fields cannot be empty

## Audit Requirements
- Track all profile changes
- Log branding updates
- Record address changes
- Maintain contact history

## Compliance Rules
- Verify tax ID format
- Validate registration numbers
- Check address format by country
- Ensure required fields by region

## Display Rules
- Format names per locale
- Format addresses per country
- Format phone numbers per region
- Handle timezone conversions