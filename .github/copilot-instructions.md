# GitHub Copilot Instructions for CA Office Suite

**Version**: 1.0  
**Last Updated**: December 8, 2025  

**Critical Principle**: Update this file IMMEDIATELY when repository structure changes

---

## 🎯 Primary Directives

### 1. Automation-First Approach

✅ **ALWAYS**: Create reusable PowerShell scripts for repetitive tasks  

✅ **ALWAYS**: Use existing scripts in `tools/psscripts/` first  

✅ **ALWAYS**: Enhance existing scripts rather than duplicating  

❌ **NEVER**: Execute individual commands for tasks repeated 2+ times

**Decision Tree**:

1. Check `tools/psscripts/` for existing script
2. Enhance existing script if close match
3. Create new `.ps1` for any repeated task
4. Document with examples and parameters

**Available Automation** (tools/psscripts/):

- `Get-FileStats.ps1` - File statistics analysis
- `Get-RepoHealth.ps1` - Repository health check
- `Validate-References.ps1` - File reference validation
- `Review-CodeQuality.ps1` - Code quality review

### 2. Update Verification Protocol (CRITICAL)

**After ANY structural change, IMMEDIATELY update**:

1. ✅ This file (.github/copilot-instructions.md) - Repository Structure section
2. ✅ README.md - Repository Structure section
3. ✅ `.cursor/rules/01_project-context.mdc` - Project Structure section
4. ✅ Relevant documentation files
5. ✅ Run verification: `.\tools\psscripts\Get-RepoHealth.ps1`

**Self-Check Question**: "Did I update the instruction file?" - If no, STOP and do it NOW.

### 3. Chain-of-Thought + ReAct + Reasoning

**Apply systematic reasoning to every task using this framework**:

See `.cursor/rules/07_ai-reasoning-framework.mdc` for complete methodology.

**Quick Reference**:

- **CoT**: Break down complex problems into logical steps
- **ReAct**: OBSERVE → ANALYZE → PLAN → ACT → VERIFY → REFLECT
- **System 2 Reasoning**: Deep analytical thinking for critical decisions

**When Creating Code**:
1. OBSERVE: Understand requirements, check existing patterns
2. ANALYZE: Identify best approach, consider alternatives
3. PLAN: Break down into steps, define verification points
4. ACT: Implement following project patterns
5. VERIFY: Test, lint, type-check, review against standards
6. REFLECT: Document learnings, update patterns if needed

---

## 📁 Current Repository Structure (AS OF DECEMBER 8, 2025)

### **Actual Current Structure**

```text
ca-office-suite/
├── .cursor/                         # Cursor IDE configuration
│   └── rules/                       # Cursor AI coding rules
│       ├── 01_project-context.mdc
│       ├── 02_code-generation-guidelines.mdc
│       ├── 03_best-practices.mdc
│       ├── 04_common-patterns.mdc
│       ├── 05_naming-conventions.mdc
│       ├── 06_database-design.mdc
│       ├── 07_ai-reasoning-framework.mdc
│       └── README.md
│
├── .github/                         # GitHub configuration
│   └── copilot-instructions.md     # THIS FILE
│
├── docs/                            # Documentation
│   ├── 01_Requirements.md
│   ├── 02_Architecture.md
│   ├── 03_Technology-Stack.md
│   ├── 04_Portal-React-UI-Requirements.md
│   ├── 05_Setup-and-Prerequisites.md
│   ├── 06_How-to-Execute.md
│   ├── 07_Code-Quality.md
│   ├── 08_Development-Roadmap.md
│   ├── 09_Workspace-Review-2025-12-08.md
│   └── images/
│
├── src/
│   └── CAOfficeSuite.Web/          # React.js frontend application
│       ├── src/
│       │   ├── components/
│       │   │   ├── common/         # DataGrid, ColumnManager
│       │   │   └── layout/         # Navbar, Footer, Layout
│       │   ├── pages/              # Home, Login, Clients, Tasks, Help
│       │   ├── services/           # API services (mock data)
│       │   ├── store/             # AuthContext, state management
│       │   ├── types/             # TypeScript definitions
│       │   └── test/              # Test files
│       ├── public/
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
│
├── tools/                           # Development tools
│   └── psscripts/                  # PowerShell automation scripts
│       ├── Get-FileStats.ps1
│       ├── Get-RepoHealth.ps1
│       ├── Validate-References.ps1
│       └── Review-CodeQuality.ps1
│
├── tests/                           # Integration tests (future)
├── LICENSE
└── README.md                        # Main project documentation
```

