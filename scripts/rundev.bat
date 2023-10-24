@ECHO off
REM Author    : Nolan Gregory (nulzo)
REM Date      : 22nd October, 2023
REM Contents  : Run this file when you want to boot up the dev servers. If you are running this then
REM             you have already finished building the project successfully.

REM Initializing some variables

SET FRONTEND_DIR=frontend-ts
SET BACKEND_DIR=backend
SET BACKEND_PORT=6969
SET FRONTEND_PORT=4200

START "Backend Server" cmd /k "poetry shell & python manage.py runserver"
cd %FRONTEND_DIR%
START "Frontend Server" cmd /k "npm run dev"
START "Tailwind Compiler" cmd /k "npx tailwindcss --watch -i ./src/style/globals.css -o ./src/style/output.css"
