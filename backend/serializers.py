
from dataclasses import field
from rest_framework import serializers
from rest_framework.fields import NullBooleanField
from .models import *

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from django.contrib.auth.hashers import make_password


# class MyTokenObtainSerializer(TokenObtainSerializer):
#     username_field = User.EMAIL_FIELD


# class CustomTokenObtainPairSerializer(EmailTokenObtainSerializer):
#     @classmethod
#     def get_token(cls, user):
#         return RefreshToken.for_user(user)

#     @classmethod
#     def validate(self, attrs):
#         breakpoint()
#         data = super().validate(self=self,attrs=attrs)
#         refresh = RefreshToken.for_user(data["user"])

#         data["refresh"] = str(refresh)
#         data["access"] = str(refresh.access_token)

#         return data


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user object
    """
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'isAdmin',
                  'email', 'phone', 'room', 'hostel')

    def get_isAdmin(self, obj):
        return obj.is_staff

    def validate_password(self, value: str) -> str:
        """
        Hash value passed by user.

        :   param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User

        fields = ('id',  'username', 'isAdmin', 'email',
                  'phone', 'room', 'hostel', 'isAdmin', 'token')

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


class MenuSerializer(serializers.ModelSerializer):
    """
    Serializer for mess menu object
    """
    class Meta:
        model = Menu
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):

    """
    Serializer for mess menu object
    """
    class Meta:
        model = Expense
        fields = ('date', 'total_attendances',
                  'expenses_per_day', 'expenses_per_attendance')


class BillSerializer(serializers.ModelSerializer):
    """
    Serializer for mess menu object
    """
    class Meta:
        model = Bill
        fields = '__all__'


class MessBillSerializer(serializers.ModelSerializer):
    """
    Serializer for mess menu object
    """
    class Meta:
        model = MessBill
        fields = '__all__'


class PayingBillSerializer(serializers.ModelSerializer):
    """
    Serializer for mess menu object
    """
    class Meta:
        model = PayingBill
        fields = '__all__'
