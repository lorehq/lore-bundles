// Plan Protection — prevent kraken/spark from editing plan files.
// Converted from plan-protection.sh. Hook: PreToolUse(Write|Edit).

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Write" && tool !== "Edit" && tool !== "MultiEdit") {
  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
}

const agentName = (
  process.env.CLAUDE_AGENT_NAME ||
  input.agent_name ||
  (input.agent || {}).name ||
  ""
).toLowerCase();

const filePath = (
  input.tool_input?.file_path ||
  input.tool_input?.path ||
  input.input?.file_path ||
  input.input?.path ||
  ""
);

if (filePath.includes(".maestro/plans/") && (agentName === "kraken" || agentName === "spark")) {
  console.log(JSON.stringify({
    decision: "deny",
    reason: `Agent "${agentName}" cannot edit plan files in .maestro/plans/. Only the orchestrator manages plans.`
  }));
  process.exit(0);
}

console.log(JSON.stringify({ decision: "allow" }));
