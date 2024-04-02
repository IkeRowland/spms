from django.urls import path
from .views import add_students, delete_user, login, get_students

urlpatterns = [
    path('users/add/students/', add_students),
    path('users/students/', get_students),
    path('users/<int:user_id>/delete/', delete_user),
    path('users/login/', login),
]