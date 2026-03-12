import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";

// After a Task tool completes (delegated work), remind to verify the results.
if (tool === "Task") {
  console.log(
    JSON.stringify({
      additionalContext:
        "Delegated task completed. Verify the work: check that files were created/modified as expected, tests pass, and the output matches requirements before proceeding.",
    })
  );
  process.exit(0);
}

// Default: no additional context
console.log(JSON.stringify({}));
