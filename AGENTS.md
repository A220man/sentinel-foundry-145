# Ponytail — AGENTS.md

Makes your AI agent think like the laziest senior dev in the room. The best code is the code you never wrote.

## Commands

| Command | What it does |
|---------|--------------|
| `/ponytail [lite \| full \| ultra \| off]` | Set the intensity, or turn it off. No argument switches ponytail on at the default level if it is off, and otherwise reports the current level. |
| `/ponytail default <level>` | Set the default mode that activates on session start. Persists across sessions. |
| `/ponytail band [on \| off]` | Claude Code only: hide or show the band above the prompt. No argument switches it. The level stays. |

## Settings

### Default Mode
Set the default intensity level that activates on session start:
```
/ponytail default lite
/ponytail default full
/ponytail default ultra
```
This writes `defaultMode` to the config file and persists across sessions. Works in Claude Code, Codex, Copilot CLI, Cursor, OpenCode, Qoder, and pi.

### Pi Settings
In pi, these environment variables or config options are available:
- `PONYTAIL_HIDE_STATUS=1` (or `"hideStatus": true`) — hides the status-bar indicator
- `PONYTAIL_QUIET_STARTUP=1` (or `"quietStartup": true`) — drops the "Ponytail loaded" notice

### Codebase Map
Claude Code, Codex, Copilot CLI, and Cursor add a codebase map at session start:
- `PONYTAIL_MAP=0` — turns off the codebase map
- `PONYTAIL_MAP_CHARS` — sets the map size in characters (default: 2000)

## How It Works

The ladder runs *after* it understands the problem, not instead of it: it reads the code the change touches and traces the real flow before picking a rung. Lazy about the solution, never about reading.

Lazy, not negligent: trust-boundary validation, data-loss handling, security, and accessibility are never on the chopping block.

Logic with a branch, a loop, a parser, money or security leaves one small test behind. Every reply ends with what was skipped or not checked and any risk you should know.
