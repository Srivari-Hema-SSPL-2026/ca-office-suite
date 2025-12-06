export interface Column<T = any> {
  id: string;
  label: string;
  accessor: keyof T | ((row: T) => any);
  visible?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'date' | 'select';
  filterOptions?: { label: string; value: string }[];
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface SortConfig {
  column: string;
  direction: 'asc' | 'desc' | 'none';
}

export interface FilterConfig {
  column: string;
  value: any;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface DataGridProps<T = any> {
  data: T[];
  columns: Column<T>[];
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
  onColumnReorder?: (columns: Column<T>[]) => void;
  onSort?: (sortConfig: SortConfig) => void;
  onFilter?: (filters: FilterConfig[]) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pagination?: PaginationConfig;
  loading?: boolean;
  emptyMessage?: string;
  storageKey?: string; // For localStorage persistence
}

export interface ColumnManagerProps<T = any> {
  columns: Column<T>[];
  onColumnVisibilityChange: (columnId: string, visible: boolean) => void;
  onColumnReorder: (columns: Column<T>[]) => void;
  onClose: () => void;
}
