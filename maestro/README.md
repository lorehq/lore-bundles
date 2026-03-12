# Maestro Bundle

A Lore bundle adapted from [ReinaMacCredy/maestro](https://github.com/ReinaMacCredy/maestro).

## What's Included

- **71 skills** covering orchestration workflows, language patterns (Go, Python, Swift, TypeScript, C++, Java, Django, Spring Boot), testing, security, infrastructure, frontend, API design, content creation, AI/ML, and meta-development tools
- **29 rules** organized as 9 common rules plus 5 language-specific rules each for Go, Python, Swift, and TypeScript
- **2 hooks** for orchestration safety (pre-tool-use) and verification reminders (post-tool-use)

## Changes From Source

- Directory names stripped of `maestro:` prefix (e.g., `maestro:design` became `design`)
- `maestro:AGENTS.md` skill renamed to `agents-guide`
- Rules flattened from nested language directories into a single `RULES/` directory with language prefixes
- Source `paths:` frontmatter field converted to Lore `globs:` field
- Claude-specific frontmatter fields (`lifecycle`, `domain`, `argument-hint`) removed; Lore-standard `user-invocable: true` added
- References to `maestro:` prefixed skill names updated to unprefixed names throughout skill bodies
- Hook scripts converted from bash to Node.js ES modules (.mjs) and generalized for cross-platform use
- Source infrastructure files (PRECEDENCE.md, README.md, install.sh, CHANGELOG.md, evals/, templates/) not included

## License

MIT License -- Copyright (c) 2025 Reina MacCredy. See the original repository for the full license text.
