from django.urls import path
from .views import add_students, delete_user, login, get_students, create_course, get_courses, delete_course, semester_view

urlpatterns = [
    path('users/add/students/', add_students),
    path('users/students/', get_students),
    path('users/<int:user_id>/delete/', delete_user),
    path('users/login/', login),
    path('courses/create/', create_course),
    path('courses/', get_courses),
    path('courses/<int:course_id>/delete/', delete_course),
    path('semesters/create/', semester_view),
    path('semesters/', semester_view),
    path('semesters/<int:semester_id>/', semester_view),
    path('semesters/<int:semester_id>/delete/', semester_view),
]