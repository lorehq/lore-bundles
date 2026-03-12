import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
const content = JSON.stringify(input.tool_input || {}).toLowerCase();

// If an orchestrator/planner agent tries to write or edit files directly,
// warn that orchestrators should delegate implementation to worker agents.
const isWriteTool = tool === "Write" || tool === "Edit" || tool === "MultiEdit";

if (isWriteTool) {
  // Check if the current agent context suggests an orchestrator role
  const agentHints = [
    "orchestrat",
    "planner",
    "coordinator",
    "delegat",
  ];

  const inputStr = JSON.stringify(input).toLowerCase();
  const isOrchestrator = agentHints.some((hint) => inputStr.includes(hint));

  if (isOrchestrator) {
    console.log(
      JSON.stringify({
        additionalContext:
          "Warning: Orchestrator/planner agents should delegate file modifications to implementation agents rather than writing directly. Consider using the Task tool to delegate this work.",
      })
    );
    process.exit(0);
  }
}

// Default: allow the tool use
console.log(JSON.stringify({}));
