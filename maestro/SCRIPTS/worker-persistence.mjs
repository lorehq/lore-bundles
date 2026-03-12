// Worker Persistence — block stop for maestro worker agents to keep them working.
// Converted from worker-persistence.sh. Hook: Stop.
// Respects MAESTRO_MAX_ITERATIONS and MAESTRO_SESSION_START safety limits.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));

const agentName = (
  process.env.CLAUDE_AGENT_NAME ||
  input.agent_name ||
  (input.agent || {}).name ||
  ""
).toLowerCase();

const workers = ["kraken", "spark", "build-fixer"];
if (!workers.includes(agentName)) process.exit(0);

// Safety limits — allow stop if exceeded
const maxIterations = parseInt(process.env.MAESTRO_MAX_ITERATIONS || "0", 10);
const sessionStart = parseInt(process.env.MAESTRO_SESSION_START || "0", 10);

if (maxIterations > 0) {
  const iteration = parseInt(process.env.MAESTRO_ITERATION || "0", 10);
  if (iteration >= maxIterations) {
    console.log(JSON.stringify({ decision: "allow" }));
    process.exit(0);
  }
}

if (sessionStart > 0) {
  const elapsed = Date.now() - sessionStart;
  const maxDuration = 2 * 60 * 60 * 1000; // 2 hours
  if (elapsed > maxDuration) {
    console.log(JSON.stringify({ decision: "allow" }));
    process.exit(0);
  }
}

console.log(JSON.stringify({
  decision: "block",
  reason: "Tasks may remain incomplete. Continue working — use TaskList() to find remaining tasks."
}));
