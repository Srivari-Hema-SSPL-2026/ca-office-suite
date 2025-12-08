# Get-RepoHealth.ps1
# Performs a quick health check of the repository

param(
    [Parameter(Mandatory=$false)]
    [switch]$Detailed
)

Write-Host "Repository Health Check" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

$repoRoot = Get-Location
$issues = @()
$warnings = @()
$info = @()

# Check for required directories
Write-Host "Checking directory structure..." -ForegroundColor Yellow

$requiredDirs = @(
    "src",
    "docs",
    ".cursor",
    "tools"
)

foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        $info += "✓ Directory exists: $dir"
    } else {
        $warnings += "⚠ Missing directory: $dir"
    }
}

# Check for key files
Write-Host "Checking key files..." -ForegroundColor Yellow

$keyFiles = @(
    "README.md",
    "LICENSE",
    ".cursor/rules/README.md",
    ".github/copilot-instructions.md",
    "src/CAOfficeSuite.Web/package.json"
)

foreach ($file in $keyFiles) {
    if (Test-Path $file) {
        $info += "✓ File exists: $file"
    } else {
        $warnings += "⚠ Missing file: $file"
    }
}

# Check frontend structure
Write-Host "Checking frontend structure..." -ForegroundColor Yellow

$frontendDirs = @(
    "src/CAOfficeSuite.Web/src/components",
    "src/CAOfficeSuite.Web/src/pages",
    "src/CAOfficeSuite.Web/src/services",
    "src/CAOfficeSuite.Web/src/store",
    "src/CAOfficeSuite.Web/src/types"
)

foreach ($dir in $frontendDirs) {
    if (Test-Path $dir) {
        $info += "✓ Frontend directory exists: $dir"
    } else {
        $warnings += "⚠ Missing frontend directory: $dir"
    }
}

# Check for cursor rules
Write-Host "Checking cursor rules..." -ForegroundColor Yellow

$cursorRules = @(
    ".cursor/rules/01_project-context.mdc",
    ".cursor/rules/02_code-generation-guidelines.mdc",
    ".cursor/rules/03_best-practices.mdc",
    ".cursor/rules/07_ai-reasoning-framework.mdc"
)

foreach ($rule in $cursorRules) {
    if (Test-Path $rule) {
        $info += "✓ Cursor rule exists: $rule"
    } else {
        $warnings += "⚠ Missing cursor rule: $rule"
    }
}

# Check documentation
Write-Host "Checking documentation..." -ForegroundColor Yellow

$docs = Get-ChildItem -Path "docs" -Filter "*.md" -File | Select-Object -ExpandProperty Name
if ($docs.Count -gt 0) {
    $info += "✓ Found $($docs.Count) documentation files"
} else {
    $warnings += "⚠ No documentation files found"
}

# Check for node_modules (should exist if dependencies installed)
Write-Host "Checking dependencies..." -ForegroundColor Yellow

if (Test-Path "src/CAOfficeSuite.Web/node_modules") {
    $info += "✓ Frontend dependencies installed"
} else {
    $warnings += "⚠ Frontend dependencies not installed (run: npm install)"
}

# Summary
Write-Host ""
Write-Host "Health Check Summary" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host ""

if ($issues.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "✓ Repository health: EXCELLENT" -ForegroundColor Green
} elseif ($issues.Count -eq 0) {
    Write-Host "⚠ Repository health: GOOD (with warnings)" -ForegroundColor Yellow
} else {
    Write-Host "✗ Repository health: NEEDS ATTENTION" -ForegroundColor Red
}

Write-Host ""
Write-Host "Issues: $($issues.Count)" -ForegroundColor $(if ($issues.Count -eq 0) { "Green" } else { "Red" })
Write-Host "Warnings: $($warnings.Count)" -ForegroundColor $(if ($warnings.Count -eq 0) { "Green" } else { "Yellow" })
Write-Host "Info: $($info.Count)" -ForegroundColor Cyan

if ($Detailed -or $warnings.Count -gt 0 -or $issues.Count -gt 0) {
    Write-Host ""
    
    if ($issues.Count -gt 0) {
        Write-Host "Issues:" -ForegroundColor Red
        $issues | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
        Write-Host ""
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "Warnings:" -ForegroundColor Yellow
        $warnings | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
        Write-Host ""
    }
}

if ($Detailed) {
    Write-Host "Info:" -ForegroundColor Cyan
    $info | ForEach-Object { Write-Host "  $_" -ForegroundColor Cyan }
    Write-Host ""
}

Write-Host "Health check complete!" -ForegroundColor Green

