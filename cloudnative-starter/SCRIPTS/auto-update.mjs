// Auto Update — check for bundle updates on session start.
// Translated from cloudnative-co/claude-code-starter-kit features/auto-update.
// Original: SessionStart hook that fetches tags and auto-pulls if behind.

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

const CACHE_TTL = 86400; // 24 hours in seconds

try {
  // Find the bundle directory
  const bundleDir = process.env.LORE_BUNDLE_DIR;
  if (!bundleDir || !existsSync(join(bundleDir, ".git"))) process.exit(0);

  // Read the slug from manifest
  let slug = "cloudnative-starter";
  try {
    const manifest = JSON.parse(readFileSync(join(bundleDir, "manifest.json"), "utf8"));
    slug = manifest.slug || slug;
  } catch { /* use default */ }

  // Fast path: skip if checked recently
  const cacheFile = join(bundleDir, ".update-cache");
  if (existsSync(cacheFile)) {
    const lastCheck = parseInt(readFileSync(cacheFile, "utf8").trim(), 10) || 0;
    const now = Math.floor(Date.now() / 1000);
    if (now - lastCheck < CACHE_TTL) process.exit(0);
  }

  // Update cache timestamp immediately (prevent concurrent checks)
  mkdirSync(dirname(cacheFile), { recursive: true });
  writeFileSync(cacheFile, String(Math.floor(Date.now() / 1000)));

  // Fetch without pulling — check if remote has new commits
  const fetchOutput = execSync(`git -C "${bundleDir}" fetch --dry-run 2>&1`, {
    encoding: "utf8",
    stdio: "pipe",
    timeout: 10000,
  }).trim();

  if (fetchOutput.length > 0) {
    console.log(JSON.stringify({
      additionalContext: `Bundle "${slug}" has updates available. Run \`lore bundle update ${slug}\` to update.`
    }));
  }
} catch { /* network failure or git unavailable — skip silently */ }
