---
name: tdd
description: Enforce test-driven development -- scaffold interfaces, generate tests FIRST, then implement minimal code to pass. Ensure 80%+ coverage.
user-invocable: true
---

# TDD

Enforce test-driven development methodology for a specific feature or function.

## Pre-conditions

- A feature, function, or bug fix has been described
- Test framework is set up (Jest, Vitest, pytest, etc.)
- The codebase is accessible

## Workflow

1. **Scaffold Interfaces** -- Define types/interfaces for inputs and outputs
2. **Generate Tests First (RED)** -- Write failing tests that describe expected behavior
3. **Run Tests** -- Verify they fail for the right reason (not implemented yet, not syntax error)
4. **Implement Minimal Code (GREEN)** -- Write just enough code to make tests pass
5. **Run Tests** -- Verify they pass
6. **Refactor (IMPROVE)** -- Improve code quality while keeping tests green
7. **Verify Coverage** -- Ensure 80%+ test coverage

## TDD Cycle

```
RED -> GREEN -> REFACTOR -> REPEAT
```

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

**E2E Tests** (use the e2e skill for these):
- Critical user flows

## Coverage Requirements

- 80% minimum for all code
- 100% required for financial calculations, authentication logic, security-critical code, and core business logic

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

**MANDATORY**: Tests must be written BEFORE implementation. Never skip the RED phase. Never write code before tests.
