# Maestro Bundle

A Lore bundle adapted from [ReinaMacCredy/maestro](https://github.com/ReinaMacCredy/maestro).

## What's Included

- **10 agents** for orchestration, TDD, quick fixes, plan review, strategic advice, security review, progress reporting, and wisdom synthesis
- **71 skills** covering orchestration workflows, language patterns (Go, Python, Swift, TypeScript, C++, Java, Django, Spring Boot), testing, security, infrastructure, frontend, API design, content creation, AI/ML, and meta-development tools
- **29 rules** organized as 9 common rules plus 5 language-specific rules each for Go, Python, Swift, and TypeScript
- **12 hooks** across 7 events: orchestration safety guards (pre-tool-use), enrichment and trace logging (post-tool-use), keyword mode detection (prompt-submit), context injection (session-start, subagent-start, pre-compact), worker persistence (stop)

## Changes From Source

- Directory names stripped of `maestro:` prefix (e.g., `maestro:design` became `design`)
- `maestro:AGENTS.md` skill renamed to `agents-guide`
- Rules flattened from nested language directories into a single `RULES/` directory with language prefixes
- Source `paths:` frontmatter field converted to Lore `globs:` field
- Claude-specific frontmatter fields (`lifecycle`, `domain`) removed; `argument-hint` preserved as pass-through; Lore-standard `user-invocable: true` added
- All 10 agents added with full frontmatter preserved (`phase`, `model`, `disallowedTools`, `tools` as YAML list)
- References to `maestro:` prefixed skill names updated to unprefixed names throughout skill bodies
- All 12 maestro-specific hook scripts converted from bash to Node.js ES modules (.mjs) and generalized for cross-platform use; 8 ECC (Enhanced Code Companion) hooks excluded as generic quality gates with their own config system
- Source infrastructure files (PRECEDENCE.md, README.md, install.sh, CHANGELOG.md, evals/, templates/) not included

## License

MIT License -- Copyright (c) 2025 Reina MacCredy. See the original repository for the full license text.
