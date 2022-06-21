
from .serializers import *
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser


@api_view(['GET'])
@permission_classes([IsAdminUser])
def post_attendance(request):
    """post attendance of all the students"""
    date = request.data['date']
    attendance = Attendance.objects.filter(date=date)
    serializer = AttendanceSerializer(attendance, many=True)
    return Response(serializer.data)