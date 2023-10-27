#!/bin/bash

# Author    : Nolan Gregory (nulzo)
# Date      : 13th October, 2023
# Contents  : Lint Javascript and Python files.

# Initializing some variables
OS_TYPE=$(uname)
FRONTEND_DIR="frontend-ts"
BACKEND_DIR="backend"
BACKEND_SETTINGS_DIR="base"
FAILED_LINTS=0

# Lint the Python portion of the codebase
ruff $BACKEND_DIR/. || FAILED_LINTS=$(($FAILED_LINTS + 1));
pylint $BACKEND_DIR/* --reports yes || FAILED_LINTS=$(($FAILED_LINTS + 1));
autoflake -r $BACKEND_DIR/* || FAILED_LINTS=$(($FAILED_LINTS + 1));
flake8 $BACKEND_DIR/. --color always --count --statistics || FAILED_LINTS=$(($FAILED_LINTS + 1));
black $BACKEND_DIR/. --check
