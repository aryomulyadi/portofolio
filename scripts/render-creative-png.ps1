<#
  Render scripts/artwork-src/*.svg → public/images/creative/*.png via headless Edge (fallback Chrome).
  Usage:  powershell -File scripts/render-creative-png.ps1 [-MaxEdge 1600]
  Keeps artwork pixel-faithful (real browser raster, AA + text intact).
#>
param(
  [int]$MaxEdge = 1600
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$dir = Join-Path $root 'scripts\artwork-src'
$outDir = Join-Path $root 'public\images\creative'
New-Item -ItemType Directory -Path $outDir -Force | Out-Null
$svgFiles = @(Get-ChildItem -LiteralPath $dir -Filter '*.svg')
if ($svgFiles.Count -eq 0) { throw "No SVGs found in $dir" }

$browsers = @(
  'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
)
$browser = $browsers | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $browser) { throw 'No Edge/Chrome executable found for headless rendering.' }
Write-Host "browser: $browser"

$tmpRoot = Join-Path ([System.IO.Path]::GetTempPath()).TrimEnd('\') 'creative-png'
New-Item -ItemType Directory -Path $tmpRoot -Force | Out-Null

function Get-PngInfo([string]$path) {
  $fs = [System.IO.File]::OpenRead($path)
  try {
    $buf = New-Object byte[] 24
    $n = $fs.Read($buf, 0, 24)
    if ($n -lt 24) { return $null }
    for ($i = 0; $i -lt 8; $i++) {
      $sig = @(137, 80, 78, 71, 13, 10, 26, 10)
      if ($buf[$i] -ne $sig[$i]) { return $null }
    }
    $w = [BitConverter]::ToUInt32([byte[]]@($buf[19], $buf[18], $buf[17], $buf[16]), 0)
    $h = [BitConverter]::ToUInt32([byte[]]@($buf[23], $buf[22], $buf[21], $buf[20]), 0)
    return [pscustomobject]@{ W = [int]$w; H = [int]$h }
  }
  finally { $fs.Dispose() }
}

$flagsCommon = @(
  '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--no-first-run', '--no-default-browser-check', '--disable-extensions',
  '--virtual-time-budget=4000'
)
$headlessModes = @('--headless=new', '--headless')
$results = @()

foreach ($svg in $svgFiles) {
  $xml = Get-Content -LiteralPath $svg.FullName -Raw
  if ($xml -notmatch 'viewBox="0 0 ([0-9.]+) ([0-9.]+)"') { throw "No viewBox: $($svg.Name)" }
  $vw = [double]$Matches[1]
  $vh = [double]$Matches[2]

  $scale = [Math]::Min([double]1, $MaxEdge / [Math]::Max($vw, $vh))
  $w = [int][Math]::Round($vw * $scale)
  $h = [int][Math]::Round($vh * $scale)

  $outPng = Join-Path $outDir ($svg.BaseName + '.png')
  $htmlPath = Join-Path $tmpRoot ($svg.BaseName + '.html')
  $profileDir = Join-Path $tmpRoot ('profile-' + $svg.BaseName)
  $svgUri = 'file:///' + ($svg.FullName -replace '\\', '/')

  $html = "<!doctype html><meta charset=`"utf-8`"><style>html,body{margin:0;padding:0;background:#000;overflow:hidden}</style><img src=`"$svgUri`" style=`"display:block;width:${w}px;height:${h}px`">"
  Set-Content -LiteralPath $htmlPath -Value $html -Encoding ASCII

  if (Test-Path -LiteralPath $outPng) { Remove-Item -LiteralPath $outPng -Force }

  $done = $false
  foreach ($mode in $headlessModes) {
    if ($done) { break }
    # Start-Process does not auto-quote args with spaces — quote path values manually
    $htmlUri = ('file:///' + ($htmlPath -replace '\\', '/')) -replace ' ', '%20'
    $modeProfile = $profileDir + '-' + ($mode -replace '[^a-z0-9]', '')
    $argList = @($mode) + $flagsCommon + @(
      "--user-data-dir=`"$modeProfile`"",
      "--window-size=$w,$h",
      "--screenshot=`"$outPng`"",
      "`"$htmlUri`""
    )
    try {
      Start-Process -FilePath $browser -ArgumentList $argList -Wait -WindowStyle Hidden
    } catch {
      Write-Host "  [$mode] Start-Process ERROR: $($_.Exception.Message)"
      continue
    }
    if (Test-Path -LiteralPath $outPng) {
      $info = Get-PngInfo $outPng
      if ($info -and $info.W -eq $w -and $info.H -eq $h) { $done = $true }
      else { Write-Host "  [$mode] invalid png: info=$($info | ConvertTo-Json -Compress) want=${w}x${h}" }
    } else {
      Write-Host "  [$mode] no output file"
    }
  }

  if (-not $done) { throw "Render failed: $($svg.Name)" }
  $kb = [math]::Round((Get-Item -LiteralPath $outPng).Length / 1KB, 0)
  $results += [pscustomobject]@{ Name = $svg.Name; Px = "${w}x${h}"; KB = $kb }
  Remove-Item -LiteralPath $htmlPath -Force -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $profileDir -Recurse -Force -ErrorAction SilentlyContinue
}

$results | Format-Table -AutoSize
$totalMB = [math]::Round(($results | Measure-Object -Property KB -Sum).Sum / 1024, 2)
Write-Host "TOTAL: $totalMB MB (cap ${MaxEdge}px)"
