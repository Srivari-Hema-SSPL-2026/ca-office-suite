# GitHub Copilot Instructions - CA Office Suite

**Version**: 1.0  
**Last Updated**: December 7, 2025

This file contains instructions for GitHub Copilot to understand the project context and generate code that aligns with the project's standards and architecture.

---

## Project Overview

This is the **Chartered Accountants Office Suite** - a modern, scalable office management platform designed specifically for Chartered Accountants and tax professionals. The suite centralizes all core operations—clients, compliance tasks, filings, documents, billing, workflows, and analytics—into a unified digital workspace.

**Key Documents:**

- Requirements: `docs/01_Requirements.md`
- Architecture: `docs/02_Architecture.md`
- Technology Stack: `docs/03_Technology-Stack.md`
- UI Requirements: `docs/04_Portal-React-UI-Requirements.md`
- Main README: `README.md`
- Cursor Rules: `.cursor/rules/` (for Cursor IDE)

---

## Architecture Overview

The application follows a **Backend For Frontend (BFF) pattern** with API Gateway orchestration:

```text
┌─────────────────────────────────────────────────────────┐
│         Backend For Frontend (BFF) - .NET Aspire         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  React.js Frontend (Hosted in BFF)               │  │
│  │  src/CAOfficeSuite.Web/                          │  │
│  │  User Interface & Client Logic                     │  │
│  └──────────────────┬───────────────────────────────┘  │
│                      │                                    │
│  ┌──────────────────┴───────────────────────────────┐  │
│  │  API Gateway (Inside Aspire)                       │  │
│  │  Service Orchestration & Routing                   │  │
│  └──────┬──────────────┬──────────────┬──────────────┘  │
│         │              │              │                  │
└─────────┼──────────────┼──────────────┼──────────────────┘
          │              │              │
┌─────────▼──────┐ ┌─────▼──────┐ ┌─────▼────────┐
│  Python        │ │  Python    │ │  Work       │
│  FastAPI       │ │  FastAPI    │ │  Processes  │
│  Services      │ │  Services  │ │  (Workflows)│
│  (Primary)       │ │  (Analytics)│ │             │
└─────────┬──────┘ └─────┬──────┘ └─────┬────────┘
          │                │              │
┌─────────┴────────────────┴──────────────┴──────┐
│         PostgreSQL Database                     │
│      + Document Storage System                  │
│      + Redis Cache                               │
└──────────────────────────────────────────────────┘
```

**Key Architecture Decisions:**

- **BFF Pattern**: React.js frontend is hosted inside the .NET Aspire BFF
- **API Gateway**: Centralized routing and orchestration within Aspire
- **Python FastAPI**: Primary backend services (preferred technology)
- **Work Processes**: Workflow engine for business process automation
- **Heavy Dashboards**: Advanced analytics and visualization services

---

## Current Project Status

### Phase: Frontend Development (In Progress)

**Current Implementation:**

- ✅ React 19 + TypeScript 5 frontend application
- ✅ Vite 7 build tool
- ✅ React Router 7 for navigation
- ✅ Font Awesome icons
- ✅ Advanced DataGrid component with column management
- ✅ Layout components (Navbar, Footer, Layout)
- ✅ Core pages (Home, Login, Clients, Tasks, Help)
- ✅ Authentication context (mock implementation)
- ✅ Mock data services
- ✅ Vitest testing setup

**Project Location:**

- Frontend: `src/CAOfficeSuite.Web/`

**Technology Stack (Current):**

**Frontend:**

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- React Router 7.9.6
- Font Awesome 7.1.0
- Vitest 4.0.13 (testing)
- ESLint 9.39.1

**Backend Architecture (Planned):**

- **.NET Aspire** - Cloud-native application framework
  - BFF (Backend For Frontend) - Hosts React.js frontend
  - API Gateway - Service orchestration and routing
- **Python FastAPI** - Primary backend services (preferred)
  - Business logic services
  - Analytics and dashboard services
  - Data processing services
- **Work Processes** - Workflow engine for business process automation
- **PostgreSQL** - Primary relational database
- **Redis** - Caching, session management, and real-time data
- **Document Storage** - Secure file storage system
- **Heavy Dashboards** - Advanced analytics, visualization, and reporting services

---

## Code Generation Guidelines

### React Component Patterns

Always use functional components with TypeScript:

```typescript
import { useState, useEffect } from 'react';
import type { Client } from '../types';

interface ClientsProps {
  initialClients?: Client[];
  onClientSelect?: (client: Client) => void;
}

export function Clients({ initialClients, onClientSelect }: ClientsProps) {
  const [clients, setClients] = useState<Client[]>(initialClients || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Component logic
  }, []);

  return (
    <div className="clients-container">
      {/* Component JSX */}
    </div>
  );
}
```

