"""
Settings for University-Nebraska-Tutor-Portal project.
"""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv

from utils.terminal_color import Colors

PROJECT_NAME = "University-Nebraska-Tutor-Portal"
BASE_DIR = Path(__file__).resolve().parent.parent
SOURCE_DIR = os.path.join(BASE_DIR, "backend/../src")
sys.path.insert(0, SOURCE_DIR)

print(
    f"\n{Colors.CYAN}LOADING PROJECT:\t{Colors.END}"
    f"{Colors.YELLOW}{PROJECT_NAME}{Colors.END}"
)
print(
    f"{Colors.CYAN}BASE DIRECTORY:\t\t{Colors.END}"
    f"{Colors.YELLOW}{BASE_DIR}{Colors.END}"
)
print(
    f"{Colors.CYAN}SOURCE DIRECTORY:\t{Colors.END}"
    f"{Colors.YELLOW}{SOURCE_DIR}{Colors.END}"
)

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG")

ALLOWED_HOSTS: list[str] = []

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "backend.src.portal",
    "backend.src.api",
    "corsheaders"
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)

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
STATIC_DIR = os.path.join(BASE_DIR, "../static")
STATICFILES_DIRS = [STATIC_DIR]
print(
    f"{Colors.CYAN}STATIC DIRECTORY:\t{Colors.END}"
    f"{Colors.YELLOW}{STATIC_DIR}{Colors.END}"
)
print(
    f"{Colors.CYAN}TEMPLATE DIRECTORY:\t{Colors.END}"
    f"{Colors.YELLOW}{TEMPLATES[0].get('DIRS')[0]}{Colors.END}\n"
)

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

CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5"

CRISPY_TEMPLATE_PACK = "bootstrap5"

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
