
from django.shortcuts import render

from backend.models import *
from backend.serializers import ExpenseSerializer

from backend.serializers import *
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser

from rest_framework import status

from django.contrib.auth import get_user_model


@api_view(['POST'])
@permission_classes([]) 
def add_expenses_per_capita_per_day(request):
    data = request.data
    
    # try:
    
    if  Expense.objects.filter(date=data['date']).exists():
        return Response({"message":"The expense for this date "+ data['date']+" already added."} , status=status.HTTP_409_CONFLICT)
    
    else:
        
        Expenses_per_day = Expense.objects.create(
            date = data['date'],
            expenenses_per_day =data['expenenses_per_day'],
            total_attendances=data['total_attendances'],
            expenenses_per_capita=data['expenenses_per_capita'],
        )

    serializer = ExpenseSerializer(Expenses_per_day, many=True)
    return Response(serializer.data)
 
@api_view(['GET'])
@permission_classes([])
def get_monthly_expenses_per_user(request,month, user_id):
    user = User.objects.get(id = user_id)
    total_monthly_attendances_from_that_user = Attendance.objects.filter(studant = user, date__month = month)
    total_expenses_in_that_month = Expense.objects.filter(date__month= month).expenses_per_capita
    serializers = AttendanceSerializer(total_monthly_attendances_from_that_user , many = True)
    return Response(serializers.data)