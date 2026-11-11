<#
  Render scripts/og-source.html -> public/images/og.png (1200x630) via headless Edge (fallback Chrome).
  OG card v2: ink + paper + Signal Red, Archivo variable display type.
  Usage:  powershell -File scripts/gen-og.ps1
#>

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$htmlPath = Join-Path $root 'scripts\og-source.html'
$outDir = Join-Path $root 'public\images'
$outPath = Join-Path $outDir 'og.png'
New-Item -ItemType Directory -Path $outDir -Force | Out-Null

$browsers = @(
  'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
)
$browser = $browsers | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $browser) { throw 'No Edge/Chrome executable found for headless rendering.' }
Write-Host "browser: $browser"

if (Test-Path -LiteralPath $outPath) { Remove-Item -LiteralPath $outPath -Force }

$fileUrl = ([System.Uri]$htmlPath).AbsoluteUri
$prevEap = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
& $browser --headless=new --disable-gpu --hide-scrollbars `
  --virtual-time-budget=4000 `
  --window-size=1200,630 `
  --screenshot="$outPath" `
  "$fileUrl" 2>&1 | Out-Null
$ErrorActionPreference = $prevEap

if (-not (Test-Path -LiteralPath $outPath)) { throw "Screenshot failed: $outPath" }
$size = (Get-Item -LiteralPath $outPath).Length
Write-Host "wrote $outPath ($([math]::Round($size/1KB,1)) KB)"
