from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user object
    """
    isAdmin = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = User
        fields = ('id', 'username','isAdmin', 'email','phone','room','hostel')
        extra_kwargs = {'password': {'write_only': True}}

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
   

        fields = ('id',  'username', 'isAdmin', 'email', 'phone','room','hostel','name', 'isAdmin' ,'token')

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
   


class AttendanceSerializer(serializers.ModelSerializer):
    """
    Serializer for attendance object
    """
    class Meta:
        model = Attendance
        fields = '__all__'

class MessMenuSerializer(serializers.ModelSerializer):
    """
    Serializer for mess menu object
    """
    class Meta:
        model = Menu
        fields = '__all__'