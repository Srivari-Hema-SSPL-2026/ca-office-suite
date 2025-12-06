# CA Office Suite - React Frontend

React + TypeScript + Vite frontend for the CA Office Suite application.

## Features

- Modern React with TypeScript
- Advanced DataGrid component with sorting, filtering, pagination, and column management
- Responsive design with mobile support
- Font Awesome icons
- React Router for navigation
- Vitest for testing

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## DataGrid Component

The application includes a reusable `DataGrid` component for displaying tabular data with advanced features.

### Usage Example

```tsx
import { DataGrid, type Column } from '../components/common';

function MyComponent() {
  const [data, setData] = useState<MyDataType[]>([]);

  const columns: Column<MyDataType>[] = [
    {
      id: 'name',
      label: 'Name',
      accessor: 'name',
      sortable: true,
      filterable: true,
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      render: (value) => <span className={`status-${value}`}>{value}</span>,
    },
    {
      id: 'date',
      label: 'Date',
      accessor: 'date',
      sortable: true,
      filterable: true,
      filterType: 'date',
    },
  ];

  return (
    <DataGrid
      data={data}
      columns={columns}
      loading={false}
      emptyMessage="No data found"
      storageKey="my-data-grid" // For localStorage persistence
    />
  );
}
```

### DataGrid Features

- **Column Management**: Users can show/hide columns and reorder them using the column manager modal
- **Sorting**: Click column headers to sort ascending, descending, or remove sort
- **Filtering**: 
  - Global search across all visible columns
  - Column-specific filters (text, date, select dropdowns)
  - "Clear All Filters" button
- **Pagination**: 
  - Configurable page size (10, 25, 50, 100)
  - First/Previous/Next/Last navigation
  - Page indicator showing "Showing X-Y of Z entries"
- **Persistence**: Column preferences saved to localStorage
- **Responsive**: Works on desktop, tablet, and mobile devices

### Column Configuration

Each column can be configured with the following options:

- `id` (required): Unique identifier
- `label` (required): Display label for the column header
- `accessor` (required): Property key or function to extract value from row data
- `visible`: Whether the column is visible by default (default: true)
- `sortable`: Whether the column can be sorted (default: true)
- `filterable`: Whether the column can be filtered (default: true)
- `filterType`: Type of filter ('text', 'date', 'select')
- `filterOptions`: Options for select filter type
- `render`: Custom render function for cell content
- `width`: Optional column width

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (DataGrid, etc.)
│   └── layout/          # Layout components (Navbar, Footer, etc.)
├── pages/               # Page components (Home, Clients, Tasks, etc.)
├── services/            # API services
├── store/               # State management
├── types/               # TypeScript type definitions
└── test/                # Test files
```

## Technology Stack

- React 19
- TypeScript 5
- Vite 7
- React Router 7
- Font Awesome
- Vitest + Testing Library

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules.

See the [ESLint TypeScript documentation](https://typescript-eslint.io/getting-started) for more information.
