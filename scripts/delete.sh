#!/bin/bash

# Author    : Nolan Gregory (nulzo)
# Date      : 13th October, 2023
# Contents  : Delete the database and all applied migrations (DELETE BEFORE PROD DEPLOYMENT).

FRONTEND_DIR="frontend-ts"
BACKEND_DIR="backend/src/api"
DATABASE_DIR="migrations"
DATABASE_NAME="db.sqlite3"

# Delete migrations
rm -rf $BACKEND_DIR/$DATABASE_DIR && mkdir $BACKEND_DIR/$DATABASE_DIR && echo "" >$BACKEND_DIR/$DATABASE_DIR/__init__.py;

# Delete database
rm -rf $DATABASE_NAME

# Wipe existing data
python3 manage.py flush --noinput
# Write migration files for db schema
python3 manage.py makemigrations
# Apply migration schema and changes to the db
python3 manage.py migrate
# Create a superuser using the username and password form the env file
python3 manage.py createsuperuser --noinput

echo; echo; echo Successfully deleted and added a fresh database.; echo;
