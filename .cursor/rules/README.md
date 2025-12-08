# Cursor AI Project Rules

**Version**: 1.0  
**Last Updated**: December 7, 2025

This directory contains modular rule files for Cursor AI, following the recommended Project Rules structure.

**Project**: Chartered Accountants Office Suite  
**Current Phase**: Frontend Development (React + TypeScript)

---

## 📋 Rule Files

### `01_project-context.mdc`

**Priority**: MANDATORY  
**Content**: Project overview, architecture, technology stack, current project status, project structure, and development principles for CA Office Suite

### `02_code-generation-guidelines.mdc`

**Content**: React component patterns, custom hooks, service layer patterns, Context API patterns, DataGrid usage, TypeScript type definitions, file organization

### `03_best-practices.mdc`

**Content**: Error handling, security, performance, testing patterns, observability, code generation checklist (includes both frontend and future backend patterns)

### `04_common-patterns.mdc`

**Content**: Common patterns for future backend services (circuit breaker, retry policies, service-to-service communication, entity configuration patterns)

### `05_naming-conventions.mdc`

**Content**: React/TypeScript naming conventions, component naming, hooks naming, API naming, database naming (for future), file organization

### `06_database-design.mdc`

**Content**: Database design principles for future backend implementation, entity configuration patterns, API contract standards

### `07_ai-reasoning-framework.mdc`

**Content**: Chain-of-Thought (CoT), ReAct methodology, System 2 reasoning, application guidelines

---

## 🔄 Migration from `.cursorrules`

The root `.cursorrules` file has been split into these modular files for better:

- **Version Control**: Individual files easier to track
- **Modularity**: Update specific rules without affecting others
- **Maintainability**: Clear organization by topic
- **Scalability**: Easy to add new rule files

---

## 📝 Adding New Rules

1. Create new `.mdc` file in this directory
2. Use descriptive name with numeric prefix: `08_new-rule-name.mdc`
3. Follow existing file structure
4. Update this README with new rule description

---

## 🔗 Related Files

- **Root `.cursorrules`**: Can be removed after migration verified (kept for backward compatibility)
- **GitHub Copilot**: `.github/copilot-instructions.md` (similar rules for GitHub Copilot)

---

**Note**: Cursor AI automatically reads all `.mdc` files in `.cursor/rules/` directory. No additional configuration needed.
