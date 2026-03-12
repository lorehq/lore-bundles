// Trace Logger — append tool use events to .maestro/trace.jsonl.
// Converted from trace-logger.sh. Hook: PostToolUse(*).

import { readFileSync, appendFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
  const toolName = input.tool_name || "";
  if (!toolName) process.exit(0);

  const agentName = process.env.CLAUDE_AGENT_NAME || "unknown";
  const toolInput = input.tool_input || input.input || {};
  const summary = (
    toolInput.description ||
    toolInput.command ||
    toolInput.pattern ||
    toolInput.file_path ||
    ""
  ).slice(0, 200);

  const result = input.tool_result || input.tool_output || {};
  const success = String(result.exit_code ?? result.exitCode ?? "0") === "0";

  const entry = {
    timestamp: new Date().toISOString(),
    event_type: "tool_use",
    tool_name: toolName,
    agent_name: agentName,
    success,
    summary
  };

  const projectDir = process.cwd();
  const tracePath = join(projectDir, ".maestro", "trace.jsonl");
  const traceDir = dirname(tracePath);
  if (!existsSync(traceDir)) mkdirSync(traceDir, { recursive: true });

  appendFileSync(tracePath, JSON.stringify(entry) + "\n");
} catch {
  // Exit silently on errors
}
