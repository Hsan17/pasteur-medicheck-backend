from pathlib import Path
import os
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# --- Debug / hosts
DEBUG = True  # put False later if you want
ALLOWED_HOSTS = [
    "pasteur-medicheck-backend.onrender.com",
    "127.0.0.1",
    "localhost",
]

load_dotenv()
A4F_API_KEY = os.getenv("A4F_API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",          # ← keep this
    "rest_framework",
    "medicaments",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",   # ← must be before CommonMiddleware
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"
WSGI_APPLICATION = "backend.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# --- Static
STATIC_URL = "/static/"
STATICFILES_DIRS = [
    BASE_DIR / "medicaments" / "static",   # make sure this folder exists
]
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- CORS / CSRF (IMPORTANT)
# Allow your frontend origins only (avoid Allow-All in production)
CORS_ALLOWED_ORIGINS = [
    "https://pasteur-medicheck-frontend.onrender.com",
    "http://localhost:5173",   # Vite dev
]

# So POST from your frontend passes CSRF checks
CSRF_TRUSTED_ORIGINS = [
    "https://pasteur-medicheck-frontend.onrender.com",
    "https://*.onrender.com",   # optional but handy on Render
]

# If you don’t need cookies across origins, keep credentials False
CORS_ALLOW_CREDENTIALS = False

# --- DRF: disable SessionAuthentication (so CSRF isn’t required for API)
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [],  # no SessionAuth ⇒ no CSRF for API views
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
}
