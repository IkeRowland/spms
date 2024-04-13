from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import json
from .serializers import StudentSerializer, CustomUserSerializer, CourseSerializer, SemesterSerializer, EnrollmentSerializer
from .models import CustomUser, Student, Course, Semester, Enrollment, ResultPermission


@api_view(['POST'])    
def add_students(request):
    if request.method == 'POST':
        data = request.data
        usersList = []
        for userObj in data:
            userObj["username"] = userObj['reg_no']
            userObj["password"] = userObj['index_no']
            serializer = CustomUserSerializer(data=userObj)
            if serializer.is_valid():
                user = serializer.save()

                # Create student
                student_data = {
                    'reg_no': userObj.get('reg_no'),
                    'index_no': userObj.get('index_no'),
                    'year_joined': userObj.get('year_joined'),
                    'faculty': userObj.get('faculty'),
                    'course': userObj.get('course'),
                    'user': user.id
                }

                # Serialize student data
                student_serializer = StudentSerializer(data=student_data)
                if student_serializer.is_valid():
                    student_serializer.save()

                    user_data = {
                        **serializer.data,
                        **student_serializer.data
                    }

                    usersList.append(user_data)
                else:
                    return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        return Response(usersList, status=status.HTTP_201_CREATED)

# Get all students
@api_view(['GET'])
def get_students(request):
    if request.method == 'GET':
        users_list = []
        students = Student.objects.all()
        for student in students:
            user = CustomUser.objects.get(id=student.user_id)
            student_serializer = StudentSerializer(student)
            user_serializer = CustomUserSerializer(user)
            student_info = {
                **student_serializer.data,
                **user_serializer.data
            }
            users_list.append(student_info)
        return Response(users_list, status=status.HTTP_200_OK)



# Login
@api_view(['POST'])
def login(request):
    data = request.data
    username = data.get('username', None)
    password = data.get('password', None)
    email = data.get('email', None)
    if not username:
        if not email:
            return Response({"message": "Username/email required!"}, status=status.HTTP_400_BAD_REQUEST)
    if not password:
        return Response({"message": "Password required!"}, status=status.HTTP_400_BAD_REQUEST)
    search_key = {}
    if username:
        search_key["username"] = username
    else:
        search_key["email"] = email
    try:
        user = CustomUser.objects.get(**search_key)

        if not user.check_password(password):
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        student_serializer = {}
        if user.user_type == 'student':
            student = Student.objects.get(user_id=user.id)
            student_serializer = StudentSerializer(student)
        
        serializer = CustomUserSerializer(user)

        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        user_info = {}

        if user.user_type == 'student':
            user_info = {
                **serializer.data,
                **student_serializer.data,
            }
        else:
            user_info = serializer.data

        res_data = {
            'user': user_info,
            'token': token
        }
        return Response(res_data, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"message": "User not found!"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            user = CustomUser.objects.get(id=user_id)

            user.delete()
            return Response({"message": "User deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"message": "Not found!"}, status=status.HTTP_404_NOT_FOUND)
        


# Operations on semester
@api_view(['POST', 'GET', 'DELETE'])
def semester_view(request, semester_id=None):
    """
    Create, Get and Delete semester objects
    """
    if request.method == 'POST':
        serializer = SemesterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        # Get all semesters
        semesters = Semester.objects.all()
        serializer = SemesterSerializer(semesters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'GET' and semester_id:
        # Get semester by ID
        try:
            semester = Semester.objects.get(id=semester_id)
            serializer = SemesterSerializer(semester)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Semester.DoesNotExist:
            return Response({"message": "Not Found!"}, status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE' and semester_id:
        # Delete semester object
        try:
            semester = Semester.objects.get(id=semester_id)
            semester.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Semester.DoesNotExist:
            return Response({"message": "Not found!"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)
        

# Create course
@api_view(['POST'])
def create_course(request):
    if request.method == 'POST':
        data = request.data
        course_code = data.get('course_code', None)
        course_name = data.get('course_name', None)

        if not course_code:
            return Response({"message": "Course code required!"}, status=status.HTTP_400_BAD_REQUEST)
        if not course_name:
            return Response({"message": "Course name required!"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"message": "Course already exists!"}, status=status.HTTP_400_BAD_REQUEST)


# Get all courses
@api_view(['GET'])
def get_courses(request):
    if request.method == 'GET':
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Deleting a course
@api_view(['DELETE'])
def delete_course(request, course_id):
    if request.method == 'DELETE':
        try:
            course = Course.objects.get(id=course_id)
            course.delete()
            return Response({"message": "Course deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            return Response({"message": "Course not found!"}, status=status.HTTP_404_NOT_FOUND)

# Get all students enrolled in a given course at a given semester
@api_view(['GET'])
def get_course_students(request):
    """
    Get all students enrolled in a given 
    course at a given semester

    Request Data:
        course_code: (str) - Unique code for course object
                    eg. ICS 215, or ICS 215 - Object Oriented Programming
        semester_id: (str) - Unique id for semester object 
                    eg. 2023/2024 - SEM 2
    Response Data:
        (dict): A dictionary in the format
        {
            'course': 'ICS 215 - Object Oriented Programming',
            'semester': '2023/2024 - SEM 2',
            'students': [
                {
                    'student_id': 1,
                    'reg_no': 'E46/6272/2021',
                    'student_name': 'WAMAE JOSEPH NDIRITU',
                    'cat_marks': null,
                    'exam_marks': null
                }
                ...
            ]
        }
    """
    course_code = request.data.get('course_code')
    semester_id = request.data.get('semester_id')
    # Retrieve enrollments for the specified course and semester
    enrollments = Enrollment.objects.filter(
        course_code__course_code=course_code, semester_id=semester_id)

    # Extract student details from enrollments
    students = [{'student_id': enrollment.student.id, 'reg_no': enrollment.student.reg_no, 'student_name': enrollment.student.user.full_name, 'cat_marks': enrollment.coursework_marks if enrollment.result_permission.marks_published else None, 'exam_marks': enrollment.exam_marks if enrollment.result_permission.marks_published else None} for enrollment in enrollments]

    return Response({'course': course_code, 'semester': semester_id, 'students': students}, status=status.HTTP_200_OK)

# Get student courses
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_courses(request):
    """
    Get current user courses
    """
    user = request.user
    enrollments = Enrollment.objects.filter(
        student__user__id=user.id)

    # Extract student details from enrollments
    courses = [{'enrollment_id': enrollment.id, 'course_code': enrollment.course_code.course_code, 'course_name': enrollment.course_code.course_name,
                 'exam_type': enrollment.exam_type } for enrollment in enrollments]
    
    return Response(courses, status=status.HTTP_200_OK)


# Enroll student to course
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_course(request):
    """
    Enroll current user to the given courses
    """
    course_data = request.data
    if len(course_data) > 0:
        errors = []
        for obj in course_data:
            course_code = obj.get('course_code')
            permission = ResultPermission.objects.get(course__course_code=course_code)
            data = {
                'course_code': course_code,
                'semester': obj.get('semester_id'),
                'exam_type': obj.get('exam_type'),
                'student': request.user.id,
                'result_permission': permission.id
            }
            serializer = EnrollmentSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            else:
                errors_dict = json.loads(json.dumps(serializer.errors))
                if errors_dict['non_field_errors'][0] == "The fields student, course_code must make a unique set.":
                    errors.append({"message": f"{course_code} is already registered!"})
                else:
                    errors.append(serializer.errors)
        if len(errors) > 0:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)    
        return Response({'message': 'Enrolled successfully'}, status=status.HTTP_201_CREATED)
