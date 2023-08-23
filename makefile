
.PHONY run:
run:
	python manage.py runserver

.PHONY migrate:
migrate:
	python manage.py makemigrations
	python manage.py migrate

.PHONY poetry: ## Make venv if applicable and install poetry requirements
poetry:
	poetry install

.PHONY lint: ## Lint the codebase
lint:
	@ruff . && pylint ./apps --reports yes && djlint . --lint && autoflake -r . && flake8 . --color always --count --statistics && black . --check && echo SUCCESS

.PHONY format: ## Format the codebase
format:
	isort .
	autoflake -r . --in-place --remove-unused-variables --remove-all-unused-imports
	black .
	djlint . --reformat --format-css

.PHONY test: ## Run tests
test:
	pytest .

.PHONY wipe-db: ## Wipe database and make a new one
wipe-db:
	python manage.py flush --noinput
	python manage.py makemigrations
	python manage.py migrate
	python manage.py createsuperuser --noinput

.PHONY tailwind-watch:
tailwind-watch:
	cd dev && npm run tailwind-watch && echo DONE && cd ..
