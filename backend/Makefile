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

.PHONY typecheck:
typecheck:
	mypy api/endpoints --exclude .venv --warn-unused-configs --disallow-untyped-calls --disallow-untyped-defs --check-untyped-defs --disallow-untyped-decorators --warn-redundant-casts --warn-unused-ignores --disallow-incomplete-defs --warn-return-any --strict-equality --extra-checks --warn-unreachable --no-implicit-reexport --extra-checks --show-error-context --show-column-numbers --pretty --force-uppercase-builtins --raise-exceptions --warn-unused-configs

.PHONY test:
test:
	coverage run --source=api/. -m pytest tests/ 

.PHONY test-with-coverage:
test-with-coverage:
	coverage run --source=api/. -m pytest tests/
	coverage report

.PHONY test-for-pipeline:
test-for-pipeline:
	coverage run --source=api/.  -m pytest --ignore=tests/test_load_csv.py tests/
	coverage report

.PHONY run-win:
run-win:
	python manage.py runserver

.PHONY start-backend-only:
start-backend-only:
	python3 manage.py runserver 0.0.0.0:6969

.PHONY migrate:
migrate:
	python manage.py makemigrations && python manage.py migrate

.PHONY load-semester:
load-semester:
	python3 manage.py runscript load_semester

.PHONY load-semester-win:
load-semester-win:
	python manage.py runscript load_semester