### Custom Hooks Pattern

Extract reusable logic into custom hooks:

```typescript
// useClients.ts
import { useState, useEffect } from 'react';
import { clientService } from '../services/api';
import type { Client } from '../types';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true);
        const data = await clientService.getClients();
        setClients(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  return { clients, loading, error, refetch: () => fetchClients() };
}
```

### Service Layer Pattern

```typescript
// services/api.ts
import type { Client, Task, User } from '../types';

// Simulated API delay for development
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const clientService = {
  async getClients(): Promise<Client[]> {
    await delay(300);
    // TODO: Replace with actual API call
    // const response = await fetch('/api/clients');
    // return response.json();
    return mockClients;
  },

  async getClientById(id: string): Promise<Client | undefined> {
    await delay(200);
    // TODO: Replace with actual API call
    return mockClients.find(c => c.id === id);
  },
};
```

### Context API Pattern

```typescript
// store/AuthContext.tsx
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { authService } from '../services/api';
import type { User, AuthState } from '../types';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const userData = await authService.login(email, password);
      if (userData) {
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    authService.logout();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

---

## Naming Conventions

### Components

- **Component Files**: PascalCase (e.g., `DataGrid.tsx`, `ClientList.tsx`)
- **Component Names**: PascalCase matching file name (e.g., `DataGrid`, `ClientList`)
- **Component Props Interfaces**: PascalCase with `Props` suffix (e.g., `DataGridProps`, `ClientListProps`)

### Hooks

- **Custom Hooks**: camelCase starting with `use` (e.g., `useAuth`, `useClients`, `useDataGrid`)
- **Hook Files**: camelCase matching hook name (e.g., `useAuth.ts`, `useClients.ts`)

### Functions & Variables

- **Functions**: camelCase (e.g., `getClientById`, `handleSubmit`)
- **Variables**: camelCase (e.g., `clientList`, `isLoading`, `errorMessage`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `MAX_RETRY_ATTEMPTS`, `API_BASE_URL`)
- **Boolean Variables**: Prefix with `is`, `has`, `should`, `can` (e.g., `isLoading`, `hasError`, `shouldShowModal`)

### Types & Interfaces

- **Interfaces**: PascalCase (e.g., `Client`, `Task`, `User`)
- **Type Aliases**: PascalCase (e.g., `TaskType`, `TaskStatus`, `TaskPriority`)
- **Generic Types**: Single uppercase letter (e.g., `T`, `K`, `V`) or descriptive (e.g., `TData`, `TColumn`)

### Files & Directories

- **Component Files**: PascalCase matching component name (e.g., `DataGrid.tsx`, `Navbar.tsx`)
- **Utility Files**: camelCase (e.g., `api.ts`, `utils.ts`, `helpers.ts`)
- **Type Files**: camelCase (e.g., `types.ts`, `index.ts`)
- **Directories**: camelCase or kebab-case (e.g., `components/`, `common/`, `layout/`)

### CSS & Styling

- **CSS Files**: Match component name (e.g., `DataGrid.css`, `Navbar.css`)
- **CSS Classes**: kebab-case (e.g., `data-grid`, `client-list`, `status-active`)

---

## Best Practices

### Error Handling

- Always handle errors in async operations with try/catch
- Provide user-friendly error messages
- Use error boundaries for component-level error handling
- Log errors appropriately (console.error in development, proper logging service in production)

```typescript
// Component error handling
export function Clients() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true);
        setError(null);
        const clients = await clientService.getClients();
        setClients(clients);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load clients';
        setError(message);
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
  // ...
}
```

### Performance

- Use `React.memo` for expensive components
- Use `useMemo` and `useCallback` appropriately to prevent unnecessary re-renders
- Lazy load routes and heavy components
- Optimize images and assets
- Avoid creating objects/functions in render

```typescript
// Memoize expensive computations
const filteredClients = useMemo(() => {
  return clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [clients, searchTerm]);

// Memoize callbacks
const handleClientSelect = useCallback((client: Client) => {
  onClientSelect?.(client);
}, [onClientSelect]);
```

### State Management

- Use local state (`useState`) for component-specific state
- Use Context API for shared state (auth, theme, etc.)
- Consider state management libraries (Redux/Zustand) only when needed
- Keep state as close to where it's used as possible

### TypeScript

- Always define types for props, state, and function parameters
- Use interfaces for object shapes, types for unions/intersections
- Avoid `any` type - use `unknown` if type is truly unknown
- Use type guards for runtime type checking

```typescript
// Good: Proper typing
interface ClientListProps {
  clients: Client[];
  onSelect?: (client: Client) => void;
  loading?: boolean;
}

// Avoid: any type
function processData(data: any) { }  // ❌
function processData(data: unknown) { }  // ✅
```

### Testing

- Write unit tests for components and utilities
- Test user interactions, not implementation details
- Use React Testing Library
- Mock external dependencies (API calls, etc.)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Clients } from './Clients';

test('renders client list', () => {
  const mockClients = [
    { id: '1', name: 'Test Client', pan: 'ABCDE1234F', /* ... */ }
  ];
  render(<Clients clients={mockClients} />);
  expect(screen.getByText('Test Client')).toBeInTheDocument();
});
```

### Accessibility

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Maintain proper heading hierarchy
- Ensure sufficient color contrast

```typescript
// Good: Accessible button
<button 
  onClick={handleClick}
  aria-label="Add new client"
  type="button"
>
  <FontAwesomeIcon icon={faPlus} />
  Add Client
</button>
```

### Code Organization

- Keep components small and focused
- Extract reusable logic into custom hooks
- Use barrel exports (index.ts) for clean imports
- Separate concerns (components, services, types, utils)

---

## Development Principles

- **React Best Practices**: Use functional components, hooks, and modern React patterns
- **TypeScript First**: Strong typing throughout the codebase
- **Component Reusability**: Build reusable, composable components
- **Accessibility**: Follow WCAG guidelines where possible
- **Responsive Design**: Mobile-first approach
- **Testing**: Write tests for critical components and functionality
- **Code Quality**: Use ESLint, follow consistent code style
- **Documentation**: Keep code and documentation in sync

---

## Current Development Focus

1. **Frontend Completion**: Finish remaining UI components and pages
2. **BFF Development**: Implement .NET Aspire BFF to host React frontend
3. **API Gateway**: Set up API Gateway within Aspire for service orchestration
4. **Python FastAPI Services**: Develop primary backend services using FastAPI
5. **Work Processes**: Implement workflow engine for business process automation
6. **Heavy Dashboards**: Build advanced analytics and visualization dashboards
7. **Backend Integration**: Connect frontend to BFF and API Gateway
8. **State Management**: Enhance state management as needed
9. **Testing**: Expand test coverage across all layers

---

## Project Structure

```
src/CAOfficeSuite.Web/src/
├── components/
│   ├── common/              # Reusable components (DataGrid, ColumnManager)
│   │   ├── DataGrid.tsx
│   │   ├── DataGrid.css
│   │   ├── DataGrid.types.ts
│   │   └── index.ts
│   └── layout/              # Layout components
│       ├── Layout.tsx
│       ├── Layout.css
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── index.ts
├── pages/                   # Page components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Clients.tsx
│   ├── Tasks.tsx
│   ├── Help.tsx
│   └── index.ts
├── services/                # API services
│   ├── api.ts
│   └── mockData.ts
├── store/                  # State management
│   ├── AuthContext.tsx
│   └── useAuth.ts
└── types/                  # TypeScript types
    └── index.ts
```

---

## Import Organization

Order imports as follows:

```typescript
// 1. React and React-related imports
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Third-party libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// 3. Internal components
import { DataGrid } from '../components/common';
import { Layout } from '../components/layout';

// 4. Internal services/utilities
import { clientService } from '../services/api';

// 5. Types
import type { Client, Task } from '../types';

// 6. Styles (if CSS Modules or similar)
import './Clients.css';
```

---

## Code Generation Checklist

When generating React/TypeScript code, always:

1. **Use TypeScript**: Define proper types and interfaces
2. **Functional Components**: Use function components, not class components
3. **Hooks**: Use React hooks (useState, useEffect, useContext, etc.)
4. **Error Handling**: Handle errors gracefully with try/catch
5. **Loading States**: Show loading indicators during async operations
6. **Accessibility**: Include proper ARIA attributes where needed
7. **Responsive Design**: Ensure components work on mobile and desktop
8. **Barrel Exports**: Use index.ts files for clean imports
9. **Component Props**: Define clear prop interfaces
10. **Comments**: Add JSDoc comments for complex logic

---

## Notes

- Currently using **mock data** for development
- Backend services are **planned** but not yet implemented
- The project structure may evolve as backend services are added
- All frontend code is in `src/CAOfficeSuite.Web/`
- This file should be kept in sync with `.cursor/rules/` for consistency

---

## Related Files

- Cursor IDE Rules: `.cursor/rules/`
- Project Requirements: `docs/01_Requirements.md`
- Architecture: `docs/02_Architecture.md`
- Technology Stack: `docs/03_Technology-Stack.md`
- UI Requirements: `docs/04_Portal-React-UI-Requirements.md`
- Main README: `README.md`
