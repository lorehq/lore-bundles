---
name: code-review
description: Run a comprehensive security and quality review of uncommitted changes, organized by severity.
user-invocable: true
---

# Code Review

Comprehensive security and quality review of uncommitted changes.

## Pre-conditions

- There are uncommitted changes in the working tree (git diff shows changes)
- The codebase is in a buildable state

## Workflow

1. **Get changed files**: `git diff --name-only HEAD`

2. **For each changed file, check for:**

   **Security Issues (CRITICAL):**
   - Hardcoded credentials, API keys, tokens
   - SQL injection vulnerabilities
   - XSS vulnerabilities
   - Missing input validation
   - Insecure dependencies
   - Path traversal risks

   **Code Quality (HIGH):**
   - Functions > 50 lines
   - Files > 800 lines
   - Nesting depth > 4 levels
   - Missing error handling
   - console.log statements
   - TODO/FIXME comments
   - Missing JSDoc for public APIs

   **Best Practices (MEDIUM):**
   - Mutation patterns (use immutable instead)
   - Missing tests for new code
   - Accessibility issues (a11y)

3. **Generate report** with severity, file location, line numbers, issue description, and suggested fix

4. **Block commit** if CRITICAL or HIGH issues found

## Expected Outputs

- Severity-organized report of all issues found
- Specific file:line references for each issue
- Concrete fix suggestions for each issue
- APPROVE / BLOCK recommendation

## Success Criteria

- [ ] All changed files reviewed
- [ ] No CRITICAL issues remain unaddressed
- [ ] Security checklist verified
- [ ] Code quality standards met

Never approve code with security vulnerabilities.
