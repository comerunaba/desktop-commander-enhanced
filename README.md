# Desktop Commander Enhanced

A clean, independent reliability-focused version of Desktop Commander MCP.

## Original project

This project is based on the open-source [wonderwhy-er/DesktopCommanderMCP repository](https://github.com/wonderwhy-er/DesktopCommanderMCP).

For the original project documentation and full feature guide, see the [upstream README](https://github.com/wonderwhy-er/DesktopCommanderMCP#readme).

This repository is not an official upstream release. It keeps the upstream functionality while documenting and including the focused fixes listed below.

## Why choose this version?

This version is for users who want the Desktop Commander functionality with targeted reliability improvements for Windows file operations, search memory use, configuration saves, and compatible dependencies.

## Changes from upstream

| Area | Problem addressed | Change | File location |
| --- | --- | --- | --- |
| Windows file reads | Paginated reads could retain open streams longer than necessary | Releases read streams after pagination completes | [src/utils/files/text.ts](src/utils/files/text.ts) |
| Search memory | Large searches could retain excessive output in memory | Bounds retained search output while preserving progressive results | [src/search-manager.ts](src/search-manager.ts) |
| Windows configuration | Transient file locks could cause rename failures | Retries transient Windows rename errors with bounded backoff | [src/config-manager.ts](src/config-manager.ts) |
| PDF compatibility | PDF image extraction needed a compatible dependency update | Refreshes the compatible dependency implementation | [src/tools/pdf/extract-images.ts](src/tools/pdf/extract-images.ts) |
| Dependency maintenance | Dependency versions required maintenance | Refreshes the lockfile and compatible dependency versions | [package-lock.json](package-lock.json) |

## Where to find the complete record

- [Upstream problems and improvements](docs/UPSTREAM_PROBLEMS_AND_IMPROVEMENTS.md)
- [Upstream repository](https://github.com/wonderwhy-er/DesktopCommanderMCP)
- [Upstream README](https://github.com/wonderwhy-er/DesktopCommanderMCP#readme)

The Git history also contains the individual implementation commits. Open a commit and select **Files changed** to inspect the exact line-by-line changes.

## Verification

The clean review snapshot passed the Windows full test suite: 70 test modules completed with exit code 0.

The filesystem workflow was also verified through real create, read, edit, verify, and delete operations.

## Installation and usage

Use the original project’s feature and client documentation as a reference, but review this repository’s code and package metadata before deploying it.

For local development:

```bash
npm ci
npm run build
npm test
```

## Contribution model

Other developers may fork this repository and submit pull requests. The official `main` branch remains owner-controlled.

## License

MIT
