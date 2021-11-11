from django.shortcuts import render

from .serializers import *
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser

from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth import logout




@api_view(['POST'])
def mark_attendance(request):
    serializer = AttendanceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)



@api_view(['POST'])
@permission_classes([]) 
def register_user(request):
    data = request.data
    
    # try:
    if User.objects.filter(email=data['email']).exists() :
        return Response({"message":"User email already exists"} , status=status.HTTP_400_BAD_REQUEST)
    elif  User.objects.filter(username=data['username']).exists():
        return Response({"message":"Username already taken"} , status=status.HTTP_400_BAD_REQUEST)
    
    else:
        
        user = User.objects.create(
            username = data['username'],
        
            email=data['email'],
            room=data['room'],
            password=make_password(data['password'])
        )

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
    # except:
    #     message = {'detail': 'bad credential provided'}

    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([])
def login_user(request):
    """ login a user (requires an email and password )"""

    data = request.data
    try:
        user = User.objects.get(email=data['email'])
        if user.check_password(data['password']):
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        else:
            message = {'detail': 'Invalid credentials'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'User with this email does not exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
   


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    """ get all the users """
    users = User.objects.all()
    
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user(request, user_id):
    """ get a user """
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


#   logut a user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """ logout a user """
    logout(request)
    return Response({"message":"Logged out successfully"})


# delete a user
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, user_id):
    """ delete a user """
    user = User.objects.get(id=user_id)
    user.delete()
    return Response({"message":"User deleted successfully"})


# update a user
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user(request, user_id):
    """ update a user """
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

