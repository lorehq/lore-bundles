---
name: project-guidelines
description: How to write effective project-specific guidelines that capture architecture, patterns, testing requirements, and deployment workflows.
user-invocable: false
---

# Writing Project Guidelines

This skill teaches you how to write effective project-specific guidelines that capture the unique patterns, conventions, and requirements of a specific codebase.

## When to Use

Create project guidelines when:
- Starting a new project that will have ongoing development
- Onboarding new team members or agents to an existing project
- A project has accumulated enough conventions that they need documentation

## What to Include

### 1. Architecture Overview

Document the tech stack and how services connect:

```markdown
## Architecture Overview

**Tech Stack:**
- **Frontend**: [Framework, language, styling]
- **Backend**: [Framework, language, ORM]
- **Database**: [Provider, type]
- **Deployment**: [Platform]
- **Testing**: [Frameworks by layer]

**Service Diagram:**
[ASCII diagram showing how frontend, backend, database, and external services connect]
```

### 2. File Structure

Map the directory layout with purpose annotations:

```markdown
## File Structure

project/
├── src/
│   ├── app/              # [Framework] router/pages
│   ├── components/       # React/UI components
│   │   ├── ui/           # Generic reusable UI
│   │   ├── forms/        # Form-specific components
│   │   └── layouts/      # Page layouts
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities and clients
│   ├── types/            # Type definitions
│   └── config/           # Configuration
├── tests/                # Test files
└── docs/                 # Documentation
```

### 3. Code Patterns

Document the project-specific patterns that differ from general best practices:

```markdown
## Code Patterns

### API Response Format
[Show the standard response shape with code example]

### Error Handling
[Show how errors are handled in this specific project]

### Data Fetching
[Show the project's data fetching pattern]

### AI Integration
[If applicable, show how AI/LLM calls are structured]
```

### 4. Testing Requirements

Specify which test types are required and how to run them:

```markdown
## Testing Requirements

### Running Tests
- Unit: `npm test`
- Integration: `npm run test:integration`
- E2E: `npm run test:e2e`
- Coverage: `npm run test -- --coverage`

### Coverage Requirements
- Minimum: 80% overall
- 100% for: [list critical modules]

### Test Patterns
[Show the project's preferred test structure: AAA, fixtures, mocks]
```

### 5. Deployment Workflow

Document the deployment process:

```markdown
## Deployment Workflow

### Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Build succeeds
- [ ] No hardcoded secrets
- [ ] Environment variables documented
- [ ] Database migrations ready

### Environment Variables
[List all required env vars with descriptions -- never include actual values]
```

### 6. Critical Rules

List the non-negotiable rules for this project:

```markdown
## Critical Rules

1. [Rule about immutability, mutation, etc.]
2. [Rule about test coverage]
3. [Rule about file size limits]
4. [Rule about error handling]
5. [Rule about logging]
```

## Best Practices for Writing Guidelines

1. **Be specific** -- Include actual file paths, function names, and code examples from the project
2. **Show, don't tell** -- Code examples are more useful than prose descriptions
3. **Keep it current** -- Update guidelines when patterns change
4. **Focus on differences** -- Don't repeat general best practices; document what's unique to this project
5. **Include the why** -- Explain why certain patterns were chosen
6. **Reference related skills** -- Point to general skills (coding-standards, backend-patterns, etc.) for universal guidance

## Template

Use this template as a starting point for your project's guidelines:

```markdown
# [Project Name] Guidelines

## Architecture Overview
[Tech stack and service diagram]

## File Structure
[Directory layout with annotations]

## Code Patterns
[Project-specific patterns with examples]

## Testing Requirements
[Test commands, coverage targets, patterns]

## Deployment Workflow
[Checklist, environment variables, commands]

## Critical Rules
[Non-negotiable project rules]

## Related Skills
- coding-standards -- General coding best practices
- backend-patterns -- API and database patterns
- frontend-patterns -- React and Next.js patterns
- tdd-workflow -- Test-driven development methodology
```
