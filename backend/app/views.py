from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import StudentSerializer, CustomUserSerializer
from .models import CustomUser, Student


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

        res_data = {
            'user': {
                **serializer.data,
                **student_serializer.data,
            },
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
        
