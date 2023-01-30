
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
    date = serializers.DateField(input_formats=['%Y-%m-%d'])

    class Meta:
        model = Attendance
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        id = data['student']
        data['student'] = User.objects.get(id=id).username
        data["student_id"] = User.objects.get(id=id).id
        return data


class MenuSerializer(serializers.ModelSerializer):
    """
    Serializer for mess menu object
    """
    class Meta:
        model = Menu
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        fields = '__all__'


class BillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bill
        fields = '__all__'


class MessBillSerializer(serializers.ModelSerializer):
    dateMonth = serializers.DateField(input_formats=['%Y-%m-%d'])
    bills = BillSerializer(many=True)

    class Meta:
        model = MessBill
        fields = ["id", "dateMonth", "bills"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        bills = data['bills']
        for bill in bills:
            bill["student_id"] = User.objects.get(id=bill['student']).id
            bill['student'] = User.objects.get(id=bill['student']).username
        return data


class PayingBillSerializer(serializers.ModelSerializer):

    class Meta:
        model = PayingBill
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        current_bill = data['current_bill']
        student = data["student"]

        data['student'] = User.objects.get(id=student).username
        data['student_id'] = student
        data['current_bill'] = Bill.objects.get(id=current_bill).bill
        data["dues"] = Bill.objects.get(id=current_bill).dues
        data["total"] = Bill.objects.get(id=current_bill).total
        return data
