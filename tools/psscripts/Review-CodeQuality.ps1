# Review-CodeQuality.ps1
# Performs code quality review

param(
    [Parameter(Mandatory=$false)]
    [string]$Path = "src/CAOfficeSuite.Web/src",
    
    [Parameter(Mandatory=$false)]
    [switch]$Detailed
)

Write-Host "Code Quality Review" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host ""

$files = Get-ChildItem -Path $Path -Recurse -Include *.ts,*.tsx -File | 
    Where-Object { $_.FullName -notmatch 'node_modules|\.git|dist|build|\.test\.|\.spec\.' }

$issues = @()
$warnings = @()
$stats = @{
    TotalFiles = $files.Count
    TotalLines = 0
    HasAny = 0
    HasConsoleLog = 0
    HasTodo = 0
    LargeFiles = 0
}

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        if (-not $content) { continue }
        
        $lines = ($content -split "`n").Count
        $stats.TotalLines += $lines
        
        # Check for 'any' type
        if ($content -match '\bany\b') {
            $stats.HasAny++
            $warnings += "$($file.Name): Contains 'any' type (use 'unknown' instead)"
        }
        
        # Check for console.log (should use proper logging)
        if ($content -match 'console\.log\(') {
            $stats.HasConsoleLog++
            $warnings += "$($file.Name): Contains console.log (use proper logging in production)"
        }
        
        # Check for TODO comments
        if ($content -match 'TODO|FIXME|XXX') {
            $stats.HasTodo++
            $info = "TODO/FIXME found in $($file.Name)"
        }
        
        # Check for large files (>500 lines)
        if ($lines -gt 500) {
            $stats.LargeFiles++
            $warnings += "$($file.Name): Large file ($lines lines) - consider splitting"
        }
        
        # Check for missing error handling in async functions
        if ($content -match 'async\s+\w+\s*\([^)]*\)\s*\{' -and $content -notmatch 'try\s*\{') {
            $warnings += "$($file.Name): Async function may be missing error handling"
        }
        
    } catch {
        # Skip files that can't be read
    }
}

Write-Host "Code Quality Summary" -ForegroundColor Yellow
Write-Host "-------------------"
Write-Host "Total Files: $($stats.TotalFiles)"
Write-Host "Total Lines: $($stats.TotalLines)"
Write-Host ""

Write-Host "Issues Found:" -ForegroundColor Yellow
Write-Host "  Files with 'any' type: $($stats.HasAny)" -ForegroundColor $(if ($stats.HasAny -eq 0) { "Green" } else { "Yellow" })
Write-Host "  Files with console.log: $($stats.HasConsoleLog)" -ForegroundColor $(if ($stats.HasConsoleLog -eq 0) { "Green" } else { "Yellow" })
Write-Host "  Files with TODO/FIXME: $($stats.HasTodo)" -ForegroundColor Cyan
Write-Host "  Large files (>500 lines): $($stats.LargeFiles)" -ForegroundColor $(if ($stats.LargeFiles -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($Detailed -or $warnings.Count -gt 0) {
    if ($warnings.Count -gt 0) {
        Write-Host "Warnings:" -ForegroundColor Yellow
        $warnings | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
        Write-Host ""
    }
}

if ($stats.HasAny -eq 0 -and $stats.HasConsoleLog -eq 0 -and $stats.LargeFiles -eq 0) {
    Write-Host "✓ Code quality: EXCELLENT" -ForegroundColor Green
} elseif ($stats.HasAny -eq 0 -and $stats.LargeFiles -eq 0) {
    Write-Host "⚠ Code quality: GOOD (minor issues)" -ForegroundColor Yellow
} else {
    Write-Host "⚠ Code quality: NEEDS IMPROVEMENT" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Review complete!" -ForegroundColor Green

