// Strategic Compact — suggest context management when tool use is high.
// Translated from cloudnative-co/claude-code-starter-kit features/strategic-compact.
// Original: PreToolUse hook that tracks tool calls and suggests /compact at thresholds.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const THRESHOLD = parseInt(process.env.COMPACT_THRESHOLD || "50", 10);
const INTERVAL = 25;

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));

  // Track tool call count in the project's .cloudnative directory
  const projectDir = process.cwd();
  const counterDir = join(projectDir, ".cloudnative");
  const counterFile = join(counterDir, "tool-count.json");

  mkdirSync(counterDir, { recursive: true });

  let count = 0;
  if (existsSync(counterFile)) {
    try {
      const data = JSON.parse(readFileSync(counterFile, "utf8"));
      // Reset counter if it's from a different day
      const today = new Date().toISOString().split("T")[0];
      if (data.date === today) {
        count = data.count || 0;
      }
    } catch { /* start fresh */ }
  }

  count++;
  writeFileSync(counterFile, JSON.stringify({
    date: new Date().toISOString().split("T")[0],
    count,
  }) + "\n");

  if (count === THRESHOLD) {
    console.log(JSON.stringify({
      additionalContext: `${THRESHOLD} tool calls reached in this session. Consider managing your context window if transitioning between phases of work.`
    }));
    process.exit(0);
  }

  if (count > THRESHOLD && count % INTERVAL === 0) {
    console.log(JSON.stringify({
      additionalContext: `${count} tool calls in this session. Consider managing your context window if context is getting stale.`
    }));
    process.exit(0);
  }

  // For pre-tool-use hooks, output allow decision
  console.log(JSON.stringify({ decision: "allow" }));
} catch { /* counter failure — allow the tool call */ }
