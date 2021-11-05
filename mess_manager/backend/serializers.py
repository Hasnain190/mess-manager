from rest_framework import serializers
from .models import *



class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user object
    """
    class Meta:
        model = User
        fields = ('id', 'username','isAdmin', 'email','phone','room','hostel', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


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