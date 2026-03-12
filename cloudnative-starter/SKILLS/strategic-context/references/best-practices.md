# Agentic Coding Best Practices

## Workflow Best Practices

### 1. Plan First, Always
- Use plan mode for any non-trivial task
- Break complex features into phases
- Validate feasibility before implementation

### 2. Context Window Management
- Keep instruction files concise (adherence drops with length)
- Compact context proactively at ~50% usage (don't rely on auto-compact)
- Each subtask should be completable within <50% of context window
- Avoid the last 20% of context for complex multi-file work
- Lower context sensitivity tasks (single-file edits, utils) are safe at higher usage

### 3. Progressive Disclosure
- Skill descriptions loaded automatically (lightweight)
- Full skill content loaded only on invocation (on-demand)
- Feature-specific subagents with skills for complex workflows
- Don't front-load all context; reveal as needed

### 4. Commit Strategy
- Commit immediately upon task completion
- Don't batch commits across multiple features
- Small, atomic commits with clear messages

### 5. Subagent Rules
- Subagents should not invoke other subagents via shell
- Use the task/delegation tool with explicit parameters
- Keep subagent tasks focused and completable in <50% context
- Use lightweight models for worker agents

### 6. Instruction Files
- The primary instruction file is the most reliable context mechanism
- Path-scoped rules support conditional loading
- Persistent memory features offer no guarantees of long-term adherence

## Debugging Best Practices

### Tools
- Background tasks for better log visibility
- MCP tools: Playwright + Chrome DevTools for browser automation
- Screenshots for visual bug reports

### Browser Automation Priority
1. **Playwright MCP** - Primary (best token efficiency, cross-browser)
2. **Chrome DevTools MCP** - Secondary (performance/network analysis)
3. **Manual testing** - With logged-in sessions when needed

## Anti-Patterns to Avoid
- Complex agent orchestration when vanilla agent usage suffices
- Overly long instruction files
- Waiting for auto-compact instead of proactive compaction
- Front-loading too much context (use progressive disclosure)
- Running subtasks that exceed 50% context
