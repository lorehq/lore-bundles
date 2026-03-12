---
name: checkpoint
description: Create, verify, or list workflow checkpoints to track progress and enable safe rollback during complex tasks.
user-invocable: true
---

# Checkpoint

Create or verify a checkpoint in your workflow. Checkpoints provide save points during complex multi-step tasks, enabling comparison and safe rollback.

## Operations

### Create Checkpoint

1. Run a quick verification to ensure current state is clean (build passes, tests pass)
2. Create a git stash or commit with the checkpoint name
3. Log the checkpoint with timestamp and git SHA
4. Report checkpoint created

### Verify Checkpoint

Compare current state against a named checkpoint:

```
CHECKPOINT COMPARISON: $NAME
============================
Files changed: X
Tests: +Y passed / -Z failed
Coverage: +X% / -Y%
Build: [PASS/FAIL]
```

### List Checkpoints

Show all checkpoints with name, timestamp, git SHA, and status (current, behind, ahead).

## Workflow

Typical checkpoint flow for a feature:

```
[Start]      --> checkpoint create "feature-start"
[Implement]  --> checkpoint create "core-done"
[Test]       --> checkpoint verify "core-done"
[Refactor]   --> checkpoint create "refactor-done"
[PR]         --> checkpoint verify "feature-start"
```

## Pre-conditions

- Git repository initialized
- Working tree in a known state

## Success Criteria

- [ ] Checkpoint created with valid git reference
- [ ] Comparison shows accurate diff between states
- [ ] No data loss during checkpoint operations
