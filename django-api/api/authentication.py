import os
import jwt
from rest_framework import authentication
from rest_framework import exceptions
from api.models import User

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return None

        token = parts[1]
        secret = os.getenv('JWT_SECRET', 'change-me-secret-key-xyz-123-abc-456')

        try:
            payload = jwt.decode(token, secret, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')

        user_id = payload.get('sub')
        if not user_id:
            raise exceptions.AuthenticationFailed('Invalid token payload')

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')

        if not user.is_active:
            raise exceptions.AuthenticationFailed('User is inactive')

        return (user, token)


try:
    from drf_spectacular.extensions import OpenApiAuthenticationExtension

    class JWTAuthenticationScheme(OpenApiAuthenticationExtension):
        target_class = 'api.authentication.JWTAuthentication'
        name = 'BearerAuth'

        def get_security_definition(self, auto_schema):
            return {
                'type': 'http',
                'scheme': 'bearer',
                'bearerFormat': 'JWT',
                'description': 'JWT Bearer token. Enter your access token without "Bearer ".'
            }
except ImportError:
    pass

