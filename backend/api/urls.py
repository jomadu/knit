from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'images', views.ImageViewSet, basename='images')

urlpatterns = [
    path('schema/', get_schema_view()),
    path('users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls'), name='rest_auth'),
    path('rest-auth/registration/', include('rest_auth.registrations.urls'), name='rest_auth_registration'),
    path('token/obtain-pair/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls)),
]