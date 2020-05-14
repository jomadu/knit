from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.schemas import get_schema_view

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'images', views.ImageViewSet, basename='images')

urlpatterns = [
    path('schema/', get_schema_view()),
    path('users/', include('users.urls')),
    path('', include(router.urls)),
]