.PHONY lint:
lint:
	ruff .
	pylint * --reports yes
	autoflake -r . --check
	flake8 . --color always --count --statistics
	black . --check

.PHONY format:
format:
	autoflake . --in-place --remove-all-unused-imports
	isort .
	black .

.PHONY test:
test:
	coverage run --source=src/. -m pytest tests/ 

.PHONY test-with-coverage:
test-with-coverage:
	coverage run --source=src/. -m pytest tests/
	coverage reports

.PHONY run:
run:
	python3 manage.py runserver

.PHONY migrate:
migrate:
	python3 manage.py makemigrations && python3 manage.py migrate

.PHONY load_data:
load_data:
	python3 manage.py runscript load_semester