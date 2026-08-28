import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255, db_column='password_hash')
    first_name = models.CharField(max_length=255, null=True, blank=True, db_column='first_name')
    last_name = models.CharField(max_length=255, null=True, blank=True, db_column='last_name')
    role = models.CharField(max_length=50, default='Customer')
    is_active = models.BooleanField(default=True, db_column='is_active')
    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')
    updated_at = models.DateTimeField(auto_now=True, db_column='updated_at')

    @property
    def is_authenticated(self):
        return True

    class Meta:
        db_table = 'users'

class Product(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.FloatField()
    image = models.CharField(max_length=255)
    grind = models.CharField(max_length=255)
    size = models.CharField(max_length=255)
    tasting_notes = ArrayField(models.CharField(max_length=255), db_column='tasting_notes')
    details = models.TextField()
    is_kes = models.BooleanField(default=True, db_column='is_kes')
    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')
    updated_at = models.DateTimeField(auto_now=True, db_column='updated_at')

    class Meta:
        db_table = 'products'

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_reference = models.CharField(max_length=255, unique=True, db_column='order_reference')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, db_column='total_amount')
    currency = models.CharField(max_length=10, default='KES')
    payment_status = models.CharField(max_length=50, default='pending', db_column='payment_status')
    intasend_tracking_id = models.CharField(max_length=255, null=True, blank=True, db_column='intasend_tracking_id')
    customer_email = models.CharField(max_length=255, null=True, blank=True, db_column='customer_email')
    customer_phone = models.CharField(max_length=255, null=True, blank=True, db_column='customer_phone')
    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')
    updated_at = models.DateTimeField(auto_now=True, db_column='updated_at')

    class Meta:
        db_table = 'orders'

class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, db_column='order_id', related_name='order_items')
    product_id = models.CharField(max_length=255, db_column='product_id')
    product_name = models.CharField(max_length=255, db_column='product_name')
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, db_column='unit_price')
    grind = models.CharField(max_length=255, null=True, blank=True)
    size = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')

    class Meta:
        db_table = 'order_items'

class File(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    original_name = models.CharField(max_length=255, db_column='original_name')
    storage_name = models.CharField(max_length=255, db_column='storage_name')
    storage_path = models.CharField(max_length=255, db_column='storage_path')
    mime_type = models.CharField(max_length=255, db_column='mime_type')
    size = models.IntegerField()
    category = models.CharField(max_length=255, null=True, blank=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, db_column='uploaded_by_id', related_name='files')
    is_public = models.BooleanField(default=False, db_column='is_public')
    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')
    updated_at = models.DateTimeField(auto_now=True, db_column='updated_at')

    class Meta:
        db_table = 'files'

class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, db_column='order_id', related_name='payments')
    payment_method = models.CharField(max_length=255, db_column='payment_method')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='KES')
    status = models.CharField(max_length=50, default='pending')
    transaction_id = models.CharField(max_length=255, unique=True, null=True, blank=True, db_column='transaction_id')
    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')
    updated_at = models.DateTimeField(auto_now=True, db_column='updated_at')

    class Meta:
        db_table = 'payments'

class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id', related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, db_column='product_id', related_name='cart_items')
    quantity = models.IntegerField()
    grind = models.CharField(max_length=255, default='')
    size = models.CharField(max_length=255, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')
    updated_at = models.DateTimeField(auto_now=True, db_column='updated_at')

    class Meta:
        db_table = 'cart_items'
        unique_together = ('user', 'product', 'grind', 'size')
