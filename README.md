# Microsoft Developer Kit

This folder is a local developer toolkit that groups Microsoft-oriented starter projects, SDK shortcuts, and a preserved database backup.

## Contents

- `StarterProjects/WebApp` - Node.js HTTP web app with a built-in test.
- `StarterProjects/NodeApp` - Minimal Node.js console app.
- `StarterProjects/PythonApp` - Minimal Python console app.
- `StarterProjects/DotnetApp` - .NET console app targeting the SDK pinned by `global.json`.
- `Database-Backup-20260908` - Reallusion PostgreSQL CMS backup files. Treat this as data, not source code.
- `Microsoft_Developer_Kit_Info.txt` - Local scan summary of installed Microsoft developer tools.

## Verify Everything

Run this from the kit root:

```powershell
.\scripts\verify-kit.ps1
```

The script checks Node, Python, and .NET starter projects in one pass.

## Manual Commands

```powershell
cd StarterProjects\WebApp
npm test

cd ..\NodeApp
npm start

cd ..\PythonApp
python main.py

cd ..\DotnetApp
dotnet build
dotnet run
```

## Notes

- Do not edit files inside `Database-Backup-20260908` unless the task is specifically database recovery.
- Build outputs like `bin`, `obj`, `node_modules`, Python caches, and logs are ignored.
- If native C++ work is needed later, install Visual Studio Desktop development with C++ and the latest MSVC toolset.
