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
	coverage report

.PHONY test-for-pipeline:
test-for-pipeline:
	coverage run --source=src/.  -m pytest --ignore=tests/test_load_csv.py tests/
	coverage report

.PHONY run:
run:
	python manage.py runserver

.PHONY run-network:
run-network:
	python manage.py runserver 0.0.0.0:6969

.PHONY migrate:
migrate:
	python manage.py makemigrations && python manage.py migrate

.PHONY load:
load:
	python3 manage.py runscript load_semester

.PHONY load_data:
load_data:
	python manage.py runscript load_semester
