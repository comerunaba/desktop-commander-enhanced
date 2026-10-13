# Local MCP Deployment Runbook

## Source of truth

- Repository: `E:\\AI TEAM\\desktop commander local`
- Git remote: `https://github.com/comerunaba/desktop-commander-local.git`
- Upstream remote: `https://github.com/wonderwhy-er/DesktopCommanderMCP.git`
- Package version: `0.2.52`
- Baseline tag: `upstream-v0.2.52-baseline`

## Live tunnel

The verified live process chain is:

```text
tunnel-client.exe run --profile desktop-commander
  -> node E:/AI TEAM/desktop commander local/dist/index.js
```

- Tunnel executable: `C:\\Users\\kamran\\AppData\\Local\\OpenAI\\tunnel-client\\tunnel-client.exe`
- Tunnel profile: `desktop-commander`
- The live MCP must launch from this repository's `dist/index.js`, never an old C: checkout or an npx cache.

## Build

From PowerShell:

```powershell
Set-Location 'E:\\AI TEAM\\desktop commander local'
npm ci
npm run build
```

## Start/restart

The tunnel service owns the live process. After a build, restart the tunnel profile:

```powershell
tunnel-client.exe run --profile desktop-commander
```
## Verify the live checkout

Use PowerShell to inspect the running process:

```powershell
Get-CimInstance Win32_Process |
  Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match 'desktop commander local' } |
  Select-Object ProcessId,ParentProcessId,CommandLine
```

Expected command line:

```text
node "E:/AI TEAM/desktop commander local/dist/index.js"
```

## Update from upstream

Review upstream changes first, then merge deliberately:

```powershell
Set-Location 'E:\\AI TEAM\\desktop commander local'
git fetch upstream --tags
git log --oneline --decorate HEAD..upstream/main
git diff --stat HEAD..upstream/main
```

Do not overwrite local work. Create a review branch or merge only after tests pass.

## Validation and release

```powershell
npm run build
npm test
git status --short
```

Commit only after validation, then push `main` and required tags to `origin`.
