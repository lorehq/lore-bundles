// Keyword Detector — detect magic keywords in user prompts.
// Converted from keyword-detector.sh. Hook: PromptSubmit.

import { readFileSync } from "fs";

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));

  // Extract prompt text from message content array
  const content = input.message?.content;
  let prompt = "";
  if (Array.isArray(content)) {
    prompt = content.map(part => part.text || "").join(" ");
  } else if (typeof content === "string") {
    prompt = content;
  }
  if (!prompt) process.exit(0);

  // Strip code blocks
  const stripped = prompt.replace(/```[\s\S]*?```/g, "").toLowerCase();

  const keywords = {
    eco: "[ECOMODE] Use cost-efficient models. Prefer quick, focused responses. Minimize tool calls and token usage.",
    ecomode: "[ECOMODE] Use cost-efficient models. Prefer quick, focused responses. Minimize tool calls and token usage.",
    ultrawork: "[ULTRAWORK] Maximum thoroughness. Explore all approaches, validate exhaustively, leave no edge case unchecked.",
    ulw: "[ULTRAWORK] Maximum thoroughness. Explore all approaches, validate exhaustively, leave no edge case unchecked.",
    ultrathink: "[DEEP THINKING] Take extra time to reason through this problem. Consider multiple approaches before committing.",
    think: "[DEEP THINKING] Take extra time to reason through this problem. Consider multiple approaches before committing."
  };

  // Check for keyword as a standalone word
  const contexts = [];
  for (const [kw, ctx] of Object.entries(keywords)) {
    const re = new RegExp(`\\b${kw}\\b`);
    if (re.test(stripped)) {
      if (!contexts.includes(ctx)) contexts.push(ctx);
    }
  }

  if (contexts.length > 0) {
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "UserPromptSubmit",
        additionalContext: contexts.join("\n")
      }
    }));
  }
} catch {
  // Exit silently on errors
}
