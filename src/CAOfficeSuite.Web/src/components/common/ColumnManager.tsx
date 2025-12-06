import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faArrowUp,
  faArrowDown,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import type { Column } from './DataGrid.types';
import './ColumnManager.css';

interface ColumnManagerProps<T = any> {
  columns: Column<T>[];
  onColumnVisibilityChange: (columnId: string, visible: boolean) => void;
  onColumnReorder: (columns: Column<T>[]) => void;
  onClose: () => void;
}

export function ColumnManager<T>({
  columns,
  onColumnVisibilityChange,
  onColumnReorder,
  onClose,
}: ColumnManagerProps<T>) {
  const [localColumns, setLocalColumns] = useState(columns);

  const handleVisibilityToggle = (columnId: string) => {
    const column = localColumns.find(col => col.id === columnId);
    if (!column) return;

    const newVisible = column.visible !== false ? false : true;
    onColumnVisibilityChange(columnId, newVisible);
    setLocalColumns(prev =>
      prev.map(col => (col.id === columnId ? { ...col, visible: newVisible } : col))
    );
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newColumns = [...localColumns];
    [newColumns[index - 1], newColumns[index]] = [newColumns[index], newColumns[index - 1]];
    setLocalColumns(newColumns);
    onColumnReorder(newColumns);
  };

  const handleMoveDown = (index: number) => {
    if (index === localColumns.length - 1) return;
    const newColumns = [...localColumns];
    [newColumns[index], newColumns[index + 1]] = [newColumns[index + 1], newColumns[index]];
    setLocalColumns(newColumns);
    onColumnReorder(newColumns);
  };

  return (
    <div className="column-manager-overlay" onClick={onClose}>
      <div className="column-manager-modal" onClick={e => e.stopPropagation()}>
        <div className="column-manager-header">
          <h3>Manage Columns</h3>
          <button onClick={onClose} className="close-btn" aria-label="Close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="column-manager-body">
          <p className="column-manager-hint">
            Show/hide columns and reorder them as needed. Your preferences will be saved.
          </p>

          <ul className="column-list">
            {localColumns.map((column, index) => (
              <li key={column.id} className="column-item">
                <button
                  onClick={() => handleVisibilityToggle(column.id)}
                  className={`visibility-btn ${column.visible !== false ? 'visible' : 'hidden'}`}
                  aria-label={`${column.visible !== false ? 'Hide' : 'Show'} ${column.label}`}
                >
                  <FontAwesomeIcon icon={column.visible !== false ? faEye : faEyeSlash} />
                </button>

                <span className="column-label">{column.label}</span>

                <div className="column-controls">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="move-btn"
                    aria-label="Move up"
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === localColumns.length - 1}
                    className="move-btn"
                    aria-label="Move down"
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="column-manager-footer">
          <button onClick={onClose} className="done-btn">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
