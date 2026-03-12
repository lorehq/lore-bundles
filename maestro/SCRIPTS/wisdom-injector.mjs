// Wisdom Injector — surface available wisdom when reading a plan file.
// Converted from wisdom-injector.sh. Hook: PostToolUse(Read).

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, basename } from "path";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Read") process.exit(0);

const filePath = (
  input.tool_input?.file_path ||
  input.tool_input?.path ||
  input.input?.file_path ||
  input.input?.path ||
  ""
);
if (!filePath.includes(".maestro/plans/")) process.exit(0);

const projectDir = process.cwd();
const wisdomDir = join(projectDir, ".maestro", "wisdom");
if (!existsSync(wisdomDir)) process.exit(0);

const wisdomFiles = readdirSync(wisdomDir).filter(f => f.endsWith(".md"));
if (wisdomFiles.length === 0) process.exit(0);

const entries = [];
for (const f of wisdomFiles) {
  try {
    const content = readFileSync(join(wisdomDir, f), "utf8");
    const firstLine = content.split("\n").find(l => l.trim().length > 0) || f;
    entries.push(`- ${basename(f, ".md")}: ${firstLine.replace(/^#+\s*/, "").trim()}`);
  } catch {
    entries.push(`- ${basename(f, ".md")}`);
  }
}

console.log(JSON.stringify({
  additionalContext: `Available wisdom files in .maestro/wisdom/:\n${entries.join("\n")}\nConsider reading relevant wisdom before implementing plan tasks.`
}));
