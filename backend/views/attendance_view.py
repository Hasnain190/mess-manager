
from enum import unique
from operator import attrgetter

from requests import request
from backend.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status


def post_attendance(request, id):
    """post attendance of all the students"""
    data = request.data
    user = User.objects.get(id=id)
    attendance, created = Attendance.objects.update_or_create(
        student=user,
        date=data['date'],
        defaults={
            'first_time': data['first_time'],
            'second_time': data['second_time']
        }
    )
    serializer = AttendanceSerializer(attendance)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_attendance(request):
    """Get all the attendance of all the students"""
# -date lets us most recent one comes first
    Attendances = Attendance.objects.all().order_by("-date")

    serializer = AttendanceSerializer(Attendances, many=True)

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
