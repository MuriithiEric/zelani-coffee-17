import os
import uuid
import datetime
import jwt
import argon2
import urllib.request
import urllib.parse
import json
from mimetypes import guess_type
from django.db import connection, transaction
from django.db.models import Q
from django.contrib.auth.models import User as DjangoUser
from django.contrib.auth.hashers import check_password
from django.http import FileResponse, Http404, HttpResponse
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter, OpenApiTypes

from api.models import User, Product, Order, OrderItem, File, Payment, CartItem
from api.authentication import JWTAuthentication
from api.permissions import IsAdmin, IsAdminOrRoaster
from api.serializers import (
    MessageResponseSerializer,
    SuccessResponseSerializer,
    HealthCheckResponseSerializer,
    UserSummarySerializer,
    AuthResponseSerializer,
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserDetailSerializer,
    UserUpdateSerializer,
    ProductSerializer,
    ProductCreateSerializer,
    ProductUpdateSerializer,
    CartItemDetailSerializer,
    CartItemCreatedSerializer,
    AddToCartRequestSerializer,
    OrderItemSerializer,
    OrderCreateRequestSerializer,
    OrderResponseSerializer,
    OrderStatusUpdateRequestSerializer,
    PaymentRecordSerializer,
    PaymentCreateRequestSerializer,
    InitiatePaymentRequestSerializer,
    InitiatePaymentResponseSerializer,
    ShippingTrackRequestSerializer,
    FileUploadRequestSerializer,
    FileRecordSerializer,
)

ph = argon2.PasswordHasher()

def get_storage_root():
    raw_path = os.getenv('STORAGE_PATH', os.path.join(os.getcwd(), 'storage'))
    return os.path.abspath(raw_path)

def generate_tokens(user):
    secret = os.getenv('JWT_SECRET', 'change-me-secret-key-xyz-123-abc-456')
    refresh_secret = os.getenv('JWT_REFRESH_SECRET', 'change-me-refresh-key-xyz-123-abc-456')
    
    now = datetime.datetime.now(datetime.timezone.utc)
    access_exp = now + datetime.timedelta(minutes=15)
    refresh_exp = now + datetime.timedelta(days=7)
    
    access_payload = {
        'email': user.email,
        'sub': str(user.id),
        'role': user.role,
        'exp': access_exp
    }
    
    refresh_payload = {
        'email': user.email,
        'sub': str(user.id),
        'role': user.role,
        'exp': refresh_exp
    }
    
    access_token = jwt.encode(access_payload, secret, algorithm='HS256')
    refresh_token = jwt.encode(refresh_payload, refresh_secret, algorithm='HS256')
    
    return {
        'accessToken': access_token,
        'refreshToken': refresh_token,
        'user': {
            'id': str(user.id),
            'email': user.email,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'role': user.role,
        }
    }

