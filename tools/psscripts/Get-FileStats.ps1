# Get-FileStats.ps1
# Analyzes file statistics for a given path

param(
    [Parameter(Mandatory=$false)]
    [string]$Path = ".",
    
    [Parameter(Mandatory=$false)]
    [string[]]$Include = @("*.ts", "*.tsx", "*.js", "*.jsx", "*.css", "*.md"),
    
    [Parameter(Mandatory=$false)]
    [switch]$Detailed
)

Write-Host "File Statistics Analysis" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host ""

$files = Get-ChildItem -Path $Path -Recurse -Include $Include -File | 
    Where-Object { $_.FullName -notmatch 'node_modules|\.git|dist|build' }

$totalFiles = $files.Count
$totalSize = ($files | Measure-Object -Property Length -Sum).Sum
$totalLines = 0

$fileTypes = @{}
$largestFiles = @()

foreach ($file in $files) {
    $extension = $file.Extension
    if (-not $fileTypes.ContainsKey($extension)) {
        $fileTypes[$extension] = @{
            Count = 0
            Size = 0
            Lines = 0
        }
    }
    
    $fileTypes[$extension].Count++
    $fileTypes[$extension].Size += $file.Length
    
    try {
        $lineCount = (Get-Content $file.FullName -ErrorAction SilentlyContinue | Measure-Object -Line).Lines
        $fileTypes[$extension].Lines += $lineCount
        $totalLines += $lineCount
        
        if ($largestFiles.Count -lt 10) {
            $largestFiles += [PSCustomObject]@{
                File = $file.Name
                Path = $file.FullName.Replace((Get-Location).Path, ".")
                Size = $file.Length
                Lines = $lineCount
            }
        } else {
            $minSize = ($largestFiles | Measure-Object -Property Size -Minimum).Minimum
            if ($file.Length -gt $minSize) {
                $largestFiles = $largestFiles | Where-Object { $_.Size -gt $minSize }
                $largestFiles += [PSCustomObject]@{
                    File = $file.Name
                    Path = $file.FullName.Replace((Get-Location).Path, ".")
                    Size = $file.Length
                    Lines = $lineCount
                }
            }
        }
    } catch {
        # Skip files that can't be read
    }
}

Write-Host "Summary" -ForegroundColor Yellow
Write-Host "-------"
Write-Host "Total Files: $totalFiles"
Write-Host "Total Size: $([math]::Round($totalSize / 1MB, 2)) MB"
Write-Host "Total Lines: $totalLines"
Write-Host ""

if ($Detailed) {
    Write-Host "File Types Breakdown" -ForegroundColor Yellow
    Write-Host "-------------------"
    $fileTypes.GetEnumerator() | Sort-Object { $_.Value.Count } -Descending | ForEach-Object {
        $sizeMB = [math]::Round($_.Value.Size / 1MB, 2)
        Write-Host "$($_.Key): $($_.Value.Count) files, $sizeMB MB, $($_.Value.Lines) lines"
    }
    Write-Host ""
    
    Write-Host "Largest Files (Top 10)" -ForegroundColor Yellow
    Write-Host "---------------------"
    $largestFiles | Sort-Object Size -Descending | ForEach-Object {
        $sizeKB = [math]::Round($_.Size / 1KB, 2)
        Write-Host "$($_.Path) - $sizeKB KB ($($_.Lines) lines)"
    }
}

Write-Host ""
Write-Host "Analysis complete!" -ForegroundColor Green

