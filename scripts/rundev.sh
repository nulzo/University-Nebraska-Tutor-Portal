#!/bin/bash

# Author    : Nolan Gregory (nulzo)
# Date      : 13th October, 2023
# Contents  : Run this file when you want to boot up the dev servers. If you are running this then
#             you have already finished building the project successfully.

# Initializing some variables
FRONTEND_DIR="frontend-ts"
BACKEND_DIR="backend"
BACKEND_PORT="6969"
FRONTEND_PORT="4200"

# Start the backend server
python3 manage.py runserver &

# Start the frontend server
cd frontend-ts
npm run dev &
npx tailwindcss --watch -i ./src/style/globals.css -o ./src/style/output.css &

sleep 2; clear || cls
echo Dev servers are up and running! Logged things will show up in the console.; echo
echo Quit all servers with CONTROL-C :\); echo

BACKEND_PROCESS_ID=$(netstat -vanp tcp | grep "$BACKEND_PORT" | awk '{print $9}')
FRONTEND_PROCESS_ID=$(netstat -vanp tcp | grep "$FRONTEND_PORT" | awk '{print $9}')

trap "kill $BACKEND_PROCESS_ID $FRONTEND_PROCESS_ID" INT
wait