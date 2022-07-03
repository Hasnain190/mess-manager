
from logging import root
from math import fabs
from django.shortcuts import render

from backend.models import *
from backend.serializers import ExpenseSerializer

from backend.serializers import *
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser

from rest_framework import status

from django.contrib.auth import get_user_model

from functools import reduce

@api_view(['POST'])
@permission_classes([]) 
def add_expenses_per_capita_per_day(request):
    data = request.data
    
    # try:
    
    if  Expense.objects.filter(date=data['date']).exists():
        obj = Expense.objects.get(date = data["date"])
        return Response({"message": obj} , status=status.HTTP_409_CONFLICT)
    
    else:
        
        Expenses_per_day = Expense.objects.create(
            date = data['date'],
            expenses_per_day =data['expenses_per_day'],
            total_attendances=data['total_attendances'],
            expenses_per_attendance=data['expenses_per_attendance'],
        )

    serializer = ExpenseSerializer(Expenses_per_day, many=False)
    return Response(serializer.data)
 

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_expenses_per_month(request,month):

    expenses_per_month = Expense.objects.filter(date__month = month).order_by("date")
    
    
    serializers = ExpenseSerializer(expenses_per_month, many= True )
    
    return Response(serializers.data )


@api_view(['GET'])
def get_bill(request,month):

    expenses_per_month = Expense.objects.filter(date__month = month).order_by("date")
    total_expenses = 0
    for i in expenses_per_month:
        expenses_per_day = i.expenses_per_day
        total_expenses+=expenses_per_day
    # for the whole total attendances of all the users
    total_attendances_all_users =  0
    for i in Attendance.objects.filter(date__month = month):
        total_attendances_first_time = 0
        if i.first_time =="present":
            total_attendances_first_time += 1
        elif  i.first_time =="double":
            total_attendances_first_time += 2
        elif i.first_time =="absent":
            total_attendances_first_time+=0

        total_attendances_second_time = 0
        if i.second_time =="present":
            total_attendances_second_time += 1
        elif  i.second_time =="double":
            total_attendances_second_time += 2
        elif i.second_time =="absent":
            total_attendances_second_time+=0

        total_attendances_all_users += (total_attendances_first_time+ total_attendances_second_time)

    
    
    
    bill_per_attendance = total_expenses / total_attendances_all_users
    print(User.objects.all())
    for i in User.objects.all():
        user = User.objects.get(username = i.username)

        room = user.room
        
            # for the whole total attendances of one  user
        total_attendances_of_that_user =  0
        for i in Attendance.objects.filter(date__month = month, student = user):
            total_attendances_first_time = 0
            if i.first_time =="present":
                total_attendances_first_time += 1
            elif  i.first_time =="double":
                total_attendances_first_time += 2
            elif i.first_time =="absent":
                total_attendances_first_time+=0

            total_attendances_second_time = 0
            if i.second_time =="present":
                total_attendances_second_time += 1
            elif  i.second_time =="double":
                total_attendances_second_time += 2
            elif i.second_time =="absent":
                total_attendances_second_time+=0

            total_attendances_of_that_user += (total_attendances_first_time+ total_attendances_second_time)
            bill = bill_per_attendance* total_attendances_of_that_user 
           

            if not Bill.objects.filter(month = month, student = user).exists():
                Bill.objects.create(
                        student = user,
                        room = room,
                        bill = bill,
                        month = month
                    )
            else:
                Bill.objects.get(month = month, student = user)

    all_bill =  Bill.objects.filter(month=month).order_by("student")
    serializers = BillSerializer(all_bill, many=True)
    return Response(serializers.data)   

                










@api_view(['GET'])
@permission_classes([])
def get_monthly_expenses_per_user(request,month, user_id):
    user = User.objects.get(id = user_id)
    total_expenses_in_that_month_set = Expense.objects.filter(date__month= month)

    total_attendances_in_that_month =0
    for i in Attendance.objects.filter(date__month = month):
        if i["first_time"] =="present":
            total_attendances_in_that_month+=1
        elif i["second_time"] =="present":
            total_attendances_in_that_month+=1
        return total_attendances_in_that_month



    total_expenses = 0
    for i in total_expenses_in_that_month_set:
        expenses = i["expenses"]
        total_expenses += expenses
        return total_expenses
    

    serializers = []
    for i in  User.objects.all():
        user = i
        total_monthly_attendances_from_that_user = Attendance.objects.filter(studant = user, date__month = month)

        bill_for_that_user = total_expenses/ total_attendances_in_that_month * total_monthly_attendances_from_that_user


        bill = Bill.objects.create(
            studant = user,
            bill = bill_for_that_user
        )
        serializer = BillSerializer(bill)
        serializers.append(serializer.data)
   
    return Response(serializers)




