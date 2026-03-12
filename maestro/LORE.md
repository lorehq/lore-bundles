# Maestro

Multi-agent orchestration system for autonomous feature development. Design specs, execute plans, review results -- with parallel worker agents and a persistent wisdom loop.

## How It Works

Maestro uses a `.maestro/` workspace directory to manage plans, track progress, and accumulate knowledge across sessions.

**Design phase:** `/new-track` or `/design` runs an interactive interview to produce a spec and phased implementation plan.

**Implementation phase:** `/implement` executes the plan. Single-agent mode (default) works sequentially. Team mode (`/implement --team`) spawns an orchestrator that delegates to parallel workers: **kraken** (TDD specialist), **spark** (quick fixes), **build-fixer** (compile errors). The orchestrator verifies every result and cannot edit files directly.

**Review phase:** `/review` runs post-implementation quality and security review.

## Wisdom Loop

Workers emit `<remember>` tags during execution. Hooks extract these into `.maestro/wisdom/` files. Next session, context hooks inject accumulated wisdom into the orchestrator and workers. Knowledge persists across sessions.

## Hooks

14 hooks enforce safety and continuity: the orchestrator is blocked from editing files, workers are blocked from editing plans, workers are kept running until tasks complete, and context is injected at session start, subagent spawn, and pre-compaction.

## Key Commands

`/setup` -- initialize project workspace | `/new-track` -- quick spec + plan | `/design` -- deep discovery | `/implement` -- execute (add `--team` for parallel) | `/review` -- quality + security review | `/note` -- priority context | `/status` -- progress report