---

## 🧭 Repository Context & Purpose

**CA Office Suite** is a modern, scalable office management platform designed specifically for Chartered Accountants and tax professionals. It centralizes all core operations—clients, compliance tasks, filings, documents, billing, workflows, and analytics—into a unified digital workspace.

**Architecture**: Backend For Frontend (BFF) pattern with .NET Aspire, Python FastAPI services, and PostgreSQL database.

**Current Phase**: Frontend Development (React + TypeScript)

**Target Stack**:
- **Frontend**: React 19, TypeScript 5, Vite 7
- **Backend**: .NET Aspire (BFF + API Gateway), Python FastAPI (Primary)
- **Database**: PostgreSQL, Redis, Document Storage

---

## 📋 Code Generation Guidelines

### React/TypeScript Patterns

**Always use functional components with TypeScript**:

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

**Extract reusable logic into custom hooks**:

```typescript
// useClients.ts
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
export const clientService = {
  async getClients(): Promise<Client[]> {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/clients');
    // return response.json();
    return mockClients;
  },

  async getClientById(id: string): Promise<Client | undefined> {
    // TODO: Replace with actual API call
    return mockClients.find(c => c.id === id);
  },
};
```

### DataGrid Component Usage

```typescript
import { DataGrid, type Column } from '../components/common';
import type { Client } from '../types';

const columns: Column<Client>[] = [
  {
    id: 'name',
    label: 'Client Name',
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
  },
];

<DataGrid
  data={clients}
  columns={columns}
  loading={loading}
  emptyMessage="No clients found"
  storageKey="clients-grid"
/>
```

---

## ✅ Quality Gate Questions (Before Publishing Code)

**Self-check before finalizing any code**:

1. ✅ Does this follow project conventions (naming, structure, patterns)?
2. ✅ Are tests included for new functionality?
3. ✅ Is documentation updated (comments, README, docs)?
4. ✅ Does this handle errors properly?
5. ✅ Is this performant (no unnecessary re-renders, optimized)?
6. ✅ Is this secure (no sensitive data exposure, proper validation)?
7. ✅ Does this follow TypeScript best practices (no `any`, proper types)?
8. ✅ Is this accessible (ARIA labels, keyboard navigation)?
9. ✅ Does this follow React best practices (hooks, functional components)?
10. ✅ Have I run linting and type checking?

---

## 🎨 Code Quality Standards

### TypeScript

- ✅ Always define types for props, state, and function parameters
- ✅ Use interfaces for object shapes, types for unions/intersections
- ✅ Avoid `any` type - use `unknown` if type is truly unknown
- ✅ Use type guards for runtime type checking

### React

- ✅ Use functional components with hooks
- ✅ Use `React.memo` for expensive components
- ✅ Use `useMemo` and `useCallback` appropriately
- ✅ Keep components small and focused
- ✅ Extract reusable logic into custom hooks

### Error Handling

- ✅ Always handle errors in async operations with try/catch
- ✅ Provide user-friendly error messages
- ✅ Use error boundaries for component-level error handling
- ✅ Log errors appropriately

### Testing

- ✅ Write unit tests for components and utilities
- ✅ Test user interactions, not implementation details
- ✅ Use React Testing Library
- ✅ Mock external dependencies (API calls, etc.)

### Accessibility

