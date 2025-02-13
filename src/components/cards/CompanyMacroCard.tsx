import React from 'react'
import { Building2, Mail, Phone, Globe, MapPin, Users, Layout } from 'lucide-react'
import { Company } from '../../types/schema'
import { CompanyStatusBadge } from '../super-admin/company/CompanyStatusBadge'
import { BaseCard } from '../base/BaseCard'

interface CompanyMacroCardProps {
  company: Company
  userCount?: number
  spaceCount?: number
}

export function CompanyMacroCard({ company, userCount = 0, spaceCount = 0 }: CompanyMacroCardProps) {
  return (
    <BaseCard className="p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Building2 className="w-10 h-10 text-gray-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">{company.name}</h2>
                <CompanyStatusBadge status={company.status} />
              </div>
              <p className="text-sm text-gray-500">{company.identifier}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span>{userCount}</span>
              </div>
              <div className="text-xs text-gray-500">Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center text-sm text-gray-600">
                <Layout className="w-4 h-4 mr-1" />
                <span>{spaceCount}</span>
              </div>
              <div className="text-xs text-gray-500">Spaces</div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t pt-3">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {company.primaryEmail && (
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2" />
                <a href={`mailto:${company.primaryEmail}`} className="hover:text-blue-600">
                  {company.primaryEmail}
                </a>
              </div>
            )}
            {company.primaryPhone && (
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2" />
                <span>{company.primaryPhone}</span>
              </div>
            )}
            {company.website && (
              <div className="flex items-center text-gray-600">
                <Globe className="w-5 h-5 mr-2" />
                <a 
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  {company.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        {(company.addressStreet || company.addressCity || company.addressCountry) && (
          <div className="border-t pt-3">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Address</h3>
            <div className="flex items-start text-gray-600">
              <MapPin className="w-5 h-5 mr-2 mt-0.5" />
              <div>
                {company.addressStreet && <div>{company.addressStreet}</div>}
                <div>
                  {[
                    company.addressCity,
                    company.addressState,
                    company.addressPostalCode
                  ].filter(Boolean).join(', ')}
                </div>
                {company.addressCountry && <div>{company.addressCountry}</div>}
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="border-t pt-3">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Timeline</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Created</span>
              <span className="text-gray-900">{new Date(company.createdAt).toLocaleDateString()}</span>
            </div>
            {company.activatedAt && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Activated</span>
                <span className="text-gray-900">{new Date(company.activatedAt).toLocaleDateString()}</span>
              </div>
            )}
            {company.suspendedAt && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Suspended</span>
                <span className="text-gray-900">
                  {new Date(company.suspendedAt).toLocaleDateString()}
                  {company.suspendedReason && ` - ${company.suspendedReason}`}
                </span>
              </div>
            )}
            {company.archivedAt && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Archived</span>
                <span className="text-gray-900">
                  {new Date(company.archivedAt).toLocaleDateString()}
                  {company.archivedReason && ` - ${company.archivedReason}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseCard>
  )
}