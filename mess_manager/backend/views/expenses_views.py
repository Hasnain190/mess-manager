
from django.shortcuts import render

from mess_manager.backend.models import Expense
from mess_manager.backend.serializers import ExpenseSerializer

from .serializers import *
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
        
        user = Expense.objects.create(
            date = data['date'],
        
            
            total_attendances=data['total_attendances'],
            expenenses_per_capita=data['expenenses_per_capita'],

        )

    serializer = ExpenseSerializer(user, many=False)
    return Response(serializer.data)
 