# CloudNative Starter

A comprehensive development workflow bundle that provides structured agents, skills, and rules for professional software engineering.

## Philosophy

- **Plan before you build.** Use the planner agent to break down complex work into phases with clear dependencies and risks before writing code.
- **Test before you implement.** Follow TDD rigorously: write failing tests first, implement minimally to pass, then refactor. Target 80% minimum coverage.
- **Review everything.** Every code change gets a code review and security review. Catch issues before they reach production.
- **Specialize agents.** Each agent has a clear role: architect designs, planner plans, tdd-guide tests, reviewer reviews. Use the right agent for the job.
- **Security is not optional.** Validate all input, parameterize all queries, never hardcode secrets, and review for OWASP Top 10 vulnerabilities.
- **Verify before shipping.** Run the full verification loop (build, types, lint, tests, security scan) before every PR.
- **Keep code clean.** Small files, small functions, immutable patterns, no dead code. Clean as you go.

## Workflow

The recommended development workflow follows this sequence:

1. **Plan** -- Analyze requirements, identify risks, create phased implementation plan
2. **Implement (TDD)** -- Write tests first, implement to pass, refactor
3. **Review** -- Code quality review, security review
4. **Verify** -- Build, types, lint, tests, coverage
5. **Commit** -- Conventional commits, comprehensive PR descriptions
