---
name: update-docs
description: Sync documentation from source-of-truth files (package.json, .env.example) and identify obsolete docs.
user-invocable: true
---

# Update Documentation

Sync documentation from source-of-truth files.

## Pre-conditions

- Project has package.json and/or .env.example
- Documentation directory exists or should be created

## Workflow

1. **Read package.json scripts section:**
   - Generate scripts reference table
   - Include descriptions from comments

2. **Read .env.example:**
   - Extract all environment variables
   - Document purpose and format for each

3. **Generate contribution guide** with:
   - Development workflow
   - Available scripts
   - Environment setup
   - Testing procedures

4. **Generate runbook** with:
   - Deployment procedures
   - Monitoring and alerts
   - Common issues and fixes
   - Rollback procedures

5. **Identify obsolete documentation:**
   - Find docs not modified in 90+ days
   - List for manual review

6. **Show diff summary** of what changed

## Expected Inputs

- package.json (source of truth for scripts)
- .env.example (source of truth for environment variables)
- Existing documentation files

## Expected Outputs

- Updated documentation files
- List of obsolete docs for review
- Diff summary

## Success Criteria

- [ ] All scripts documented
- [ ] All environment variables documented
- [ ] Setup instructions are accurate and runnable
- [ ] No references to deleted files or deprecated features

Single source of truth: package.json and .env.example.
