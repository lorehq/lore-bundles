---
name: e2e
description: Generate and run end-to-end tests with Playwright -- creates test journeys, runs tests, captures artifacts, and identifies flaky tests.
user-invocable: true
---

# E2E Testing

Generate, maintain, and execute end-to-end tests using Playwright.

## Pre-conditions

- Playwright is installed (`@playwright/test` in dependencies)
- A development server can be started (or is already running)
- Critical user journeys have been identified

## Workflow

1. **Analyze user flow** and identify test scenarios:
   - Happy path (everything works)
   - Edge cases (empty states, limits)
   - Error cases (network failures, validation)

2. **Generate Playwright tests** using Page Object Model pattern:
   - Create page objects for each page under test
   - Use `data-testid` attributes for selectors
   - Add meaningful test descriptions
   - Include assertions at key steps

3. **Run tests** across multiple browsers:
   ```bash
   npx playwright test
   npx playwright test --headed  # See browser
   npx playwright test --debug   # Debug mode
   ```

4. **Capture artifacts** on failure:
   - Screenshots of failing state
   - Video recording
   - Trace file for step-by-step replay

5. **Identify flaky tests**:
   - Run tests multiple times (`--repeat-each=10`)
   - Quarantine tests below 95% pass rate
   - Recommend fixes (race conditions, network timing, animation timing)

6. **Generate report**:
   ```
   E2E Test Results
   ================
   Total:   X tests
   Passed:  Y (Z%)
   Failed:  A
   Flaky:   B
   Duration: Xs
   ```

## Expected Inputs

- Description of user journey to test (e.g., "test the login and dashboard flow")

## Expected Outputs

- Playwright test files following POM pattern
- Test execution results with artifacts
- Flaky test analysis if applicable
- HTML report at `playwright-report/index.html`

## Success Criteria

- [ ] All critical journeys have tests
- [ ] Tests use stable selectors (data-testid, not CSS classes)
- [ ] Artifacts captured on failure
- [ ] No arbitrary `waitForTimeout` calls (use `waitForResponse` or `waitForSelector`)
- [ ] Pass rate > 95%

## Best Practices

- Use Page Object Model for maintainability
- Wait for API responses, not arbitrary timeouts
- Test critical user journeys end-to-end
- Run tests before merging to main
- Never run financial tests against production
