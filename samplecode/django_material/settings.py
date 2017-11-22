"""
Django settings for Purchasing project.

Generated by 'django-admin startproject' using Django 1.9.8.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '2bxrruev-5tegi@v&=u$eb-4r8#bmg59$@*1%tpiss(ilu5_3k'

# A boolean that turns on/off debug mode. When set to ``True``, stack traces
# are displayed for error pages. Should always be set to ``False`` in
# production. Best set to ``True`` in local_settings.py
DEBUG = True


ALLOWED_HOSTS = ['*']

DATE_INPUT_FORMATS = ('%m-%d-%Y')


# Application definition

INSTALLED_APPS = [
    'material',
    'material.admin',
    'material.frontend',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'jquery',
    'simple_search',
    'djangoformsetjs',
    # 'lxml',
    'openpyxl',
    # 'django.contrib.redirects',
    # 'django.contrib.postgres',
    # 'django.contrib.sites',

    'django.contrib.humanize',
    'MakePurchase',
    'homepage',
    'Management',
    'Status',

]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_material.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'homepage/templates'),
            os.path.join(BASE_DIR, 'MakePurchase/templates'),
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

WSGI_APPLICATION = 'django_material.wsgi.application'


#############
# DATABASES #
#############

DATABASES = {
    "default": {
        # Add "postgresql_psycopg2", "mysql", "sqlite3" or "oracle".
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        # DB name or path to database file if using sqlite3.
        "NAME": "purchasing",
        # Not used with sqlite3.
        "USER": "purchasing",
        # Not used with sqlite3.
        "PASSWORD": "EOkZDamHO2HGAEuc$N+ztyYmr2LfxKGs",
        # Set to empty string for localhost. Not used with sqlite3.
        "HOST": "sql.chem.byu.edu",
        # Set to empty string for default. Not used with sqlite3.
        "PORT": "5432",
    }
    # "old_db": {
    #     "ENGINE": "django.db.backends.postgresql_psycopg2",
    #     "NAME": "purchaserequisition",
    #     "USER": "pruser",
    #     "PASSWORD": "",
    #     "HOST": "sql.chem.byu.edu",
    #     "PORT": "5432",
    # }

}

# LDAP, chem_auth, and IPA
AUTHENTICATION_BACKENDS = ('chem_auth.auth_backends.PopulatedCASBackend',)

AUTH_MAP_LDAP_GROUPS = False

AUTH_MAPPER = "chem_auth.auth_backends.mappings.LDAPMapping"

# Contained in this list are the groups from IPA allowed admin privileges
AUTH_IS_STAFF = ["busoffice"]

FILE_UPLOAD_HANDLERS = [
        "django.core.files.uploadhandler.MemoryFileUploadHandler",
        "django.core.files.uploadhandler.TemporaryFileUploadHandler"]

LOGIN_URL = "accounts/login"

# Email configuration details
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = '587'
EMAIL_HOST_USER = 'donotreply@chem.byu.edu'
EMAIL_HOST_PASSWORD = 'RvBbAauy4UxKJ1gVm9s8Zrt0APleRA8a'
DEFAULT_FROM_EMAIL = 'BYU Chemistry Dept <donotreply@chem.byu.edu>'
SERVER_EMAIL = EMAIL_HOST_USER
EMAIL_USE_TLS = True


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = False


PROJECT_APP_PATH = os.path.dirname(os.path.abspath(__file__))
PROJECT_APP = os.path.basename(PROJECT_APP_PATH)
PROJECT_ROOT = BASE_DIR = os.path.dirname(PROJECT_APP_PATH)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/
# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = "/static/"

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
STATIC_ROOT = os.path.join(PROJECT_ROOT, STATIC_URL.strip("/"))

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(PROJECT_ROOT, MEDIA_URL.strip("/"))

f = os.path.join(PROJECT_APP_PATH, "local_settings.py")
if os.path.exists(f):
    import sys
    import imp
    module_name = "%s.local_settings" % PROJECT_APP
    module = imp.new_module(module_name)
    module.__file__ = f
    sys.modules[module_name] = module
    exec(open(f, "rb").read())
