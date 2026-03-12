---
description: Performance optimization strategies for context management, deep reasoning, and build troubleshooting
---

# Performance Optimization

## Context Window Management

Avoid the last 20% of context window for:
- Large-scale refactoring
- Feature implementation spanning multiple files
- Debugging complex interactions

Lower context sensitivity tasks:
- Single-file edits
- Independent utility creation
- Documentation updates
- Simple bug fixes

## Deep Reasoning

For complex tasks requiring deep reasoning:
1. Request enhanced thinking from the agent
2. Use a structured planning approach before implementation
3. Iterate with multiple critique rounds
4. Use split role sub-agents for diverse analysis

## Build Troubleshooting

If build fails:
1. Use **build-error-resolver** agent
2. Analyze error messages
3. Fix incrementally
4. Verify after each fix
