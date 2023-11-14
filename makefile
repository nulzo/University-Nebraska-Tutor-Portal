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

.PHONY dockerup-build:
dockerup-build:
	docker compose up --build -d

.PHONY dockerdown:
dockerdown:
	docker compose down

.PHONY dockerup:
dockerup:
	docker compose up -d

.PHONY build: ## Build the project from scratch
build:
	./scripts/build.sh

.PHONY migrate: ## Perform migrations to the database
migrate:
	python manage.py makemigrations
	python manage.py migrate

.PHONY kill:
kill:
	./scripts/killservers.sh
