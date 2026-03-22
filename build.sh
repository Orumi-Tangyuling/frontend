#!/bin/sh

set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname "$0")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR/output"

rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Copy non-hidden project contents into the deployment output directory.
cp -R "$SCRIPT_DIR"/* "$OUTPUT_DIR"/
