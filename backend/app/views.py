from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import get_object_or_404
from .helpers import generate_random_password, send_password_email
from django.db.models import Count
import json
from .serializers import StudentSerializer, LecturerSerializer, CustomUserSerializer, CourseSerializer, SemesterSerializer, EnrollmentSerializer
from .models import CustomUser, Student, Lecturer, Course, Semester, Enrollment, ResultPermission, Teaching


@api_view(['POST'])
def add_students(request):
    if request.method == 'POST':
        data = request.data
        usersList = []
        errors = []
        for userObj in data:
            userObj["username"] = userObj['reg_no']
            userObj["password"] = userObj['index_no']
            try:
                user = CustomUser.objects.get(username=userObj['username'])
                continue
            except CustomUser.DoesNotExist:
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
                        errors.append(student_serializer.errors)
                else:
                    errors.append(serializer.errors)
        if len(errors) > 0:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(usersList, status=status.HTTP_201_CREATED)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_lecturers(request):
    """
    Admin add Lecturer list
    """
    if request.method == 'POST':
        data = request.data
        usersList = []
        errors = []
        for userObj in data:
            random_pass = generate_random_password()
            userObj['username'] = userObj.get('staff_no')
            userObj["password"] = random_pass
            serializer = CustomUserSerializer(data=userObj)
            if serializer.is_valid():
                user = serializer.save()
                lecturer_data = {
                    'user': user.id,
                    'staff_no': userObj['staff_no']
                }

                lecturer_serializer = LecturerSerializer(data=lecturer_data)
                if lecturer_serializer.is_valid():
                    lecturer_serializer.save()
                    send_password_email(userObj['email'], random_pass)
                    user_data = {
                        **serializer.data,
                        **lecturer_serializer.data
                    }
                    usersList.append(user_data)
                else:
                    errors.append(lecturer_serializer.errors)
            else:
                errors.append(serializer.errors)
        if len(errors) > 0:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(usersList, status=status.HTTP_201_CREATED)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)

# Get all Lecturers
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lecturers(request):
    """
    Admin get all Lecturer objects
    """
    if request.method == 'GET':
        lecturers = Lecturer.objects.all()
        users = [{'lecturer_id': lecturer.id, 'user_id': lecturer.user.id, 'staff_no': lecturer.staff_no, 'full_name': lecturer.user.username, 'contact': lecturer.user.contact, 'email': lecturer.user.email} for lecturer in lecturers]
        return Response(users, status=status.HTTP_200_OK)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)

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

