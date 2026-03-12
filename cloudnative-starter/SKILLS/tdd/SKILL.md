---
name: tdd
description: Enforce test-driven development -- scaffold interfaces, generate tests FIRST, then implement minimal code to pass. Ensure 80%+ coverage.
user-invocable: true
---

# TDD

Enforce test-driven development methodology for a specific feature or function.

## What This Skill Does

1. **Scaffold Interfaces** - Define types/interfaces first
2. **Generate Tests First** - Write failing tests (RED)
3. **Implement Minimal Code** - Write just enough to pass (GREEN)
4. **Refactor** - Improve code while keeping tests green (REFACTOR)
5. **Verify Coverage** - Ensure 80%+ test coverage

## When to Use

- Implementing new features
- Adding new functions/components
- Fixing bugs (write test that reproduces bug first)
- Refactoring existing code
- Building critical business logic

## Pre-conditions

- A feature, function, or bug fix has been described
- Test framework is set up (Jest, Vitest, pytest, etc.)
- The codebase is accessible

## TDD Cycle

```
RED -> GREEN -> REFACTOR -> REPEAT

RED:      Write a failing test
GREEN:    Write minimal code to pass
REFACTOR: Improve code, keep tests passing
REPEAT:   Next feature/scenario
```

## Workflow

1. **Define interfaces** for inputs/outputs
2. **Write tests that will FAIL** (because code doesn't exist yet)
3. **Run tests** and verify they fail for the right reason
4. **Write minimal implementation** to make tests pass
5. **Run tests** and verify they pass
6. **Refactor** code while keeping tests green
7. **Check coverage** and add more tests if below 80%

See `references/tdd-example.md` for a full worked example showing the complete RED -> GREEN -> REFACTOR cycle with TypeScript code.

## Test Types to Include

**Unit Tests** (function-level):
- Happy path scenarios
- Edge cases (empty, null, max values)
- Error conditions
- Boundary values

**Integration Tests** (component-level):
- API endpoints
- Database operations
- External service calls
- React components with hooks

**E2E Tests** (use the e2e skill for these):
- Critical user flows
- Multi-step processes
- Full stack integration

## Coverage Requirements

- **80% minimum** for all code
- **100% required** for:
  - Financial calculations
  - Authentication logic
  - Security-critical code
  - Core business logic

## Best Practices

**DO:**
- Write the test FIRST, before any implementation
- Run tests and verify they FAIL before implementing
- Write minimal code to make tests pass
- Refactor only after tests are green
- Add edge cases and error scenarios
- Aim for 80%+ coverage (100% for critical code)

**DON'T:**
- Write implementation before tests
- Skip running tests after each change
- Write too much code at once
- Ignore failing tests
- Test implementation details (test behavior)
- Mock everything (prefer integration tests)

## Expected Inputs

- Description of what needs to be implemented (e.g., "a function to calculate market liquidity score")

## Expected Outputs

- Test files with comprehensive test cases
- Implementation that passes all tests
- Coverage report showing 80%+ coverage

## Success Criteria

- [ ] Tests written BEFORE implementation
- [ ] Tests fail initially (RED phase verified)
- [ ] Implementation is minimal (no over-engineering)
- [ ] All tests pass (GREEN phase verified)
- [ ] Code refactored without breaking tests
- [ ] Coverage >= 80%

## Key Principle

**MANDATORY**: Tests must be written BEFORE implementation. The TDD cycle is:

1. **RED** - Write failing test
2. **GREEN** - Implement to pass
3. **REFACTOR** - Improve code

Never skip the RED phase. Never write code before tests.
