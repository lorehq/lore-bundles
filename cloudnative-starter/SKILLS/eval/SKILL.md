---
name: eval
description: Manage eval-driven development workflow -- define, check, and report on capability and regression evals for features.
user-invocable: true
---

# Eval Management

Manage eval-driven development workflow for features.

## Operations

### Define Evals

Create a new eval definition for a feature:

1. Create eval definition file with template:

```markdown
## EVAL: feature-name
Created: [date]

### Capability Evals
- [ ] [Description of capability 1]
- [ ] [Description of capability 2]

### Regression Evals
- [ ] [Existing behavior 1 still works]
- [ ] [Existing behavior 2 still works]

### Success Criteria
- pass@3 > 90% for capability evals
- pass^3 = 100% for regression evals
```

2. Prompt user to fill in specific criteria

### Check Evals

Run evals for a feature:

1. Read eval definition
2. For each capability eval: attempt to verify, record PASS/FAIL
3. For each regression eval: run relevant tests, compare against baseline
4. Report current status

### Report Evals

Generate comprehensive eval report:

```
EVAL REPORT: feature-name
=========================
Capability: X/Y passing
Regression: X/Y passing
pass@1: N%, pass@3: N%
Status: [SHIP / NEEDS WORK / BLOCKED]
```

### List Evals

Show all eval definitions with status.

## Pre-conditions

- Feature has been identified for eval tracking
- Success criteria can be defined concretely

## Success Criteria

- [ ] Evals defined BEFORE coding starts
- [ ] All capability evals passing before shipping
- [ ] All regression evals passing (no regressions)
- [ ] pass@3 > 90% for capabilities
