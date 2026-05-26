#!/bin/bash
set -e
cd "$(dirname "$0")/../cms"
./node_modules/.bin/eslint --fix "$@"
