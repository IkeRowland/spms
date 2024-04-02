from django.urls import path
from .views import add_students

urlpatterns = [
    path('users/add/students/', add_students)
]