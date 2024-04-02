from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
    

class CustomUserManager(BaseUserManager):
    def create_user(self, username, user_type, password=None, **extra_fields):
        if not username:
            raise ValueError('The username must be set')
        if not user_type:
            raise ValueError('The user type must be set')
        user = self.model(username=username,
                          user_type=user_type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, user_type, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, user_type, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    USER_TYPE_CHOICES = (
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('admin', 'Admin'),
    )

    username = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=15)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['user_type']

    def __str__(self):
        return self.username
    

class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE) # Relationship
    reg_no = models.CharField(max_length=20, unique=True)
    index_no = models.CharField(max_length=20)
    year_joined = models.IntegerField()
    faculty = models.CharField(max_length=200)
    course = models.CharField(max_length=200)

    def __str__(self):
        return self.reg_no



class Lecturer(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)


class Admin(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)


class Course(models.Model):
    course_code = models.CharField(max_length=30, unique=True)
    course_name = models.CharField(max_length=200, unique=True)
