import os
from pathlib import Path
from urllib.parse import urlparse
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from the same .env file
dotenv_path = os.path.join(BASE_DIR, '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
else:
    fallback_dotenv = os.path.abspath(os.path.join(BASE_DIR, '..', 'nest-api', '.env'))
    load_dotenv(fallback_dotenv)

# Security settings
SECRET_KEY = os.getenv('JWT_SECRET', 'django-insecure-t0e@o=%-3i-myi)3rs8h)t4n=(!i8&z++lao$u&bereja_mhsp')
DEBUG = True
ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party
    'rest_framework',
    'drf_spectacular',
    'corsheaders',
    
    # Custom apps
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Needs to be above CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_api.wsgi.application'

# Database Configuration (SQLite default, PostgreSQL secondary)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DATABASE_URL = os.getenv('DATABASE_URL')
# if DATABASE_URL:
#     url = urlparse(DATABASE_URL)
#     postgres_db = {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': url.path[1:],
#         'USER': url.username,
#         'PASSWORD': url.password,
#         'HOST': url.hostname,
#         'PORT': url.port or 5432,
#         'OPTIONS': {
#             'options': '-c search_path=public'
#         }
#     }
#     DATABASES['postgres'] = postgres_db
#     DATABASES['secondary'] = postgres_db

# Password validation
AUTH_PASSWORD_VALIDATORS = []

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'api.authentication.JWTAuthentication',
    ],
    'UNAUTHENTICATED_USER': None,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# Spectacular / OpenAPI 3.0 Documentation Settings
SPECTACULAR_SETTINGS = {
    'TITLE': 'Zelani Coffee API',
    'DESCRIPTION': 'Comprehensive REST API documentation for Zelani Coffee e-commerce platform covering authentication, user management, products catalog, cart operations, orders, payment processing, shipping tracking, and file uploads.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'COMPONENT_SPLIT_REQUEST': True,
    'SCHEMA_PATH_PREFIX': r'/api',
    'TAGS': [
        {'name': 'General', 'description': 'Health check and root service info'},
        {'name': 'Auth', 'description': 'Authentication, registration, JWT token refresh and logout'},
        {'name': 'Users', 'description': 'User profile management and admin user administration'},
        {'name': 'Products', 'description': 'Coffee catalog, blends, roasts and pricing'},
        {'name': 'Cart', 'description': 'Shopping cart management and cart item removal'},
        {'name': 'Orders', 'description': 'Order placement, order history, reference lookup, and status updates'},
        {'name': 'Payments', 'description': 'Payment initiation (M-Pesa, Card, PayPal) and transaction logs'},
        {'name': 'Shipping', 'description': 'DHL shipping tracking and logistics integration'},
        {'name': 'Files', 'description': 'Secure multipart file uploads and streaming downloads'},
    ],
    'SWAGGER_UI_SETTINGS': {
        'deepLinking': True,
        'persistAuthorization': True,
        'displayOperationId': True,
        'filter': True,
    },
}


# CORS configuration (hardcoded without relying on environment variables)
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8081',
    'http://127.0.0.1:8081',
    'https://zelanicoffee.com',
    'http://zelanicoffee.com',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8081',
    'http://127.0.0.1:8081',
]

