# Product development plan

Each round completes one feature or repair. Future items are planned, not implemented claims.

## Current round

copilot-mode-gating

## Roadmap

### windows-project-name-fix — Fix Windows project name extraction (issue #1191)

Status: done

Acceptance:
- Project name extraction works correctly on Windows paths with backslashes
- Single ledger file per project on Windows
- Band and import script produce consistent project names

Implementation: `hooks/band/register.tsx`

Tests: `tests/band-windows-path.test.js`

### compact-mode-wrap-fix — Fix compact mode wrapping in desktop app (issue #1183)

Status: done

Acceptance:
- Compact mode stays on one line in Claude Code desktop app
- No empty spacer Box causing line breaks

Implementation: `hooks/band/register.tsx`

Tests: `tests/band-compact-mode.test.js`

### gitattributes-lf — Add .gitattributes for LF line endings (issue #1150)

Status: done

Acceptance:
- All text files checked out with LF on Windows
- No CRLF files in fresh checkout
- git status clean after build scripts

Implementation: `.gitattributes`

### windows-ci-matrix — Add Windows CI matrix (issue #1142)

Status: done

Acceptance:
- Tests run on both ubuntu-latest and windows-latest
- Windows-only breakages caught in CI

Implementation: `.github/workflows/test.yml`

### undocumented-settings-docs — Document undocumented settings (issue #1141)

Status: done

Acceptance:
- /ponytail default documented in help card and INSTALL.md
- PONYTAIL_HIDE_STATUS and PONYTAIL_QUIET_STARTUP documented for pi
- PONYTAIL_MAP and PONYTAIL_MAP_CHARS documented

Implementation: `skills/ponytail/SKILL.md`, `INSTALL.md`, `AGENTS.md`

### copilot-mode-gating — Gate mid-session mode commands for Copilot (issue #1133)

Status: done

Acceptance:
- Copilot help accurately describes when mode changes take effect
- Mode-file changes not treated as proof of active-session change
- SessionStart behavior preserved

Implementation: `hooks/ponytail-runtime.js`, `hooks/ponytail-mode-tracker.js`, `hooks/copilot-hooks.json`, `skills/ponytail/SKILL.md`

Tests: `tests/copilot-mode-gating.test.js`

