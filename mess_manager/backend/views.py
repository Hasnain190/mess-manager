from django.shortcuts import render

from .serializers import *
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser
# import status
from rest_framework import status
from django.contrib.auth.hashers import make_password





@api_view(['POST'])
def mark_attendance(request):
    serializer = AttendanceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)




@api_view(['POST'])

@permission_classes([]) 
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            room_no=data['room_no'],
            password=make_password(data['password'])
        )

        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    """ get all the users """
    users = User.objects.all()
    
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)


