## ========================== VARIABLES ==============================


BUILD_DIR = src
PYLINT_FLAGS = --reports yes
FLAKE8_FLAGS = --color always --count --statistics
BLACK_FLAGS = --check --force-exclude .\base
AUTOFLAKE_FLAGS = --in-place --remove-unused-variables --remove-all-unused-imports
DJLINT_FLAGS = --reformat --format-css


## ========================== PROCESSES ===============================


.PHONY run: ## Start the server locally
run:
	python manage.py runserver


.PHONY migrate: ## Perform migrations to the database
migrate:
	python manage.py makemigrations
	python manage.py migrate


.PHONY poetry: ## Make venv if applicable and install poetry requirements
poetry:
	poetry install


.PHONY lint: ## Lint the codebase
lint:
	@ruff . && pylint ./$(BUILD_DIR) $(PYLINT_FLAGS) && djlint . --lint && autoflake -r . && flake8 . $(FLAKE8_FLAGS) && black . $(BLACK_FLAGS) && echo SUCCESS


.PHONY format: ## Format the codebase
format:
	isort .
	autoflake -r . $(AUTOFLAKE_FLAGS)
	black .
	djlint . $(DJLINT_FLAGS)


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
	cd dev && npm run tailwind-watch && echo DONE && cd ..


.PHONY pre-commmit: ## Runs a precommit check
pre-commit:
	make test && make lint && make format && make lint && make test && echo ... && cls || clear && echo SUCCESS