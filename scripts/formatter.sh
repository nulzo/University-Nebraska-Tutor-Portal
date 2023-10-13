#!/bin/bash

# Author    : Nolan Gregory (nulzo)
# Date      : 13th October, 2023
# Contents  : Format Javascript and Python files.

# Initializing some variables
FRONTEND_DIR="frontend-ts"
BACKEND_DIR="backend"
BACKEND_SETTINGS_DIR="base"

isort $BACKEND_DIR/.
autoflake -r $BACKEND_DIR/. --in-place --remove-unused-variables --remove-all-unused-imports
black $BACKEND_DIR/.

cd frontend-ts
npx eslint --fix src/.
