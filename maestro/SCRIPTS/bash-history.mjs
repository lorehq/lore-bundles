// Bash History — mirror successful agent commands to user's bash history.
// Converted from bash-history.sh. Hook: PostToolUse(Bash).

import { readFileSync, appendFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
  const tool = input.tool_name || "";
  if (tool !== "Bash") process.exit(0);

  const result = input.tool_result || input.tool_output || {};
  const exitCode = String(result.exit_code ?? result.exitCode ?? "0");
  if (exitCode !== "0") process.exit(0);

  const command = input.tool_input?.command || "";
  if (!command) process.exit(0);

  // Skip read-only commands
  if (/^\s*(cat|ls|grep|head|tail|wc|file|stat|which|type|echo|pwd)\s/.test(command)) {
    process.exit(0);
  }

  // Skip commands containing secrets
  if (/password|token|secret|key=|api_key|apikey|credential/i.test(command)) {
    process.exit(0);
  }

  // Truncate and append to bash history
  const shortCmd = command.slice(0, 500);
  appendFileSync(join(homedir(), ".bash_history"), shortCmd + "\n");
} catch {
  // Exit silently on errors
}
