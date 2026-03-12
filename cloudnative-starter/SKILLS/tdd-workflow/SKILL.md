---
name: tdd-workflow
description: Use this skill when writing new features, fixing bugs, or refactoring code. Enforces test-driven development with 80%+ coverage including unit, integration, and E2E tests.
user-invocable: false
---

# Test-Driven Development Workflow

This skill ensures all code development follows TDD principles with comprehensive test coverage.

## When to Activate

- Writing new features or functionality
- Fixing bugs or issues
- Refactoring existing code
- Adding API endpoints
- Creating new components

## Core Principles

### 1. Tests BEFORE Code
ALWAYS write tests first, then implement code to make tests pass.

### 2. Coverage Requirements
- Minimum 80% coverage (unit + integration + E2E)
- All edge cases covered
- Error scenarios tested
- Boundary conditions verified

### 3. Test Types

#### Unit Tests
- Individual functions and utilities
- Component logic
- Pure functions

#### Integration Tests
- API endpoints
- Database operations
- Service interactions

#### E2E Tests (Playwright)
- Critical user flows
- Complete workflows
- UI interactions

## TDD Workflow Steps

### Step 1: Write User Journeys
```
As a [role], I want to [action], so that [benefit]
```

### Step 2: Generate Test Cases
```typescript
describe('Semantic Search', () => {
  it('returns relevant results for query', async () => { })
  it('handles empty query gracefully', async () => { })
  it('falls back when backend unavailable', async () => { })
  it('sorts results by similarity score', async () => { })
})
```

### Step 3: Run Tests (They Should Fail)
### Step 4: Implement Code
### Step 5: Run Tests Again (They Should Pass)
### Step 6: Refactor
### Step 7: Verify Coverage (80%+)

## Testing Patterns

### Unit Test Pattern (AAA)
```typescript
test('calculates similarity correctly', () => {
  // Arrange
  const vector1 = [1, 0, 0]
  const vector2 = [0, 1, 0]
  // Act
  const similarity = calculateCosineSimilarity(vector1, vector2)
  // Assert
  expect(similarity).toBe(0)
})
```

### API Integration Test Pattern
```typescript
describe('GET /api/markets', () => {
  it('returns markets successfully', async () => {
    const request = new NextRequest('http://localhost/api/markets')
    const response = await GET(request)
    expect(response.status).toBe(200)
  })
})
```

## Common Testing Mistakes to Avoid

- Testing implementation details instead of behavior
- Tests depending on each other
- Brittle selectors (CSS classes instead of data-testid)
- No test isolation (shared mutable state)
- Arbitrary timeouts instead of waiting for conditions

## Best Practices

1. **Write Tests First** -- Always TDD
2. **One Assert Per Test** -- Focus on single behavior
3. **Descriptive Test Names** -- Explain what's tested
4. **Arrange-Act-Assert** -- Clear test structure
5. **Mock External Dependencies** -- Isolate unit tests
6. **Test Edge Cases** -- Null, undefined, empty, large
7. **Test Error Paths** -- Not just happy paths
8. **Keep Tests Fast** -- Unit tests < 50ms each
9. **Clean Up After Tests** -- No side effects
10. **Review Coverage Reports** -- Identify gaps

**Remember**: Tests are not optional. They are the safety net that enables confident refactoring, rapid development, and production reliability.