- ✅ Use semantic HTML elements
- ✅ Add ARIA labels where needed
- ✅ Ensure keyboard navigation works
- ✅ Maintain proper heading hierarchy
- ✅ Ensure sufficient color contrast

---

## 🔄 Workflow Best Practices

### When Creating Code

1. **Observe**: Understand user request and context
2. **Analyze**: Check existing structure, identify gaps
3. **Plan**: Design approach with automation where possible
4. **Act**: Execute with reusable scripts
5. **Verify**: Run quality checks and update documentation
6. **Reflect**: Consider improvements for future tasks

### When Modifying Structure

1. ✅ Make the structural change
2. ✅ Update THIS file immediately (Repository Structure section)
3. ✅ Update README.md (Repository Structure section)
4. ✅ Update `.cursor/rules/01_project-context.mdc` (Project Structure section)
5. ✅ Update any affected documentation
6. ✅ Run `.\tools\psscripts\Get-RepoHealth.ps1`
7. ✅ Commit with descriptive message documenting all changes

### When Responding to Issues

1. **Root Cause Analysis**: Why did the issue occur?
2. **Immediate Fix**: Solve the current problem
3. **Prevention**: What process/documentation prevents recurrence?
4. **Implementation**: Update instructions, scripts, documentation
5. **Verification**: Ensure fix is complete and documented

---

## 📊 Code Generation Checklist

When generating code, always:

1. **Include proper error handling**
2. **Add TypeScript types and interfaces**
3. **Follow React best practices (functional components, hooks)**
4. **Implement logging at appropriate levels**
5. **Include input validation**
6. **Follow SOLID principles**
7. **Write testable code**
8. **Consider performance implications**
9. **Think about security from the start**
10. **Make code maintainable and readable**
11. **Add JSDoc comments for complex logic**
12. **Use existing patterns and components**
13. **Update documentation as needed**

---

## 🚀 Development Tools

### Available Scripts

**PowerShell Scripts** (tools/psscripts/):

- `Get-FileStats.ps1` - Analyze file statistics
- `Get-RepoHealth.ps1` - Workspace health check
- `Validate-References.ps1` - Check file references
- `Review-CodeQuality.ps1` - Code quality review

**Usage**:
```powershell
# Run from repository root
.\tools\psscripts\Get-RepoHealth.ps1
.\tools\psscripts\Get-FileStats.ps1 -Path "src/CAOfficeSuite.Web/src"
```

### Frontend Scripts

```bash
# Navigate to frontend directory
cd src/CAOfficeSuite.Web

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

---

## 📞 Support & Escalation

**Questions about code placement?** → Check `.cursor/rules/01_project-context.mdc`

**Code quality issues?** → Check `.cursor/rules/03_best-practices.mdc`

**Naming conventions?** → Check `.cursor/rules/05_naming-conventions.mdc`

**Structure outdated?** → Update THIS FILE and README.md immediately

**Need automation?** → Check `tools/psscripts/` for existing scripts

---

## 📚 Document Information

**Version**: 1.0  

**Last Updated**: December 8, 2025  

**Maintained By**: CA Office Suite Development Team  

**Review Cycle**: After every structural change (immediate) + quarterly review  

**Audience**: GitHub Copilot agents, content creators, maintainers

**Critical Reminder**: This file MUST be updated whenever repository structure changes. No exceptions.

---

## 🎓 Lessons Learned

**Issue**: Made structural changes but didn't update instruction file immediately  

**Impact**: Instructions became outdated, causing confusion  

**Solution**: Added "Update Verification Protocol" as Primary Directive 2  

**Prevention**: Self-check question after every structural change  

**Remember**: The best automation is useless if documentation doesn't reflect reality.

---

## For More Information

- **Repository**: [GitHub Repository URL]
- **Architecture**: `docs/02_Architecture.md`
- **Requirements**: `docs/01_Requirements.md`
- **Technology Stack**: `docs/03_Technology-Stack.md`
- **Cursor Rules**: `.cursor/rules/README.md`
- **Automation Scripts**: `tools/psscripts/`
