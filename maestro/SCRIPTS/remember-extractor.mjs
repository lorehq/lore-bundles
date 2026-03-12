// Remember Extractor — extract <remember> tags from agent output into wisdom files.
// Converted from remember-extractor.sh. Hook: PostToolUse(Task).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, basename } from "path";

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
  const tool = input.tool_name || "";
  if (tool !== "Task") process.exit(0);

  const result = input.tool_result || input.tool_output || {};
  const resultText = result.stdout || result.text || "";
  if (!resultText.includes("<remember")) process.exit(0);

  const projectDir = process.cwd();
  const wisdomDir = join(projectDir, ".maestro", "wisdom");
  mkdirSync(wisdomDir, { recursive: true });

  // Determine active plan name from handoff files
  let activePlan = "session";
  const handoffDir = join(projectDir, ".maestro", "handoff");
  if (existsSync(handoffDir)) {
    try {
      const { readdirSync } = await import("fs");
      for (const f of readdirSync(handoffDir)) {
        if (!f.endsWith(".json")) continue;
        const hf = JSON.parse(readFileSync(join(handoffDir, f), "utf8"));
        if (hf.topic) {
          activePlan = hf.topic.replace(/\s+/g, "-").toLowerCase();
          break;
        }
      }
    } catch {}
  }

  const wisdomFile = join(wisdomDir, `${activePlan}.md`);
  const timestamp = new Date().toISOString().replace(/\.\d+Z$/, "Z");

  // Extract all <remember category="...">...</remember> tags
  const tagPattern = /<remember category="([^"]*)">([\s\S]*?)<\/remember>/g;
  let match;
  let appended = "";

  while ((match = tagPattern.exec(resultText)) !== null) {
    const category = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    const content = match[2].trim();

    let existing = "";
    if (existsSync(wisdomFile)) {
      existing = readFileSync(wisdomFile, "utf8");
    }

    if (existing.includes(`### ${category}`)) {
      // Append under existing category heading
      appended += `\n- [${timestamp}] ${content}\n`;
    } else {
      // Create new category section
      appended += `\n### ${category}\n\n- [${timestamp}] ${content}\n`;
    }
  }

  if (appended) {
    const existing = existsSync(wisdomFile) ? readFileSync(wisdomFile, "utf8") : "";
    writeFileSync(wisdomFile, existing + appended);
  }
} catch {
  // Exit silently on errors
}
