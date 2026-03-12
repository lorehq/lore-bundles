---
description: Automation hooks for pre/post validation, code quality gates, and workflow automation
---

# Automation Hooks

## Hook Types

- **Pre-action hooks**: Validate before tool execution (parameter checks, safety gates)
- **Post-action hooks**: Run after tool execution (auto-format, lint, type-check)
- **Session-end hooks**: Final verification when a session ends (audit, cleanup)

## Pre-Action Patterns

Use pre-action hooks to:
- Suggest tmux or background execution for long-running commands (npm, cargo, etc.)
- Gate destructive operations (review before push, confirm before delete)
- Block creation of unnecessary files

## Post-Action Patterns

Use post-action hooks to:
- Auto-format code after edits (Prettier, gofmt, black)
- Run type-checker after editing typed files
- Warn about console.log/print statements in edited files
- Log PR URLs and CI status after PR creation

## Session-End Patterns

Use session-end hooks to:
- Audit all modified files for debug statements
- Run a final verification pass
- Extract learnable patterns from the session

## Task Tracking Best Practices

Use task/todo tracking to:
- Track progress on multi-step tasks
- Verify understanding of instructions
- Enable real-time steering
- Show granular implementation steps

A visible task list reveals:
- Out of order steps
- Missing items
- Extra unnecessary items
- Wrong granularity
- Misinterpreted requirements

## Auto-Accept Permissions

Use with caution:
- Enable for trusted, well-defined plans
- Disable for exploratory work
- Never skip permission checks entirely
- Configure allowed tools explicitly
