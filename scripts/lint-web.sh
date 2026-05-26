#!/bin/bash
set -e
cd "$(dirname "$0")/../web"
./node_modules/.bin/eslint --fix "$@"
