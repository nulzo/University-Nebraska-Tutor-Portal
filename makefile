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

.PHONY fflint: ## Lint the codebase
fflint:
	ruff $(BACKEND_DIR)/. 
	ruff $(BACKEND_DIR)/. && pylint $(BACKEND_DIR)/. $(PYLINT_FLAGS) && djlint $(BACKEND_DIR)/. --lint && autoflake -r $(BACKEND_DIR)/. && flake8 $(BACKEND_DIR)/. $(FLAKE8_FLAGS) && black $(BACKEND_DIR)/. $(BLACK_FLAGS) && echo SUCCESS

.PHONY ddformat: ## Format the codebase
ddformat:
	isort $(BACKEND_DIR)/.
	autoflake -r $(BACKEND_DIR)/. $(AUTOFLAKE_FLAGS)
	black $(BACKEND_DIR)/.
	djlint $(BACKEND_DIR)/. $(DJLINT_FLAGS)

.PHONY test: ## Run tests
test:
	pytest .

.PHONY wipe-db: ## Wipe database and make a new one
wipe-db:
	python manage.py flush --noinput
	python manage.py makemigrations
	python manage.py migrate
	python manage.py createsuperuser --noinput

.PHONY watch: ## Rebuilt the output.css if changes made to tailwind
watch:
	cd frontend && npm run tailwind-watch && echo DONE && cd ..

.PHONY pre-commmit: ## Runs a precommit check
pre-commit:
	make test && make lint && make format && make lint && make test && echo ... && cls || clear && echo SUCCESS