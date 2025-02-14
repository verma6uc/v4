import React from 'react';
import { AuditLogRow } from '../AuditLogRow';
import { AuditLog, SeverityColors, CategoryColors } from '../../types/audit';
import { Search, FileSpreadsheet, FileText, ChevronDown, ArrowUpDown, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { exportToCSV, exportToExcel } from '../../utils/export';

interface AuditLogTableProps {
  logs: AuditLog[];
  severityColors: SeverityColors;
  categoryColors: CategoryColors;
}

const headers = [
  { key: 'timestamp', label: 'Time', sortable: true },
  { key: 'action', label: 'Action' },
  { key: 'category', label: 'Category' },
  { key: 'severity', label: 'Severity' },
  { key: 'entity', label: 'Entity' },
  { key: 'company', label: 'Company' },
  { key: 'expand', label: '' }
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

const getExportData = (logs: AuditLog[]) => {
  return logs.map(log => ({
    Time: formatDate(log.timestamp),
    Action: log.action,
    Category: log.category,
    Severity: log.severity,
    Entity: `${log.entity} (${log.entityId})`,
    Company: log.company?.name || '-',
    Space: log.space?.name || '-',
    Application: log.application?.name || '-',
    Actor: log.actor,
    IP: log.ip,
    Details: log.details || '-'
  }));
};

const simulateExport = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
};

const ITEMS_PER_PAGE = 10;

export function AuditLogTable({ logs, severityColors, categoryColors }: AuditLogTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showExportMenu, setShowExportMenu] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'timestamp', direction: 'desc' });
  const exportMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLogs = React.useMemo(() => {
    if (!searchTerm) return logs;

    return logs.filter(log => {
      const searchFields = [
        log.action,
        log.category,
        log.severity,
        log.entity,
        log.entityId,
        log.actor,
        log.company?.name,
        log.space?.name,
        log.application?.name
      ];

      return searchFields.some(field => 
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [logs, searchTerm]);

  const sortedLogs = React.useMemo(() => {
    if (!sortConfig) return filteredLogs;

    return [...filteredLogs].sort((a, b) => {
      if (sortConfig.key === 'timestamp') {
        const aTime = new Date(a[sortConfig.key]).getTime();
        const bTime = new Date(b[sortConfig.key]).getTime();
        return sortConfig.direction === 'asc' ? aTime - bTime : bTime - aTime;
      }
      return 0;
    });
  }, [filteredLogs, sortConfig]);

  const paginatedLogs = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedLogs, currentPage]);

  const totalPages = Math.ceil(sortedLogs.length / ITEMS_PER_PAGE);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'desc' };
      }
      if (current.direction === 'desc') {
        return { key, direction: 'asc' };
      }
      return null;
    });
  };

  const handleExport = async (type: 'csv' | 'excel') => {
    setIsExporting(true);
    try {
      await simulateExport();
      if (type === 'csv') {
        handleExportCSV(sortedLogs);
      } else {
        handleExportExcel(sortedLogs);
      }
    } finally {
      setIsExporting(false);
      setShowExportMenu(false);
    }
  };

  const handleExportCSV = (logs: AuditLog[]) => {
    const data = getExportData(logs);
    const filename = `audit-logs-${new Date().toISOString().split('T')[0]}`;
    exportToCSV(
      data,
      Object.keys(data[0]).map(key => ({
        key,
        label: key,
        getValue: (item: any) => item[key]
      })),
      filename
    );
  };

  const handleExportExcel = (logs: AuditLog[]) => {
    const data = getExportData(logs);
    const filename = `audit-logs-${new Date().toISOString().split('T')[0]}`;
    exportToExcel(data, Object.keys(data[0]).map(key => ({ key, label: key })), filename);
  };

  return (
    <div className={`
      backdrop-blur-xl 
      bg-gradient-to-br from-white/90 via-white/80 to-white/70 
      rounded-xl shadow-lg border border-white/30 
      hover:from-white/95 hover:via-white/85 hover:to-white/75
      transition-all duration-300
      overflow-hidden
    `}>
      <div className="p-4 border-b border-gray-200/50">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <div className="relative" ref={exportMenuRef}>
            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => !isExporting && setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              <span>Export</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
            </Button>
            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  onClick={() => handleExport('csv')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export as CSV
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  onClick={() => handleExport('excel')}
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export as Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              {headers.map(header => (
                <th 
                  key={header.key} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.sortable ? (
                    <button
                      className="flex items-center gap-1 hover:text-gray-700"
                      onClick={() => handleSort(header.key)}
                    >
                      {header.label}
                      <ArrowUpDown className={`
                        w-4 h-4 transition-colors
                        ${sortConfig?.key === header.key ? 'text-gray-700' : 'text-gray-400'}
                      `} />
                    </button>
                  ) : header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedLogs.map(log => (
              <AuditLogRow 
                key={log.id} 
                log={log} 
                severityColors={severityColors} 
                categoryColors={categoryColors} 
                formatDate={formatDate} 
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white/50 border-t border-gray-200/50 text-sm">
          <div className="flex items-center">
            <p className="text-sm text-gray-500">
              Page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPages}</span> •{' '}
              Showing <span className="font-medium">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(currentPage * ITEMS_PER_PAGE, sortedLogs.length)}
              </span>{' '}
              of <span className="font-medium">{sortedLogs.length}</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (currentPage > 3 && totalPages > 5) {
                  pageNum = Math.min(currentPage - 2 + i, totalPages);
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`
                      min-w-[2rem] h-8 flex items-center justify-center rounded-md text-sm
                      ${currentPage === pageNum ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}