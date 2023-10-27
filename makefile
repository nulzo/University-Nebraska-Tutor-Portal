## Author	: Nolan Gregory
## Date		: October 14th, 2023
## Desc.	: This make file is used by the integration to run the various
##			  scripts for the application. It can be used by the developers
##			  too, just run `make <command>`, assuming you have make installed.
## Commands	:
##			  - make build: 	Run only once. Builds the project from scratch and
##								installs dependencies.
##
##			  - make run-dev: 	Run the dev servers.
##
##			  - make delete-db: Deletes the database and migration files.
##
##			  - make lint: 		Lints the codebase.
##
##			  - make format: 	Formats the codebase.
##
##			  - make test: 		Runs the test cases.


## ========================== PROCESSES ===============================

.PHONY frontend-lint:
frontend-lint:
	echo s 

.PHONY frontend-test:
frontend-test:
	echo s 

.PHONY backend-lint:
backend-lint:
	echo s 

.PHONY backend-test:
backend-test:
	echo s 

.PHONY build-docker:
build-docker:
	docker compose up --build 

.PHONY build: ## Build the project from scratch
build:
	./scripts/build.sh

.PHONY run-dev: ## Start all dev servers
run-dev:
	./scripts/rundev.sh

.PHONY delete-db: ## Delete the development database AND delete migrations.
## !!! DELETE THIS COMMAND BEFORE PROD DEPLOYMENT !!!
delete-db:
	./scripts/delete.sh

.PHONY start-backend: ## Start the server locally
start-backend:
	python manage.py runserver

.PHONY migrate: ## Perform migrations to the database
migrate:
	python manage.py makemigrations
	python manage.py migrate

.PHONY lint:
lint:
	./scripts/linter.sh

.PHONY kill:
kill:
	./scripts/killservers.sh

.PHONY format:
format:
	./scripts/formatter.sh

.PHONY test: ## Run tests
test:
	pytest .

.PHONY poetry:
poetry:
	poetry shell
	poetry install

.PHONY win-run-dev:
win-run-dev:
	scripts\rundev.bat
