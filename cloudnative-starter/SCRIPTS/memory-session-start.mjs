// Memory Session Start — restore session state on session start.
// Translated from cloudnative-co/claude-code-starter-kit features/memory-persistence.
// Original: SessionStart hook that checks for recent session files and learned skills.

import { readFileSync, existsSync } from "fs";
import { join } from "path";

try {
  const projectDir = process.cwd();
  const stateFile = join(projectDir, ".cloudnative", "session-state.json");

  if (!existsSync(stateFile)) process.exit(0);

  const state = JSON.parse(readFileSync(stateFile, "utf8"));
  if (!state || Object.keys(state).length === 0) process.exit(0);

  const parts = [];
  if (state.date) parts.push(`Last session: ${state.date}`);
  if (state.inProgress && state.inProgress.length > 0) {
    parts.push(`In progress:\n${state.inProgress.map(item => `  - ${item}`).join("\n")}`);
  }
  if (state.notes) parts.push(`Notes: ${state.notes}`);

  if (parts.length > 0) {
    console.log(JSON.stringify({
      additionalContext: `Previous session state restored:\n${parts.join("\n")}`
    }));
  }
} catch { /* missing or malformed state file — skip silently */ }
