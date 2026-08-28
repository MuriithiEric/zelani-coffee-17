from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and getattr(request.user, 'role', '').lower() == 'admin'

class IsAdminOrRoaster(permissions.BasePermission):
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        role = getattr(request.user, 'role', '').lower()
        return role in ['admin', 'roaster']
