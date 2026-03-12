// Pre-compact hook — from: pre-compact-commit
// Auto-commits staged changes before context compression to prevent work loss.

import { execSync } from "child_process";

try {
  // Check if we're in a git repo
  execSync("git rev-parse --git-dir", { encoding: "utf8", stdio: "pipe" });

  // Stage all changes
  execSync("git add -A", { encoding: "utf8", stdio: "pipe" });

  // Only commit if there are staged changes
  try {
    execSync("git diff --cached --quiet", { stdio: "pipe" });
    // No changes — nothing to commit
  } catch {
    // There are staged changes — commit them
    execSync('git commit -m "checkpoint: pre-compact auto-commit"', {
      encoding: "utf8",
      stdio: "pipe"
    });
    console.log(JSON.stringify({
      additionalContext: "Auto-committed changes before context compression."
    }));
  }
} catch {
  // Not a git repo or git not available — skip silently
}