# Seed products if empty
seed_products = [
  {
    "id": "double-espresso",
    "name": "Double Espresso",
    "description": "Double Espresso is a double shot of espresso that is made with double amount of coffee.",
    "price": 59.99,
    "image": "/lovable-uploads/4c88326b-c4a8-48f1-8877-1c643256d8bf.png",
    "grind": "Standard",
    "size": "Double Shot",
    "tastingNotes": ["Intense", "Rich Cocoa"],
    "details": "Double Espresso is a double shot of espresso that is made with double amount of coffee. Perfectly extracted to bring out the maximum concentration of coffee flavor, crema, and body.",
    "isKes": False
  },
  {
    "id": "caramel-frappe",
    "name": "Caramel Frappe",
    "description": "Caramel Frappe is a delicious blended coffee drink made with caramel sauce, milk and coffee.",
    "price": 12.99,
    "image": "/lovable-uploads/5df176de-0b1d-46e9-b1ae-d4641f01c915.png",
    "grind": "Blended",
    "size": "Regular",
    "tastingNotes": ["Sweet Caramel", "Vanilla", "Milk"],
    "details": "Caramel Frappe is a delicious blended coffee drink made with caramel sauce, milk and coffee. Blended to icy perfection and topped with rich caramel drizzle.",
    "isKes": False
  },
  {
    "id": "iced-coffee",
    "name": "Iced Coffee",
    "description": "Iced Coffee is a cold coffee drink made with brewed coffee, milk and sugar.",
    "price": 9.99,
    "image": "/lovable-uploads/6fcd7107-6cd4-4614-be92-a694e1243d0c.png",
    "grind": "Standard",
    "size": "Regular",
    "tastingNotes": ["Sweet", "Refreshing Milk"],
    "details": "Iced Coffee is a cold coffee drink made with brewed coffee, milk and sugar. Served over ice to keep you refreshed throughout the day.",
    "isKes": False
  },
  {
    "id": "premium-dark-roast-1kg",
    "name": "Premium Dark Roast (1kg)",
    "description": "Bold and rich Arabica from Kirinyaga highlands. Our largest size for true dark roast enthusiasts.",
    "price": 2700,
    "image": "/lovable-uploads/premium-dark-roast-1kg.jpeg",
    "grind": "Whole Beans",
    "size": "1kg",
    "tastingNotes": ["Dark Chocolate", "Black Cherry", "Citrus"],
    "details": "Our Premium Dark Roast delivers bold, intense flavors with a full body. Sourced from smallholder farmers in Kirinyaga County, these whole beans are carefully hand-picked at peak ripeness and roasted to perfection.",
    "isKes": True
  },
  {
    "id": "premium-dark-roast-125g",
    "name": "Premium Dark Roast (125g)",
    "description": "Bold and rich Arabica from Kirinyaga highlands. Perfect starter size to discover our bold dark roast.",
    "price": 400,
    "image": "/lovable-uploads/premium-dark-roast-125g.jpeg",
    "grind": "Whole Beans",
    "size": "125g",
    "tastingNotes": ["Dark Chocolate", "Black Cherry", "Citrus"],
    "details": "Our Premium Dark Roast delivers bold, intense flavors with a full body. This compact 125g package is perfect for trying our signature dark roast.",
    "isKes": True
  },
  {
    "id": "premium-dark-roast-500g",
    "name": "Premium Dark Roast (500g)",
    "description": "Bold and rich Arabica from Kirinyaga highlands. The ideal mid-size option for regular dark roast drinkers.",
    "price": 1400,
    "image": "/lovable-uploads/premium-dark-roast-500g.jpeg",
    "grind": "Whole Beans",
    "size": "500g",
    "tastingNotes": ["Dark Chocolate", "Black Cherry", "Citrus"],
    "details": "Our Premium Dark Roast delivers bold, intense flavors with a full body. Sourced from smallholder farmers in Kirinyaga County, these whole beans are carefully roasted to perfection.",
    "isKes": True
  },
  {
    "id": "premium-dark-roast-250g",
    "name": "Premium Dark Roast (250g)",
    "description": "Bold and rich Arabica from Kirinyaga highlands. The classic mid-size for everyday enjoyment.",
    "price": 750,
    "image": "/lovable-uploads/premium-dark-roast-250g.jpeg",
    "grind": "Whole Beans",
    "size": "250g",
    "tastingNotes": ["Dark Chocolate", "Black Cherry", "Citrus"],
    "details": "Our Premium Dark Roast delivers bold, intense flavors with a full body. This versatile 250g package is perfect for everyday coffee lovers.",
    "isKes": True
  },
  {
    "id": "premium-medium-roast-1kg",
    "name": "Premium Medium Roast (1kg)",
    "description": "Perfectly balanced Arabica with bright, complex flavors. Our largest size for true coffee enthusiasts.",
    "price": 2700,
    "image": "/lovable-uploads/premium-medium-roast-1kg.jpeg",
    "grind": "Medium Ground",
    "size": "1kg",
    "tastingNotes": ["Caramel", "Floral Notes", "Wine"],
    "details": "Our Premium Medium Roast strikes the perfect balance between acidity and body. Expertly ground to medium consistency, this coffee showcases the vibrant character of Kirinyaga beans.",
    "isKes": True
  },
  {
    "id": "premium-medium-roast-125g",
    "name": "Premium Medium Roast (125g)",
    "description": "Perfectly balanced Arabica with bright, complex flavors. Perfect starter size to discover our signature roast.",
    "price": 400,
    "image": "/lovable-uploads/premium-medium-roast-125g.jpeg",
    "grind": "Medium Ground",
    "size": "125g",
    "tastingNotes": ["Caramel", "Floral Notes", "Wine"],
    "details": "Our Premium Medium Roast strikes the perfect balance between acidity and body. This compact 125g package is perfect for trying our signature roast.",
    "isKes": True
  },
  {
    "id": "premium-medium-roast-500g",
    "name": "Premium Medium Roast (500g)",
    "description": "Perfectly balanced Arabica with bright, complex flavors. The ideal mid-size option for regular coffee drinkers.",
    "price": 1400,
    "image": "/lovable-uploads/premium-medium-roast-500g.jpeg",
    "grind": "Medium Ground",
    "size": "500g",
    "tastingNotes": ["Caramel", "Floral Notes", "Wine"],
    "details": "Our Premium Medium Roast strikes the perfect balance between acidity and body. Expertly ground to medium consistency, showing sweet caramel notes.",
    "isKes": True
  },
  {
    "id": "premium-medium-roast-250g",
    "name": "Premium Medium Roast (250g)",
    "description": "Perfectly balanced Arabica with bright, complex flavors. The classic mid-size for everyday enjoyment.",
    "price": 750,
    "image": "/lovable-uploads/premium-medium-roast-250g.jpeg",
    "grind": "Medium Ground",
    "size": "250g",
    "tastingNotes": ["Caramel", "Floral Notes", "Wine"],
    "details": "Our Premium Medium Roast strikes the perfect balance between acidity and body. This versatile 250g package is perfect for everyday coffee lovers.",
    "isKes": True
  }
]

def seed_data_if_needed():
    # Seed products
    if Product.objects.count() == 0:
        for item in seed_products:
            Product.objects.create(
                id=item['id'],
                name=item['name'],
                description=item['description'],
                price=item['price'],
                image=item['image'],
                grind=item['grind'],
                size=item['size'],
                tasting_notes=item['tastingNotes'],
                details=item['details'],
                is_kes=item.get('isKes', True)
            )
    # Seed admin user
    if User.objects.count() == 0:
        hashed = ph.hash("admin123")
        User.objects.create(
            email="admin@zelani.com",
            password_hash=hashed,
            first_name="Zelani",
            last_name="Admin",
            role="Admin"
        )

# General endpoints
@extend_schema(
    tags=['General'],
    summary='API Root Welcome',
    description='Returns API service name and seeds initial default products and admin user if database is empty.',
    responses={200: OpenApiTypes.STR}
)
@api_view(['GET'])
@permission_classes([AllowAny])
def welcome(request):
    seed_data_if_needed()
    return HttpResponse('Zelani Coffee API')

@extend_schema(
    tags=['General'],
    summary='System Health Check',
    description='Verifies database connectivity, storage directory permissions, and seeds initial data if needed.',
    responses={200: HealthCheckResponseSerializer}
)
@api_view(['GET'])
@permission_classes([AllowAny])
def health(request):
    try:
        seed_data_if_needed()
    except Exception:
        pass

    db_status = 'disconnected'
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            db_status = 'connected'
    except Exception:
        db_status = 'disconnected'

    storage_status = 'unavailable'
    try:
        root = get_storage_root()
        if not os.path.exists(root):
            os.makedirs(root, exist_ok=True)
        test_file = os.path.join(root, '.healthcheck')
        with open(test_file, 'w') as f:
            f.write('ok')
        os.remove(test_file)
        storage_status = 'available'
    except Exception:
        storage_status = 'unavailable'

    return Response({
        'status': 'ok' if db_status == 'connected' and storage_status == 'available' else 'error',
        'database': db_status,
        'storage': storage_status
    })

