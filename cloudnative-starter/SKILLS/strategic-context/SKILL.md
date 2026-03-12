---
name: strategic-context
description: Manage context window proactively by compacting at logical workflow boundaries rather than relying on arbitrary auto-compaction.
user-invocable: false
---

# Strategic Context Management

Manage your agent's context window proactively by compacting at strategic points in your workflow rather than relying on arbitrary auto-compaction.

## Why Strategic Context Management?

Auto-compaction triggers at arbitrary points:
- Often mid-task, losing important context
- No awareness of logical task boundaries
- Can interrupt complex multi-step operations

Strategic compaction at logical boundaries:
- **After exploration, before execution** -- Compact research context, keep implementation plan
- **After completing a milestone** -- Fresh start for next phase
- **Before major context shifts** -- Clear exploration context before different task

## How It Works

The `suggest-compact.sh` script runs on pre-action hooks and:

1. **Tracks tool calls** -- Counts tool invocations in session
2. **Threshold detection** -- Suggests compaction at configurable threshold (default: 50 calls)
3. **Periodic reminders** -- Reminds every 25 calls after threshold

## Configuration

Environment variables:
- `COMPACT_THRESHOLD` -- Tool calls before first suggestion (default: 50)

## Best Practices

1. **Compact after planning** -- Once plan is finalized, compact to start fresh implementation
2. **Compact after debugging** -- Clear error-resolution context before continuing with other work
3. **Don't compact mid-implementation** -- Preserve context for related changes across files
4. **Read the suggestion** -- The hook tells you *when* context is getting large; you decide *if* compaction is appropriate

## When to Compact

Good times:
- After a long exploration/research phase, before writing code
- After completing a major feature, before starting the next
- After a debugging session that consumed significant context
- When the agent starts repeating itself or losing track of earlier context

Bad times:
- In the middle of implementing a multi-file change
- While debugging an issue (you need the error context)
- During a code review (you need the full diff context)

## Related Concepts

- Memory persistence hooks for state that should survive compaction
- Session notes for capturing key decisions before compaction
