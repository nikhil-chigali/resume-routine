#!/usr/bin/env bash
set -euo pipefail

# Install the docx npm package globally so the build script can require() it.
# Idempotent: npm is a no-op if already present at the requested version.
npm install -g docx

# Sanity-check: confirm the install succeeded and the package resolves.
NODE_PATH="$(npm root -g)" node -e "require('docx').Document; console.log('docx ready')"

# Diagnostic: log Node version for debugging build issues later.
node --version
