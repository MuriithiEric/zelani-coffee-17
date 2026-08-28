from rest_framework import serializers

# -------------------------------------------------------------------------
# Generic & Utility Serializers
# -------------------------------------------------------------------------

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField(help_text="Informational message or error description")

class SuccessResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField(default=True, help_text="Operation success status")
    message = serializers.CharField(required=False, help_text="Optional description")

class HealthCheckResponseSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=['ok', 'error'], help_text="Overall system health status")
    database = serializers.ChoiceField(choices=['connected', 'disconnected'], help_text="PostgreSQL database connectivity status")
    storage = serializers.ChoiceField(choices=['available', 'unavailable'], help_text="Local file storage availability status")

# -------------------------------------------------------------------------
# Auth Serializers
# -------------------------------------------------------------------------

class UserSummarySerializer(serializers.Serializer):
    id = serializers.CharField(help_text="User UUID")
    email = serializers.EmailField(help_text="User email address")
    firstName = serializers.CharField(allow_null=True, required=False, help_text="First name")
    lastName = serializers.CharField(allow_null=True, required=False, help_text="Last name")
    role = serializers.CharField(help_text="User role ('Admin', 'Customer', 'Roaster')")

class AuthResponseSerializer(serializers.Serializer):
    accessToken = serializers.CharField(help_text="JWT Access token (15-minute validity)")
    refreshToken = serializers.CharField(help_text="JWT Refresh token (7-day validity)")
    user = UserSummarySerializer(help_text="Authenticated user basic profile")

class UserRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, help_text="Unique email address for registration")
    passwordHash = serializers.CharField(required=True, write_only=True, help_text="Raw password string from client")
    firstName = serializers.CharField(required=False, allow_null=True, allow_blank=True, help_text="User's first name")
    lastName = serializers.CharField(required=False, allow_null=True, allow_blank=True, help_text="User's last name")

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, help_text="Registered email address")
    passwordHash = serializers.CharField(required=True, write_only=True, help_text="Password for authentication")

# -------------------------------------------------------------------------
# Users Serializers
# -------------------------------------------------------------------------

class UserDetailSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="User UUID")
    email = serializers.EmailField(help_text="Email address")
    firstName = serializers.CharField(allow_null=True, required=False, help_text="First name")
    lastName = serializers.CharField(allow_null=True, required=False, help_text="Last name")
    role = serializers.CharField(help_text="User role ('Admin', 'Customer', 'Roaster')")
    isActive = serializers.BooleanField(help_text="Whether the user account is active")
    createdAt = serializers.CharField(help_text="Account creation timestamp (ISO 8601)")
    updatedAt = serializers.CharField(help_text="Account last update timestamp (ISO 8601)")

class UserUpdateSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=['Admin', 'Customer', 'Roaster'], required=False, help_text="Updated role")
    is_active = serializers.BooleanField(required=False, help_text="Updated active status")
    firstName = serializers.CharField(required=False, allow_blank=True, help_text="Updated first name")
    lastName = serializers.CharField(required=False, allow_blank=True, help_text="Updated last name")
    passwordHash = serializers.CharField(required=False, write_only=True, help_text="New password to hash and update")

# -------------------------------------------------------------------------
# Product Serializers
# -------------------------------------------------------------------------

class ProductSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="Unique product slug/identifier")
    name = serializers.CharField(help_text="Product display name")
    description = serializers.CharField(help_text="Short product description")
    price = serializers.FloatField(help_text="Product price")
    image = serializers.CharField(help_text="Product image URL or path")
    grind = serializers.CharField(help_text="Grind option (e.g., Whole Beans, Medium Ground)")
    size = serializers.CharField(help_text="Package size (e.g., 250g, 500g, 1kg)")
    tastingNotes = serializers.ListField(child=serializers.CharField(), help_text="Flavor tasting notes")
    details = serializers.CharField(help_text="Detailed product description and background")
    isKes = serializers.BooleanField(default=True, help_text="True if currency is Kenyan Shillings (KES)")
    createdAt = serializers.CharField(required=False, help_text="Creation timestamp (ISO 8601)")
    updatedAt = serializers.CharField(required=False, help_text="Last update timestamp (ISO 8601)")

