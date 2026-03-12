// Pre-tool-use hook — merged from: doc-blocker, git-push-review, safety-net
// Runs before every tool execution. Returns allow/deny/ask decision.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};

// --- Doc blocker: prevent creating stray documentation files ---
// Only standard docs (README, CONTRIBUTING, AGENTS, CHANGELOG) should be .md at root
if (tool === "Write") {
  const filePath = toolInput.file_path || toolInput.path || "";
  if (/\.(md|txt)$/i.test(filePath)) {
    const basename = filePath.split("/").pop();
    const allowed = /^(README|CONTRIBUTING|AGENTS|CHANGELOG|LICENSE|SECURITY)\.(md|txt)$/i;
    // Allow docs in subdirectories (docs/, .lore/, etc.) and standard root files
    const isRootLevel = !filePath.includes("/") || /^[^/]+\.(md|txt)$/i.test(filePath);
    if (isRootLevel && !allowed.test(basename)) {
      console.log(JSON.stringify({
        decision: "deny",
        reason: `Blocked: creating non-standard doc file '${basename}'. Use README.md or a subdirectory for documentation.`
      }));
      process.exit(0);
    }
  }
}

// --- Bash command guards ---
if (tool === "Bash") {
  const cmd = toolInput.command || "";

  // Block destructive commands
  if (/\brm\s+-rf\s+[\/~]/.test(cmd)) {
    console.log(JSON.stringify({
      decision: "deny",
      reason: "Blocked: rm -rf with absolute or home path is too dangerous."
    }));
    process.exit(0);
  }

  // Block force push
  if (/\bgit\s+push\s+.*--force\b/.test(cmd) || /\bgit\s+push\s+-f\b/.test(cmd)) {
    console.log(JSON.stringify({
      decision: "deny",
      reason: "Blocked: force push can destroy remote history. Use --force-with-lease if necessary."
    }));
    process.exit(0);
  }

  // Ask before any git push
  if (/\bgit\s+push\b/.test(cmd)) {
    console.log(JSON.stringify({
      decision: "ask",
      message: "About to push to remote. Review changes first?"
    }));
    process.exit(0);
  }

  // Block dropping databases
  if (/\bDROP\s+(DATABASE|TABLE)\b/i.test(cmd)) {
    console.log(JSON.stringify({
      decision: "deny",
      reason: "Blocked: DROP DATABASE/TABLE is destructive. Do this manually if intended."
    }));
    process.exit(0);
  }
}

// --- Sensitive file guard ---
if (tool === "Write" || tool === "Edit") {
  const filePath = toolInput.file_path || toolInput.path || "";
  if (/\.(env|pem|key|pfx|p12)$/.test(filePath) || /\bcredentials\b/i.test(filePath)) {
    console.log(JSON.stringify({
      decision: "deny",
      reason: `Blocked: writing to sensitive file '${filePath.split("/").pop()}'. Secrets should not be in version control.`
    }));
    process.exit(0);
  }
}

// Default: allow
console.log(JSON.stringify({ decision: "allow" }));
