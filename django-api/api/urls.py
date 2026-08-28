from django.urls import path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from api import views

urlpatterns = [
    # OpenAPI / Swagger Documentation
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui-alias'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # General
    path('', views.welcome, name='welcome'),
    path('health', views.health, name='health'),
    
    # Auth
    path('auth/register', views.register, name='register'),
    path('auth/login', views.login, name='login'),
    path('auth/logout', views.logout_user, name='logout'),
    path('auth/refresh', views.refresh_token, name='refresh'),
    
    # Users
    path('users', views.get_users, name='get_users'),
    path('users/me', views.me, name='me'),
    path('users/<str:pk>', views.manage_user, name='manage_user'),
    
    # Products
    path('products', views.get_or_create_products, name='products'),
    path('products/<str:pk>', views.manage_product, name='manage_product'),
    
    # Cart
    path('cart', views.manage_cart, name='manage_cart'),
    path('cart/item', views.remove_cart_item, name='remove_cart_item'),
    
    # Orders
    path('orders', views.get_or_create_orders, name='orders'),
    path('orders/my-orders', views.my_orders, name='my_orders'),
    path('orders/reference/<str:ref>', views.order_by_reference, name='order_by_reference'),
    path('orders/<str:pk>/status', views.update_order_status, name='update_order_status'),
    
    # Payments
    path('payments', views.payments_logs, name='payments'),
    path('payments/initiate', views.initiate_payment, name='initiate_payment'),
    
    # Shipping
    path('shipping/track', views.track_shipping, name='track_shipping'),
    
    # Files
    path('files/upload', views.upload_file, name='upload_file'),
    path('files/<str:pk>', views.get_private_file, name='get_private_file'),
    path('files/public/<str:pk>', views.get_public_file, name='get_public_file'),
]

