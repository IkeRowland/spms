from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import StudentSerializer, CustomUserSerializer


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
