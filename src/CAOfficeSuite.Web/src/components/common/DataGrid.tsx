import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faColumns,
  faSortUp,
  faSortDown,
  faSort,
  faChevronLeft,
  faChevronRight,
  faFilter,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useDataGrid } from './useDataGrid';
import { ColumnManager } from './ColumnManager';
import type { DataGridProps } from './DataGrid.types';
import './DataGrid.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataGrid<T extends Record<string, any>>({
  data,
  columns: initialColumns,
  loading = false,
  emptyMessage = 'No data available',
  storageKey,
}: DataGridProps<T>) {
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const {
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
    totalItems,
    filteredItems,
    getCellValue,
  } = useDataGrid({ data, columns: initialColumns, storageKey });

  const visibleColumns = columns.filter(col => col.visible !== false);

  const getSortIcon = (columnId: string) => {
    if (sortConfig.column !== columnId) return faSort;
    if (sortConfig.direction === 'asc') return faSortUp;
    if (sortConfig.direction === 'desc') return faSortDown;
    return faSort;
  };

  const getSortClass = (columnId: string) => {
    if (sortConfig.column !== columnId) return '';
    return sortConfig.direction;
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredItems);

  const hasActiveFilters = filters.length > 0 || globalSearch !== '';

  return (
    <div className="data-grid-container">
      {/* Toolbar */}
      <div className="data-grid-toolbar">
        <div className="toolbar-left">
          {/* Global Search */}
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
              className="search-input"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="clear-search-btn"
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`toolbar-btn ${showFilters ? 'active' : ''}`}
            aria-label="Toggle filters"
            title="Column Filters"
          >
            <FontAwesomeIcon icon={faFilter} />
            {hasActiveFilters && <span className="filter-badge">{filters.length}</span>}
          </button>
        </div>

        <div className="toolbar-right">
          {/* Clear Filters */}
          {hasActiveFilters && (
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          )}

          {/* Column Manager */}
          <button
            onClick={() => setShowColumnManager(true)}
            className="toolbar-btn"
            aria-label="Manage columns"
            title="Manage Columns"
          >
            <FontAwesomeIcon icon={faColumns} />
          </button>
        </div>
      </div>

      {/* Column Filters (when enabled) */}
      {showFilters && (
        <div className="column-filters">
          {visibleColumns.map(column => {
            if (!column.filterable) return null;

            const filterValue = filters.find(f => f.column === column.id)?.value || '';

            return (
              <div key={column.id} className="filter-field">
                <label htmlFor={`filter-${column.id}`}>{column.label}</label>
                {column.filterType === 'select' && column.filterOptions ? (
                  <select
                    id={`filter-${column.id}`}
                    value={filterValue}
                    onChange={e => handleFilter(column.id, e.target.value)}
                  >
                    <option value="">All</option>
                    {column.filterOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : column.filterType === 'date' ? (
                  <input
                    id={`filter-${column.id}`}
                    type="date"
                    value={filterValue}
                    onChange={e => handleFilter(column.id, e.target.value)}
                  />
                ) : (
                  <input
                    id={`filter-${column.id}`}
                    type="text"
                    placeholder={`Filter ${column.label}...`}
                    value={filterValue}
                    onChange={e => handleFilter(column.id, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="data-grid-loading">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      ) : paginatedData.length === 0 ? (
        /* Empty State */
        <div className="data-grid-empty">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="data-grid-table-wrapper">
            <table className="data-grid-table">
              <thead>
                <tr>
                  {visibleColumns.map(column => (
                    <th
                      key={column.id}
                      className={column.sortable !== false ? 'sortable' : ''}
                      style={{ width: column.width }}
                      onClick={() => column.sortable !== false && handleSort(column.id)}
                    >
                      <div className="th-content">
                        <span>{column.label}</span>
                        {column.sortable !== false && (
                          <FontAwesomeIcon
                            icon={getSortIcon(column.id)}
                            className={`sort-icon ${getSortClass(column.id)}`}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {visibleColumns.map(column => {
                      const value = getCellValue(row, column);
                      return (
                        <td key={column.id}>
                          {column.render ? column.render(value, row) : String(value ?? '-')}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="data-grid-pagination">
            <div className="pagination-info">
              Showing {startIndex}-{endIndex} of {totalItems} entries
              {filteredItems < totalItems && ` (filtered from ${totalItems})`}
            </div>

            <div className="pagination-controls">
              <label htmlFor="page-size-select" className="page-size-label">
                Show:
              </label>
              <select
                id="page-size-select"
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="page-size-select"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <div className="page-navigation">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="page-btn"
                  aria-label="First page"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="page-btn"
                  aria-label="Previous page"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <span className="page-indicator">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                  aria-label="Next page"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                  aria-label="Last page"
                >
                  Last
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Column Manager Modal */}
      {showColumnManager && (
        <ColumnManager
          columns={columns}
          onColumnVisibilityChange={toggleColumnVisibility}
          onColumnReorder={reorderColumns}
          onClose={() => setShowColumnManager(false)}
        />
      )}
    </div>
  );
}
