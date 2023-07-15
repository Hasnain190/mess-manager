"""
Django settings for mess_manager project.

Generated by 'django-admin startproject' using Django 3.2.9.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""


from pathlib import Path
import os
from datetime import timedelta
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# django setting environment variable

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'Ve(14KzaIi>`_T_6|(n(dRkB_#0?]YP}9^sq=[omJ/&2t&4ayt=FK=|GjuU0Z4'

# SECURITY WARNING: don't run with debug turned on in production!
# Production Mode Settings
DEBUG = False
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True
# SECURE_SSL_REDIRECT = True

ALLOWED_HOSTS = ["127.0.0.1","13.127.120.227","localhost"]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'backend',
    'rest_framework',
    'rest_framework_simplejwt',
    'djoser',







]

MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    #  'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# INTERNAL_IPS = [

#     '127.0.0.1',

# ]
ROOT_URLCONF = 'mess_manager.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # DIRS is a list of filesystem directories to check when loading Django templates; it’s a search path.
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
            os.path.join(BASE_DIR, 'frontend/build')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
CORS_ALLOW_ALL_ORIGINS = True
WSGI_APPLICATION = 'mess_manager.wsgi.application'
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (

        'rest_framework_simplejwt.authentication.JWTAuthentication',


    )

}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),

    'AUTH_HEADER_TYPES': ('JWT', 'Bearer'),

    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',
                           'rest_framework_simplejwt.authentication.JWTAuthentication',
                           ),

}

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'messdb',
        'USER': 'postgres',
        'PASSWORD': "Asd890ml",
        'HOST': "localhost",
        'PORT': ''
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Karachi'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/
# URL to use when referring to static files located in STATIC_ROOT.
# It must end in a slash if set to a non-empty value.
STATIC_URL = '/static/'

# This setting defines the additional locations the staticfiles app will traverse if the FileSystemFinder finder is enabled, e.g. if you use the collectstatic or findstatic management command or use the static file serving view.This should be set to a list of strings that contain full paths to your additional files directory(ies)
STATICFILES_DIRS = [

    BASE_DIR / 'frontend/build/static',
    # os.path.join(BASE_DIR, 'frontend/build/static')
]
# static file root
MEDIA_ROOT = BASE_DIR / 'static/images'

# django-admin collectstatic
# Collects the static files into STATIC_ROOT.
STATIC_ROOT = BASE_DIR / 'staticfiles'


# when `python manage.py collectstatics` is run , it will look through all static directories in the INSTALLED_APPS and also through directories provided in STATICFILES_DIRS then it will collect them in STATIC_ROOT ,which we can use through STATIC_URL in the html file `static` tag

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'backend.User'

AUTHENTICATION_BACKENDS = (
    'backend.backends.EmailorUsernameModelBackend',

)
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
