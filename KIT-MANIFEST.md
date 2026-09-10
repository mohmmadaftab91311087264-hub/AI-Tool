# AI-Tool Developer Kit Manifest

This manifest records the local tool links, SDK pins, and repository setup for this kit.

## Repository

- GitHub remote: `https://github.com/mohmmadaftab91311087264-hub/AI-Tool.git`
- Primary branch: `main`
- Workspace file: `AI-Tool.code-workspace`
- CI workflow: `.github/workflows/ci.yml`

## Verification

Run the full local verification from the kit root:

```powershell
.\scripts\verify-kit.ps1
```

The verification script checks:

- WebApp Node.js tests
- Node.js starter app
- Python starter app
- .NET starter build and run

## SDKs And Tools

- Git Bash shortcut: `Git Bash.lnk`
- .NET SDK shortcut: `.NET SDK.lnk`
- Windows SDK shortcut: `Windows 10 SDK (Windows Kits).lnk`
- Visual Studio shortcuts:
  - `Visual Studio.lnk`
  - `Visual Studio (x86).lnk`
- VS Code shortcuts:
  - `Visual Studio Code.lnk`
  - `Visual Studio Code Insiders.lnk`
- C# Dev Kit shortcut: `C# Dev Kit (Extension).lnk`
- Edge DevTools repository shortcut: `Edge DevTools Repository.lnk`

## Pinned Runtime Versions

- .NET SDK is pinned by `global.json` to `10.0.400` with latest patch roll-forward enabled.
- Local verified .NET SDK: `10.0.401`
- Local verified Node.js: `24.x`
- Local verified Python: `3.12`

## Local Assets

- `Microsoft.Services.Store.winmd` is tracked in this repository.
- `Microsoft.VisualStudio.Services.VSIXPackage` is tracked in this repository.
- `Database-Backup-20260908` is local data and intentionally ignored by Git.

## VS Code Insiders Setup

The workspace includes:

- `.vscode/tasks.json`
- `.vscode/launch.json`
- `.vscode/settings.json`
- `.vscode/extensions.json`

Recommended Insiders extensions include:

- C# Dev Kit
- Python
- GitHub Actions
- GitHub Pull Requests
- Edge DevTools