class ProductCreateSerializer(serializers.Serializer):
    id = serializers.CharField(required=True, help_text="Unique product slug/identifier (e.g. 'premium-dark-roast-1kg')")
    name = serializers.CharField(required=True, help_text="Product name")
    description = serializers.CharField(required=True, help_text="Short description")
    price = serializers.FloatField(required=True, help_text="Price in selected currency")
    image = serializers.CharField(required=True, help_text="Image URL or relative path")
    grind = serializers.CharField(required=True, help_text="Grind type (e.g. Whole Beans, Medium Ground)")
    size = serializers.CharField(required=True, help_text="Package size (e.g. 250g, 500g, 1kg)")
    tastingNotes = serializers.ListField(child=serializers.CharField(), required=False, default=list, help_text="List of tasting notes")
    details = serializers.CharField(required=True, help_text="Detailed story & tasting notes")
    isKes = serializers.BooleanField(required=False, default=True, help_text="Is price in KES?")

class ProductUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(required=False, help_text="Product name")
    description = serializers.CharField(required=False, help_text="Short description")
    price = serializers.FloatField(required=False, help_text="Price in selected currency")
    image = serializers.CharField(required=False, help_text="Image URL or path")
    grind = serializers.CharField(required=False, help_text="Grind type")
    size = serializers.CharField(required=False, help_text="Package size")
    tastingNotes = serializers.ListField(child=serializers.CharField(), required=False, help_text="List of tasting notes")
    details = serializers.CharField(required=False, help_text="Detailed story")
    isKes = serializers.BooleanField(required=False, help_text="Is price in KES?")

# -------------------------------------------------------------------------
# Cart Serializers
# -------------------------------------------------------------------------

class CartItemDetailSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="Cart item UUID")
    userId = serializers.CharField(help_text="Owner user UUID")
    productId = serializers.CharField(help_text="Product ID")
    quantity = serializers.IntegerField(help_text="Selected quantity")
    grind = serializers.CharField(allow_blank=True, help_text="Selected grind")
    size = serializers.CharField(allow_blank=True, help_text="Selected size")
    createdAt = serializers.CharField(help_text="Added timestamp (ISO 8601)")
    updatedAt = serializers.CharField(help_text="Updated timestamp (ISO 8601)")
    product = ProductSerializer(help_text="Full product details")

class CartProductMiniSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="Product ID")
    name = serializers.CharField(help_text="Product name")
    price = serializers.FloatField(help_text="Unit price")
    image = serializers.CharField(help_text="Image path")

class CartItemCreatedSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="Cart item UUID")
    userId = serializers.CharField(help_text="Owner user UUID")
    productId = serializers.CharField(help_text="Product ID")
    quantity = serializers.IntegerField(help_text="Selected quantity")
    grind = serializers.CharField(allow_blank=True, help_text="Selected grind")
    size = serializers.CharField(allow_blank=True, help_text="Selected size")
    product = CartProductMiniSerializer(help_text="Product preview")

class AddToCartRequestSerializer(serializers.Serializer):
    productId = serializers.CharField(required=True, help_text="Product identifier to add")
    quantity = serializers.IntegerField(required=False, default=1, help_text="Quantity to add (defaults to 1)")
    grind = serializers.CharField(required=False, allow_blank=True, default='', help_text="Chosen grind option")
    size = serializers.CharField(required=False, allow_blank=True, default='', help_text="Chosen package size")

# -------------------------------------------------------------------------
# Order Serializers
# -------------------------------------------------------------------------

class OrderItemSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="Order item UUID")
    orderId = serializers.CharField(help_text="Parent order UUID")
    productId = serializers.CharField(help_text="Product ID")
    productName = serializers.CharField(help_text="Product name snapshot")
    quantity = serializers.IntegerField(help_text="Quantity ordered")
    unitPrice = serializers.CharField(help_text="Unit price snapshot")
    grind = serializers.CharField(allow_null=True, required=False, help_text="Grind option")
    size = serializers.CharField(allow_null=True, required=False, help_text="Size option")
    createdAt = serializers.CharField(help_text="Timestamp (ISO 8601)")

class OrderItemCreateSerializer(serializers.Serializer):
    productId = serializers.CharField(required=True, help_text="Product identifier")
    productName = serializers.CharField(required=True, help_text="Product display name")
    quantity = serializers.IntegerField(required=True, min_value=1, help_text="Item quantity")
    unitPrice = serializers.DecimalField(required=True, max_digits=10, decimal_places=2, help_text="Unit price")
    grind = serializers.CharField(required=False, allow_null=True, allow_blank=True, help_text="Grind option")
    size = serializers.CharField(required=False, allow_null=True, allow_blank=True, help_text="Size option")

class OrderCreateRequestSerializer(serializers.Serializer):
    orderReference = serializers.CharField(required=True, help_text="Unique order reference (e.g. 'ORD-1724839201-ABCD')")
    totalAmount = serializers.DecimalField(required=True, max_digits=10, decimal_places=2, help_text="Total order amount")
    currency = serializers.CharField(required=False, default='KES', help_text="Currency code (KES, USD, etc.)")
    paymentStatus = serializers.CharField(required=False, default='pending', help_text="Initial payment status ('pending', 'completed')")
    intasendTrackingId = serializers.CharField(required=False, allow_null=True, allow_blank=True, help_text="Payment gateway tracking ID")
    customerEmail = serializers.EmailField(required=False, allow_null=True, allow_blank=True, help_text="Customer contact email")
    customerPhone = serializers.CharField(required=False, allow_null=True, allow_blank=True, help_text="Customer contact phone number")
    items = serializers.ListField(child=OrderItemCreateSerializer(), required=False, default=list, help_text="List of ordered items")

class OrderResponseSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="Order UUID")
    orderReference = serializers.CharField(help_text="Unique human-readable order reference")
    totalAmount = serializers.CharField(help_text="Total order amount")
    currency = serializers.CharField(help_text="Currency code")
    paymentStatus = serializers.CharField(help_text="Payment status ('pending', 'completed', 'failed', 'refunded')")
    intasendTrackingId = serializers.CharField(allow_null=True, required=False, help_text="Gateway tracking reference")
    customerEmail = serializers.CharField(allow_null=True, required=False, help_text="Customer email")
    customerPhone = serializers.CharField(allow_null=True, required=False, help_text="Customer phone")
    createdAt = serializers.CharField(help_text="Order timestamp (ISO 8601)")
    updatedAt = serializers.CharField(help_text="Last update timestamp (ISO 8601)")
    orderItems = OrderItemSerializer(many=True, help_text="List of items in this order")

class OrderStatusUpdateRequestSerializer(serializers.Serializer):
    payment_status = serializers.ChoiceField(
        choices=['pending', 'completed', 'failed', 'cancelled', 'processing', 'shipped'],
        required=True,
        help_text="Updated order payment/fulfillment status"
    )

# -------------------------------------------------------------------------
# Payment Serializers
# -------------------------------------------------------------------------

class OrderSummaryInPaymentSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="Order UUID")
    orderReference = serializers.CharField(help_text="Order reference")
    totalAmount = serializers.CharField(help_text="Total amount")
    currency = serializers.CharField(help_text="Currency")
    paymentStatus = serializers.CharField(help_text="Payment status")
    intasendTrackingId = serializers.CharField(allow_null=True, required=False, help_text="Tracking ID")
    customerEmail = serializers.CharField(allow_null=True, required=False, help_text="Customer email")
    customerPhone = serializers.CharField(allow_null=True, required=False, help_text="Customer phone")
    createdAt = serializers.CharField(help_text="Order creation timestamp (ISO 8601)")
    updatedAt = serializers.CharField(help_text="Order update timestamp (ISO 8601)")

class PaymentRecordSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="Payment UUID")
    orderId = serializers.CharField(help_text="Associated order UUID")
    paymentMethod = serializers.CharField(help_text="Payment method (e.g. 'Card Checkout', 'M-Pesa Checkout')")
    amount = serializers.CharField(help_text="Payment amount")
    currency = serializers.CharField(help_text="Currency code")
    status = serializers.CharField(help_text="Payment status ('pending', 'completed', 'failed')")
    transactionId = serializers.CharField(allow_null=True, required=False, help_text="Transaction reference ID")
    createdAt = serializers.CharField(help_text="Payment timestamp (ISO 8601)")
    updatedAt = serializers.CharField(help_text="Payment update timestamp (ISO 8601)")
    order = OrderSummaryInPaymentSerializer(required=False, help_text="Associated order details (included in admin logs)")

class PaymentCreateRequestSerializer(serializers.Serializer):
    orderId = serializers.CharField(required=True, help_text="Target order UUID")
    paymentMethod = serializers.CharField(required=True, help_text="Payment gateway or method name")
    amount = serializers.DecimalField(required=True, max_digits=10, decimal_places=2, help_text="Paid amount")
    currency = serializers.CharField(required=False, default='KES', help_text="Currency")
    status = serializers.CharField(required=False, default='pending', help_text="Payment status")
    transactionId = serializers.CharField(required=False, allow_null=True, allow_blank=True, help_text="External gateway transaction ID")

class InitiatePaymentRequestSerializer(serializers.Serializer):
    orderId = serializers.CharField(required=True, help_text="Target order UUID")
    paymentMethod = serializers.ChoiceField(choices=['card', 'mpesa', 'paypal', 'Card Checkout', 'M-Pesa Checkout', 'PayPal Checkout'], required=True, help_text="Selected payment method channel")
    amount = serializers.DecimalField(required=True, max_digits=10, decimal_places=2, help_text="Payment charge amount")

class InitiatePaymentResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField(default=True, help_text="Payment initiation success")
    status = serializers.CharField(default='completed', help_text="Transaction status")
    transactionId = serializers.CharField(help_text="Generated transaction identifier")
    payment = PaymentRecordSerializer(help_text="Created payment record")

# -------------------------------------------------------------------------
# Shipping Serializers
# -------------------------------------------------------------------------

class ShippingTrackRequestSerializer(serializers.Serializer):
    trackingNumber = serializers.CharField(required=True, help_text="DHL shipment tracking number (e.g. '1234567890')")

# -------------------------------------------------------------------------
# File Serializers
# -------------------------------------------------------------------------

class FileUploadRequestSerializer(serializers.Serializer):
    file = serializers.FileField(required=True, help_text="Multipart binary file payload (Max 10MB; images, PDFs, docs)")

class FileRecordSerializer(serializers.Serializer):
    id = serializers.CharField(help_text="File record UUID")
    originalName = serializers.CharField(help_text="Original uploaded filename")
    storageName = serializers.CharField(help_text="Unique stored filename")
    storagePath = serializers.CharField(help_text="Relative storage path")
    mimeType = serializers.CharField(help_text="Detected MIME type")
    size = serializers.IntegerField(help_text="File size in bytes")
    category = serializers.CharField(help_text="File storage category folder")
    uploadedById = serializers.CharField(allow_null=True, help_text="UUID of uploading user")
    isPublic = serializers.BooleanField(help_text="Publicly downloadable without auth")
    createdAt = serializers.CharField(help_text="Upload timestamp (ISO 8601)")
    updatedAt = serializers.CharField(help_text="Last update timestamp (ISO 8601)")
