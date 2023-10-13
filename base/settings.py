"""
Settings for University-Nebraska-Tutor-Portal project.
"""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv

from bruhcolor import bruhcolored
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "base.settings")
PROJECT_NAME = "University-Nebraska-Tutor-Portal"
BASE_DIR = Path(__file__).resolve().parent.parent
SOURCE_DIR = os.path.join(BASE_DIR, "backend/src")
sys.path.insert(0, SOURCE_DIR)

print()
print(bruhcolored("Loading Project:\t", color="light_magenta"), end=" ")
print(bruhcolored(PROJECT_NAME, color="light_cyan", attrs=["bold"]))
print(bruhcolored("Base Directory: \t", color="light_magenta"), end=" ")
print(bruhcolored(BASE_DIR, color="light_cyan", attrs=["bold"]))
print(bruhcolored("Source Directory:\t", color="light_magenta"), end=" ")
print(bruhcolored(SOURCE_DIR, color="light_cyan", attrs=["bold"]))
print()

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG")

try:
    if SECRET_KEY and DEBUG:
        print(bruhcolored("Successfully Loaded Environment Variables", color="light_green", attrs=["bold"]))
        print()
except SyntaxError:
    print(bruhcolored("Could Not Load Environment Variables", color="red", attrs=["bold"]))
    print()

ALLOWED_HOSTS: list[str] = []

INSTALLED_APPS = [
    'daphne',
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "backend.src.api",
    "corsheaders",
    "channels"
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
# CORS_ORIGIN_WHITELIST = ("http://localhost:5173",)

ASGI_APPLICATION = "backend.src.api.routing.application"
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': "channels.layers.InMemoryChannelLayer"
        }
    }

MESSAGE_STORAGE = "django.contrib.messages.storage.cookie.CookieStorage"

ROOT_URLCONF = "base.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "backend/templates"],
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
# STATIC_DIR = os.path.join(BASE_DIR, "backend/static")
# STATICFILES_DIRS = [STATIC_DIR]

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
