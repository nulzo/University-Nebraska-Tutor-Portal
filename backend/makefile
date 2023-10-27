.PHONY lint:
lint:
	ruff .
	pylint * --reports yes
	autoflake -r . --check
	flake8 . --color always --count --statistics
	black . --check

.PHONY format:
format:
	autoflake . --in-place --remove-all-unused-imports --stdout
	isort .
	black .

.PHONY test:
test:
	pytest .