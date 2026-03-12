// Subagent Context — inject plan/wisdom context when maestro workers start.
// Converted from subagent-context.sh. Hook: SubagentStart.

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, basename } from "path";

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));

  const knownWorkers = [
    "kraken", "spark", "build-fixer", "critic", "oracle",
    "leviathan", "wisdom-synthesizer", "progress-reporter", "security-reviewer"
  ];
  const agentType = (input.agent_type || "").toLowerCase();
  if (!knownWorkers.includes(agentType)) process.exit(0);

  const projectDir = process.cwd();
  const maestroDir = join(projectDir, ".maestro");
  const parts = [];

  // Active plan summary — title + task list from first plan file
  const plansDir = join(maestroDir, "plans");
  if (existsSync(plansDir)) {
    const planFiles = readdirSync(plansDir).filter(f => f.endsWith(".md"));
    if (planFiles.length > 0) {
      try {
        const content = readFileSync(join(plansDir, planFiles[0]), "utf8");
        const lines = content.split("\n");
        const title = lines.find(l => l.trim().length > 0) || planFiles[0];
        const tasks = lines.filter(l => /^- \[[ x]\]/.test(l)).slice(0, 20);
        parts.push(`Active plan: ${title.replace(/^#+\s*/, "").trim()}`);
        if (tasks.length > 0) {
          parts.push("Tasks:\n" + tasks.join("\n"));
        }
      } catch {}
    }
  }

  // Wisdom file names
  const wisdomDir = join(maestroDir, "wisdom");
  if (existsSync(wisdomDir)) {
    const wisdomFiles = readdirSync(wisdomDir).filter(f => f.endsWith(".md"));
    if (wisdomFiles.length > 0) {
      parts.push(`Wisdom files: ${wisdomFiles.map(f => basename(f, ".md")).join(", ")}`);
    }
  }

  // Project context file names
  const contextDir = join(maestroDir, "context");
  if (existsSync(contextDir)) {
    const contextFiles = readdirSync(contextDir).filter(f => f.endsWith(".md"));
    if (contextFiles.length > 0) {
      parts.push(`Context files: ${contextFiles.map(f => basename(f, ".md")).join(", ")}`);
    }
  }

  if (parts.length > 0) {
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SubagentStart",
        additionalContext: parts.join("\n\n")
      }
    }));
  }
} catch {
  // Exit silently on errors
}
