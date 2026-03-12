---
name: plan
description: Restate requirements, assess risks, and create a step-by-step implementation plan. WAIT for user confirmation before touching any code.
user-invocable: true
---

# Plan

Create a comprehensive implementation plan before writing any code.

## Pre-conditions

- A feature request, architectural change, or complex refactoring task has been described
- The codebase is accessible for analysis

## Workflow

1. **Restate Requirements** -- Clarify what needs to be built in your own words
2. **Analyze Codebase** -- Review existing structure, identify affected components
3. **Identify Risks** -- Surface potential issues, blockers, and dependencies
4. **Create Step Plan** -- Break down implementation into phases with specific actions
5. **Wait for Confirmation** -- MUST receive user approval before proceeding to code

## Plan Format

```markdown
# Implementation Plan: [Feature Name]

## Requirements Restatement
[Clear summary of what will be built]

## Implementation Phases

### Phase 1: [Phase Name]
- Step 1: [Specific action] (File: path/to/file)
- Step 2: [Specific action] (File: path/to/file)

### Phase 2: [Phase Name]
...

## Dependencies
[External services, packages, APIs needed]

## Risks
- HIGH: [Description and mitigation]
- MEDIUM: [Description and mitigation]

## Estimated Complexity
[HIGH/MEDIUM/LOW with time estimate]

**WAITING FOR CONFIRMATION**: Proceed with this plan? (yes/no/modify)
```

## Expected Inputs

- Description of what needs to be built or changed
- Any constraints or preferences

## Expected Outputs

- Detailed implementation plan with phases and steps
- Risk assessment
- Complexity estimate
- Clear request for user confirmation

## Success Criteria

- [ ] Requirements restated accurately
- [ ] All affected files/components identified
- [ ] Risks surfaced with mitigations
- [ ] Steps are specific and actionable (include file paths)
- [ ] User confirmed plan before any code is written

## Key Principle

**CRITICAL**: The plan must be confirmed by the user BEFORE any code is written. If the user wants changes, revise the plan. Never skip the confirmation step.
