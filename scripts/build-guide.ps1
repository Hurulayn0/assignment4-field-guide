# Name: Huriye Kayadelen; Student number: 2200005795
# Requires Pandoc 3.14 and Tectonic 0.17.0 on PATH (or pass their executable paths).
param([string]$Pandoc = 'pandoc', [string]$Tectonic = 'tectonic')
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Push-Location -LiteralPath $root
try {
    New-Item -ItemType Directory -Force -Path output/pdf | Out-Null
    & $Pandoc README.md --from=gfm --to=latex --standalone --listings --toc --shift-heading-level-by=-1 --metadata 'title=Destructuring Field Guide' --metadata 'author=Huriye Kayadelen (2200005795)' --metadata 'date=16 November 2026' --variable 'geometry:margin=22mm' --variable 'papersize=a4' --variable 'fontsize=10pt' --include-in-header=scripts/latex-header.tex --lua-filter=scripts/latex-layout.lua --output=output/pdf/guide.tex
    if ($LASTEXITCODE -ne 0) { throw 'Pandoc conversion failed' }
    $tex = Get-Content -Raw -Encoding UTF8 output/pdf/guide.tex
    [IO.File]::WriteAllText((Join-Path $root 'output/pdf/guide.tex'), "% Name: Huriye Kayadelen; Student number: 2200005795`n" + $tex, (New-Object Text.UTF8Encoding($false)))
    & $Tectonic --keep-logs --outdir output/pdf output/pdf/guide.tex
    if ($LASTEXITCODE -ne 0) { throw 'LaTeX compilation failed' }
    $log = Get-Content -Raw -Encoding UTF8 output/pdf/guide.log
    if ($log.Contains('Overfull \hbox') -or $log.Contains('Overfull \vbox')) { throw 'LaTeX contains an overfull box; inspect guide.log' }
    Write-Output 'Full README compiled successfully into output/pdf/guide.pdf'
} finally { Pop-Location }
