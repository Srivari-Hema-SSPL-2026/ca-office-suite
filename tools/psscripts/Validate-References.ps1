# Validate-References.ps1
# Validates file references in markdown and code files

param(
    [Parameter(Mandatory=$false)]
    [string]$Path = ".",
    
    [Parameter(Mandatory=$false)]
    [string[]]$Include = @("*.md", "*.mdc", "*.ts", "*.tsx"),
    
    [Parameter(Mandatory=$false)]
    [switch]$Detailed
)

Write-Host "File Reference Validation" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

$files = Get-ChildItem -Path $Path -Recurse -Include $Include -File | 
    Where-Object { $_.FullName -notmatch 'node_modules|\.git|dist|build' }

$brokenRefs = @()
$validRefs = 0
$totalRefs = 0

# Pattern to match file references: [text](path) or [text](./path) or import from 'path'
$referencePatterns = @(
    '\[([^\]]+)\]\(([^\)]+)\)',  # Markdown links: [text](path)
    "from\s+['`""]([^'`""]+)['`""]",  # ES6 imports: from 'path'
    "import\s+['`""]([^'`""]+)['`""]"  # ES6 imports: import 'path'
)

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        if (-not $content) { continue }
        
        foreach ($pattern in $referencePatterns) {
            $matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            
            foreach ($match in $matches) {
                $totalRefs++
                $refPath = $match.Groups[$match.Groups.Count - 1].Value
                
                # Skip external URLs
                if ($refPath -match '^https?://|^mailto:|^#') {
                    $validRefs++
                    continue
                }
                
                # Resolve relative paths
                $fileDir = Split-Path $file.FullName -Parent
                $resolvedPath = $null
                
                # Try different path resolutions
                $testPaths = @(
                    Join-Path $fileDir $refPath,
                    Join-Path $repoRoot $refPath,
                    $refPath
                )
                
                $found = $false
                foreach ($testPath in $testPaths) {
                    if (Test-Path $testPath) {
                        $found = $true
                        $validRefs++
                        break
                    }
                }
                
                if (-not $found) {
                    $relativeFile = $file.FullName.Replace((Get-Location).Path, ".")
                    $brokenRefs += [PSCustomObject]@{
                        File = $relativeFile
                        Reference = $refPath
                        Line = ($content.Substring(0, $match.Index) -split "`n").Count
                    }
                }
            }
        }
    } catch {
        # Skip files that can't be read
    }
}

Write-Host "Validation Summary" -ForegroundColor Yellow
Write-Host "-----------------"
Write-Host "Total References: $totalRefs"
Write-Host "Valid References: $validRefs" -ForegroundColor Green
Write-Host "Broken References: $($brokenRefs.Count)" -ForegroundColor $(if ($brokenRefs.Count -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($brokenRefs.Count -gt 0) {
    Write-Host "Broken References:" -ForegroundColor Red
    Write-Host "-----------------"
    $brokenRefs | ForEach-Object {
        Write-Host "  $($_.File):$($_.Line) - $($_.Reference)" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "✗ Validation failed with $($brokenRefs.Count) broken reference(s)" -ForegroundColor Red
    exit 1
} else {
    Write-Host "✓ All references are valid!" -ForegroundColor Green
    exit 0
}

