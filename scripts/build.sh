#!/bin/bash

# Author    : Nolan Gregory (nulzo)
# Date      : 13th October, 2023
# Contents  : This file is to be run ONCE - immediately after the project has been 
# cloned from GitHub. It is not the file that builds the application for prod, 
# and it is not used to run the application in any capacity. It is a means by 
# which you can automate the process of getting all dependencies and whatnot 
# setup before you run the application.

# Initializing some variables
OS_TYPE=$(uname)
FRONTEND_DIR="frontend-ts"
BACKEND_DIR="backend"
BACKEND_SETTINGS_DIR="base"
ENV_DISTRIBUTABLE="env.dist"
BACKEND_PORT="6969"
FRONTEND_PORT="4200"

# We need to warn the user about destructive actions of this script
clear || cls;
echo WARNING: Before running this script, PLEASE be mindful of the side effects:; echo
echo - This script should ONLY be run ONCE - either right after you clone project, or if you are running project for the first time!
echo - This script will erase database information, rewrite .env files, and potentially delete your dev progress!
echo - This script will install all packages, apply all database schemas, and automatically build the project for you.; echo
echo By running this, you understand when this script should be run and when it should not be run.; echo
# read -p "Run script and build project? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

# First, we must check that the user has poetry on their system and install if not
poetry --version || curl -sSL https://install.python-poetry.org | python3 -

# Now, check and see if a virtual environement exists already (it probably won't)
if [[ -e .venv || -n "$VIRTUAL_ENV" ]]
then # We must be in an existing virtual environment... how odd...
    echo "in venv"
    # Install the packages to the environment that you are in
    poetry install
else # We are not in a virtual environment, and one doesn't exist in the project...
    # Config to create venv within your project structure
    poetry config virtualenvs.create false --local
    # Spawn a poetry shell (A side effect of which will be activating your venv!)
    poetry shell
    # Install the dependencies to the virtual environment
    poetry install
fi

# After venv has been configured, we must make a .env based off our env.dist. *Please* change it later.
if [[ -e .env ]]; then cat env.dist > .env ; fi

# Python dependencies have been added, now move to javascript packages
cd frontend-ts

# Check if Node is installed and install it if not
{
    node -v
} &> /dev/null || # If 'OR', then node is not installed, so move to the if, otherwise, jump past

if [[ "$OS_TYPE" == "Darwin" ]]; then # User is running on Mac OS
    # Try to download via homebrew, or use curl if homebrew not installed
    brew -v && brew install node || 
    # Installing node through curl since homebrew is not on system
    curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
fi

if [[ "$OS_TYPE" == "Linux" ]]; then # User is running on Linux
    # Try to run through sudo (will require you to enter your superuser password)
    ( sudo apt update && sudo apt install nodejs && sudo apt install npm ) || 
    # If all else fails, we need to either curl or wget, and I think curl is better
    ( sudo apt install curl && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash )
fi

if [[ "$OS_TYPE" == "Cygwin" || "$OS_TYPE" == "MinGw" ]]; then # User is on msys2 or mingw bash :nerd:
    # Install 64-bit node or 32-bit if that fails
    pacman -S mingw-w64-x86_64-nodejs || pacman -S mingw-w64-i686-nodejs
fi

# Now that Node is installed, let's install packages through npm
npm -v && npm install

# Frontend stuff is done, let's move back out and take care of database
cd ..
# Remove unwanted junk from db or make new sqlite3
python manage.py flush --noinput
# Write migration files for db schema
python manage.py makemigrations
# Apply migration schema and changes to the db
python manage.py migrate
# Create a superuser using the username and password form the env file
python manage.py createsuperuser --noinput

# That should be all, let's just test and confirm everything worked. Here I am
# just trapping everything and running it all to see if we get any errors. If 
# any pop up, I'll just log to console and you will have to debug yourself! A 
# single script can only do so much :)

# # Test backend server built proper
# python3 manage.py runserver &
# PROCESS_ID=$(netstat -vanp tcp | grep "$BACKEND_PORT" | awk '{print $9}')
# while [ -z "$PROCESS_ID" ]; do sleep 0.5; PROCESS_ID=$(netstat -vanp tcp | grep "$BACKEND_PORT" | awk '{print $9}'); done
# echo process is on $PROCESS_ID
# kill -9 "$PROCESS_ID"

# # Test frontend server built proper
# cd "$FRONTEND_DIR"
# npm run dev &
# PROCESS_ID=$(netstat -vanp tcp | grep "$FRONTEND_PORT" | awk '{print $9}')
# while [ -z "$PROCESS_ID" ]; do sleep 0.5; PROCESS_ID=$(netstat -vanp tcp | grep "$FRONTEND_PORT" | awk '{print $9}'); done
# echo process is on $PROCESS_ID
# kill -9 "$PROCESS_ID"

# # Test tailwind stuff
# npx tailwindcss --watch -i ./src/style/globals.css -o ./src/style/output.css &
# # This needs time to compile...
# sleep 2
# PROCESS_ID=$!
# echo "$PROCESS_ID"
# PROCESS_ID=$(netstat -vanp tcp | grep "$FRONTEND_PORT" | awk '{print $9}')

clear || cls
echo Ok, you are all set! Well, that is assuming no errors occured. Although we just verified this during the build,
echo try running the following commands in the root directory to ensure they work with no errors:
echo - python3 manage.py runserver \(ctrl+c when validated\)
echo - cd frontend \&\& npm run dev \(ctrl+c when validated\)
echo - cd frontend \&\& npx tailwindcss --watch -i ./src/style/globals.css -o ./src/style/output.css \(ctrl+c when validated\)
echo
echo If you have no errors, then you are ready to roll!;echo





