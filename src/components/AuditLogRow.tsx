import React from 'react';
import { Badge } from './Badge';
import { ChevronDown, Building2, Layers, Box, User, Globe, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeVariant } from '../types/audit';

interface AuditLogRowProps {
  log: {
    id: string;
    action: string;
    category: string;
    severity: string;
    timestamp: string;
    actor: string;
    target: string;
    entity: string;
    entityId: string;
    ip: string;
    details?: string;
    company?: {
      id: string;
      name: string;
    };
    application?: {
      id: string;
      name: string;
    };
    space?: {
      id: string;
      name: string;
    };
  };
  severityColors: Record<string, BadgeVariant>;
  categoryColors: Record<string, BadgeVariant>;
  formatDate: (date: string) => string;
}

export function AuditLogRow({ log, severityColors, categoryColors, formatDate }: AuditLogRowProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <tr 
        className={`
          bg-white/50 cursor-pointer
          hover:bg-gray-50
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          {formatDate(log.timestamp)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          <div className="capitalize">{log.action}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Badge variant={categoryColors[log.category]}>
            {log.category}
          </Badge>
        </td>
        <td className="px-6 py-4">
          <Badge 
            variant={severityColors[log.severity]}
            dot
          >
            {log.severity}
          </Badge>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>{log.entity}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {log.company?.name ? (
            <div>{log.company.name}</div>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </td>
        <td className="px-6 py-4 text-right">
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 inline-block
              ${isExpanded ? 'transform rotate-180' : ''}
            `}
          />
        </td>
      </tr>
      
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={7} className="bg-gray-50/50 border-t border-gray-200/50">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-8">
                  <div className="grid grid-cols-3 gap-8 bg-white rounded-lg p-6 shadow-sm">
                    {/* Context Section */}
                    <div>
                      <h4 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-gray-400" />
                        Context
                      </h4>
                      <div className="space-y-3">
                        {log.company && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <div className="text-xs text-gray-500">Company</div>
                            </div>
                            <div className="ml-6">
                              <div className="text-sm text-gray-900">{log.company.name}</div>
                            </div>
                          </div>
                        )}
                        {log.space && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Box className="w-4 h-4 text-gray-400" />
                              <div className="text-xs text-gray-500">Space</div>
                            </div>
                            <div className="ml-6">
                              <div className="text-sm text-gray-900">{log.space.name}</div>
                            </div>
                          </div>
                        )}
                        {log.application && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Box className="w-4 h-4 text-gray-400" />
                              <div className="text-xs text-gray-500">Application</div>
                            </div>
                            <div className="ml-6">
                              <div className="text-sm text-gray-900">{log.application.name}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actor & IP Section */}
                    <div>
                      <h4 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        Actor & IP
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-gray-50/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div className="text-xs text-gray-500">Actor</div>
                          </div>
                          <div className="ml-6">
                            <div className="text-sm text-gray-900">{log.actor}</div>
                          </div>
                        </div>
                        <div className="bg-gray-50/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <div className="text-xs text-gray-500">IP Address</div>
                          </div>
                          <div className="ml-6">
                            <div className="text-sm font-mono text-gray-900">{log.ip}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div>
                      <h4 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-400" />
                        Details
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                        {log.details || 'No additional details'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}