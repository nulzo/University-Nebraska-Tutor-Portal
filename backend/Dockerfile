FROM python:3.11-alpine3.18

# Install Poetry
ENV POETRY_VENV=/opt/poetry-venv
ENV POETRY_VERSION=1.6.1
ENV POETRY_HOME=/opt/poetry
ENV DEBUG=True
ENV SECRET_KEY=fkwsueyfgsekfg
ENV DJANGO_SUPERUSER_PASSWORD=test
ENV DJANGO_SUPERUSER_USERNAME=test
ENV DJANGO_SUPERUSER_EMAIL=test@test.com
ENV PYTHONUNBUFFERED=1

# Set Port
ENV PORT=6969

# Ensure poetry is decoupled from the base interpreter
RUN python3 -m venv $POETRY_VENV \
    && $POETRY_VENV/bin/pip install -U pip setuptools \
    && $POETRY_VENV/bin/pip install poetry==${POETRY_VERSION}

# Configure Poetry to the path of container
ENV PATH="${PATH}:${POETRY_VENV}/bin"

# Set the working directory
WORKDIR /backend/

# Copy dep file over
COPY poetry.lock pyproject.toml ./
COPY base /backend/base

# Install poetry deps
RUN poetry install --no-interaction --no-cache

# Copy application over
COPY . /backend/

# Start the backend
EXPOSE "$PORT"
CMD ["poetry", "run", "python3", "manage.py", "runserver", "0.0.0.0:6969"]
