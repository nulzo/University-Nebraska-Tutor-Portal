## ========================== VARIABLES ==============================


BUILD_DIR = src
PYLINT_FLAGS = --reports yes
FLAKE8_FLAGS = --color always --count --statistics
BLACK_FLAGS = --check --force-exclude .\base
AUTOFLAKE_FLAGS = --in-place --remove-unused-variables --remove-all-unused-imports
DJLINT_FLAGS = --reformat --format-css
BACKEND_DIR = backend


## ========================== PROCESSES ===============================

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

.PHONY format:
format:
	./scripts/formatter.sh
	echo done

.PHONY test: ## Run tests
test:
	pytest .

.PHONY poetry:
poetry:
	poetry shell
	poetry install
