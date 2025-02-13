import React from 'react';
import { ArrowUpDown, Download, Search, ChevronDown } from 'lucide-react';
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
  itemsPerPage = 10,
  className = '',
  exportFilename = 'export',
  enableSearch = false,
  enableExport = true,
  onRowClick
}: AdvancedTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showExportMenu, setShowExportMenu] = React.useState(false);
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

  const handleExportCSV = () => {
    exportToCSV(items, getExportColumns(), exportFilename);
    setShowExportMenu(false);
  };

  const handleExportExcel = () => {
    exportToExcel(items, getExportColumns(), exportFilename);
    setShowExportMenu(false);
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
          {enableSearch && (
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          )}
          {enableExport && (
            <div className="relative" ref={exportMenuRef}>
              <button
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-2"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-4 h-4" />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={handleExportCSV}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export as CSV
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={handleExportExcel}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export as Excel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50">
              {columns.map(column => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                    className="px-6 py-4 whitespace-nowrap"
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
            <p className="text-sm text-gray-500">
              Page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPages}</span> •{' '}
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, items.length)}
              </span>{' '}
              of <span className="font-medium">{items.length}</span> results
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
              {getPageNumbers().map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`
                    min-w-[2rem] h-8 flex items-center justify-center rounded-md text-sm
                    ${currentPage === pageNum
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {pageNum}
                </button>
              ))}
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