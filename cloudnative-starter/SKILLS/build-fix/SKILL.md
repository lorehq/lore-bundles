---
name: build-fix
description: Incrementally fix TypeScript and build errors one at a time, verifying after each fix.
user-invocable: true
---

# Build and Fix

Incrementally fix TypeScript and build errors with verification after each change.

## Pre-conditions

- Project has a build command (npm run build, pnpm build, etc.)
- TypeScript or other compiled language is in use
- Build is currently failing

## Workflow

1. **Run build** and capture full error output

2. **Parse error output:**
   - Group errors by file
   - Sort by severity (blocking first)

3. **For each error:**
   - Show error context (5 lines before/after)
   - Explain the root cause
   - Propose minimal fix
   - Apply fix
   - Re-run build
   - Verify error resolved and no new errors introduced

4. **Stop if:**
   - Fix introduces new errors (rollback and try different approach)
   - Same error persists after 3 attempts (escalate to user)
   - User requests pause

5. **Show summary:**
   - Errors fixed (count and list)
   - Errors remaining
   - New errors introduced (should be 0)

## Expected Inputs

- A failing build (the skill will run the build command to discover errors)

## Expected Outputs

- A passing build
- Minimal diff (only lines necessary to fix errors were changed)
- No architectural changes, no refactoring, no feature additions

## Success Criteria

- [ ] Build passes (exit code 0)
- [ ] No new errors introduced
- [ ] Minimal lines changed per fix
- [ ] Tests still pass after fixes

## Key Principle

Fix one error at a time for safety. Never batch fixes without verifying between each one.
