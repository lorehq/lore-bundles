---
name: orchestrate
description: Run a sequential agent workflow for complex tasks -- chains planner, tdd-guide, code-reviewer, and security-reviewer with structured handoffs.
user-invocable: true
---

# Orchestrate

Sequential agent workflow for complex tasks. Chains multiple specialized agents together with structured handoffs between each phase.

## Workflow Types

### Feature
Full feature implementation workflow:
```
planner -> tdd-guide -> code-reviewer -> security-reviewer
```

### Bugfix
Bug investigation and fix workflow:
```
explorer -> tdd-guide -> code-reviewer
```

### Refactor
Safe refactoring workflow:
```
architect -> code-reviewer -> tdd-guide
```

### Security
Security-focused review:
```
security-reviewer -> code-reviewer -> architect
```

## Execution Pattern

For each agent in the workflow:

1. **Invoke agent** with context from previous agent
2. **Collect output** as structured handoff document
3. **Pass to next agent** in chain
4. **Aggregate results** into final report

## Handoff Document Format

Between agents, create a handoff document:

```markdown
## HANDOFF: [previous-agent] -> [next-agent]

### Context
[Summary of what was done]

### Findings
[Key discoveries or decisions]

### Files Modified
[List of files touched]

### Open Questions
[Unresolved items for next agent]

### Recommendations
[Suggested next steps]
```

## Example: Feature Workflow

Invoke with: `orchestrate feature "Add user authentication"`

Executes:

1. **Planner Agent**
   - Analyzes requirements
   - Creates implementation plan
   - Identifies dependencies
   - Output: `HANDOFF: planner -> tdd-guide`

2. **TDD Guide Agent**
   - Reads planner handoff
   - Writes tests first
   - Implements to pass tests
   - Output: `HANDOFF: tdd-guide -> code-reviewer`

3. **Code Reviewer Agent**
   - Reviews implementation
   - Checks for issues
   - Suggests improvements
   - Output: `HANDOFF: code-reviewer -> security-reviewer`

4. **Security Reviewer Agent**
   - Security audit
   - Vulnerability check
   - Final approval
   - Output: Final Report

## Final Report Format

```
ORCHESTRATION REPORT
====================
Workflow: [type]
Task: [description]
Agents: [sequence]

SUMMARY
-------
[One paragraph summary]

AGENT OUTPUTS
-------------
Planner: [summary]
TDD Guide: [summary]
Code Reviewer: [summary]
Security Reviewer: [summary]

FILES CHANGED
-------------
[List all files modified]

TEST RESULTS
------------
[Test pass/fail summary]

SECURITY STATUS
---------------
[Security findings]

RECOMMENDATION
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## Parallel Execution

For independent checks, run agents in parallel:

```markdown
### Parallel Phase
Run simultaneously:
- code-reviewer (quality)
- security-reviewer (security)
- architect (design)

### Merge Results
Combine outputs into single report
```

## Custom Workflow

You can specify a custom agent sequence:

```
orchestrate custom "architect,tdd-guide,code-reviewer" "Redesign caching layer"
```

## Pre-conditions

- Task description is clear and specific
- Relevant codebase files are accessible

## Expected Inputs

- Workflow type: `feature`, `bugfix`, `refactor`, `security`, or `custom`
- Task description
- For custom: comma-separated agent list

## Expected Outputs

- Handoff documents between each phase
- Final orchestration report with aggregated findings
- Recommendation (SHIP / NEEDS WORK / BLOCKED)

## Success Criteria

- [ ] All agents in chain executed successfully
- [ ] Handoff documents created between each phase
- [ ] Final report aggregates all findings
- [ ] No CRITICAL issues remain unresolved

## Tips

1. **Start with planner** for complex features
2. **Always include code-reviewer** before merge
3. **Use security-reviewer** for auth/payment/PII
4. **Keep handoffs concise** -- focus on what the next agent needs
5. **Run verification** between agents if needed
