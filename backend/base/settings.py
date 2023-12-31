"""
Settings for University-Nebraska-Tutor-Portal project.
"""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "base.settings")

PROJECT_NAME = "University-Nebraska-Tutor-Portal"

BASE_DIR = Path(__file__).resolve().parent.parent

SOURCE_DIR = os.path.join(BASE_DIR, "api")

sys.path.insert(0, SOURCE_DIR)

load_dotenv()

# SECRET_KEY = os.getenv("SECRET_KEY")
SECRET_KEY = "secret_key"
# DEBUG = os.getenv("DEBUG")
DEBUG = True
RUN_SERVER_PORT = 6969

ALLOWED_HOSTS: list[str] = ["*", "http://localhost", "localhost"]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:4200",
    "http://localhost:6969",
]

INSTALLED_APPS = [
    # 'daphne',
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "api",
    "corsheaders",
    "channels",
    "django_extensions",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_ALL_ORIGINS = True

ASGI_APPLICATION = "api.routing.application"
CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}

MESSAGE_STORAGE = "django.contrib.messages.storage.cookie.CookieStorage"

ROOT_URLCONF = "base.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "base.wsgi.application"

LOGIN_REDIRECT_URL = "/"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

SITE_ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"

TIME_ZONE = "America/Chicago"

USE_I18N = True

USE_TZ = True

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

GRAPH_MODELS = {
    "all_applications": True,
    "group_models": True,
}
