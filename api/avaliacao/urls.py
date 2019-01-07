from django.urls import path
from . import views

urlpatterns = [
    path('boletim', views.BoletimView.as_view()),
    path('boletim/<int:pk>/', views.BoletimView.as_view()),
    path('delegacia', views.DelegaciaView.as_view()),
]