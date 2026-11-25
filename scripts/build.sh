#!/usr/bin/env bash
# Build the static preview into preview-site/ and zip it.
# The built folder is named preview-site (not dist, build, or out) so it is kept.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Prefer a user-installed Jekyll if the gem is not on PATH.
export PATH="${HOME}/.local/share/gem/ruby/3.3.0/bin:${PATH}"

if ! command -v jekyll >/dev/null 2>&1; then
  echo "Jekyll was not found. Install it with: gem install jekyll webrick -v '~> 3.10'" >&2
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

jekyll build --source "$ROOT" --destination "$TMP/site"

rm -rf "$ROOT/preview-site"
mkdir -p "$ROOT/preview-site"
cp -a "$TMP/site/." "$ROOT/preview-site/"
# Jekyll may write a folder index; keep only what a browser needs from a local folder.
rm -f "$ROOT/preview-site/.jekyll-metadata" "$ROOT/preview-site/.jekyll-cache" 2>/dev/null || true

rm -f "$ROOT/ember-oak-preview-site.zip"
# Zip from inside preview-site's parent so the archive contains preview-site/
(cd "$ROOT" && zip -r -q ember-oak-preview-site.zip preview-site -x "*.DS_Store")

echo "Built $ROOT/preview-site and $ROOT/ember-oak-preview-site.zip"
