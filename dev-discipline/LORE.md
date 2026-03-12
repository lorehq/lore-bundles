# Dev Discipline

Git workflow discipline for AI coding agents. Five skills that enforce commit hygiene, structured planning, work logging, end-of-session audits, and multi-agent coordination.

## Skills

- **dev-discipline** -- Core commit rules. One concern per commit, conventional messages with `why:` lines, test coverage for behavioral changes. Installs git hooks (pre-commit, commit-msg, post-commit) via `scripts/setup.sh`.
- **dev-diary** -- Automatic work log. The post-commit hook appends entries to `.dev/diary/`. This skill summarizes work, builds standup updates, and searches the diary.
- **dev-reconciliation** -- End-of-session audit. Reviews commits for atomicity violations, test gaps, doc staleness, and missing decision records. Produces a reconciliation report.
- **planner** -- Execution plan compliance. Ensures plans follow the Codex Exec Plans standard with all required sections. Includes validation scripts.
- **orchestrator** -- Multi-agent coordination contract. Defines branching strategy, agent identity, plan requirements, and merge protocol for parallel agent workstreams.

## Setup

Run `scripts/setup.sh` from the dev-discipline skill to install git hooks and bootstrap `.dev/` discipline files in your project.
