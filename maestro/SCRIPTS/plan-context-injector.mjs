// Plan Context Injector — preserve active plan context during compaction.
// Converted from plan-context-injector.sh. Hook: PreCompact.
// Outputs raw text (not JSON) — appended to compact prompt.

import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
  const projectDir = process.cwd();
  const handoffDir = join(projectDir, ".maestro", "handoff");
  if (!existsSync(handoffDir)) process.exit(0);

  const lines = [];
  for (const f of readdirSync(handoffDir).filter(f => f.endsWith(".json"))) {
    try {
      const handoff = JSON.parse(readFileSync(join(handoffDir, f), "utf8"));
      const status = handoff.status || "";
      if (status === "executing" || status === "designing") {
        lines.push(`- ${status.toUpperCase()} plan: ${handoff.topic || "unknown"} (file: ${handoff.plan_dest || f})`);
      }
    } catch {}
  }

  if (lines.length > 0) {
    const output = [
      "IMPORTANT — Active Maestro plan context (preserve in summary):",
      ...lines,
      "The user may want to resume this plan after compaction. Retain the plan name and status in the summary."
    ].join("\n");
    process.stdout.write(output);
  }
} catch {
  // Exit silently on errors
}
