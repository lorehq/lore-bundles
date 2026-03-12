---
name: update-codemaps
description: Analyze codebase structure and update architecture documentation (codemaps) with current imports, exports, and dependencies.
user-invocable: true
---

# Update Codemaps

Analyze the codebase structure and update architecture documentation.

## Pre-conditions

- Source files exist to analyze
- Previous codemaps may or may not exist

## Workflow

1. **Scan all source files** for imports, exports, and dependencies

2. **Generate token-lean codemaps:**
   - architecture.md -- Overall architecture and service relationships
   - backend.md -- Backend structure, API routes, data flow
   - frontend.md -- Frontend structure, components, pages
   - data.md -- Data models, schemas, database structure

3. **Calculate diff percentage** from previous version (if exists)

4. **If changes > 30%**, request user approval before updating

5. **Add freshness timestamp** to each codemap

6. **Save reports** for change tracking

## Codemap Format

```markdown
# [Area] Codemap

**Last Updated:** YYYY-MM-DD
**Entry Points:** [list of main files]

## Architecture
[ASCII diagram of component relationships]

## Key Modules
| Module | Purpose | Exports | Dependencies |
|--------|---------|---------|--------------|

## Data Flow
[Description of how data flows through this area]
```

## Expected Inputs

- Access to the project's source files

## Expected Outputs

- Updated codemap files reflecting current codebase state
- Diff report showing what changed

## Success Criteria

- [ ] All source files scanned
- [ ] Codemaps reflect actual current structure
- [ ] Freshness timestamps updated
- [ ] All referenced files exist

Use the codebase as source of truth. Focus on high-level structure, not implementation details.