# Update profile
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    Update contact and password
    """
    if request.method == 'PATCH':
        current_user = request.user
        user = CustomUser.objects.get(id=current_user.id)
        if request.data.get('contact'):
            user.contact = request.data.get('contact')
        elif request.data.get('password') and request.data.get('current_password'):
            if user.check_password(request.data.get('current_password')):
                user.set_password(request.data.get('password'))
            else:
                return Response({"message": "Wrong password!"}, status=status.HTTP_401_UNAUTHORIZED)
        user.save()
        return Response({"message": "Profile updated successfully!"}, status=status.HTTP_200_OK)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)
    

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
@api_view(['POST'])
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
                    'coursework_marks': null,
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
    students = [{'student_id': enrollment.student.id, 'enrollment_id': enrollment.id, 'reg_no': enrollment.student.reg_no, 'student_name': enrollment.student.user.full_name, 'coursework_marks': enrollment.coursework_marks if enrollment.result_permission.marks_published else None, 'exam_marks': enrollment.exam_marks if enrollment.result_permission.marks_published else None, 'grade': enrollment.grade if enrollment.result_permission.marks_published else None} for enrollment in enrollments]

    return Response({'course': course_code, 'semester': semester_id, 'students': students}, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def upload_marks(request):
    """
    Uploads marks in the Enrollment object
    """
    if request.method == 'PATCH':
        enrollments_data = request.data.get('enrollments', [])
        for enrollment_data in enrollments_data:
            # Get the existing Enrollment object
            enrollment_id = enrollment_data.get('enrollment_id')
            enrollment = get_object_or_404(Enrollment, id=enrollment_id)

            # Update only the coursework_marks and exam_marks fields
            serializer = EnrollmentSerializer(
                instance=enrollment,
                data={'coursework_marks': enrollment_data.get('coursework_marks'),
                      'exam_marks': enrollment_data.get('exam_marks')},
                partial=True  # Allow partial updates
            )

            if serializer.is_valid():
                serializer.save()
            else:
                # Handle invalid serializer data
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Marks uploaded successfully"}, status=status.HTTP_200_OK)
    
# Publish results
@api_view(['PATCH'])
def publish_results(request):
    """
    Compute grades and publish results for enrollments
    """
    if request.method == 'PATCH':
        course_code = request.data.get('course_code')
        semester_id = request.data.get('semester_id')
        enrollments = Enrollment.objects.filter(course_code__course_code=course_code, semester_id=semester_id)

        for enrollment in enrollments:
            if enrollment.coursework_marks and enrollment.exam_marks:
                # Calculate total marks
                total_marks = enrollment.coursework_marks + enrollment.exam_marks

                # Calculate percentage
                percentage = (total_marks / 100) * 100

                # Determine grade based on percentage
                if percentage < 40:
                    grade = 'E'
                elif percentage < 50:
                    grade = 'D'
                elif percentage < 60:
                    grade = 'C'
                elif percentage < 70:
                    grade = 'B'
                else:
                    grade = 'A'

                # Update the enrollment with the calculated grade
                try:
                    enrollment = Enrollment.objects.get(id=enrollment.id)
                    enrollment.grade = grade
                    enrollment.save()
                except Enrollment.DoesNotExist:
                    pass
        result_permission = ResultPermission.objects.get(course__course_code=course_code)
        result_permission.marks_published = True
        result_permission.save()
        return Response({"message": "Results published successfully"}, status=status.HTTP_200_OK)


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
                'exam_type': enrollment.exam_type} for enrollment in enrollments]

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
            try:
                Course.objects.get(course_code=course_code)
            except Course.DoesNotExist:
                return Response({"message": "Invalid course code!"}, status=status.HTTP_404_NOT_FOUND)
            permission = ResultPermission.objects.get(
                course__course_code=course_code)
            student = Student.objects.get(user_id=request.user.id)
            data = {
                'course_code': course_code,
                'semester': obj.get('semester_id'),
                'exam_type': obj.get('exam_type'),
                'student': student.id,
                'result_permission': permission.id
            }
            serializer = EnrollmentSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            else:
                errors_dict = json.loads(json.dumps(serializer.errors))
                if errors_dict['non_field_errors'][0] == "The fields student, course_code must make a unique set.":
                    errors.append(
                        {"message": f"{course_code} is already registered!"})
                else:
                    errors.append(serializer.errors)
        if len(errors) > 0:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Enrolled successfully'}, status=status.HTTP_201_CREATED)


# Get perfomance stats
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_perfomance_stats(request):
    """
    Gets current user perfomance stats 
    """
    user = request.user
    enrollments = Enrollment.objects.filter(student__user=user)

    # Count occurrences of each grade
    grade_stats = enrollments.values('grade').annotate(count=Count('grade'))

    # Example output: [{'grade': 'A', 'count': 10}, {'grade': 'B', 'count': 5}, ...]

    return Response(grade_stats, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_course_perfomance_stats(request):
    """
    Gets course perfomance stats 
    """
    course_code = request.data.get('course_code')
    semester_id = request.data.get('semester_id')
    enrollments = Enrollment.objects.filter(
        course_code__course_code=course_code, semester_id=semester_id)

    # Count occurrences of each grade
    grade_stats = enrollments.values('grade').annotate(count=Count('grade'))
    
    return Response(grade_stats, status=status.HTTP_200_OK)


# Get Lecturers teachings
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lecturer_courses(request):
    """
    Get Lecturer's courses
    """
    if request.method == 'GET':
        user = request.user
        teachings = Teaching.objects.filter(lecturer__user__id=user.id)
        courses = [{'teaching_id': teaching.id, 'course_code': teaching.course.course_code,'course_name': teaching.course.course_name, 'semester': teaching.semester.id} for teaching in teachings]
        return Response(courses, status=status.HTTP_200_OK)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)

# Get course lecturers
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_courses_lecturers(request):
    """
    Get all courses lecturers
    """
    if request.method == 'GET':
        teachings = Teaching.objects.all()
        courses = [{'teaching_id': teaching.id, 'course_code': teaching.course.course_code, 'course_name': teaching.course.course_name, 'semester': teaching.semester.id, 'full_name': teaching.lecturer.user.full_name, 'lecturer_id': teaching.lecturer.id} for teaching in teachings]
        return Response(courses, status=status.HTTP_200_OK)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)

# Admin assign lecturer courses
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def allocate_lecturer_course(request, lecturer_id):
    """
    Admin assign Lecturer a course
    """
    if request.method == 'POST':
        # Retrieve course_code and semester_id from request data
        course_code = request.data.get('course_code')
        semester_id = request.data.get('semester_id')

        try:
            # Retrieve lecturer object
            lecturer = Lecturer.objects.get(id=lecturer_id)

            # Retrieve course and semester objects
            course = Course.objects.get(course_code=course_code)
            semester = Semester.objects.get(id=semester_id)

            # Check if the course is already assigned to the lecturer in the semester
            existing_teaching = Teaching.objects.filter(
                lecturer=lecturer, course=course, semester=semester).exists()

            if existing_teaching:
                return Response({'error': 'This course is already assigned to the lecturer in the selected semester.'}, status=status.HTTP_400_BAD_REQUEST)

            # Create Teaching object to assign the course to the lecturer
            teaching = Teaching.objects.create(
                lecturer=lecturer, course=course, semester=semester)

            return Response({'message': f'Course {course_code} assigned to lecturer {lecturer_id} for semester {semester_id}.'}, status=status.HTTP_201_CREATED)

        except Lecturer.DoesNotExist:
            return Response({'message': 'Lecturer not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Course.DoesNotExist:
            return Response({'message': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Semester.DoesNotExist:
            return Response({'message': 'Semester not found.'}, status=status.HTTP_404_NOT_FOUND)

    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)


# Admin get lecturer courses
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_get_lecturer_courses(request, lecturer_id):
    if request.method == 'GET':
        teachings = Teaching.objects.filter(lecturer__id=lecturer_id)
        courses = [{"teaching_id": teaching.id, "course_code": teaching.course.course_code, "course_name": teaching.course.course_name, "semester": teaching.semester.id} for teaching in teachings]
        return Response(courses, status=status.HTTP_200_OK)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_403_BAD_REQUEST)
