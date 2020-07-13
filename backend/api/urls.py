from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from backend.report.views import ReportViewSet
# from rest_framework.schemas import get_schema_view

# # Create a router and register our viewsets with it.
# router = DefaultRouter()
# router.register(r'reports', ReportViewSet, basename='reports')

urlpatterns = [
    # path('schema/', get_schema_view()),
    path('reports/', include('report.urls')),
    # path('', include(router.urls)),
]