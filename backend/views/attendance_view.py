
from enum import unique
from operator import attrgetter

from requests import request
from backend.serializers import *
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAdminUser])
def post_attendance(request,id):
    """post attendance of all the students"""
    data = request.data

    user = User.objects.get(id = id)
   

    already_exist = Attendance.objects.filter(student = user, date=data['date']).exists()

    if already_exist:
        return Response( { "message" : "The user "+user.username+"'s attendance is already marked for the day "+data["date"]}, status=status.HTTP_409_CONFLICT)
    else:

        attendance = Attendance.objects.create(
            date = data['date'],
            first_time =data['first_time'],
            second_time = data['second_time'],
            student = user

        )

        serializer = AttendanceSerializer(attendance )
        
        return Response(serializer.data)

 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_attendance(request):
    """Get all the attendance of all the students"""

    Attendances = Attendance.objects.all().order_by("date")

    serializer = AttendanceSerializer(Attendances,many=True)

    return Response(serializer.data)


