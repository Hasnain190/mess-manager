from django.shortcuts import render

from ..serializers import *
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser

from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth import logout


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

from rest_framework_simplejwt.serializers import TokenObtainSerializer

from rest_framework_simplejwt.views import TokenObtainPairView



# class EmailTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer



# class MyTokenObtainSerializer(TokenObtainSerializer):
#     username_field = User.EMAIL_FIELD


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k] = v

       
        return data
 

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




@api_view(['POST'])
@permission_classes([]) 
def register_user(request):
    data = request.data
    
    # try:
    
    if  User.objects.filter(username=data['username']).exists():
        return Response({"message":"Username already taken"} , status=status.HTTP_400_BAD_REQUEST)
    
    else:
        
        user = User.objects.create(
            username = data['username'],
        
            
            room=data['room'],
            password=make_password(data['password']),
            hostel = data['hostel'],
            phone = data['phone'],
            security_fee = data['security_fee']

        )

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
    # except:
    #     message = {'detail': 'bad credential provided'}

    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
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
@permission_classes([])
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
@permission_classes([])
def delete_user(request, user_id):
    """ delete a user """
    user = User.objects.get(id=user_id)
    user.delete()
    return Response({"message":"User deleted successfully"})


# update a user
# FIXME There is a flaw here
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user(request, user_id):
    """ update a user """
    user = User.objects.get(id=user_id)
    serializer = UserSerializerWithToken(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

