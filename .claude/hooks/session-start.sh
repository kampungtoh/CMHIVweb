#!/bin/bash
set -euo pipefail

# Only run in Claude Code on the web (remote) environments.
# Local sessions should manage notebooklm-py installation themselves.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install notebooklm-py globally via uv tool. Idempotent: uv tool install
# is a no-op if the same version is already installed.
if ! command -v notebooklm >/dev/null 2>&1; then
  uv tool install "notebooklm-py[browser]"
fi

# Ensure Playwright Chromium is installed into the tool's environment.
# Playwright skips the download if the browser is already cached at
# PLAYWRIGHT_BROWSERS_PATH (set to /opt/pw-browsers in this environment).
PLAYWRIGHT_BIN="$HOME/.local/share/uv/tools/notebooklm-py/bin/playwright"
if [ -x "$PLAYWRIGHT_BIN" ]; then
  "$PLAYWRIGHT_BIN" install chromium
fi
