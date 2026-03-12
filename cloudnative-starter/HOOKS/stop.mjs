// Stop hook — from: console-log-guard (stop variant)
// Checks for console.log in all modified files before session ends.

import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const warnings = [];

try {
  // Check if we're in a git repo
  execSync("git rev-parse --git-dir", { encoding: "utf8", stdio: "pipe" });

  // Get modified JS/TS files
  const modified = execSync("git diff --name-only HEAD 2>/dev/null", {
    encoding: "utf8",
    stdio: "pipe"
  }).trim();

  if (modified) {
    const jsFiles = modified.split("\n").filter(f => /\.(ts|tsx|js|jsx)$/.test(f));
    const filesWithLogs = [];

    for (const file of jsFiles) {
      if (existsSync(file)) {
        try {
          const content = readFileSync(file, "utf8");
          if (/console\.log\(/.test(content)) {
            filesWithLogs.push(file);
          }
        } catch { /* skip unreadable files */ }
      }
    }

    if (filesWithLogs.length > 0) {
      warnings.push(`REMINDER: console.log found in modified files:\n${filesWithLogs.map(f => `  - ${f}`).join("\n")}\nRemove debug logging before committing.`);
    }
  }

  // Check for uncommitted changes
  const uncommitted = execSync("git diff --name-only 2>/dev/null", {
    encoding: "utf8",
    stdio: "pipe"
  }).trim();

  if (uncommitted) {
    const count = uncommitted.split("\n").length;
    warnings.push(`REMINDER: ${count} file${count > 1 ? "s" : ""} with uncommitted changes.`);
  }
} catch {
  // Not a git repo — skip
}

if (warnings.length > 0) {
  console.log(JSON.stringify({
    additionalContext: warnings.join("\n\n")
  }));
}
