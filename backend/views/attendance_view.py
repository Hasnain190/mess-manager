

from decimal import Decimal, InvalidOperation
import json
from requests import request
from backend.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from datetime import datetime


@api_view(['POST'])
@csrf_exempt
def post_attendance(request, id):
    """post attendance of all the students"""
    byte_data = request.body
    data = json.loads(byte_data)

    
    user = User.objects.get(id=id)

    # converting date to a python date object
    date_str = data['date']
    date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
    attendance, created = Attendance.objects.update_or_create(
        student=user,
        date=date_obj,
        defaults={
        # FIXME: TR y commenting below 2 lines
            'student': user,
            'date': date_obj,
            'first_time': data['first_time'],
            'second_time': data['second_time']
        }
    )
    attendance.save()
    serializer = AttendanceSerializer(attendance)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_attendance(request):
    """Get all the attendance of all the students"""
# -date lets us most recent one comes first
    attendances = Attendance.objects.all().order_by("-date")

    serializer = AttendanceSerializer(attendances, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_monthly_attendance(request, month):
    """Get all the monthly attendance of all the students"""

    filtered_attendances = Attendance.objects.filter(
        date__month=month).order_by("-date")

    serializer = AttendanceSerializer(filtered_attendances, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_daily_attendance(request, date):
    """Get all the daily attendance of all the students"""

    filtered_attendances = Attendance.objects.filter(
        date=date).order_by("-date")

    serializer = AttendanceSerializer(filtered_attendances, many=True)

    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAdminUser])
def calculate_attendances(request,date):
    total_attendances_first_time_all_users = 0
    total_attendances_second_time_all_users = 0
    for i in Attendance.objects.filter(date=date):
        if i.first_time in ["present", "double", "absent"]:
            total_attendances_first_time_all_users += get_numeric_attendance(i.first_time)
        else:
            try:
                total_attendances_first_time_all_users += Decimal(i.first_time)  # convert to decimal
            except InvalidOperation:
                total_attendances_first_time_all_users += 0  # Handle the exception

        if i.second_time in ["present", "double", "absent"]:
            total_attendances_second_time_all_users += get_numeric_attendance(i.second_time)
        else:
            try:
                total_attendances_second_time_all_users += Decimal(i.second_time)  # convert to decimal
            except InvalidOperation:
                total_attendances_second_time_all_users += 0  # Handle the exception

    return Response({"attendances_first_all":total_attendances_first_time_all_users,"attendances_second_all":total_attendances_second_time_all_users})
    

def get_numeric_attendance(value):
    if value == "present":
        return 1
    elif value == "double":
        return Decimal(2.50)
    elif value == "absent":
        return 0
    else:
        return 0

