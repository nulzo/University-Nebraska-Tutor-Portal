#!/bin/bash

# Author    : Nolan Gregory (nulzo)
# Date      : 13th October, 2023
# Contents  : Run this file when you want to terminate all the dev servers.

# Initializing some variables
BACKEND_PORT="6969"
FRONTEND_PORT="4200"

# Getting process ID's
BACKEND_PROCESS_ID=$(netstat -vanp tcp | grep "$BACKEND_PORT" | awk '{print $9}')
FRONTEND_PROCESS_ID=$(netstat -vanp tcp | grep "$FRONTEND_PORT" | awk '{print $9}')

# Killing processes forcefully
kill -9 $BACKEND_PROCESS_ID
kill -9 $FRONTEND_PROCESS_ID