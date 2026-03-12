// Post-tool-use hook — merged from: console-log-guard, prettier-hooks, pr-creation-log
// Runs after every tool execution. Returns additionalContext warnings.

import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};
const toolOutput = input.tool_output || {};

const warnings = [];

// --- Console.log guard: warn about debug logging in JS/TS files ---
if (tool === "Edit" || tool === "Write") {
  const filePath = toolInput.file_path || toolInput.path || "";
  if (/\.(ts|tsx|js|jsx)$/.test(filePath) && existsSync(filePath)) {
    try {
      const content = readFileSync(filePath, "utf8");
      const lines = content.split("\n");
      const hits = [];
      for (let i = 0; i < lines.length; i++) {
        if (/console\.log\(/.test(lines[i])) {
          hits.push(`  L${i + 1}: ${lines[i].trim()}`);
        }
      }
      if (hits.length > 0) {
        warnings.push(`WARNING: console.log found in ${filePath}:\n${hits.slice(0, 5).join("\n")}${hits.length > 5 ? `\n  ... and ${hits.length - 5} more` : ""}`);
      }
    } catch { /* file read error — skip */ }
  }
}

// --- Prettier: auto-format JS/TS after edit ---
if (tool === "Edit" || tool === "Write") {
  const filePath = toolInput.file_path || toolInput.path || "";
  if (/\.(ts|tsx|js|jsx|json|css|scss)$/.test(filePath) && existsSync(filePath)) {
    try {
      // Only run if prettier is available in the project
      execSync("which prettier", { encoding: "utf8", stdio: "pipe" });
      execSync(`prettier --write "${filePath}"`, { encoding: "utf8", stdio: "pipe" });
    } catch { /* prettier not installed or failed — skip silently */ }
  }
}

// --- PR creation log: note PR URL after gh pr create ---
if (tool === "Bash") {
  const cmd = toolInput.command || "";
  const output = toolOutput.output || toolOutput.stdout || "";
  if (/\bgh\s+pr\s+create\b/.test(cmd)) {
    const match = output.match(/https:\/\/github\.com\/[^\s]+\/pull\/\d+/);
    if (match) {
      warnings.push(`PR created: ${match[0]}`);
    }
  }
}

// Output collected warnings as additional context
if (warnings.length > 0) {
  console.log(JSON.stringify({
    additionalContext: warnings.join("\n\n")
  }));
}
