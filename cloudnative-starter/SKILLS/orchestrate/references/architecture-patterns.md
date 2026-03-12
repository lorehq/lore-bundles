# Command -> Agent -> Skills Architecture

## Pattern Overview

| Component | Role | Invocation |
|-----------|------|------------|
| **Command/Skill** | Entry point, user interaction | Skill invocation |
| **Agent** | Orchestrates workflow with preloaded skills | Task tool |
| **Skills** | Domain knowledge injected at startup | Progressive disclosure |

## When to Use
- Multi-step workflows requiring coordination
- Domain-specific knowledge injection
- Sequential tasks with validation checkpoints
- Reusable components across projects

## Why It Works
- **Progressive disclosure**: Context loaded only when needed
- **Single execution context**: Agent maintains state across phases
- **Clean separation**: Each component has clear responsibility
- **Reusability**: Skills shared across agents and projects

## Agent Definition Format
```yaml
---
name: agent-name
description: When to use this agent proactively
tools: WebFetch, Read, Write  # restricted tool set
color: green
skills:
  - skill-one
  - skill-two
---
```

## Skill Definition Format
```yaml
---
name: skill-name
description: What this skill provides
tools: WebFetch, Read
context: fork  # isolated execution
---
```

## RPI Workflow (Research -> Plan -> Implement)

### Directory Structure
```
rpi/{feature-slug}/
  REQUEST.md          # Initial spec
  research/           # Feasibility + GO/NO-GO
  plan/               # Product, UX, Engineering specs
  implement/          # Execution records
```

### Phases
1. **Research** - Feasibility analysis, produces GO/NO-GO verdict
2. **Plan** - User stories, UX flows, technical architecture
3. **Implement** - Phase-by-phase development with validation
