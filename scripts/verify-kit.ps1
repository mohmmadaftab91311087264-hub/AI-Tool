$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot

function Invoke-Step {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Name,
        [Parameter(Mandatory = $true)]
        [string] $WorkingDirectory,
        [Parameter(Mandatory = $true)]
        [string[]] $Command
    )

    Write-Host ""
    Write-Host "==> $Name" -ForegroundColor Cyan
    Push-Location $WorkingDirectory
    try {
        & $Command[0] @($Command | Select-Object -Skip 1)
    }
    finally {
        Pop-Location
    }
}

Invoke-Step `
    -Name "WebApp tests" `
    -WorkingDirectory (Join-Path $root "StarterProjects/WebApp") `
    -Command @("npm", "test")

Invoke-Step `
    -Name "NodeApp run" `
    -WorkingDirectory (Join-Path $root "StarterProjects/NodeApp") `
    -Command @("npm", "start")

Invoke-Step `
    -Name "PythonApp run" `
    -WorkingDirectory (Join-Path $root "StarterProjects/PythonApp") `
    -Command @("python", "main.py")

Invoke-Step `
    -Name "DotnetApp build" `
    -WorkingDirectory (Join-Path $root "StarterProjects/DotnetApp") `
    -Command @("dotnet", "build")

Invoke-Step `
    -Name "DotnetApp run" `
    -WorkingDirectory (Join-Path $root "StarterProjects/DotnetApp") `
    -Command @("dotnet", "run", "--no-build")

Write-Host ""
Write-Host "Developer kit verification completed." -ForegroundColor Green
