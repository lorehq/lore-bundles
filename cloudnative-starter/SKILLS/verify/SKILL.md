---
name: verify
description: Run comprehensive verification on current codebase state -- build, types, lint, tests, security scan, and git status.
user-invocable: true
---

# Verify

Run comprehensive verification on current codebase state.

## Pre-conditions

- Project has build, test, and lint commands configured
- Source files exist to verify

## Verification Phases (in order)

### 1. Build Check
- Run the build command for this project
- If it fails, report errors and STOP

### 2. Type Check
- Run TypeScript type checker or equivalent
- Report all errors with file:line

### 3. Lint Check
- Run linter
- Report warnings and errors

### 4. Test Suite
- Run all tests with coverage
- Report pass/fail count and coverage percentage

### 5. Security Scan
- Search for hardcoded secrets in source files
- Check for console.log/debug statements
- Run dependency audit if available

### 6. Git Status
- Show uncommitted changes
- Show files modified since last commit

## Output Format

```
VERIFICATION: [PASS/FAIL]

Build:    [OK/FAIL]
Types:    [OK/X errors]
Lint:     [OK/X issues]
Tests:    [X/Y passed, Z% coverage]
Secrets:  [OK/X found]
Logs:     [OK/X console.logs]

Ready for PR: [YES/NO]
```

If any critical issues, list them with fix suggestions.

## Modes

- **quick** -- Only build + types
- **full** -- All checks (default)
- **pre-commit** -- Checks relevant for commits (build, types, lint, secrets)
- **pre-pr** -- Full checks plus security scan

## Success Criteria

- [ ] Build passes
- [ ] No type errors
- [ ] No lint errors (warnings acceptable)
- [ ] Tests pass with 80%+ coverage
- [ ] No hardcoded secrets
- [ ] No debug statements in production code
