---
name: test-coverage
description: Analyze test coverage, identify files below 80% threshold, and generate missing tests to reach coverage targets.
user-invocable: true
---

# Test Coverage

Analyze test coverage and generate missing tests to reach the 80% target.

## Pre-conditions

- Test framework is set up with coverage support
- Some tests already exist

## Workflow

1. **Run tests with coverage:**
   ```bash
   npm test -- --coverage
   ```

2. **Analyze coverage report** (coverage/coverage-summary.json or equivalent)

3. **Identify files below 80% coverage threshold:**
   - Sort by coverage percentage (lowest first)
   - Group by module/directory

4. **For each under-covered file:**
   - Analyze untested code paths
   - Generate unit tests for uncovered functions
   - Generate integration tests for uncovered API endpoints
   - Generate E2E tests for uncovered critical flows

5. **Verify new tests pass**

6. **Show before/after coverage metrics:**
   ```
   COVERAGE REPORT
   ===============
   Before: X% overall (Y files below threshold)
   After:  X% overall (Y files below threshold)

   Improved files:
   - src/utils/helpers.ts: 45% -> 85%
   - src/api/markets.ts: 60% -> 90%
   ```

7. **Ensure project reaches 80%+ overall coverage**

## Expected Inputs

- A project with partial test coverage

## Expected Outputs

- New test files for under-covered code
- Updated coverage report showing improvement
- All new tests passing

## Test Focus Areas

- Happy path scenarios
- Error handling paths
- Edge cases (null, undefined, empty)
- Boundary conditions (min/max values)

## Success Criteria

- [ ] Overall coverage >= 80%
- [ ] No file below 60% coverage
- [ ] All new tests pass
- [ ] No existing tests broken
