# CloudNative Starter

Comprehensive development bundle providing structured agents, skills, and rules for professional software engineering workflows.

## Attribution

Adapted from [cloudnative-co/claude-code-starter-kit](https://github.com/cloudnative-co/claude-code-starter-kit) (MIT License).

## What's Included

- **8 rules** -- coding style, git workflow, testing, security, performance, patterns, agent orchestration, automation hooks
- **25 skills** -- 11 reference skills + 14 user-invocable workflow skills (converted from commands)
- **9 agents** -- architect, planner, tdd-guide, code-reviewer, security-reviewer, build-error-resolver, e2e-runner, refactor-cleaner, doc-updater
- **4 hooks** -- pre-tool-use (doc blocker, push review, destructive command guard), post-tool-use (console.log warning, auto-format, PR logging), pre-compact (auto-commit checkpoint), stop (debug logging reminder, uncommitted changes reminder)

## Changes from Original

### Format
- Converted to Lore bundle format (manifest.json, RULES/, SKILLS/, AGENTS/)
- Added YAML frontmatter with `description` to all rules (required by Lore)
- Added YAML frontmatter with `name`, `description`, `user-invocable` to skills converted from commands

### Removed
- `model: opus` from all agents (platform-specific, not portable)
- Installer infrastructure (setup.sh, wizard, profiles, i18n, lib)
- Claude Code memory files and settings configs
- Model selection guidance from performance rule (platform-specific)
- Hooks dropped as non-portable: auto-update (infrastructure), memory-persistence (Lore has its own), safety-net (required cc-safety-net binary — logic rewritten into pre-tool-use), statusline (Claude Code-specific), strategic-compact (/compact is Claude-specific), tmux-hooks (terminal-specific)

### Hooks Converted
- 12 Claude Code hooks (hooks.json format with tool matchers) merged into 4 Lore hook scripts (.mjs)
- Multiple hooks per event consolidated into single scripts with internal tool-name switching
- Bash inline scripts rewritten to Node.js ES modules
- `doc-blocker` + `git-push-review` + safety-net logic → `pre-tool-use.mjs`
- `console-log-guard` + `prettier-hooks` + `pr-creation-log` → `post-tool-use.mjs`
- `pre-compact-commit` → `pre-compact.mjs`
- `console-log-guard` (stop variant) + uncommitted changes check → `stop.mjs`

### Generalized
- Platform-specific path references (`~/.claude/agents/`, `~/.claude/commands/`) removed or made generic
- Slash command syntax (`/compact`, `/verify`) replaced with workflow descriptions
- References to Claude Code-specific features (settings.json hooks, TodoWrite) generalized

### Upgraded
- Commands converted to user-invocable skills with proper frontmatter and workflow descriptions
- Thin agent-wrapper commands (e2e, plan, tdd) expanded into proper skills with pre-conditions, inputs/outputs, and success criteria
- `project-guidelines-example` converted from filled-in example to a skill about HOW to write project guidelines
- `strategic-compact` rewritten as platform-agnostic `strategic-context` (manage context window proactively)

## License

MIT (same as original)
