// Plan Validator — check required sections after writing a plan file.
// Converted from plan-validator.sh. Hook: PostToolUse(Write).

import { readFileSync, existsSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Write") process.exit(0);

const filePath = (
  input.tool_input?.file_path ||
  input.tool_input?.path ||
  input.input?.file_path ||
  input.input?.path ||
  ""
);
if (!filePath.includes(".maestro/plans/")) process.exit(0);

const required = ["## Objective", "## Scope", "## Tasks", "## Verification"];
let missing = [];

try {
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, "utf8");
    missing = required.filter(section => !content.includes(section));
  } else {
    missing = required;
  }
} catch {
  missing = required;
}

if (missing.length > 0) {
  console.log(JSON.stringify({
    additionalContext: `Plan file is missing required sections: ${missing.join(", ")}. Every plan must include all four: ${required.join(", ")}.`
  }));
}
