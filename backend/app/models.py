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


class CustomUser(AbstractBaseUser, PermissionsMixin):
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
    is_superuser = models.BooleanField(default=True, null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['user_type', 'email']

    def has_perm(self, perm, obj=None):
        # Handle custom permissions logic here
        return True

    def has_module_perms(self, app_label):
        # Handle custom module permissions logic here
        return True

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
    SEMESTER_CHOICES = [
        (1, 'I'),
        (2, 'II'),
    ]
    course_code = models.CharField(primary_key=True, max_length=30, unique=True)
    course_name = models.CharField(max_length=200, unique=True)
    level = models.IntegerField(default=None, null=True)
    semester_number = models.IntegerField(choices=SEMESTER_CHOICES, null=True)

class Semester(models.Model):
    SEMESTER_CHOICES = [
        (1, 'I'),
        (2, 'II'),
    ]
    year_start = models.IntegerField()
    year_end = models.IntegerField()
    semester_number = models.IntegerField(choices=SEMESTER_CHOICES, null=True)
    is_current = models.BooleanField(default=False)


class ResultPermission(models.Model):
    course = models.OneToOneField(Course, on_delete=models.SET_NULL, null=True)
    marks_published = models.BooleanField(default=False)

class Enrollment(models.Model):
    course_code = models.ForeignKey(Course, null=True, on_delete=models.SET_NULL)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    semester = models.OneToOneField(Semester, null=True, on_delete=models.SET_NULL)
    coursework_marks = models.IntegerField(null=True, default=0)
    exam_marks = models.IntegerField(null=True, default=0)
    result_permission = models.OneToOneField(ResultPermission, null=True, on_delete=models.SET_NULL)

