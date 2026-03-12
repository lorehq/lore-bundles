#!/bin/bash
# Continuous Learning - Session Evaluator
# Runs on session-end hook to extract reusable patterns from coding sessions
#
# Patterns to detect: error_resolution, debugging_techniques, workarounds, project_specific
# Patterns to ignore: simple_typos, one_time_fixes, external_api_issues

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/config.json"
MIN_SESSION_LENGTH=10

# Load config if exists
if [ -f "$CONFIG_FILE" ]; then
  MIN_SESSION_LENGTH=$(jq -r '.min_session_length // 10' "$CONFIG_FILE")
fi

# Get transcript path from environment
transcript_path="${CLAUDE_TRANSCRIPT_PATH:-}"

if [ -z "$transcript_path" ] || [ ! -f "$transcript_path" ]; then
  exit 0
fi

# Count messages in session
message_count=$(grep -c '"type":"user"' "$transcript_path" 2>/dev/null || echo "0")

# Skip short sessions
if [ "$message_count" -lt "$MIN_SESSION_LENGTH" ]; then
  echo "[ContinuousLearning] Session too short ($message_count messages), skipping" >&2
  exit 0
fi

# Signal that session should be evaluated for extractable patterns
echo "[ContinuousLearning] Session has $message_count messages - evaluate for extractable patterns" >&2
