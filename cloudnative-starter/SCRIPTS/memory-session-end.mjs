// Memory Session End — persist session state on stop.
// Translated from cloudnative-co/claude-code-starter-kit features/memory-persistence.
// Original: Stop hook that creates/updates a session file with timestamps and context.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

try {
  const projectDir = process.cwd();
  const stateDir = join(projectDir, ".cloudnative");
  const stateFile = join(stateDir, "session-state.json");

  // Read any existing state to preserve accumulated data
  let state = {};
  if (existsSync(stateFile)) {
    try {
      state = JSON.parse(readFileSync(stateFile, "utf8"));
    } catch { /* start fresh */ }
  }

  // Update with current session timestamp
  state.date = new Date().toISOString().split("T")[0];
  state.lastUpdated = new Date().toISOString();

  // Read stdin for any session context from the hook payload
  try {
    const input = readFileSync("/dev/stdin", "utf8").trim();
    if (input) {
      const payload = JSON.parse(input);
      if (payload.session_context) {
        state.notes = payload.session_context;
      }
    }
  } catch { /* no stdin or invalid JSON — keep existing state */ }

  mkdirSync(stateDir, { recursive: true });
  writeFileSync(stateFile, JSON.stringify(state, null, 2) + "\n");
} catch { /* write failure — skip silently */ }
