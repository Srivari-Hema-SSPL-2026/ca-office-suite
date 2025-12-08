# PowerShell Automation Scripts

This directory contains PowerShell scripts for automating common development tasks in the CA Office Suite project.

## Available Scripts

### Get-FileStats.ps1

Analyzes file statistics for a given path.

**Usage:**
```powershell
# Analyze current directory
.\tools\psscripts\Get-FileStats.ps1

# Analyze specific path
.\tools\psscripts\Get-FileStats.ps1 -Path "src/CAOfficeSuite.Web/src"

# Detailed analysis
.\tools\psscripts\Get-FileStats.ps1 -Path "src" -Detailed
```

**Output:**
- Total file count
- Total size
- Total lines of code
- File type breakdown (detailed mode)
- Largest files (detailed mode)

---

### Get-RepoHealth.ps1

Performs a quick health check of the repository structure.

**Usage:**
```powershell
# Basic health check
.\tools\psscripts\Get-RepoHealth.ps1

# Detailed health check
.\tools\psscripts\Get-RepoHealth.ps1 -Detailed
```

**Checks:**
- Required directories exist
- Key files present
- Frontend structure intact
- Cursor rules present
- Documentation files exist
- Dependencies installed

---

### Validate-References.ps1

Validates file references in markdown and code files.

**Usage:**
```powershell
# Validate all references
.\tools\psscripts\Validate-References.ps1

# Validate specific path
.\tools\psscripts\Validate-References.ps1 -Path "docs"

# Detailed output
.\tools\psscripts\Validate-References.ps1 -Detailed
```

**Validates:**
- Markdown links: `[text](path)`
- ES6 imports: `from 'path'` or `import 'path'`
- Relative file paths
- External URLs (skipped)

**Exit Codes:**
- 0: All references valid
- 1: Broken references found

---

### Review-CodeQuality.ps1

Performs code quality review of TypeScript/React files.

**Usage:**
```powershell
# Review frontend code
.\tools\psscripts\Review-CodeQuality.ps1

# Review specific path
.\tools\psscripts\Review-CodeQuality.ps1 -Path "src/CAOfficeSuite.Web/src/components"

# Detailed review
.\tools\psscripts\Review-CodeQuality.ps1 -Detailed
```

**Checks:**
- Usage of `any` type (should use `unknown`)
- `console.log` statements (should use proper logging)
- TODO/FIXME comments
- Large files (>500 lines)
- Missing error handling in async functions

---

## Running Scripts

All scripts should be run from the repository root directory:

```powershell
# Navigate to repository root
cd D:\SrivariHSSPL-2026\ca-office-suite

# Run script
.\tools\psscripts\Get-RepoHealth.ps1
```

## Requirements

- PowerShell 5.1 or later (Windows PowerShell or PowerShell Core)
- No additional modules required (uses built-in cmdlets)

## Adding New Scripts

When creating new automation scripts:

1. Follow naming convention: `Verb-Noun.ps1` (e.g., `Get-FileStats.ps1`)
2. Add parameter documentation
3. Include usage examples in script comments
4. Update this README with script description
5. Test script from repository root

## Integration with CI/CD

These scripts can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions step
- name: Validate References
  run: pwsh -File .\tools\psscripts\Validate-References.ps1

- name: Code Quality Review
  run: pwsh -File .\tools\psscripts\Review-CodeQuality.ps1
```

---

**Last Updated**: December 8, 2025

