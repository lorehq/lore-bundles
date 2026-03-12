---
name: e2e
description: Generate and run end-to-end tests with Playwright -- creates test journeys, runs tests, captures artifacts, and identifies flaky tests.
user-invocable: true
---

# E2E Testing

Generate, maintain, and execute end-to-end tests using Playwright.

## What This Skill Does

1. **Generate Test Journeys** - Create Playwright tests for user flows
2. **Run E2E Tests** - Execute tests across browsers
3. **Capture Artifacts** - Screenshots, videos, traces on failures
4. **Upload Results** - HTML reports and JUnit XML
5. **Identify Flaky Tests** - Quarantine unstable tests

## When to Use

- Testing critical user journeys (login, trading, payments)
- Verifying multi-step flows work end-to-end
- Testing UI interactions and navigation
- Validating integration between frontend and backend
- Preparing for production deployment

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

3. **Run tests** across multiple browsers (Chrome, Firefox, Safari):
   ```bash
   npx playwright test
   npx playwright test --headed  # See browser
   npx playwright test --debug   # Debug mode
   ```

4. **Capture artifacts** on failure:
   - Screenshots of failing state
   - Video recording
   - Trace file for step-by-step replay
   - Network and console logs

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

See `references/playwright-example.md` for a full worked example including generated test code, Page Object Model usage, test execution output, and report format.

## Test Artifacts

When tests run, the following artifacts are captured:

**On All Tests:**
- HTML Report with timeline and results
- JUnit XML for CI integration

**On Failure Only:**
- Screenshot of the failing state
- Video recording of the test
- Trace file for debugging (step-by-step replay)
- Network logs
- Console logs

### Viewing Artifacts

```bash
# View HTML report in browser
npx playwright show-report

# View specific trace file
npx playwright show-trace artifacts/trace-abc123.zip

# Screenshots are saved in artifacts/ directory
open artifacts/search-results.png
```

## Flaky Test Detection

If a test fails intermittently:

```
FLAKY TEST DETECTED: tests/e2e/markets/trade.spec.ts

Test passed 7/10 runs (70% pass rate)

Common failure:
"Timeout waiting for element '[data-testid="confirm-btn"]'"

Recommended fixes:
1. Add explicit wait: await page.waitForSelector('[data-testid="confirm-btn"]')
2. Increase timeout: { timeout: 10000 }
3. Check for race conditions in component
4. Verify element is not hidden by animation

Quarantine recommendation: Mark as test.fixme() until fixed
```

## Browser Configuration

Tests run on multiple browsers by default:
- Chromium (Desktop Chrome)
- Firefox (Desktop)
- WebKit (Desktop Safari)
- Mobile Chrome (optional)

Configure in `playwright.config.ts` to adjust browsers.

## CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/e2e.yml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npx playwright test

- name: Upload artifacts
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Best Practices

**DO:**
- Use Page Object Model for maintainability
- Use data-testid attributes for selectors
- Wait for API responses, not arbitrary timeouts
- Test critical user journeys end-to-end
- Run tests before merging to main
- Review artifacts when tests fail

**DON'T:**
- Use brittle selectors (CSS classes can change)
- Test implementation details
- Run tests against production
- Ignore flaky tests
- Skip artifact review on failures
- Test every edge case with E2E (use unit tests)

## Important Notes

**CRITICAL for financial/trading apps:**
- E2E tests involving real money MUST run on testnet/staging only
- Never run trading tests against production
- Set `test.skip(process.env.NODE_ENV === 'production')` for financial tests
- Use test wallets with small test funds only

## Quick Commands

```bash
# Run all E2E tests
npx playwright test

# Run specific test file
npx playwright test tests/e2e/markets/search.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Debug test
npx playwright test --debug

# Generate test code
npx playwright codegen http://localhost:3000

# View report
npx playwright show-report
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
