# Install Ponytail

## Claude Code

```
/plugin marketplace add DietrichGebert/ponytail
```
```
/plugin install ponytail@ponytail
```

## Codex

```bash
codex plugin marketplace add DietrichGebert/ponytail
codex plugin add ponytail@ponytail
```

Then open `/hooks` in Codex, trust its two lifecycle hooks, and start a new thread.

## Any Other Agent

Copy [`AGENTS.md`](AGENTS.md) into your project, or ask your agent to install [`skills/ponytail/SKILL.md`](skills/ponytail/SKILL.md) as a skill.

Step by step for Copilot, Cursor, OpenCode, Gemini and the rest.

## Pi Extension

Install the pi extension:

```bash
pi extension add DietrichGebert/ponytail
```

### Pi Settings

The pi extension supports these settings (set via environment variables or in pi's config):

| Setting | Env Var | Config Key | Description |
|---------|---------|------------|-------------|
| Hide Status | `PONYTAIL_HIDE_STATUS=1` | `hideStatus: true` | Hides the status-bar indicator |
| Quiet Startup | `PONYTAIL_QUIET_STARTUP=1` | `quietStartup: true` | Drops the "Ponytail loaded" notice at startup |
| Default Mode | — | `defaultMode: "lite\|full\|ultra"` | Sets the default intensity level |

## Codebase Map

Claude Code, Codex, Copilot CLI, and Cursor add a codebase map at session start. Configure it with:

| Setting | Env Var | Default | Description |
|---------|---------|---------|-------------|
| Enable Map | `PONYTAIL_MAP=1` | `1` (enabled) | Set to `0` to disable the codebase map |
| Map Size | `PONYTAIL_MAP_CHARS` | `2000` | Number of characters in the codebase map |

## Commands

Once installed, use these commands in your agent:

| Command | What it does |
|---------|--------------|
| `/ponytail [lite \| full \| ultra \| off]` | Set the intensity, or turn it off |
| `/ponytail default <level>` | Set the default mode that activates on session start (persists across sessions) |
| `/ponytail band [on \| off]` | Claude Code only: hide or show the band above the prompt |

Only install ponytail from `DietrichGebert/ponytail` on GitHub or `@dietrichgebert/ponytail` on npm. It never ships `.exe` or `.dll` files; a copy that does is not mine.
