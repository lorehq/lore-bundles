// Session Start — inject maestro awareness context at session start.
// Converted from session-start.sh. Hook: SessionStart.

import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, basename } from "path";

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
  const projectDir = process.cwd();
  const maestroDir = join(projectDir, ".maestro");
  const parts = [];

  // Active plan detection from handoff files
  const handoffDir = join(maestroDir, "handoff");
  if (existsSync(handoffDir)) {
    const now = Date.now();
    const staleThreshold = 24 * 60 * 60 * 1000;
    for (const f of readdirSync(handoffDir).filter(f => f.endsWith(".json"))) {
      try {
        const handoff = JSON.parse(readFileSync(join(handoffDir, f), "utf8"));
        const status = handoff.status || "";
        if (status === "executing" || status === "designing") {
          const mtime = statSync(join(handoffDir, f)).mtimeMs;
          const stale = (now - mtime) > staleThreshold;
          parts.push(`Active plan (${status}${stale ? ", STALE >24h" : ""}): ${handoff.topic || f}`);
        }
      } catch {}
    }
  }

  // Maestro commands
  parts.push("Maestro commands: plan, status, compact, review, wisdom, handoff");

  // Project context file count
  const contextDir = join(maestroDir, "context");
  if (existsSync(contextDir)) {
    const contextFiles = readdirSync(contextDir).filter(f => f.endsWith(".md"));
    if (contextFiles.length > 0) {
      parts.push(`Project context: ${contextFiles.length} file(s) in .maestro/context/`);
    }
  }

  // Active plan names
  const plansDir = join(maestroDir, "plans");
  if (existsSync(plansDir)) {
    const planFiles = readdirSync(plansDir).filter(f => f.endsWith(".md"));
    const planNames = [];
    for (const f of planFiles) {
      try {
        const content = readFileSync(join(plansDir, f), "utf8");
        const firstLine = content.split("\n").find(l => l.trim().length > 0) || f;
        planNames.push(firstLine.replace(/^#+\s*/, "").trim());
      } catch {
        planNames.push(f);
      }
    }
    if (planNames.length > 0) {
      parts.push(`Active plans: ${planNames.join(", ")}`);
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

  // Priority context from notepad
  const notepadPath = join(maestroDir, "notepad.md");
  if (existsSync(notepadPath)) {
    const notepad = readFileSync(notepadPath, "utf8");
    const match = notepad.match(/## Priority Context\n([\s\S]*?)(?=\n## |\n---|\Z)/);
    if (match) {
      const priority = match[1].trim().slice(0, 500);
      if (priority.length > 0) {
        parts.push(`Priority context:\n${priority}`);
      }
    }
  }

  if (parts.length > 0) {
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: parts.join("\n\n")
      }
    }));
  }
} catch {
  // Exit silently on errors
}
