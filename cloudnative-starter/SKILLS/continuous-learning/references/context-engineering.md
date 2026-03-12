# Context Engineering

## Instruction File Loading in Monorepos

### Ancestor Loading (Upward)
- The agent walks UP the directory tree at startup
- All ancestor instruction files are loaded immediately
- Root-level instructions are always available

### Descendant Loading (Downward)
- Subdirectory instruction files use lazy loading
- Only loaded when you interact with files in those directories
- Sibling directories NEVER cross-load

### Recommended Structure
- **Root instruction file**: Repo-wide conventions, coding standards, commit formats
- **Component instruction file**: Framework-specific patterns, architecture, local testing
- **Local overrides**: Personal preferences (gitignored)
- **Global instructions**: User-wide instructions for all sessions

### Key Rules
- Keep each instruction file concise and focused
- Denial permissions cannot be overridden by lower-priority settings
- Root instructions propagate to all subdirectories automatically

## Skills Discovery in Monorepos

### Loading Locations (Priority)
1. Enterprise (highest)
2. Personal (user-level skills)
3. Project (repo-level skills)
4. Plugin (namespace-prefixed)

### Behavior
- Descriptions loaded into context automatically (lightweight)
- Full skill content only loads on invocation
- Nested package skills activate when editing files in those dirs
- Name conflicts resolved by priority hierarchy
- Plugin skills use `plugin-name:skill-name` to avoid collisions

## Hook Events

Agentic platforms expose lifecycle hooks at key moments:

SessionStart, SessionEnd, UserPromptSubmit, PreToolUse, PostToolUse,
PostToolUseFailure, PermissionRequest, Notification, Stop,
SubagentStart, SubagentStop, PreCompact, Setup

### Exit Codes
- 0: Success, continue
- 1: Error (logged, continues)
- 2: Block the operation
