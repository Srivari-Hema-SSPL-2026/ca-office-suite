import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Column, SortConfig, FilterConfig } from './DataGrid.types';

interface UseDataGridOptions<T> {
  data: T[];
  columns: Column<T>[];
  storageKey?: string;
}

export function useDataGrid<T>({ data, columns: initialColumns, storageKey }: UseDataGridOptions<T>) {
  // Load column preferences from localStorage
  const loadColumnPreferences = useCallback(() => {
    if (!storageKey) return initialColumns;
    
    try {
      const saved = localStorage.getItem(`datagrid_${storageKey}_columns`);
      if (saved) {
        const savedColumns = JSON.parse(saved);
        // Merge saved preferences with current columns
        return initialColumns.map(col => {
          const savedCol = savedColumns.find((s: Column<T>) => s.id === col.id);
          return savedCol ? { ...col, visible: savedCol.visible } : col;
        });
      }
    } catch (error) {
      console.error('Failed to load column preferences:', error);
    }
    return initialColumns;
  }, [initialColumns, storageKey]);

  const [columns, setColumns] = useState<Column<T>[]>(loadColumnPreferences);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ column: '', direction: 'none' });
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Save column preferences to localStorage
  useEffect(() => {
    if (storageKey) {
      try {
        const toSave = columns.map(col => ({ id: col.id, visible: col.visible }));
        localStorage.setItem(`datagrid_${storageKey}_columns`, JSON.stringify(toSave));
      } catch (error) {
        console.error('Failed to save column preferences:', error);
      }
    }
  }, [columns, storageKey]);

  // Column visibility management
  const toggleColumnVisibility = useCallback((columnId: string, visible: boolean) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId ? { ...col, visible } : col
    ));
  }, []);

  // Column reordering
  const reorderColumns = useCallback((newColumns: Column<T>[]) => {
    setColumns(newColumns);
  }, []);

  // Sorting
  const handleSort = useCallback((columnId: string) => {
    setSortConfig(prev => {
      if (prev.column !== columnId) {
        return { column: columnId, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { column: columnId, direction: 'desc' };
      }
      if (prev.direction === 'desc') {
        return { column: columnId, direction: 'none' };
      }
      return { column: columnId, direction: 'asc' };
    });
    setCurrentPage(1); // Reset to first page when sorting
  }, []);

  // Filtering
  const handleFilter = useCallback((columnId: string, value: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    setFilters(prev => {
      const existing = prev.find(f => f.column === columnId);
      if (existing) {
        if (!value || value === '') {
          return prev.filter(f => f.column !== columnId);
        }
        return prev.map(f => f.column === columnId ? { ...f, value } : f);
      }
      if (value && value !== '') {
        return [...prev, { column: columnId, value }];
      }
      return prev;
    });
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  const clearFilters = useCallback(() => {
    setFilters([]);
    setGlobalSearch('');
    setCurrentPage(1);
  }, []);

  // Get cell value helper
  const getCellValue = useCallback((row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor as keyof T];
  }, []);

  // Apply filters
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply global search
    if (globalSearch) {
      const searchLower = globalSearch.toLowerCase();
      result = result.filter(row =>
        columns.some(col => {
          if (col.visible === false) return false;
          const value = getCellValue(row, col);
          return String(value).toLowerCase().includes(searchLower);
        })
      );
    }

    // Apply column-specific filters
    filters.forEach(filter => {
      const column = columns.find(col => col.id === filter.column);
      if (!column) return;

      result = result.filter(row => {
        const value = getCellValue(row, column);
        const filterValue = filter.value;

        if (column.filterType === 'date') {
          // Handle date filtering
          const dateValue = new Date(value).toISOString().split('T')[0];
          return dateValue.includes(filterValue);
        }

        return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
      });
    });

    return result;
  }, [data, columns, globalSearch, filters, getCellValue]);

  // Apply sorting
  const sortedData = useMemo(() => {
    if (sortConfig.direction === 'none' || !sortConfig.column) {
      return filteredData;
    }

    const column = columns.find(col => col.id === sortConfig.column);
    if (!column) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = getCellValue(a, column);
      const bValue = getCellValue(b, column);

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue === null || aValue === undefined) comparison = 1;
      else if (bValue === null || bValue === undefined) comparison = -1;
      else if (typeof aValue === 'string') {
        comparison = aValue.localeCompare(String(bValue));
      } else {
        comparison = aValue > bValue ? 1 : -1;
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortConfig, columns, getCellValue]);

  // Apply pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  return {
    columns,
    toggleColumnVisibility,
    reorderColumns,
    sortConfig,
    handleSort,
    filters,
    handleFilter,
    globalSearch,
    setGlobalSearch,
    clearFilters,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    paginatedData,
    totalPages,
    totalItems: sortedData.length,
    filteredItems: filteredData.length,
    getCellValue,
  };
}
