from django.urls import path

from . import views

urlpatterns = [
  path('', views.report_list),
  path('<int:pk>', views.report_detail)
]