import React from 'react';
import { ArrowUpDown, FileText, FileSpreadsheet, Search, ChevronDown, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { exportToCSV, exportToExcel } from '../utils/export';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  cell?: (item: T) => React.ReactNode;
  searchable?: boolean;
}

interface AdvancedTableProps<T> {
  items: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  className?: string;
  exportFilename?: string;
  enableSearch?: boolean;
  enableExport?: boolean;
  onRowClick?: (item: T) => void;
}

export function AdvancedTable<T>({ 
  items, 
  columns, 
  itemsPerPage = 8,
  className = '',
  exportFilename = 'export',
  enableSearch = false,
  enableExport = true,
  onRowClick
}: AdvancedTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showExportMenu, setShowExportMenu] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const exportMenuRef = React.useRef<HTMLDivElement>(null);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Handle clicking outside of export menu
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search
  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return items;

    return items.filter(item => {
      return columns.some(column => {
        if (!column.searchable) return false;
        
        const value = (item as any)[column.key];
        if (!value) return false;

        return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [items, columns, searchQuery]);

  // Handle sorting
  const sortedItems = React.useMemo(() => {
    if (!sortConfig) return filteredItems;

    return [...filteredItems].sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredItems, sortConfig]);

  // Handle pagination
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const simulateExport = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const getExportColumns = () => {
    return columns.map(col => ({
      key: col.key,
      label: col.label,
      getValue: (item: T) => {
        if (col.cell) {
          const rendered = col.cell(item);
          if (typeof rendered === 'string' || typeof rendered === 'number') {
            return rendered.toString();
          }
          return (item as any)[col.key]?.toString() || '';
        }
        return (item as any)[col.key]?.toString() || '';
      }
    }));
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      await simulateExport();
      await exportToCSV(items, getExportColumns(), exportFilename);
    } finally {
      setIsExporting(false);
      setShowExportMenu(false);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      await simulateExport();
      await exportToExcel(items, getExportColumns(), exportFilename);
    } finally {
      setIsExporting(false);
      setShowExportMenu(false);
    }
  };

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={`
      backdrop-blur-xl 
      bg-gradient-to-br from-white/90 via-white/80 to-white/70 
      rounded-xl shadow-lg border border-white/30 
      hover:from-white/95 hover:via-white/85 hover:to-white/75
      transition-all duration-300
      overflow-hidden
      ${className}
    `}>
      <div className="p-4 border-b border-gray-200/50">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-4">
            {enableSearch && <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={exportMenuRef}>
              <button
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => !isExporting && setShowExportMenu(!showExportMenu)}
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                Export
                <ChevronDown className={`w-4 h-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={handleExportCSV}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Export as CSV
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={handleExportExcel}
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Export as Excel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50">
              {columns.map(column => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider"
                >
                  {column.sortable ? (
                    <button
                      className="flex items-center gap-1 hover:text-gray-700"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {paginatedItems.map((item, index) => (
              <tr 
                key={index}
                onClick={() => onRowClick?.(item)}
                className={`
                  bg-white/50
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-50/50' : ''}
                `}
              >
                {columns.map(column => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                  >
                    {column.cell ? column.cell(item) : (item as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white/50 border-t border-gray-200/50">
          <div className="flex items-center">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, items.length)} of {items.length} entries
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}