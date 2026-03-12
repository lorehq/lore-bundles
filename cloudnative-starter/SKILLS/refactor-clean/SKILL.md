---
name: refactor-clean
description: Safely identify and remove dead code with test verification before and after each deletion.
user-invocable: true
---

# Refactor Clean

Safely identify and remove dead code with test verification.

## Pre-conditions

- Project has a test suite
- Build is currently passing
- Tests are currently passing

## Workflow

1. **Run dead code analysis tools:**
   - knip: Find unused exports and files
   - depcheck: Find unused dependencies
   - ts-prune: Find unused TypeScript exports

2. **Generate comprehensive report** categorizing findings by severity:
   - SAFE: Test files, unused utilities, unused dependencies
   - CAUTION: API routes, components (could be dynamically imported)
   - DANGER: Config files, main entry points (likely still needed)

3. **Propose safe deletions only** -- never delete CAUTION or DANGER items without explicit user approval

4. **Before each deletion:**
   - Run full test suite and verify passing
   - Apply the change
   - Re-run tests
   - Rollback if tests fail

5. **Show summary** of cleaned items with before/after metrics

## Expected Inputs

- A codebase with potential dead code

## Expected Outputs

- List of deleted files/exports/dependencies
- Before/after bundle size comparison
- Passing test suite after cleanup

## Success Criteria

- [ ] All tests still passing after cleanup
- [ ] Build still succeeds
- [ ] No functionality broken
- [ ] DELETION_LOG.md updated with what was removed and why

## Key Principle

Never delete code without running tests first. When in doubt, don't remove it.
