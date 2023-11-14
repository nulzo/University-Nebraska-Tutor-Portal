.PHONY lint:
lint:
	npx eslint .
	npx prettier . --check

.PHONY format:
format:
	npx prettier . --write

.PHONY test:
test:
	npx jest

.PHONY watch:
watch:
	npx tailwindcss --watch -i ./src/style/globals.css -o ./src/style/output.css

.PHONY run:
run:
	npm run dev