# Auth views
@extend_schema(
    tags=['Auth'],
    summary='Register Customer',
    description='Registers a new customer account and returns JWT access and refresh tokens.',
    request=UserRegistrationSerializer,
    responses={
        201: AuthResponseSerializer,
        400: MessageResponseSerializer,
        409: MessageResponseSerializer,
    }
)
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    email = data.get('email')
    password_hash = data.get('passwordHash')
    first_name = data.get('firstName')
    last_name = data.get('lastName')

    if not email or not password_hash:
        return Response({'message': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'message': 'Email already registered'}, status=status.HTTP_409_CONFLICT)

    hashed = ph.hash(password_hash)
    user = User.objects.create(
        email=email,
        password_hash=hashed,
        first_name=first_name,
        last_name=last_name,
        role='Customer'
    )
    return Response(generate_tokens(user), status=status.HTTP_201_CREATED)

@extend_schema(
    tags=['Auth'],
    summary='User Login',
    description='Authenticates user credentials and returns JWT access and refresh tokens.',
    request=UserLoginSerializer,
    responses={
        200: AuthResponseSerializer,
        400: MessageResponseSerializer,
        401: MessageResponseSerializer,
    }
)
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def login(request):
    data = request.data
    identifier = (data.get('email') or '').strip()
    password = data.get('passwordHash') or ''

    if not identifier or not password:
        return Response({'message': 'Email/username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    # 1. Check against Django superusers / staff users in auth_user
    django_user = DjangoUser.objects.filter(
        Q(username__iexact=identifier) | Q(email__iexact=identifier)
    ).first()

    if django_user and django_user.check_password(password):
        if not django_user.is_active:
            return Response({'message': 'Account is inactive'}, status=status.HTTP_401_UNAUTHORIZED)

        is_admin_user = django_user.is_superuser or django_user.is_staff

        # Find or create corresponding api.models.User
        user_email = django_user.email.strip() if django_user.email else ''
        api_user = None
        if user_email:
            api_user = User.objects.filter(email__iexact=user_email).first()
        if not api_user:
            api_user = User.objects.filter(email__iexact=identifier).first()
        if not api_user and '@' not in identifier:
            fallback_email = f"{django_user.username}@zelanicoffee.com"
            api_user = User.objects.filter(email__iexact=fallback_email).first()

        if api_user:
            if is_admin_user:
                api_user.role = 'Admin'
            api_user.is_active = True
            try:
                api_user.password_hash = ph.hash(password)
            except Exception:
                pass
            if django_user.first_name and not api_user.first_name:
                api_user.first_name = django_user.first_name
            if django_user.last_name and not api_user.last_name:
                api_user.last_name = django_user.last_name
            api_user.save()
        else:
            final_email = user_email or (identifier if '@' in identifier else f"{django_user.username}@zelanicoffee.com")
            api_user = User.objects.create(
                email=final_email,
                password_hash=ph.hash(password),
                first_name=django_user.first_name or django_user.username,
                last_name=django_user.last_name or ('Admin' if is_admin_user else ''),
                role='Admin' if is_admin_user else 'Customer',
                is_active=True
            )

        return Response(generate_tokens(api_user))

    # 2. Check against api.models.User
    api_user = User.objects.filter(email__iexact=identifier).first()
    if not api_user:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    if not api_user.is_active:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # Check password via Argon2 or fallback to Django hasher
    password_valid = False
    try:
        ph.verify(api_user.password_hash, password)
        password_valid = True
    except Exception:
        try:
            if check_password(password, api_user.password_hash):
                password_valid = True
                api_user.password_hash = ph.hash(password)
                api_user.save(update_fields=['password_hash'])
        except Exception:
            pass

    if not password_valid:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # If this user is an Admin, ensure synced to Django auth_user
    if api_user.role == 'Admin':
        username_candidate = api_user.email.split('@')[0]
        dj_user = DjangoUser.objects.filter(
            Q(username__iexact=username_candidate) | Q(email__iexact=api_user.email)
        ).first()
        if dj_user:
            if not dj_user.is_superuser or not dj_user.is_staff:
                dj_user.is_superuser = True
                dj_user.is_staff = True
            dj_user.set_password(password)
            dj_user.save()
        else:
            DjangoUser.objects.create_superuser(
                username=username_candidate,
                email=api_user.email,
                password=password,
                first_name=api_user.first_name or '',
                last_name=api_user.last_name or ''
            )

    return Response(generate_tokens(api_user))

@extend_schema(
    tags=['Auth'],
    summary='User Logout',
    description='Logs out the user on client side.',
    request=None,
    responses={200: SuccessResponseSerializer}
)
@api_view(['POST'])
@permission_classes([AllowAny])
def logout_user(request):
    return Response({'success': True, 'message': 'Logged out successfully'})

@extend_schema(
    tags=['Auth'],
    summary='Refresh JWT Tokens',
    description='Generates a new pair of JWT access and refresh tokens for the authenticated user.',
    request=None,
    responses={
        200: AuthResponseSerializer,
        401: MessageResponseSerializer,
    }
)
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def refresh_token(request):
    return Response(generate_tokens(request.user))

# Users views
@extend_schema(
    tags=['Users'],
    summary='List Users (Admin Only)',
    description='Returns a list of all registered user accounts. Requires Admin privileges.',
    responses={
        200: UserDetailSerializer(many=True),
        401: MessageResponseSerializer,
        403: MessageResponseSerializer,
    }
)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdmin])
def get_users(request):
    users = User.objects.all()
    res = []
    for u in users:
        res.append({
            'id': str(u.id),
            'email': u.email,
            'firstName': u.first_name,
            'lastName': u.last_name,
            'role': u.role,
            'isActive': u.is_active,
            'createdAt': u.created_at.isoformat(),
            'updatedAt': u.updated_at.isoformat()
        })
    return Response(res)

