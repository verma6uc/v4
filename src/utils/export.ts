type ExportColumn = {
  key: string;
  label: string;
  getValue?: (item: any) => string;
};

export const exportToCSV = (data: any[], columns: ExportColumn[], filename: string) => {
  // Convert data to CSV format
  const csvContent = [
    // Header row
    columns.map(col => col.label).join(','),
    // Data rows
    ...data.map(item => 
      columns.map(col => {
        const value = col.getValue 
          ? col.getValue(item)
          : item[col.key];
        
        // Handle values that might contain commas
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const exportToExcel = (data: any[], columns: ExportColumn[], filename: string) => {
  // Convert data to TSV format (Excel can open this)
  const tsvContent = [
    // Header row
    columns.map(col => col.label).join('\t'),
    // Data rows
    ...data.map(item => 
      columns.map(col => {
        const value = col.getValue 
          ? col.getValue(item)
          : item[col.key];
        
        // Handle values that might contain tabs
        if (typeof value === 'string' && (value.includes('\t') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join('\t')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.xls`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}