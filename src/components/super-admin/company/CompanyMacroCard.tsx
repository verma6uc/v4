import React from 'react'
import { Building2, Globe, Mail, Phone } from 'lucide-react'
import { BaseCard } from '../../base/BaseCard'
import { CompanyStatusBadge } from './CompanyStatusBadge'
import { Company } from '../../../types/schema'

interface CompanyMacroCardProps {
  company: Company
  onClick?: (company: Company) => void
}

export function CompanyMacroCard({ company, onClick }: CompanyMacroCardProps) {
  return (
    <BaseCard 
      className="hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => onClick?.(company)}
    >
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
          {company.logoUrl ? (
            <img 
              src={company.logoUrl} 
              alt={`${company.name} logo`}
              className="w-10 h-10 rounded object-contain"
            />
          ) : (
            <Building2 className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {/* Company Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {company.name}
            </h3>
            <CompanyStatusBadge status={company.status} />
          </div>
          
          <p className="text-sm text-gray-500 mt-0.5">
            {company.identifier}
          </p>

          {/* Contact Details */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {company.primaryEmail && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{company.primaryEmail}</span>
              </div>
            )}
            {company.primaryPhone && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{company.primaryPhone}</span>
              </div>
            )}
            {company.website && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span className="truncate">{company.website}</span>
              </div>
            )}
          </div>

          {/* Address */}
          {(company.addressCity || company.addressCountry) && (
            <p className="mt-2 text-sm text-gray-600">
              {[
                company.addressCity,
                company.addressState,
                company.addressCountry
              ].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
      </div>
    </BaseCard>
  )
}