@extend_schema(
    tags=['Users'],
    summary='Get Current User Profile',
    description='Returns profile information of the currently authenticated user.',
    responses={
        200: UserDetailSerializer,
        401: MessageResponseSerializer,
    }
)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def me(request):
    u = request.user
    return Response({
        'id': str(u.id),
        'email': u.email,
        'firstName': u.first_name,
        'lastName': u.last_name,
        'role': u.role,
        'isActive': u.is_active,
        'createdAt': u.created_at.isoformat(),
        'updatedAt': u.updated_at.isoformat()
    })

@extend_schema(
    methods=['PATCH'],
    tags=['Users'],
    summary='Update User Profile (Admin Only)',
    description='Updates fields (role, active status, name, password) of a specific user. Requires Admin role.',
    parameters=[OpenApiParameter('pk', OpenApiTypes.UUID, OpenApiParameter.PATH, description='User UUID')],
    request=UserUpdateSerializer,
    responses={
        200: UserDetailSerializer,
        403: MessageResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@extend_schema(
    methods=['DELETE'],
    tags=['Users'],
    summary='Delete User Account (Admin Only)',
    description='Deletes a specific user account. Requires Admin role.',
    parameters=[OpenApiParameter('pk', OpenApiTypes.UUID, OpenApiParameter.PATH, description='User UUID')],
    responses={
        200: UserSummarySerializer,
        403: MessageResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['PATCH', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdmin])
def manage_user(request, pk):
    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        user.delete()
        return Response({
            'id': str(user.id),
            'email': user.email,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'role': user.role
        })

    data = request.data
    if 'role' in data:
        user.role = data['role']
    if 'is_active' in data:
        user.is_active = data['is_active']
    if 'firstName' in data:
        user.first_name = data['firstName']
    if 'lastName' in data:
        user.last_name = data['lastName']
    if 'passwordHash' in data and data['passwordHash']:
        user.password_hash = ph.hash(data['passwordHash'])

    user.save()
    return Response({
        'id': str(user.id),
        'email': user.email,
        'firstName': user.first_name,
        'lastName': user.last_name,
        'role': user.role
    })

# Products views
@extend_schema(
    methods=['GET'],
    tags=['Products'],
    summary='List All Products',
    description='Returns the full catalog of coffee products.',
    responses={200: ProductSerializer(many=True)}
)
@extend_schema(
    methods=['POST'],
    tags=['Products'],
    summary='Create Product (Admin Only)',
    description='Creates a new coffee product in the catalog. Requires Admin role.',
    request=ProductCreateSerializer,
    responses={
        201: ProductSerializer,
        403: MessageResponseSerializer,
    }
)
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def get_or_create_products(request):
    seed_data_if_needed()
    if request.method == 'POST':
        # Admin check manually or via decorator. Since we mix GET (AllowAny) and POST (Admin), we verify role manually
        auth_backend = JWTAuthentication()
        auth_res = auth_backend.authenticate(request)
        if not auth_res or auth_res[0].role.lower() != 'admin':
            return Response({'message': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        
        data = request.data
        prod = Product.objects.create(
            id=data.get('id'),
            name=data.get('name'),
            description=data.get('description'),
            price=data.get('price'),
            image=data.get('image'),
            grind=data.get('grind'),
            size=data.get('size'),
            tasting_notes=data.get('tastingNotes', []),
            details=data.get('details'),
            is_kes=data.get('isKes', True)
        )
        return Response({
            'id': prod.id,
            'name': prod.name,
            'description': prod.description,
            'price': prod.price,
            'image': prod.image,
            'grind': prod.grind,
            'size': prod.size,
            'tastingNotes': prod.tasting_notes,
            'details': prod.details,
            'isKes': prod.is_kes
        }, status=status.HTTP_201_CREATED)

    prods = Product.objects.all()
    res = []
    for p in prods:
        res.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'image': p.image,
            'grind': p.grind,
            'size': p.size,
            'tastingNotes': p.tasting_notes,
            'details': p.details,
            'isKes': p.is_kes,
            'createdAt': p.created_at.isoformat(),
            'updatedAt': p.updated_at.isoformat()
        })
    return Response(res)

@extend_schema(
    methods=['PUT'],
    tags=['Products'],
    summary='Update Product (Admin Only)',
    description='Updates product details. Requires Admin role.',
    parameters=[OpenApiParameter('pk', OpenApiTypes.STR, OpenApiParameter.PATH, description='Product slug / identifier')],
    request=ProductUpdateSerializer,
    responses={
        200: ProductSerializer,
        403: MessageResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@extend_schema(
    methods=['DELETE'],
    tags=['Products'],
    summary='Delete Product (Admin Only)',
    description='Deletes a product from the catalog. Requires Admin role.',
    parameters=[OpenApiParameter('pk', OpenApiTypes.STR, OpenApiParameter.PATH, description='Product slug / identifier')],
    responses={
        200: SuccessResponseSerializer,
        403: MessageResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdmin])
def manage_product(request, pk):
    try:
        prod = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        prod.delete()
        return Response({'success': True})

    data = request.data
    for field in ['name', 'description', 'price', 'image', 'grind', 'size', 'tastingNotes', 'details', 'isKes']:
        mapping = {'tastingNotes': 'tasting_notes', 'isKes': 'is_kes'}
        db_field = mapping.get(field, field)
        if field in data:
            setattr(prod, db_field, data[field])
    
    prod.save()
    return Response({
        'id': prod.id,
        'name': prod.name,
        'description': prod.description,
        'price': prod.price,
        'image': prod.image,
        'grind': prod.grind,
        'size': prod.size,
        'tastingNotes': prod.tasting_notes,
        'details': prod.details,
        'isKes': prod.is_kes
    })

# Cart views
@extend_schema(
    methods=['GET'],
    tags=['Cart'],
    summary='Get User Cart',
    description='Returns all items currently in the authenticated user shopping cart.',
    responses={200: CartItemDetailSerializer(many=True)}
)
@extend_schema(
    methods=['POST'],
    tags=['Cart'],
    summary='Add or Update Cart Item',
    description='Adds a product to the cart or updates quantity for the specific grind and size options.',
    request=AddToCartRequestSerializer,
    responses={
        200: CartItemCreatedSerializer,
        404: MessageResponseSerializer,
    }
)
@extend_schema(
    methods=['DELETE'],
    tags=['Cart'],
    summary='Clear Cart',
    description='Removes all items from the authenticated user shopping cart.',
    responses={200: SuccessResponseSerializer}
)
@api_view(['GET', 'POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def manage_cart(request):
    user = request.user
    if request.method == 'GET':
        items = CartItem.objects.filter(user=user).select_related('product')
        res = []
        for item in items:
            res.append({
                'id': str(item.id),
                'userId': str(item.user_id),
                'productId': item.product_id,
                'quantity': item.quantity,
                'grind': item.grind,
                'size': item.size,
                'createdAt': item.created_at.isoformat(),
                'updatedAt': item.updated_at.isoformat(),
                'product': {
                    'id': item.product.id,
                    'name': item.product.name,
                    'description': item.product.description,
                    'price': item.product.price,
                    'image': item.product.image,
                    'grind': item.product.grind,
                    'size': item.product.size,
                    'tastingNotes': item.product.tasting_notes,
                    'details': item.product.details,
                    'isKes': item.product.is_kes
                }
            })
        return Response(res)

    if request.method == 'DELETE':
        CartItem.objects.filter(user=user).delete()
        return Response({'success': True})

    data = request.data
    product_id = data.get('productId')
    quantity = data.get('quantity', 1)
    grind = data.get('grind', '') or ''
    size = data.get('size', '') or ''

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    item, created = CartItem.objects.get_or_create(
        user=user,
        product=product,
        grind=grind,
        size=size,
        defaults={'quantity': quantity}
    )
    if not created:
        item.quantity = quantity
        item.save()

    return Response({
        'id': str(item.id),
        'userId': str(item.user_id),
        'productId': item.product_id,
        'quantity': item.quantity,
        'grind': item.grind,
        'size': item.size,
        'product': {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'image': product.image
        }
    })

@extend_schema(
    tags=['Cart'],
    summary='Remove Cart Item',
    description='Removes a specific product item (matching productId, grind, and size) from the cart.',
    parameters=[
        OpenApiParameter('productId', OpenApiTypes.STR, OpenApiParameter.QUERY, required=True, description='Product identifier to remove'),
        OpenApiParameter('grind', OpenApiTypes.STR, OpenApiParameter.QUERY, required=False, description='Grind variation'),
        OpenApiParameter('size', OpenApiTypes.STR, OpenApiParameter.QUERY, required=False, description='Package size variation'),
    ],
    responses={
        200: SuccessResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def remove_cart_item(request):
    user = request.user
    product_id = request.query_params.get('productId')
    grind = request.query_params.get('grind', '') or ''
    size = request.query_params.get('size', '') or ''

    try:
        item = CartItem.objects.get(user=user, product_id=product_id, grind=grind, size=size)
        item.delete()
        return Response({'success': True})
    except CartItem.DoesNotExist:
        return Response({'message': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

# Orders views
@extend_schema(
    methods=['GET'],
    tags=['Orders'],
    summary='List All Orders (Admin / Roaster Only)',
    description='Retrieves all placed orders with items ordered by creation date descending. Requires Admin or Roaster role.',
    responses={
        200: OrderResponseSerializer(many=True),
        403: MessageResponseSerializer,
    }
)
@extend_schema(
    methods=['POST'],
    tags=['Orders'],
    summary='Place New Order',
    description='Creates a customer order along with line items.',
    request=OrderCreateRequestSerializer,
    responses={
        201: OrderResponseSerializer,
        409: MessageResponseSerializer,
    }
)
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def get_or_create_orders(request):
    if request.method == 'POST':
        data = request.data
        ref = data.get('orderReference')
        if Order.objects.filter(order_reference=ref).exists():
            return Response({'message': 'Order reference already exists'}, status=status.HTTP_409_CONFLICT)

        with transaction.atomic():
            order = Order.objects.create(
                order_reference=ref,
                total_amount=data.get('totalAmount'),
                currency=data.get('currency', 'KES'),
                payment_status=data.get('paymentStatus', 'pending'),
                intasend_tracking_id=data.get('intasendTrackingId'),
                customer_email=data.get('customerEmail'),
                customer_phone=data.get('customerPhone')
            )
            for item in data.get('items', []):
                OrderItem.objects.create(
                    order=order,
                    product_id=item.get('productId'),
                    product_name=item.get('productName'),
                    quantity=item.get('quantity'),
                    unit_price=item.get('unitPrice'),
                    grind=item.get('grind'),
                    size=item.get('size')
                )

        items_res = [{
            'id': str(i.id),
            'orderId': str(i.order_id),
            'productId': i.product_id,
            'productName': i.product_name,
            'quantity': i.quantity,
            'unitPrice': str(i.unit_price),
            'grind': i.grind,
            'size': i.size,
            'createdAt': i.created_at.isoformat()
        } for i in order.order_items.all()]

        return Response({
            'id': str(order.id),
            'orderReference': order.order_reference,
            'totalAmount': str(order.total_amount),
            'currency': order.currency,
            'paymentStatus': order.payment_status,
            'intasendTrackingId': order.intasend_tracking_id,
            'customerEmail': order.customer_email,
            'customerPhone': order.customer_phone,
            'createdAt': order.created_at.isoformat(),
            'updatedAt': order.updated_at.isoformat(),
            'orderItems': items_res
        }, status=status.HTTP_201_CREATED)

    # GET (Admin/Roaster only)
    auth_backend = JWTAuthentication()
    auth_res = auth_backend.authenticate(request)
    if not auth_res or auth_res[0].role.lower() not in ['admin', 'roaster']:
        return Response({'message': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)

    orders = Order.objects.prefetch_related('order_items').all().order_by('-created_at')
    res = []
    for o in orders:
        res.append({
            'id': str(o.id),
            'orderReference': o.order_reference,
            'totalAmount': str(o.total_amount),
            'currency': o.currency,
            'paymentStatus': o.payment_status,
            'intasendTrackingId': o.intasend_tracking_id,
            'customerEmail': o.customer_email,
            'customerPhone': o.customer_phone,
            'createdAt': o.created_at.isoformat(),
            'updatedAt': o.updated_at.isoformat(),
            'orderItems': [{
                'id': str(i.id),
                'orderId': str(i.order_id),
                'productId': i.product_id,
                'productName': i.product_name,
                'quantity': i.quantity,
                'unitPrice': str(i.unit_price),
                'grind': i.grind,
                'size': i.size,
                'createdAt': i.created_at.isoformat()
            } for i in o.order_items.all()]
        })
    return Response(res)

@extend_schema(
    tags=['Orders'],
    summary='List Customer Orders',
    description='Retrieves all orders placed by the currently authenticated user matching their email.',
    responses={200: OrderResponseSerializer(many=True)}
)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(customer_email=request.user.email).prefetch_related('order_items').order_by('-created_at')
    res = []
    for o in orders:
        res.append({
            'id': str(o.id),
            'orderReference': o.order_reference,
            'totalAmount': str(o.total_amount),
            'currency': o.currency,
            'paymentStatus': o.payment_status,
            'intasendTrackingId': o.intasend_tracking_id,
            'customerEmail': o.customer_email,
            'customerPhone': o.customer_phone,
            'createdAt': o.created_at.isoformat(),
            'updatedAt': o.updated_at.isoformat(),
            'orderItems': [{
                'id': str(i.id),
                'orderId': str(i.order_id),
                'productId': i.product_id,
                'productName': i.product_name,
                'quantity': i.quantity,
                'unitPrice': str(i.unit_price),
                'grind': i.grind,
                'size': i.size,
                'createdAt': i.created_at.isoformat()
            } for i in o.order_items.all()]
        })
    return Response(res)

@extend_schema(
    tags=['Orders'],
    summary='Get Order by Reference',
    description='Fetches order details and items using the unique order reference code.',
    parameters=[OpenApiParameter('ref', OpenApiTypes.STR, OpenApiParameter.PATH, description='Order reference code (e.g. ORD-1724839201-ABCD)')],
    responses={
        200: OrderResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['GET'])
@permission_classes([AllowAny])
def order_by_reference(request, ref):
    try:
        o = Order.objects.prefetch_related('order_items').get(order_reference=ref)
    except Order.DoesNotExist:
        return Response({'message': f'Order with reference {ref} not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response({
        'id': str(o.id),
        'orderReference': o.order_reference,
        'totalAmount': str(o.total_amount),
        'currency': o.currency,
        'paymentStatus': o.payment_status,
        'intasendTrackingId': o.intasend_tracking_id,
        'customerEmail': o.customer_email,
        'customerPhone': o.customer_phone,
        'createdAt': o.created_at.isoformat(),
        'updatedAt': o.updated_at.isoformat(),
        'orderItems': [{
            'id': str(i.id),
            'orderId': str(i.order_id),
            'productId': i.product_id,
            'productName': i.product_name,
            'quantity': i.quantity,
            'unitPrice': str(i.unit_price),
            'grind': i.grind,
            'size': i.size,
            'createdAt': i.created_at.isoformat()
        } for i in o.order_items.all()]
    })

@extend_schema(
    tags=['Orders'],
    summary='Update Order Status (Admin / Roaster Only)',
    description='Updates the payment/fulfillment status of an existing order. Requires Admin or Roaster role.',
    parameters=[OpenApiParameter('pk', OpenApiTypes.UUID, OpenApiParameter.PATH, description='Order UUID')],
    request=OrderStatusUpdateRequestSerializer,
    responses={
        200: OrderResponseSerializer,
        403: MessageResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminOrRoaster])
def update_order_status(request, pk):
    try:
        o = Order.objects.get(id=pk)
    except Order.DoesNotExist:
        return Response({'message': f'Order with ID {pk} not found'}, status=status.HTTP_404_NOT_FOUND)

    status_val = request.data.get('payment_status')
    if status_val:
        o.payment_status = status_val
        o.save()

    return Response({
        'id': str(o.id),
        'orderReference': o.order_reference,
        'totalAmount': str(o.total_amount),
        'currency': o.currency,
        'paymentStatus': o.payment_status,
        'intasendTrackingId': o.intasend_tracking_id,
        'customerEmail': o.customer_email,
        'customerPhone': o.customer_phone,
        'createdAt': o.created_at.isoformat(),
        'updatedAt': o.updated_at.isoformat(),
        'orderItems': [{
            'id': str(i.id),
            'orderId': str(i.order_id),
            'productId': i.product_id,
            'productName': i.product_name,
            'quantity': i.quantity,
            'unitPrice': str(i.unit_price),
            'grind': i.grind,
            'size': i.size,
            'createdAt': i.created_at.isoformat()
        } for i in o.order_items.all()]
    })

# Payments views
@extend_schema(
    methods=['GET'],
    tags=['Payments'],
    summary='List Payment Logs (Admin Only)',
    description='Retrieves all transaction logs and associated order metadata. Requires Admin role.',
    responses={
        200: PaymentRecordSerializer(many=True),
        403: MessageResponseSerializer,
    }
)
@extend_schema(
    methods=['POST'],
    tags=['Payments'],
    summary='Record Payment Log',
    description='Stores a new payment transaction log record for an order.',
    request=PaymentCreateRequestSerializer,
    responses={
        201: PaymentRecordSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def payments_logs(request):
    if request.method == 'POST':
        data = request.data
        order_id = data.get('orderId')
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({'message': f'Order with ID {order_id} not found'}, status=status.HTTP_404_NOT_FOUND)

        p = Payment.objects.create(
            order=order,
            payment_method=data.get('paymentMethod'),
            amount=data.get('amount'),
            currency=data.get('currency', 'KES'),
            status=data.get('status', 'pending'),
            transaction_id=data.get('transactionId')
        )
        return Response({
            'id': str(p.id),
            'orderId': str(p.order_id),
            'paymentMethod': p.payment_method,
            'amount': str(p.amount),
            'currency': p.currency,
            'status': p.status,
            'transactionId': p.transaction_id,
            'createdAt': p.created_at.isoformat(),
            'updatedAt': p.updated_at.isoformat()
        }, status=status.HTTP_201_CREATED)

    # GET (Admin only)
    auth_backend = JWTAuthentication()
    auth_res = auth_backend.authenticate(request)
    if not auth_res or auth_res[0].role.lower() != 'admin':
        return Response({'message': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)

    payments = Payment.objects.select_related('order').all().order_by('-created_at')
    res = []
    for p in payments:
        res.append({
            'id': str(p.id),
            'orderId': str(p.order_id),
            'paymentMethod': p.payment_method,
            'amount': str(p.amount),
            'currency': p.currency,
            'status': p.status,
            'transactionId': p.transaction_id,
            'createdAt': p.created_at.isoformat(),
            'updatedAt': p.updated_at.isoformat(),
            'order': {
                'id': str(p.order.id),
                'orderReference': p.order.order_reference,
                'totalAmount': str(p.order.total_amount),
                'currency': p.order.currency,
                'paymentStatus': p.order.payment_status,
                'intasendTrackingId': p.order.intasend_tracking_id,
                'customerEmail': p.order.customer_email,
                'customerPhone': p.order.customer_phone,
                'createdAt': p.order.created_at.isoformat(),
                'updatedAt': p.order.updated_at.isoformat()
            }
        })
    return Response(res)

@extend_schema(
    tags=['Payments'],
    summary='Initiate Order Payment',
    description='Initiates payment transaction (Card, M-Pesa, PayPal) and marks order payment status as completed.',
    request=InitiatePaymentRequestSerializer,
    responses={
        200: InitiatePaymentResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['POST'])
@permission_classes([AllowAny])
def initiate_payment(request):
    data = request.data
    order_id = data.get('orderId')
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({'message': f'Order with ID {order_id} not found'}, status=status.HTTP_404_NOT_FOUND)

    transaction_id = f"trans_{int(datetime.datetime.now().timestamp() * 1000)}"
    method_raw = data.get('paymentMethod')
    payment_method_label = 'Card Checkout'
    if method_raw == 'mpesa':
        payment_method_label = 'M-Pesa Checkout'
    elif method_raw == 'paypal':
        payment_method_label = 'PayPal Checkout'

    p = Payment.objects.create(
        order=order,
        payment_method=payment_method_label,
        amount=data.get('amount'),
        currency=data.get('currency', 'KES'),
        status='completed',
        transaction_id=transaction_id
    )

    order.payment_status = 'completed'
    order.save()

    return Response({
        'success': True,
        'status': 'completed',
        'transactionId': transaction_id,
        'payment': {
            'id': str(p.id),
            'orderId': str(p.order_id),
            'paymentMethod': p.payment_method,
            'amount': str(p.amount),
            'currency': p.currency,
            'status': p.status,
            'transactionId': p.transaction_id,
            'createdAt': p.created_at.isoformat(),
            'updatedAt': p.updated_at.isoformat()
        }
    })

# Shipping views
@extend_schema(
    tags=['Shipping'],
    summary='Track DHL Shipment',
    description='Queries the DHL Express tracking API for real-time shipment status.',
    request=ShippingTrackRequestSerializer,
    responses={
        200: OpenApiTypes.OBJECT,
        400: MessageResponseSerializer,
        500: MessageResponseSerializer,
    }
)
@api_view(['POST'])
@permission_classes([AllowAny])
def track_shipping(request):
    tracking_number = request.data.get('trackingNumber')
    if not tracking_number:
        return Response({'message': 'Tracking number is required'}, status=status.HTTP_400_BAD_REQUEST)

    username = os.getenv('DHL_USERNAME')
    password = os.getenv('DHL_PASSWORD')

    if not username or not password:
        return Response({'message': 'DHL credentials not configured on the backend'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    import base64
    credentials = base64.b64encode(f"{username}:{password}".encode()).decode()
    url = f"https://express.api.dhl.com/mydhlapi/test/tracking?shipmentTrackingNumber={urllib.parse.quote(tracking_number)}"

    req = urllib.request.Request(url)
    req.add_header('Authorization', f'Basic {credentials}')
    req.add_header('Accept', 'application/json')
    req.add_header('Content-Type', 'application/json')

    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode())
            return Response(res_data)
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode()
        try:
            err_json = json.loads(err_msg)
            return Response(err_json, status=e.code)
        except Exception:
            return Response({'message': err_msg or 'DHL API Request Failed'}, status=e.code)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Files views
@extend_schema(
    tags=['Files'],
    summary='Upload File (Multipart)',
    description='Uploads an image, document, or PDF (up to 10MB) to secure local storage.',
    parameters=[
        OpenApiParameter('category', OpenApiTypes.STR, OpenApiParameter.QUERY, required=False, default='general', description='Storage subdirectory category'),
        OpenApiParameter('isPublic', OpenApiTypes.BOOL, OpenApiParameter.QUERY, required=False, default=False, description='Whether file is publicly accessible without auth'),
    ],
    request=FileUploadRequestSerializer,
    responses={
        201: FileRecordSerializer,
        400: MessageResponseSerializer,
    }
)
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):
    file_obj = request.FILES.get('file')
    if not file_obj:
        return Response({'message': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

    max_size = int(os.getenv('MAX_FILE_SIZE', 10485760))
    if file_obj.size > max_size:
        return Response({'message': 'File is too large'}, status=status.HTTP_400_BAD_REQUEST)

    allowed_types = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    mime_type, _ = guess_type(file_obj.name)
    if not mime_type or mime_type not in allowed_types:
        return Response({'message': 'Invalid file type'}, status=status.HTTP_400_BAD_REQUEST)

    category = request.query_params.get('category', 'general')
    is_public_str = request.query_params.get('isPublic', 'false')
    is_public = is_public_str.lower() == 'true'

    root = get_storage_root()
    folder = os.path.join(root, category)
    os.makedirs(folder, exist_ok=True)

    unique_id = uuid.uuid4()
    ext = os.path.splitext(file_obj.name)[1]
    storage_name = f"{unique_id}{ext}"
    storage_path_rel = os.path.join(category, storage_name)
    absolute_path = os.path.join(root, storage_path_rel)

    # Path traversal protection
    if not os.path.abspath(absolute_path).startswith(root):
        return Response({'message': 'Path traversal detected'}, status=status.HTTP_400_BAD_REQUEST)

    with open(absolute_path, 'wb+') as destination:
        for chunk in file_obj.chunks():
            destination.write(chunk)

    f_record = File.objects.create(
        original_name=file_obj.name,
        storage_name=storage_name,
        storage_path=storage_path_rel,
        mime_type=mime_type,
        size=file_obj.size,
        category=category,
        uploaded_by=request.user,
        is_public=is_public
    )

    return Response({
        'id': str(f_record.id),
        'originalName': f_record.original_name,
        'storageName': f_record.storage_name,
        'storagePath': f_record.storage_path,
        'mimeType': f_record.mime_type,
        'size': f_record.size,
        'category': f_record.category,
        'uploadedById': str(f_record.uploaded_by_id) if f_record.uploaded_by_id else None,
        'isPublic': f_record.is_public,
        'createdAt': f_record.created_at.isoformat(),
        'updatedAt': f_record.updated_at.isoformat()
    }, status=status.HTTP_201_CREATED)

def stream_file_helper(file_rec):
    root = get_storage_root()
    filepath = os.path.join(root, file_rec.storage_path)
    if not os.path.exists(filepath) or not os.path.abspath(filepath).startswith(root):
        raise Http404("File not found on storage")
    
    response = FileResponse(open(filepath, 'rb'), content_type=file_rec.mime_type)
    response['Content-Disposition'] = f'inline; filename="{file_rec.original_name}"'
    response['Content-Length'] = str(file_rec.size)
    return response

@extend_schema(
    methods=['GET'],
    tags=['Files'],
    summary='Download Private File',
    description='Streams binary content of a private file if the requesting user owns it or has Admin role.',
    parameters=[OpenApiParameter('pk', OpenApiTypes.UUID, OpenApiParameter.PATH, description='File record UUID')],
    responses={
        200: OpenApiTypes.BINARY,
        403: MessageResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@extend_schema(
    methods=['DELETE'],
    tags=['Files'],
    summary='Delete File',
    description='Deletes a file from storage and removes its metadata record if the user owns it or has Admin role.',
    parameters=[OpenApiParameter('pk', OpenApiTypes.UUID, OpenApiParameter.PATH, description='File record UUID')],
    responses={
        200: SuccessResponseSerializer,
        403: MessageResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['GET', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_private_file(request, pk):
    try:
        file_rec = File.objects.get(id=pk)
    except File.DoesNotExist:
        if request.method == 'DELETE':
            return Response({'message': 'File metadata not found'}, status=status.HTTP_404_NOT_FOUND)
        raise Http404("File metadata not found")

    if file_rec.uploaded_by_id != request.user.id and request.user.role.lower() != 'admin':
        if not file_rec.is_public and request.method == 'GET':
            return Response({'message': 'Access to private file denied'}, status=status.HTTP_403_FORBIDDEN)
        if request.method == 'DELETE':
            return Response({'message': 'You do not have permission to delete this file'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'DELETE':
        root = get_storage_root()
        filepath = os.path.join(root, file_rec.storage_path)
        if os.path.exists(filepath) and os.path.abspath(filepath).startswith(root):
            os.remove(filepath)
        file_rec.delete()
        return Response({'success': True})

    return stream_file_helper(file_rec)

@extend_schema(
    tags=['Files'],
    summary='Download Public File',
    description='Streams binary content of a public file without requiring authentication.',
    parameters=[OpenApiParameter('pk', OpenApiTypes.UUID, OpenApiParameter.PATH, description='File record UUID')],
    responses={
        200: OpenApiTypes.BINARY,
        401: MessageResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_public_file(request, pk):
    try:
        file_rec = File.objects.get(id=pk)
    except File.DoesNotExist:
        raise Http404("File metadata not found")

    if not file_rec.is_public:
        return Response({'message': 'Authentication required to access private file'}, status=status.HTTP_401_UNAUTHORIZED)

    return stream_file_helper(file_rec)

@extend_schema(
    tags=['Files'],
    summary='Delete File by ID',
    description='Deletes a file from storage and database. (Alias endpoint).',
    parameters=[OpenApiParameter('pk', OpenApiTypes.UUID, OpenApiParameter.PATH, description='File record UUID')],
    responses={
        200: SuccessResponseSerializer,
        403: MessageResponseSerializer,
        404: MessageResponseSerializer,
    }
)
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_file(request, pk):
    return get_private_file(request, pk)

