# GitHub Copilot Instructions - CA Office Suite

**Version**: 1.0  
**Last Updated**: December 7, 2025

This file contains instructions for GitHub Copilot to understand the project context and generate code that aligns with the project's standards and architecture.

---

## Project Overview

This is the **Chartered Accountants Office Suite** - a modern, scalable office management platform designed specifically for Chartered Accountants and tax professionals.

**For comprehensive project context, architecture, and current status, see:**
- `.cursor/rules/01_project-context.mdc` - Complete project overview and architecture
- `docs/02_Architecture.md` - Detailed architecture documentation
- `docs/03_Technology-Stack.md` - Technology stack details

---

## Code Generation Guidelines

**For detailed code generation patterns and examples, see:**
- `.cursor/rules/02_code-generation-guidelines.mdc` - React component patterns, hooks, services, DataGrid usage
- `.cursor/rules/03_best-practices.mdc` - Error handling, performance, testing, accessibility
- `.cursor/rules/05_naming-conventions.mdc` - Complete naming conventions and import organization

**Key Principles:**
- Use functional components with TypeScript
- Extract reusable logic into custom hooks
- Follow service layer pattern for API calls
- Use Context API for shared state
- Implement proper error handling and loading states

---

## Naming Conventions

**For complete naming conventions, see:**
- `.cursor/rules/05_naming-conventions.mdc` - Comprehensive naming standards for components, hooks, functions, types, files, CSS, API, and database

**Quick Reference:**
- Components: PascalCase (`DataGrid.tsx`, `ClientList`)
- Hooks: camelCase with `use` prefix (`useAuth`, `useClients`)
- Functions/Variables: camelCase (`getClientById`, `isLoading`)
- Types/Interfaces: PascalCase (`Client`, `TaskStatus`)
- CSS Classes: kebab-case (`data-grid`, `status-active`)

---

## Best Practices

**For comprehensive best practices, see:**
- `.cursor/rules/03_best-practices.mdc` - Error handling, performance, security, testing, observability
- `docs/07_Code-Quality.md` - Code quality tools, linting, and link checking

**Key Principles:**
- Always handle errors in async operations
- Use React.memo, useMemo, useCallback appropriately
- Keep state management simple (useState, Context API)
- Strong TypeScript typing (avoid `any`)
- Write tests for critical functionality
- Follow accessibility guidelines (WCAG AA)
- Keep components small and focused

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

**For current development focus and roadmap, see:**
- `docs/08_Development-Roadmap.md` - Phased development approach with 2-3 hour tasks
- `.cursor/rules/01_project-context.mdc` - Current project status and development focus

**For project structure and file organization, see:**
- `.cursor/rules/01_project-context.mdc` - Complete project structure
- `.cursor/rules/05_naming-conventions.mdc` - Import organization guidelines

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

**For detailed checklists and patterns, see:**
- `.cursor/rules/02_code-generation-guidelines.mdc` - Code generation checklist
- `.cursor/rules/03_best-practices.mdc` - Code generation checklist for backend (future)

---

## Notes

- Currently using **mock data** for development
- Backend services are **planned** but not yet implemented
- The project structure may evolve as backend services are added
- All frontend code is in `src/CAOfficeSuite.Web/`
- **This file should be kept in sync with `.cursor/rules/` for consistency**

---

## Related Files

**Documentation:**
- Project Requirements: `docs/01_Requirements.md`
- Architecture: `docs/02_Architecture.md`
- Technology Stack: `docs/03_Technology-Stack.md`
- UI Requirements: `docs/04_Portal-React-UI-Requirements.md`
- Setup and Prerequisites: `docs/05_Setup-and-Prerequisites.md`
- How to Execute: `docs/06_How-to-Execute.md`
- Code Quality: `docs/07_Code-Quality.md`
- Development Roadmap: `docs/08_Development-Roadmap.md`
- Main README: `README.md`

**AI Assistant Rules:**
- Cursor IDE Rules: `.cursor/rules/` (comprehensive project rules)
