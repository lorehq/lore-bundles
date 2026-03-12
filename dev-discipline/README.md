# Dev Discipline (Lore Bundle)

A Lore bundle converted from [hunterassembly/dev-discipline](https://github.com/hunterassembly/dev-discipline), licensed under MIT.

## What's Included

Five skills with supporting scripts, templates, and assets:

| Skill | Purpose |
|-------|---------|
| `dev-discipline` | Core commit discipline -- git hooks, conventional commits, one-concern-per-commit enforcement |
| `dev-diary` | Automatic commit diary maintained by post-commit hook, with summarization and standup generation |
| `dev-reconciliation` | End-of-session audit -- commit atomicity, test gaps, doc staleness, decision logging |
| `planner` | Execution plan compliance with the Codex Exec Plans standard |
| `orchestrator` | Multi-agent coordination -- branching, identity, merge gates |

### Supporting files

- **scripts/** -- setup.sh, teardown.sh, health-check.sh, doc-gardener.sh, committer, validation scripts, and more
- **templates/** -- decision records, standup updates, reconciliation reports, execution plans, architecture docs
- **assets/** -- git hooks (pre-commit, commit-msg, post-commit), discipline contract, env example

## What Changed From Source

- Skills moved from `skills/` to `SKILLS/` (Lore convention)
- YAML frontmatter updated: removed `license` and `metadata` fields, added `user-invocable: true`
- Removed source-project-specific path references (`.agents/skills/...`, `.agent/PLANS.md`) from SKILL.md bodies
- Added `manifest.json`, `LORE.md`, and this `README.md` for Lore bundle compatibility
- All scripts, templates, and assets copied verbatim -- no behavioral changes

## License

MIT -- see the original repository for full license text.
